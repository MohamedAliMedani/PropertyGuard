using Microsoft.AspNetCore.Identity;
using PropertyGuard.Core.Enums;

namespace PropertyGuard.Core.Entities;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public UserRole Role { get; set; } = UserRole.Customer;
    public string? AvatarUrl { get; set; }
    public string PreferredLanguage { get; set; } = "ar";
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public ICollection<Property> Properties { get; set; } = new List<Property>();
    public ICollection<VerificationRequest> Requests { get; set; } = new List<VerificationRequest>();
    public ICollection<ExpertAssignment> ExpertAssignments { get; set; } = new List<ExpertAssignment>();
    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    public ICollection<SupportTicket> SupportTickets { get; set; } = new List<SupportTicket>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}
