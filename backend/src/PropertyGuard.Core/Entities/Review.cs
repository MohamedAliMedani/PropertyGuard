namespace PropertyGuard.Core.Entities;

public class Review
{
    public int Id { get; set; }
    public int RequestId { get; set; }
    public string CustomerId { get; set; } = string.Empty;
    public int Rating { get; set; } // 1-5
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public VerificationRequest Request { get; set; } = null!;
    public ApplicationUser Customer { get; set; } = null!;
}
