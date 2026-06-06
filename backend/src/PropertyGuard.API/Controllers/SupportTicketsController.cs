using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyGuard.Core.DTOs.Support;
using PropertyGuard.Core.Entities;
using PropertyGuard.Infrastructure.Data;

namespace PropertyGuard.API.Controllers;

[ApiController]
[Route("api/support-tickets")]
[Authorize]
public class SupportTicketsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SupportTicketsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<TicketDto>>> GetTickets()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var role = User.FindFirstValue(ClaimTypes.Role)!;

        var query = _context.SupportTickets.Include(t => t.User).AsQueryable();

        if (role != "Admin")
            query = query.Where(t => t.UserId == userId);

        var tickets = await query.OrderByDescending(t => t.CreatedAt)
            .Select(t => new TicketDto
            {
                Id = t.Id,
                UserName = t.User.FullName,
                Subject = t.Subject,
                Description = t.Description,
                Status = t.Status.ToString(),
                Priority = t.Priority.ToString(),
                CreatedAt = t.CreatedAt,
                ResolvedAt = t.ResolvedAt
            }).ToListAsync();

        return Ok(tickets);
    }

    [HttpPost]
    public async Task<ActionResult<TicketDto>> CreateTicket([FromBody] CreateTicketDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var ticket = new SupportTicket
        {
            UserId = userId,
            Subject = dto.Subject,
            Description = dto.Description,
            Priority = dto.Priority
        };

        _context.SupportTickets.Add(ticket);
        await _context.SaveChangesAsync();

        var user = await _context.Users.FindAsync(userId);

        return Ok(new TicketDto
        {
            Id = ticket.Id,
            UserName = user?.FullName ?? "",
            Subject = ticket.Subject,
            Description = ticket.Description,
            Status = ticket.Status.ToString(),
            Priority = ticket.Priority.ToString(),
            CreatedAt = ticket.CreatedAt
        });
    }

    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateTicketStatusDto dto)
    {
        var ticket = await _context.SupportTickets.FindAsync(id);
        if (ticket == null) return NotFound();

        ticket.Status = dto.Status;
        if (dto.Status == Core.Enums.TicketStatus.Resolved)
            ticket.ResolvedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return NoContent();
    }
}
