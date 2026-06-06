using PropertyGuard.Core.Enums;

namespace PropertyGuard.Core.Entities;

public class Property
{
    public int Id { get; set; }
    public PropertyType Type { get; set; }
    public string Location { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string CustomerId { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public ApplicationUser Customer { get; set; } = null!;
    public VerificationRequest? VerificationRequest { get; set; }
}
