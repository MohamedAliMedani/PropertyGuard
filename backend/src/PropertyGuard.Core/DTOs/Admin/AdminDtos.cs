namespace PropertyGuard.Core.DTOs.Admin;

public class DashboardStatsDto
{
    public int TotalUsers { get; set; }
    public int ActiveRequests { get; set; }
    public decimal MonthlyRevenue { get; set; }
    public int ActiveExperts { get; set; }
    public string UsersChange { get; set; } = string.Empty;
    public string RequestsChange { get; set; } = string.Empty;
    public string RevenueChange { get; set; } = string.Empty;
    public int PendingApprovals { get; set; }
    public List<MonthlyDataDto> MonthlyData { get; set; } = new();
    public List<PackageDistributionDto> PackageDistribution { get; set; } = new();
}

public class MonthlyDataDto
{
    public string Month { get; set; } = string.Empty;
    public int Requests { get; set; }
    public decimal Revenue { get; set; }
}

public class PackageDistributionDto
{
    public string Name { get; set; } = string.Empty;
    public int Value { get; set; }
    public string Color { get; set; } = string.Empty;
}

public class UserListDto
{
    public string Id { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Role { get; set; } = string.Empty;
    public int RequestCount { get; set; }
    public decimal TotalSpent { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ExpertListDto
{
    public string Id { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public int AssignedCases { get; set; }
    public int CompletedCases { get; set; }
    public bool IsActive { get; set; }
}

public class AssignExpertDto
{
    public int RequestId { get; set; }
    public string ExpertId { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}
