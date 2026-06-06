using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PropertyGuard.Core.Entities;

namespace PropertyGuard.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Property> Properties { get; set; }
    public DbSet<ServicePackage> ServicePackages { get; set; }
    public DbSet<VerificationRequest> VerificationRequests { get; set; }
    public DbSet<Document> Documents { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<ExpertAssignment> ExpertAssignments { get; set; }
    public DbSet<ExpertReport> ExpertReports { get; set; }
    public DbSet<Visit> Visits { get; set; }
    public DbSet<Conversation> Conversations { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<SupportTicket> SupportTickets { get; set; }
    public DbSet<Review> Reviews { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // ApplicationUser
        builder.Entity<ApplicationUser>(entity =>
        {
            entity.Property(u => u.FullName).HasMaxLength(200).IsRequired();
            entity.Property(u => u.Phone).HasMaxLength(20);
            entity.Property(u => u.PreferredLanguage).HasMaxLength(5).HasDefaultValue("ar");
        });

        // Property
        builder.Entity<Property>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Location).HasMaxLength(200).IsRequired();
            entity.Property(p => p.Address).HasMaxLength(500).IsRequired();
            entity.Property(p => p.Price).HasColumnType("decimal(18,2)");

            entity.HasOne(p => p.Customer)
                .WithMany(u => u.Properties)
                .HasForeignKey(p => p.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ServicePackage
        builder.Entity<ServicePackage>(entity =>
        {
            entity.HasKey(sp => sp.Id);
            entity.Property(sp => sp.Name).HasMaxLength(100).IsRequired();
            entity.Property(sp => sp.NameAr).HasMaxLength(100);
            entity.Property(sp => sp.Price).HasColumnType("decimal(18,2)");
            entity.Property(sp => sp.Description).HasMaxLength(500);
            entity.Property(sp => sp.DescriptionAr).HasMaxLength(500);
        });

        // VerificationRequest
        builder.Entity<VerificationRequest>(entity =>
        {
            entity.HasKey(vr => vr.Id);
            entity.Property(vr => vr.RequestNumber).HasMaxLength(20).IsRequired();
            entity.HasIndex(vr => vr.RequestNumber).IsUnique();

            entity.HasOne(vr => vr.Property)
                .WithOne(p => p.VerificationRequest)
                .HasForeignKey<VerificationRequest>(vr => vr.PropertyId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(vr => vr.Customer)
                .WithMany(u => u.Requests)
                .HasForeignKey(vr => vr.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(vr => vr.ServicePackage)
                .WithMany(sp => sp.Requests)
                .HasForeignKey(vr => vr.ServicePackageId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Document
        builder.Entity<Document>(entity =>
        {
            entity.HasKey(d => d.Id);
            entity.Property(d => d.FileName).HasMaxLength(300).IsRequired();
            entity.Property(d => d.FilePath).HasMaxLength(500).IsRequired();
            entity.Property(d => d.ContentType).HasMaxLength(100);

            entity.HasOne(d => d.Request)
                .WithMany(r => r.Documents)
                .HasForeignKey(d => d.RequestId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(d => d.UploadedBy)
                .WithMany()
                .HasForeignKey(d => d.UploadedById)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Payment
        builder.Entity<Payment>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.TransactionNumber).HasMaxLength(20).IsRequired();
            entity.HasIndex(p => p.TransactionNumber).IsUnique();
            entity.Property(p => p.Amount).HasColumnType("decimal(18,2)");

            entity.HasOne(p => p.Request)
                .WithMany(r => r.Payments)
                .HasForeignKey(p => p.RequestId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ExpertAssignment
        builder.Entity<ExpertAssignment>(entity =>
        {
            entity.HasKey(ea => ea.Id);

            entity.HasOne(ea => ea.Request)
                .WithMany(r => r.ExpertAssignments)
                .HasForeignKey(ea => ea.RequestId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(ea => ea.Expert)
                .WithMany(u => u.ExpertAssignments)
                .HasForeignKey(ea => ea.ExpertId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // ExpertReport
        builder.Entity<ExpertReport>(entity =>
        {
            entity.HasKey(er => er.Id);
            entity.Property(er => er.Title).HasMaxLength(300);

            entity.HasOne(er => er.Assignment)
                .WithOne(ea => ea.Report)
                .HasForeignKey<ExpertReport>(er => er.AssignmentId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Visit
        builder.Entity<Visit>(entity =>
        {
            entity.HasKey(v => v.Id);
            entity.Property(v => v.Address).HasMaxLength(500);

            entity.HasOne(v => v.Request)
                .WithMany(r => r.Visits)
                .HasForeignKey(v => v.RequestId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(v => v.Expert)
                .WithMany()
                .HasForeignKey(v => v.ExpertId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Conversation
        builder.Entity<Conversation>(entity =>
        {
            entity.HasKey(c => c.Id);

            entity.HasOne(c => c.Request)
                .WithOne(r => r.Conversation)
                .HasForeignKey<Conversation>(c => c.RequestId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Message
        builder.Entity<Message>(entity =>
        {
            entity.HasKey(m => m.Id);
            entity.Property(m => m.Text).IsRequired();

            entity.HasOne(m => m.Conversation)
                .WithMany(c => c.Messages)
                .HasForeignKey(m => m.ConversationId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(m => m.Sender)
                .WithMany()
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Notification
        builder.Entity<Notification>(entity =>
        {
            entity.HasKey(n => n.Id);
            entity.Property(n => n.Title).HasMaxLength(200).IsRequired();
            entity.Property(n => n.Body).HasMaxLength(500);

            entity.HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // SupportTicket
        builder.Entity<SupportTicket>(entity =>
        {
            entity.HasKey(st => st.Id);
            entity.Property(st => st.Subject).HasMaxLength(300).IsRequired();

            entity.HasOne(st => st.User)
                .WithMany(u => u.SupportTickets)
                .HasForeignKey(st => st.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Review
        builder.Entity<Review>(entity =>
        {
            entity.HasKey(r => r.Id);
            entity.Property(r => r.Rating).IsRequired();
            entity.Property(r => r.Comment).HasMaxLength(1000);

            entity.HasOne(r => r.Request)
                .WithOne(vr => vr.Review)
                .HasForeignKey<Review>(r => r.RequestId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(r => r.Customer)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
