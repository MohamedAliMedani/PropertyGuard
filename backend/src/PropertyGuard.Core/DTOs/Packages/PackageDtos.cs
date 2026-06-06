namespace PropertyGuard.Core.DTOs.Packages;

public class PackageDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string NameAr { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Description { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public List<string> Features { get; set; } = new();
    public List<string> FeaturesAr { get; set; } = new();
    public bool IsPopular { get; set; }
}
