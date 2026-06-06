using PropertyGuard.Core.Enums;

namespace PropertyGuard.Core.DTOs.Payments;

public class CreatePaymentDto
{
    public int RequestId { get; set; }
    public decimal Amount { get; set; }
    public PaymentMethod Method { get; set; }
}

public class PaymentDto
{
    public int Id { get; set; }
    public string TransactionNumber { get; set; } = string.Empty;
    public string RequestNumber { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Method { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime? PaidAt { get; set; }
    public DateTime CreatedAt { get; set; }
}
