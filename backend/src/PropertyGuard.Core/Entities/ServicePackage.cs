namespace PropertyGuard.Core.Entities;

public class ServicePackage
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string NameAr { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Description { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public string Features { get; set; } = "[]"; // JSON array
    public string FeaturesAr { get; set; } = "[]"; // JSON array (Arabic)
    public bool IsPopular { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public ICollection<VerificationRequest> Requests { get; set; } = new List<VerificationRequest>();
}
