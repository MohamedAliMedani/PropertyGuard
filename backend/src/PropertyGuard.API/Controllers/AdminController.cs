using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyGuard.Core.DTOs.Admin;
using PropertyGuard.Core.Enums;
using PropertyGuard.Infrastructure.Data;

namespace PropertyGuard.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AdminController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult<DashboardStatsDto>> GetDashboard()
    {
        var totalUsers = await _context.Users.CountAsync(u => u.Role == UserRole.Customer);
        var activeRequests = await _context.VerificationRequests.CountAsync(r => r.Status != RequestStatus.Completed && r.Status != RequestStatus.Rejected);
        var activeExperts = await _context.Users.CountAsync(u => u.Role != UserRole.Customer && u.Role != UserRole.Admin && u.IsActive);
        var pendingApprovals = await _context.VerificationRequests.CountAsync(r => r.Status == RequestStatus.Submitted);

        var currentMonth = DateTime.UtcNow.Month;
        var currentYear = DateTime.UtcNow.Year;
        var monthlyRevenue = await _context.Payments
            .Where(p => p.PaidAt.HasValue && p.PaidAt.Value.Month == currentMonth && p.PaidAt.Value.Year == currentYear)
            .SumAsync(p => p.Amount);

        var monthlyData = await _context.Payments
            .Where(p => p.PaidAt.HasValue && p.PaidAt.Value.Year == currentYear)
            .GroupBy(p => p.PaidAt!.Value.Month)
            .Select(g => new MonthlyDataDto
            {
                Month = g.Key.ToString(),
                Requests = g.Count(),
                Revenue = g.Sum(p => p.Amount)
            }).ToListAsync();

        return Ok(new DashboardStatsDto
        {
            TotalUsers = totalUsers,
            ActiveRequests = activeRequests,
            MonthlyRevenue = monthlyRevenue,
            ActiveExperts = activeExperts,
            PendingApprovals = pendingApprovals,
            UsersChange = "+12%",
            RequestsChange = "+8%",
            RevenueChange = "+15%",
            MonthlyData = monthlyData,
            PackageDistribution = new()
            {
                new() { Name = "Contract Review", Value = 30, Color = "#1e3a8a" },
                new() { Name = "Engineering", Value = 35, Color = "#059669" },
                new() { Name = "Gov. Verification", Value = 20, Color = "#8b5cf6" },
                new() { Name = "Consultation", Value = 15, Color = "#f59e0b" }
            }
        });
    }

    [HttpGet("users")]
    public async Task<ActionResult<List<UserListDto>>> GetUsers()
    {
        var users = await _context.Users
            .Select(u => new UserListDto
            {
                Id = u.Id,
                FullName = u.FullName,
                Email = u.Email!,
                Phone = u.Phone,
                Role = u.Role.ToString(),
                RequestCount = u.Requests.Count,
                TotalSpent = u.Requests.SelectMany(r => r.Payments).Where(p => p.Status == PaymentStatus.Completed).Sum(p => p.Amount),
                IsActive = u.IsActive,
                CreatedAt = u.CreatedAt
            }).ToListAsync();

        return Ok(users);
    }

    [HttpGet("experts")]
    public async Task<ActionResult<List<ExpertListDto>>> GetExperts()
    {
        var experts = await _context.Users
            .Where(u => u.Role == UserRole.Lawyer || u.Role == UserRole.Engineer || u.Role == UserRole.GovExpert)
            .Select(u => new ExpertListDto
            {
                Id = u.Id,
                FullName = u.FullName,
                Email = u.Email!,
                Role = u.Role.ToString(),
                AssignedCases = u.ExpertAssignments.Count(ea => ea.Status != AssignmentStatus.Completed),
                CompletedCases = u.ExpertAssignments.Count(ea => ea.Status == AssignmentStatus.Completed),
                IsActive = u.IsActive
            }).ToListAsync();

        return Ok(experts);
    }

    [HttpPost("assign-expert")]
    public async Task<IActionResult> AssignExpert([FromBody] AssignExpertDto dto)
    {
        var role = Enum.Parse<ExpertRole>(dto.Role);
        var assignment = new Core.Entities.ExpertAssignment
        {
            RequestId = dto.RequestId,
            ExpertId = dto.ExpertId,
            Role = role
        };

        _context.ExpertAssignments.Add(assignment);
        await _context.SaveChangesAsync();
        return Ok(new { id = assignment.Id });
    }

    [HttpGet("requests")]
    public async Task<ActionResult> GetAllRequests()
    {
        var requests = await _context.VerificationRequests
            .Include(r => r.Property)
            .Include(r => r.Customer)
            .Include(r => r.ServicePackage)
            .Include(r => r.ExpertAssignments).ThenInclude(ea => ea.Expert)
            .OrderByDescending(r => r.SubmittedDate)
            .Select(r => new
            {
                r.Id,
                r.RequestNumber,
                CustomerName = r.Customer.FullName,
                Property = $"{r.Property.Type} - {r.Property.Location}",
                Package = r.ServicePackage.Name,
                Amount = r.ServicePackage.Price,
                Status = r.Status.ToString(),
                AssignedTo = string.Join(", ", r.ExpertAssignments.Select(ea => ea.Expert.FullName)),
                r.SubmittedDate
            }).ToListAsync();

        return Ok(requests);
    }
}
