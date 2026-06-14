using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyGuard.Core.DTOs.Payments;
using PropertyGuard.Core.Entities;
using PropertyGuard.Core.Enums;
using PropertyGuard.Infrastructure.Data;

namespace PropertyGuard.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PaymentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PaymentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<PaymentDto>>> GetMyPayments()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var role = User.FindFirstValue(ClaimTypes.Role)!;

        var query = _context.Payments.Include(p => p.Request).AsQueryable();

        if (role == "Customer")
            query = query.Where(p => p.Request.CustomerId == userId);

        var payments = await query.OrderByDescending(p => p.CreatedAt)
            .Select(p => new PaymentDto
            {
                Id = p.Id,
                TransactionNumber = p.TransactionNumber,
                RequestNumber = p.Request.RequestNumber,
                Amount = p.Amount,
                Method = p.Method.ToString(),
                Status = p.Status.ToString(),
                PaidAt = p.PaidAt,
                CreatedAt = p.CreatedAt
            }).ToListAsync();

        return Ok(payments);
    }

    [HttpPost]
    [Authorize(Roles = "Customer")]
    public async Task<ActionResult<PaymentDto>> CreatePayment([FromBody] CreatePaymentDto dto)
    {
        var request = await _context.VerificationRequests.FindAsync(dto.RequestId);
        if (request == null) return NotFound("Request not found");

        var lastPayment = await _context.Payments.OrderByDescending(p => p.Id).FirstOrDefaultAsync();
        var nextNumber = (lastPayment?.Id ?? 0) + 1;

        var payment = new Payment
        {
            TransactionNumber = $"TRX-{nextNumber:D3}",
            RequestId = dto.RequestId,
            Amount = dto.Amount,
            Method = dto.Method,
            Status = PaymentStatus.Completed,
            PaidAt = DateTime.UtcNow
        };

        _context.Payments.Add(payment);

        // After payment: auto-assign to least-busy expert and advance status
        if (request.Status == RequestStatus.Submitted)
        {
            var package = await _context.ServicePackages.FindAsync(request.ServicePackageId);
            if (package != null)
            {
                // Map package's RequiredExpertRole to UserRole for querying experts
                var userRole = package.RequiredExpertRole switch
                {
                    ExpertRole.Engineer => UserRole.Engineer,
                    ExpertRole.GovExpert => UserRole.GovExpert,
                    _ => UserRole.Lawyer
                };

                // Find the expert with the fewest active assignments (load balancing)
                var leastBusyExpert = await _context.Users
                    .Where(u => u.Role == userRole && u.IsActive)
                    .Select(u => new
                    {
                        u.Id,
                        ActiveCount = u.ExpertAssignments.Count(ea => ea.Status != AssignmentStatus.Completed && ea.Status != AssignmentStatus.Cancelled)
                    })
                    .OrderBy(u => u.ActiveCount)
                    .FirstOrDefaultAsync();

                if (leastBusyExpert != null)
                {
                    _context.ExpertAssignments.Add(new ExpertAssignment
                    {
                        RequestId = request.Id,
                        ExpertId = leastBusyExpert.Id,
                        Role = package.RequiredExpertRole,
                        Status = AssignmentStatus.Assigned
                    });

                    request.Status = RequestStatus.ExpertReview;
                    request.Progress = 25;
                }
                else
                {
                    // No expert available, move to UnderReview for admin to handle
                    request.Status = RequestStatus.UnderReview;
                    request.Progress = 10;
                }
            }
        }

        await _context.SaveChangesAsync();

        return Ok(new PaymentDto
        {
            Id = payment.Id,
            TransactionNumber = payment.TransactionNumber,
            RequestNumber = request.RequestNumber,
            Amount = payment.Amount,
            Method = payment.Method.ToString(),
            Status = payment.Status.ToString(),
            PaidAt = payment.PaidAt,
            CreatedAt = payment.CreatedAt
        });
    }
}
