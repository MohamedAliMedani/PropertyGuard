using PropertyGuard.Core.Enums;

namespace PropertyGuard.Core.DTOs.Requests;

public class CreateRequestDto
{
    public PropertyType PropertyType { get; set; }
    public string Location { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal PropertyPrice { get; set; }
    public int ServicePackageId { get; set; }
}

public class RequestListDto
{
    public int Id { get; set; }
    public string RequestNumber { get; set; } = string.Empty;
    public string PropertyType { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int Progress { get; set; }
    public DateTime SubmittedDate { get; set; }
    public string PackageName { get; set; } = string.Empty;
    public decimal PackagePrice { get; set; }
}

public class RequestDetailDto
{
    public int Id { get; set; }
    public string RequestNumber { get; set; } = string.Empty;
    public string PropertyType { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal PropertyPrice { get; set; }
    public string Status { get; set; } = string.Empty;
    public int Progress { get; set; }
    public DateTime SubmittedDate { get; set; }
    public DateTime? EstimatedCompletion { get; set; }
    public string PackageName { get; set; } = string.Empty;
    public decimal PackagePrice { get; set; }
    public string? Notes { get; set; }
    public List<TimelineStepDto> Timeline { get; set; } = new();
    public List<AssignedExpertDto> Experts { get; set; } = new();
    public List<DocumentDto> Documents { get; set; } = new();
}

public class TimelineStepDto
{
    public string Title { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty; // completed, current, upcoming
    public string? Date { get; set; }
    public string? Description { get; set; }
}

public class AssignedExpertDto
{
    public string Role { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public bool HasReport { get; set; }
}

public class UpdateRequestStatusDto
{
    public RequestStatus Status { get; set; }
    public int? Progress { get; set; }
    public string? Notes { get; set; }
}
