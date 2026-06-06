import { CreditCard, Download } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { useTranslation } from 'react-i18next';
import { useMyPayments } from '../../../hooks/usePayments';

export function Payments() {
  const { t } = useTranslation();
  const { data: payments, isLoading, error } = useMyPayments();

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const transactions = payments || [];
  const totalSpent = transactions
    .filter((txn) => txn.status === 'completed')
    .reduce((sum, txn) => sum + txn.amount, 0);
  const pendingCount = transactions.filter((txn) => txn.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('payment.title')}</h1>
        <p className="text-muted-foreground">{t('payment.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('payment.totalSpent')}</div>
          <div className="text-3xl font-bold text-[#1e3a8a]">{t('common.egp')} {totalSpent.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('payment.transactions')}</div>
          <div className="text-3xl font-bold text-[#059669]">{transactions.length}</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('payment.pendingPayments')}</div>
          <div className="text-3xl font-bold text-[#d97706]">{pendingCount}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('payment.transactionId')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('payment.request')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('payment.amount')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('payment.method')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('payment.status')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('payment.date')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('payment.invoice')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 font-medium">{txn.transactionNumber}</td>
                <td className="px-6 py-4 text-sm">{txn.requestNumber}</td>
                <td className="px-6 py-4 font-semibold">{t('common.egp')} {txn.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{txn.method}</td>
                <td className="px-6 py-4"><StatusBadge status={txn.status} /></td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{txn.paidAt || txn.createdAt}</td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-1 text-sm text-[#059669] hover:underline">
                    <Download className="w-4 h-4" />
                    {t('common.download')}
                  </button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                  {t('payment.noTransactions', { defaultValue: 'No transactions yet' })}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
