namespace PropertyGuard.Core.Entities;

public class Document
{
    public int Id { get; set; }
    public int RequestId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public long FileSize { get; set; }
    public string ContentType { get; set; } = string.Empty;
    public string UploadedById { get; set; } = string.Empty;
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public VerificationRequest Request { get; set; } = null!;
    public ApplicationUser UploadedBy { get; set; } = null!;
}
