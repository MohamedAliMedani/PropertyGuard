using PropertyGuard.Core.Enums;

namespace PropertyGuard.Core.Entities;

public class SupportTicket
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public TicketStatus Status { get; set; } = TicketStatus.Open;
    public TicketPriority Priority { get; set; } = TicketPriority.Medium;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ResolvedAt { get; set; }

    // Navigation
    public ApplicationUser User { get; set; } = null!;
}
