using PropertyGuard.Core.Enums;

namespace PropertyGuard.Core.Entities;

public class Payment
{
    public int Id { get; set; }
    public string TransactionNumber { get; set; } = string.Empty; // TRX-001
    public int RequestId { get; set; }
    public decimal Amount { get; set; }
    public PaymentMethod Method { get; set; }
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    public string? PaymentReference { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? PaidAt { get; set; }

    // Navigation
    public VerificationRequest Request { get; set; } = null!;
}
