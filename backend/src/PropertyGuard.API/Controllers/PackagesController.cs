using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyGuard.Core.DTOs.Packages;
using PropertyGuard.Infrastructure.Data;
using System.Text.Json;

namespace PropertyGuard.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PackagesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PackagesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<PackageDto>>> GetPackages()
    {
        var packages = await _context.ServicePackages
            .Where(sp => sp.IsActive)
            .ToListAsync();

        var result = packages.Select(sp => new PackageDto
        {
            Id = sp.Id,
            Name = sp.Name,
            NameAr = sp.NameAr,
            Price = sp.Price,
            Description = sp.Description,
            DescriptionAr = sp.DescriptionAr,
            Features = JsonSerializer.Deserialize<List<string>>(sp.Features) ?? new(),
            FeaturesAr = JsonSerializer.Deserialize<List<string>>(sp.FeaturesAr) ?? new(),
            IsPopular = sp.IsPopular
        }).ToList();

        return Ok(result);
    }
}
