using PropertyGuard.Core.Enums;

namespace PropertyGuard.Core.Entities;

public class Visit
{
    public int Id { get; set; }
    public int RequestId { get; set; }
    public string ExpertId { get; set; } = string.Empty;
    public DateTime ScheduledDate { get; set; }
    public TimeSpan ScheduledTime { get; set; }
    public string Address { get; set; } = string.Empty;
    public VisitStatus Status { get; set; } = VisitStatus.Scheduled;
    public string? Notes { get; set; }
    public DateTime? CompletedAt { get; set; }

    // Navigation
    public VerificationRequest Request { get; set; } = null!;
    public ApplicationUser Expert { get; set; } = null!;
}
