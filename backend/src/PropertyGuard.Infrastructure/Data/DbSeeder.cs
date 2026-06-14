using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PropertyGuard.Core.Entities;
using PropertyGuard.Core.Enums;

namespace PropertyGuard.Infrastructure.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        // Seed Roles
        string[] roles = { "Customer", "Lawyer", "Engineer", "GovExpert", "Admin" };
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        }

        // Seed Admin
        if (await userManager.FindByEmailAsync("admin@propertyguard.com") == null)
        {
            var admin = new ApplicationUser
            {
                UserName = "admin@propertyguard.com",
                Email = "admin@propertyguard.com",
                FullName = "مدير النظام",
                Role = UserRole.Admin,
                EmailConfirmed = true,
                PreferredLanguage = "ar"
            };
            await userManager.CreateAsync(admin, "Admin@123");
            await userManager.AddToRoleAsync(admin, "Admin");
        }

        // Seed Demo Customer
        if (await userManager.FindByEmailAsync("ahmed@example.com") == null)
        {
            var customer = new ApplicationUser
            {
                UserName = "ahmed@example.com",
                Email = "ahmed@example.com",
                FullName = "أحمد حسن",
                Phone = "+20 123 456 7890",
                Role = UserRole.Customer,
                EmailConfirmed = true,
                PreferredLanguage = "ar"
            };
            await userManager.CreateAsync(customer, "Customer@123");
            await userManager.AddToRoleAsync(customer, "Customer");
        }

        // Seed Demo Lawyer
        if (await userManager.FindByEmailAsync("rami@example.com") == null)
        {
            var lawyer = new ApplicationUser
            {
                UserName = "rami@example.com",
                Email = "rami@example.com",
                FullName = "د. رامي أحمد",
                Phone = "+20 123 456 7891",
                Role = UserRole.Lawyer,
                EmailConfirmed = true,
                PreferredLanguage = "ar"
            };
            await userManager.CreateAsync(lawyer, "Expert@123");
            await userManager.AddToRoleAsync(lawyer, "Lawyer");
        }

        // Seed Demo Engineer
        if (await userManager.FindByEmailAsync("khaled@example.com") == null)
        {
            var engineer = new ApplicationUser
            {
                UserName = "khaled@example.com",
                Email = "khaled@example.com",
                FullName = "م. خالد محمد",
                Phone = "+20 123 456 7892",
                Role = UserRole.Engineer,
                EmailConfirmed = true,
                PreferredLanguage = "ar"
            };
            await userManager.CreateAsync(engineer, "Expert@123");
            await userManager.AddToRoleAsync(engineer, "Engineer");
        }

        // Seed Demo Gov Expert
        if (await userManager.FindByEmailAsync("gov@example.com") == null)
        {
            var govExpert = new ApplicationUser
            {
                UserName = "gov@example.com",
                Email = "gov@example.com",
                FullName = "أ. سامي عبدالله",
                Phone = "+20 123 456 7893",
                Role = UserRole.GovExpert,
                EmailConfirmed = true,
                PreferredLanguage = "ar"
            };
            await userManager.CreateAsync(govExpert, "Expert@123");
            await userManager.AddToRoleAsync(govExpert, "GovExpert");
        }

        // Seed Service Packages
        if (!await context.ServicePackages.AnyAsync())
        {
            context.ServicePackages.AddRange(
                new ServicePackage
                {
                    Name = "Contract Review",
                    NameAr = "مراجعة العقود",
                    Price = 3000,
                    Description = "Lawyer reviews your property contracts and sale agreements",
                    DescriptionAr = "محامي يراجع عقود العقار واتفاقيات البيع",
                    Features = "[\"Contract review\",\"Ownership verification\",\"Legal compliance check\",\"Detailed legal report\"]",
                    FeaturesAr = "[\"مراجعة العقد\",\"التحقق من الملكية\",\"فحص الامتثال القانوني\",\"تقرير قانوني مفصل\"]",
                    IsPopular = false,
                    RequiredExpertRole = ExpertRole.Lawyer,
                    EstimatedDays = 5
                },
                new ServicePackage
                {
                    Name = "Engineering Inspection",
                    NameAr = "الفحص الهندسي",
                    Price = 5000,
                    Description = "Certified engineer visits the unit on-site to inspect building quality, structure, and safety",
                    DescriptionAr = "مهندس معتمد يزور الوحدة في الموقع لفحص جودة البناء والهيكل والسلامة",
                    Features = "[\"On-site unit visit\",\"Structural inspection\",\"Building quality assessment\",\"Detailed photo report\"]",
                    FeaturesAr = "[\"زيارة الوحدة في الموقع\",\"فحص هيكلي\",\"تقييم جودة البناء\",\"تقرير مصور مفصل\"]",
                    IsPopular = true,
                    RequiredExpertRole = ExpertRole.Engineer,
                    EstimatedDays = 7
                },
                new ServicePackage
                {
                    Name = "Government Verification",
                    NameAr = "التحقق الحكومي",
                    Price = 4000,
                    Description = "Lawyer verifies with government authorities (City Authority, land registry, permits)",
                    DescriptionAr = "محامي يتحقق من الجهات الحكومية (جهاز المدينة، السجل العقاري، التراخيص)",
                    Features = "[\"City Authority verification\",\"Land registry check\",\"Building permits verification\",\"Zoning compliance\"]",
                    FeaturesAr = "[\"التحقق من جهاز المدينة\",\"فحص السجل العقاري\",\"التحقق من تراخيص البناء\",\"فحص تصنيف الأراضي\"]",
                    IsPopular = false,
                    RequiredExpertRole = ExpertRole.Lawyer,
                    EstimatedDays = 7
                },
                new ServicePackage
                {
                    Name = "Quick Consultation",
                    NameAr = "استشارة سريعة",
                    Price = 1500,
                    Description = "Fast expert consultation before buying — get quick advice on your property deal",
                    DescriptionAr = "استشارة سريعة من خبير قبل الشراء — احصل على نصيحة سريعة لصفقتك العقارية",
                    Features = "[\"Expert consultation\",\"Quick response within 24h\",\"Written recommendation\",\"Follow-up support\"]",
                    FeaturesAr = "[\"استشارة خبير\",\"رد سريع خلال 24 ساعة\",\"توصية مكتوبة\",\"دعم متابعة\"]",
                    IsPopular = false,
                    RequiredExpertRole = ExpertRole.Lawyer,
                    EstimatedDays = 2
                }
            );
            await context.SaveChangesAsync();
        }
    }
}
