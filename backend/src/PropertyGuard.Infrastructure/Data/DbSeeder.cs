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
                    Name = "Legal Verification",
                    NameAr = "التحقق القانوني",
                    Price = 5000,
                    Description = "Ownership & legal documents verification",
                    DescriptionAr = "التحقق من الملكية والمستندات القانونية",
                    Features = "[\"Ownership verification\",\"Contract review\",\"Legal compliance\"]",
                    FeaturesAr = "[\"التحقق من الملكية\",\"مراجعة العقد\",\"الامتثال القانوني\"]",
                    IsPopular = false
                },
                new ServicePackage
                {
                    Name = "Premium Package",
                    NameAr = "الباقة المميزة",
                    Price = 12000,
                    Description = "Legal + Engineering inspection",
                    DescriptionAr = "التحقق القانوني + الفحص الهندسي",
                    Features = "[\"All legal services\",\"Engineering inspection\",\"Quality assessment\"]",
                    FeaturesAr = "[\"جميع الخدمات القانونية\",\"الفحص الهندسي\",\"تقييم الجودة\"]",
                    IsPopular = true
                },
                new ServicePackage
                {
                    Name = "Full Protection",
                    NameAr = "الحماية الكاملة",
                    Price = 14000,
                    Description = "Complete verification package",
                    DescriptionAr = "باقة التحقق الكاملة",
                    Features = "[\"Legal verification\",\"Engineering inspection\",\"Government verification\",\"Priority support\"]",
                    FeaturesAr = "[\"التحقق القانوني\",\"الفحص الهندسي\",\"التحقق الحكومي\",\"دعم أولوية\"]",
                    IsPopular = false
                }
            );
            await context.SaveChangesAsync();
        }
    }
}
