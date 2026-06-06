using PropertyGuard.Core.Enums;

namespace PropertyGuard.Core.Entities;

public class VerificationRequest
{
    public int Id { get; set; }
    public string RequestNumber { get; set; } = string.Empty; // REQ-001
    public int PropertyId { get; set; }
    public string CustomerId { get; set; } = string.Empty;
    public int ServicePackageId { get; set; }
    public RequestStatus Status { get; set; } = RequestStatus.Submitted;
    public int Progress { get; set; } = 0;
    public string? Notes { get; set; }
    public DateTime SubmittedDate { get; set; } = DateTime.UtcNow;
    public DateTime? EstimatedCompletion { get; set; }
    public DateTime? CompletedDate { get; set; }

    // Navigation
    public Property Property { get; set; } = null!;
    public ApplicationUser Customer { get; set; } = null!;
    public ServicePackage ServicePackage { get; set; } = null!;
    public ICollection<Document> Documents { get; set; } = new List<Document>();
    public ICollection<ExpertAssignment> ExpertAssignments { get; set; } = new List<ExpertAssignment>();
    public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    public ICollection<Visit> Visits { get; set; } = new List<Visit>();
    public Conversation? Conversation { get; set; }
    public Review? Review { get; set; }
}
