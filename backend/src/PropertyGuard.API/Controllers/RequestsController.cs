using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyGuard.Core.DTOs.Requests;
using PropertyGuard.Core.Entities;
using PropertyGuard.Core.Enums;
using PropertyGuard.Infrastructure.Data;

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
                HasReport = ea.Report != null
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

        var request = new VerificationRequest
        {
            RequestNumber = $"REQ-{nextNumber:D3}",
            PropertyId = property.Id,
            CustomerId = userId,
            ServicePackageId = dto.ServicePackageId,
            Status = RequestStatus.Submitted,
            Progress = 0,
            SubmittedDate = DateTime.UtcNow,
            EstimatedCompletion = DateTime.UtcNow.AddDays(10)
        };
        _context.VerificationRequests.Add(request);
        await _context.SaveChangesAsync();

        // Create conversation for this request
        _context.Conversations.Add(new Conversation { RequestId = request.Id });
        await _context.SaveChangesAsync();

        var package = await _context.ServicePackages.FindAsync(dto.ServicePackageId);

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

        await _context.SaveChangesAsync();
        return NoContent();
    }

    private static List<TimelineStepDto> GenerateTimeline(VerificationRequest request)
    {
        var steps = new List<(string Title, RequestStatus MinStatus)>
        {
            ("Request Submitted", RequestStatus.Submitted),
            ("Under Review", RequestStatus.UnderReview),
            ("Lawyer Review", RequestStatus.LawyerReview),
            ("Engineer Visit", RequestStatus.EngineerVisit),
            ("Government Verification", RequestStatus.GovernmentVerification),
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
