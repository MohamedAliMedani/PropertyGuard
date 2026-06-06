using PropertyGuard.Core.Enums;

namespace PropertyGuard.Core.DTOs.Visits;

public class CreateVisitDto
{
    public int RequestId { get; set; }
    public string ExpertId { get; set; } = string.Empty;
    public DateTime ScheduledDate { get; set; }
    public TimeSpan ScheduledTime { get; set; }
    public string Address { get; set; } = string.Empty;
}

public class VisitDto
{
    public int Id { get; set; }
    public string RequestNumber { get; set; } = string.Empty;
    public string PropertyInfo { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string ExpertName { get; set; } = string.Empty;
    public DateTime ScheduledDate { get; set; }
    public string ScheduledTime { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime? CompletedAt { get; set; }
}

public class UpdateVisitStatusDto
{
    public VisitStatus Status { get; set; }
    public string? Notes { get; set; }
}
