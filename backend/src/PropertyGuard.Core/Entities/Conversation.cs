namespace PropertyGuard.Core.Entities;

public class Conversation
{
    public int Id { get; set; }
    public int RequestId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public VerificationRequest Request { get; set; } = null!;
    public ICollection<Message> Messages { get; set; } = new List<Message>();
}
