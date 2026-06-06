using PropertyGuard.Core.Enums;

namespace PropertyGuard.Core.Entities;

public class ExpertAssignment
{
    public int Id { get; set; }
    public int RequestId { get; set; }
    public string ExpertId { get; set; } = string.Empty;
    public ExpertRole Role { get; set; }
    public AssignmentStatus Status { get; set; } = AssignmentStatus.Assigned;
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }

    // Navigation
    public VerificationRequest Request { get; set; } = null!;
    public ApplicationUser Expert { get; set; } = null!;
    public ExpertReport? Report { get; set; }
}
