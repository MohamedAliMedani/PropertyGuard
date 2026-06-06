using PropertyGuard.Core.Enums;

namespace PropertyGuard.Core.DTOs.Support;

public class CreateTicketDto
{
    public string Subject { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public TicketPriority Priority { get; set; } = TicketPriority.Medium;
}

public class TicketDto
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? ResolvedAt { get; set; }
}

public class UpdateTicketStatusDto
{
    public TicketStatus Status { get; set; }
}
