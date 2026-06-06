namespace PropertyGuard.Core.Entities;

public class ExpertReport
{
    public int Id { get; set; }
    public int AssignmentId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? FilePath { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public ExpertAssignment Assignment { get; set; } = null!;
}
