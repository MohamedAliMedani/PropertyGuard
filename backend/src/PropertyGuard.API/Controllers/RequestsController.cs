using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyGuard.Core.DTOs.Requests;
using PropertyGuard.Core.Entities;
using PropertyGuard.Core.Enums;
using PropertyGuard.Infrastructure.Data;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace PropertyGuard.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RequestsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RequestsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<RequestListDto>>> GetMyRequests()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var role = User.FindFirstValue(ClaimTypes.Role)!;

        IQueryable<VerificationRequest> query = _context.VerificationRequests
            .Include(r => r.Property)
            .Include(r => r.ServicePackage);

        if (role == "Customer")
            query = query.Where(r => r.CustomerId == userId);
        else if (role == "Lawyer" || role == "Engineer" || role == "GovExpert")
            query = query.Where(r => r.ExpertAssignments.Any(ea => ea.ExpertId == userId));

        var requests = await query.OrderByDescending(r => r.SubmittedDate)
            .Select(r => new RequestListDto
            {
                Id = r.Id,
                RequestNumber = r.RequestNumber,
                PropertyType = r.Property.Type.ToString(),
                Location = r.Property.Location,
                Status = r.Status.ToString(),
                Progress = r.Progress,
                SubmittedDate = r.SubmittedDate,
                PackageName = r.ServicePackage.Name,
                PackagePrice = r.ServicePackage.Price
            }).ToListAsync();

        return Ok(requests);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RequestDetailDto>> GetRequest(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var request = await _context.VerificationRequests
            .Include(r => r.Property)
            .Include(r => r.ServicePackage)
            .Include(r => r.Documents).ThenInclude(d => d.UploadedBy)
            .Include(r => r.ExpertAssignments).ThenInclude(ea => ea.Expert)
            .Include(r => r.ExpertAssignments).ThenInclude(ea => ea.Report)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (request == null) return NotFound();

        var timeline = GenerateTimeline(request);

        var dto = new RequestDetailDto
        {
            Id = request.Id,
            RequestNumber = request.RequestNumber,
            PropertyType = request.Property.Type.ToString(),
            Location = request.Property.Location,
            Address = request.Property.Address,
            PropertyPrice = request.Property.Price,
            Status = request.Status.ToString(),
            Progress = request.Progress,
            SubmittedDate = request.SubmittedDate,
            EstimatedCompletion = request.EstimatedCompletion,
            PackageName = request.ServicePackage.Name,
            PackagePrice = request.ServicePackage.Price,
            Notes = request.Notes,
            Timeline = timeline,
            Experts = request.ExpertAssignments.Select(ea => new AssignedExpertDto
            {
                Role = ea.Role.ToString(),
                Name = ea.Expert.FullName,
                Status = ea.Status.ToString(),
                HasReport = ea.Report != null,
                ReportContent = ea.Report != null ? ea.Report.Content : null
            }).ToList(),
            Documents = request.Documents.Select(d => new DocumentDto
            {
                Id = d.Id,
                FileName = d.FileName,
                FileSize = d.FileSize,
                ContentType = d.ContentType,
                UploadedBy = d.UploadedBy.FullName,
                UploadedAt = d.UploadedAt
            }).ToList()
        };

        return Ok(dto);
    }

    [HttpPost]
    [Authorize(Roles = "Customer")]
    public async Task<ActionResult<RequestListDto>> CreateRequest([FromBody] CreateRequestDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var property = new Property
        {
            Type = dto.PropertyType,
            Location = dto.Location,
            Address = dto.Address,
            Price = dto.PropertyPrice,
            CustomerId = userId
        };
        _context.Properties.Add(property);
        await _context.SaveChangesAsync();

        var lastRequest = await _context.VerificationRequests
            .OrderByDescending(r => r.Id)
            .FirstOrDefaultAsync();
        var nextNumber = (lastRequest?.Id ?? 0) + 1;

        var package = await _context.ServicePackages.FindAsync(dto.ServicePackageId);

        var request = new VerificationRequest
        {
            RequestNumber = $"REQ-{nextNumber:D3}",
            PropertyId = property.Id,
            CustomerId = userId,
            ServicePackageId = dto.ServicePackageId,
            Status = RequestStatus.Submitted,
            Progress = 0,
            SubmittedDate = DateTime.UtcNow,
            EstimatedCompletion = DateTime.UtcNow.AddDays(package?.EstimatedDays ?? 7)
        };
        _context.VerificationRequests.Add(request);
        await _context.SaveChangesAsync();

        // Create conversation for this request
        _context.Conversations.Add(new Conversation { RequestId = request.Id });
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetRequest), new { id = request.Id }, new RequestListDto
        {
            Id = request.Id,
            RequestNumber = request.RequestNumber,
            PropertyType = property.Type.ToString(),
            Location = property.Location,
            Status = request.Status.ToString(),
            Progress = request.Progress,
            SubmittedDate = request.SubmittedDate,
            PackageName = package?.Name ?? "",
            PackagePrice = package?.Price ?? 0
        });
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin,Lawyer,Engineer,GovExpert")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateRequestStatusDto dto)
    {
        var request = await _context.VerificationRequests.FindAsync(id);
        if (request == null) return NotFound();

        request.Status = dto.Status;
        if (dto.Progress.HasValue) request.Progress = dto.Progress.Value;
        if (dto.Notes != null) request.Notes = dto.Notes;
        if (dto.Status == RequestStatus.Completed)
        {
            request.Progress = 100;
            request.CompletedDate = DateTime.UtcNow;
        }

        // Update expert assignment status and create report when expert submits
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var role = User.FindFirstValue(ClaimTypes.Role)!;
        if (role is "Lawyer" or "Engineer" or "GovExpert")
        {
            var assignment = await _context.ExpertAssignments
                .FirstOrDefaultAsync(ea => ea.RequestId == id && ea.ExpertId == userId);

            if (assignment != null)
            {
                assignment.Status = AssignmentStatus.Completed;
                assignment.CompletedAt = DateTime.UtcNow;

                // Create expert report if notes provided
                if (!string.IsNullOrEmpty(dto.Notes))
                {
                    var existingReport = await _context.ExpertReports
                        .FirstOrDefaultAsync(r => r.AssignmentId == assignment.Id);
                    if (existingReport == null)
                    {
                        _context.ExpertReports.Add(new ExpertReport
                        {
                            AssignmentId = assignment.Id,
                            Title = $"{role} Report - {request.RequestNumber}",
                            Content = dto.Notes,
                        });
                    }
                    else
                    {
                        existingReport.Content = dto.Notes;
                        existingReport.CreatedAt = DateTime.UtcNow;
                    }
                }
            }
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("{id}/report")]
    public async Task<IActionResult> DownloadReport(int id)
    {
        var request = await _context.VerificationRequests
            .Include(r => r.Property)
            .Include(r => r.Customer)
            .Include(r => r.ServicePackage)
            .Include(r => r.ExpertAssignments).ThenInclude(ea => ea.Expert)
            .Include(r => r.ExpertAssignments).ThenInclude(ea => ea.Report)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (request == null) return NotFound();

        QuestPDF.Settings.License = LicenseType.Community;

        var pdf = QuestPDF.Fluent.Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.MarginHorizontal(40);
                page.MarginVertical(50);
                page.DefaultTextStyle(x => x.FontSize(11));

                page.Header().Column(col =>
                {
                    col.Item().Row(row =>
                    {
                        row.RelativeItem().Text("PropertyGuard")
                            .FontSize(22).Bold().FontColor("#1e3a8a");
                        row.ConstantItem(150).AlignRight().Text(request.RequestNumber)
                            .FontSize(16).Bold().FontColor("#059669");
                    });
                    col.Item().PaddingTop(5).Text("Property Verification Report")
                        .FontSize(13).FontColor("#6b7280");
                    col.Item().PaddingTop(10).LineHorizontal(1).LineColor("#e5e7eb");
                });

                page.Content().PaddingVertical(15).Column(col =>
                {
                    // Request Info
                    col.Item().PaddingBottom(15).Table(table =>
                    {
                        table.ColumnsDefinition(c =>
                        {
                            c.RelativeColumn();
                            c.RelativeColumn();
                        });

                        table.Cell().Row(1).Column(1).Padding(4).Column(c =>
                        {
                            c.Item().Text("Request Number").FontSize(9).FontColor("#6b7280");
                            c.Item().Text(request.RequestNumber).Bold();
                        });
                        table.Cell().Row(1).Column(2).Padding(4).Column(c =>
                        {
                            c.Item().Text("Status").FontSize(9).FontColor("#6b7280");
                            c.Item().Text(request.Status.ToString()).Bold();
                        });
                        table.Cell().Row(2).Column(1).Padding(4).Column(c =>
                        {
                            c.Item().Text("Customer").FontSize(9).FontColor("#6b7280");
                            c.Item().Text(request.Customer.FullName);
                        });
                        table.Cell().Row(2).Column(2).Padding(4).Column(c =>
                        {
                            c.Item().Text("Submitted Date").FontSize(9).FontColor("#6b7280");
                            c.Item().Text(request.SubmittedDate.ToString("dd MMM yyyy"));
                        });
                        table.Cell().Row(3).Column(1).Padding(4).Column(c =>
                        {
                            c.Item().Text("Package").FontSize(9).FontColor("#6b7280");
                            c.Item().Text(request.ServicePackage.Name);
                        });
                        table.Cell().Row(3).Column(2).Padding(4).Column(c =>
                        {
                            c.Item().Text("Package Price").FontSize(9).FontColor("#6b7280");
                            c.Item().Text($"EGP {request.ServicePackage.Price:N0}");
                        });
                    });

                    // Property Details
                    col.Item().PaddingBottom(8).Text("Property Details")
                        .FontSize(14).Bold().FontColor("#1e3a8a");
                    col.Item().PaddingBottom(15).Table(table =>
                    {
                        table.ColumnsDefinition(c =>
                        {
                            c.RelativeColumn();
                            c.RelativeColumn();
                        });

                        table.Cell().Row(1).Column(1).Padding(4).Column(c =>
                        {
                            c.Item().Text("Type").FontSize(9).FontColor("#6b7280");
                            c.Item().Text(request.Property.Type.ToString());
                        });
                        table.Cell().Row(1).Column(2).Padding(4).Column(c =>
                        {
                            c.Item().Text("Location").FontSize(9).FontColor("#6b7280");
                            c.Item().Text(request.Property.Location);
                        });
                        table.Cell().Row(2).Column(1).Padding(4).Column(c =>
                        {
                            c.Item().Text("Address").FontSize(9).FontColor("#6b7280");
                            c.Item().Text(request.Property.Address);
                        });
                        table.Cell().Row(2).Column(2).Padding(4).Column(c =>
                        {
                            c.Item().Text("Property Value").FontSize(9).FontColor("#6b7280");
                            c.Item().Text($"EGP {request.Property.Price:N0}");
                        });
                    });

                    // Expert Reports
                    var assignments = request.ExpertAssignments.Where(ea => ea.Report != null).ToList();
                    if (assignments.Count > 0)
                    {
                        col.Item().PaddingBottom(8).Text("Expert Reports")
                            .FontSize(14).Bold().FontColor("#1e3a8a");

                        foreach (var assignment in assignments)
                        {
                            col.Item().PaddingBottom(12)
                                .Border(1).BorderColor("#e5e7eb").Background("#f9fafb")
                                .Padding(12).Column(inner =>
                                {
                                    inner.Item().Row(row =>
                                    {
                                        row.RelativeItem().Text(assignment.Expert.FullName)
                                            .FontSize(12).Bold();
                                        row.ConstantItem(120).AlignRight()
                                            .Text(assignment.Role.ToString())
                                            .FontSize(10).FontColor("#059669").Bold();
                                    });
                                    inner.Item().PaddingTop(3).Text($"Status: {assignment.Status}")
                                        .FontSize(9).FontColor("#6b7280");
                                    if (assignment.CompletedAt.HasValue)
                                        inner.Item().Text($"Completed: {assignment.CompletedAt.Value:dd MMM yyyy}")
                                            .FontSize(9).FontColor("#6b7280");
                                    inner.Item().PaddingTop(8).Text("Findings:")
                                        .FontSize(10).Bold();
                                    inner.Item().PaddingTop(4).Text(assignment.Report!.Content)
                                        .FontSize(10).LineHeight(1.5f);
                                });
                        }
                    }

                    // Notes
                    if (!string.IsNullOrEmpty(request.Notes))
                    {
                        col.Item().PaddingTop(10).PaddingBottom(8).Text("Notes")
                            .FontSize(14).Bold().FontColor("#1e3a8a");
                        col.Item().Background("#f9fafb").Border(1).BorderColor("#e5e7eb")
                            .Padding(12).Text(request.Notes).FontSize(10).LineHeight(1.5f);
                    }
                });

                page.Footer().Row(row =>
                {
                    row.RelativeItem().Text($"Generated on {DateTime.UtcNow:dd MMM yyyy HH:mm} UTC")
                        .FontSize(8).FontColor("#9ca3af");
                    row.ConstantItem(100).AlignRight().Text(text =>
                    {
                        text.Span("Page ").FontSize(8).FontColor("#9ca3af");
                        text.CurrentPageNumber().FontSize(8).FontColor("#9ca3af");
                    });
                });
            });
        });

        var pdfBytes = pdf.GeneratePdf();
        return File(pdfBytes, "application/pdf", $"{request.RequestNumber}-Report.pdf");
    }

    private static List<TimelineStepDto> GenerateTimeline(VerificationRequest request)
    {
        var steps = new List<(string Title, RequestStatus MinStatus)>
        {
            ("Request Submitted", RequestStatus.Submitted),
            ("Payment & Assignment", RequestStatus.UnderReview),
            ("Expert Review", RequestStatus.ExpertReview),
            ("Completed", RequestStatus.Completed),
        };

        return steps.Select(s =>
        {
            string status;
            if ((int)request.Status > (int)s.MinStatus) status = "completed";
            else if (request.Status == s.MinStatus) status = "current";
            else status = "upcoming";

            return new TimelineStepDto
            {
                Title = s.Title,
                Status = status,
                Date = status == "completed" || status == "current" ? request.SubmittedDate.ToString("MMM dd, yyyy") : null,
                Description = status == "current" ? "In progress" : null
            };
        }).ToList();
    }
}
