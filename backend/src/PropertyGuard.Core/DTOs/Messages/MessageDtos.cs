namespace PropertyGuard.Core.DTOs.Messages;

public class ConversationDto
{
    public int Id { get; set; }
    public string RequestNumber { get; set; } = string.Empty;
    public string LastMessage { get; set; } = string.Empty;
    public DateTime LastMessageAt { get; set; }
    public int UnreadCount { get; set; }
    public List<ParticipantDto> Participants { get; set; } = new();
}

public class ParticipantDto
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}

public class MessageDto
{
    public int Id { get; set; }
    public string SenderId { get; set; } = string.Empty;
    public string SenderName { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public bool IsRead { get; set; }
    public DateTime SentAt { get; set; }
}

public class SendMessageDto
{
    public int ConversationId { get; set; }
    public string Text { get; set; } = string.Empty;
}
