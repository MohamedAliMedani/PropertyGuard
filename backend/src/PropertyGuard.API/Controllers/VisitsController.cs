using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyGuard.Core.DTOs.Visits;
using PropertyGuard.Core.Entities;
using PropertyGuard.Core.Enums;
using PropertyGuard.Infrastructure.Data;

namespace PropertyGuard.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class VisitsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public VisitsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<VisitDto>>> GetVisits()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var role = User.FindFirstValue(ClaimTypes.Role)!;

        var query = _context.Visits
            .Include(v => v.Request).ThenInclude(r => r.Property)
            .Include(v => v.Request).ThenInclude(r => r.Customer)
            .Include(v => v.Expert)
            .AsQueryable();

        if (role == "Engineer" || role == "GovExpert")
            query = query.Where(v => v.ExpertId == userId);
        else if (role == "Customer")
            query = query.Where(v => v.Request.CustomerId == userId);

        var visits = await query
            .Select(v => new VisitDto
            {
                Id = v.Id,
                RequestNumber = v.Request.RequestNumber,
                PropertyInfo = $"{v.Request.Property.Type} - {v.Request.Property.Location}",
                CustomerName = v.Request.Customer.FullName,
                ExpertName = v.Expert.FullName,
                ScheduledDate = v.ScheduledDate,
                ScheduledTime = v.ScheduledTime.ToString(@"hh\:mm"),
                Address = v.Address,
                Status = v.Status.ToString(),
                CompletedAt = v.CompletedAt
            }).OrderByDescending(v => v.ScheduledDate).ToListAsync();

        return Ok(visits);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<VisitDto>> CreateVisit([FromBody] CreateVisitDto dto)
    {
        var visit = new Visit
        {
            RequestId = dto.RequestId,
            ExpertId = dto.ExpertId,
            ScheduledDate = dto.ScheduledDate,
            ScheduledTime = dto.ScheduledTime,
            Address = dto.Address
        };

        _context.Visits.Add(visit);
        await _context.SaveChangesAsync();

        return Ok(new VisitDto { Id = visit.Id, Status = visit.Status.ToString() });
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "Engineer,GovExpert,Admin")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateVisitStatusDto dto)
    {
        var visit = await _context.Visits.FindAsync(id);
        if (visit == null) return NotFound();

        visit.Status = dto.Status;
        if (dto.Status == VisitStatus.Completed)
            visit.CompletedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return NoContent();
    }
}
