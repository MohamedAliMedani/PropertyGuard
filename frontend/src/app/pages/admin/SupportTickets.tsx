import { StatusBadge } from "../../components/StatusBadge";
import { useTranslation } from 'react-i18next';
import { useSupportTickets } from '../../../hooks/useSupportTickets';

export function SupportTickets() {
  const { t } = useTranslation();
  const { data: tickets, isLoading, error } = useSupportTickets();

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const ticketList = tickets ?? [];

  const today = new Date().toISOString().split('T')[0];
  const openTickets = ticketList.filter((t: any) => t.status === 'pending' || t.status === 'open').length;
  const inProgressTickets = ticketList.filter((t: any) => t.status === 'in_progress').length;
  const resolvedToday = ticketList.filter((t: any) => t.resolvedAt && t.resolvedAt.startsWith(today)).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('admin.supportTickets')}</h1>
        <p className="text-muted-foreground">{t('admin.supportTicketsDesc')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('admin.openTickets')}</div>
          <div className="text-3xl font-bold text-[#d97706]">{openTickets}</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('common.inProgress')}</div>
          <div className="text-3xl font-bold text-[#1e3a8a]">{inProgressTickets}</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('admin.resolvedToday')}</div>
          <div className="text-3xl font-bold text-[#059669]">{resolvedToday}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('admin.ticketId')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('admin.customer')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('admin.subject')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('admin.priority')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.status')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.date')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ticketList.map((ticket: any) => (
              <tr key={ticket.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 font-medium">TKT-{String(ticket.id).padStart(3, '0')}</td>
                <td className="px-6 py-4 text-sm">{ticket.userName}</td>
                <td className="px-6 py-4 text-sm">{ticket.subject}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
                    ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4"><StatusBadge status={ticket.status} /></td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{ticket.createdAt}</td>
                <td className="px-6 py-4">
                  <button className="text-sm text-[#059669] hover:underline">{t('common.view')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
