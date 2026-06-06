import { useState } from "react";
import { Search } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { useTranslation } from 'react-i18next';
import { useAdminRequests } from '../../../hooks/useAdmin';

export function RequestManagement() {
  const { t } = useTranslation();
  const { data: requests, isLoading, error } = useAdminRequests();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const requestList = requests ?? [];

  const filteredRequests = requestList.filter((req: any) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query ||
      req.requestNumber?.toLowerCase().includes(query) ||
      req.customerName?.toLowerCase().includes(query) ||
      req.property?.toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'all' || req.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalRequests = requestList.length;
  const activeRequests = requestList.filter((r: any) => r.status === 'engineer_visit' || r.status === 'in_progress' || r.status === 'legal_review').length;
  const pendingRequests = requestList.filter((r: any) => r.status === 'pending').length;
  const completedRequests = requestList.filter((r: any) => r.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('admin.requestManagement')}</h1>
        <p className="text-muted-foreground">{t('admin.requestManagementDesc')}</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('admin.totalRequests')}</div>
          <div className="text-3xl font-bold">{totalRequests.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('common.active')}</div>
          <div className="text-3xl font-bold text-[#059669]">{activeRequests}</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('common.pending')}</div>
          <div className="text-3xl font-bold text-[#d97706]">{pendingRequests}</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('common.completed')}</div>
          <div className="text-3xl font-bold text-[#1e3a8a]">{completedRequests}</div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('admin.searchRequestsPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg"
          />
        </div>
        <select
          className="px-4 py-2.5 bg-white border border-border rounded-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">{t('admin.allStatus')}</option>
          <option value="pending">{t('common.pending')}</option>
          <option value="in_progress">{t('common.inProgress')}</option>
          <option value="completed">{t('common.completed')}</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('request.requestId')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('admin.customer')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('admin.property')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('request.package')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('admin.amount')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.status')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('admin.assignedTo')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredRequests.map((req: any) => (
              <tr key={req.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 font-medium">{req.requestNumber}</td>
                <td className="px-6 py-4 text-sm">{req.customerName}</td>
                <td className="px-6 py-4 text-sm">{req.property}</td>
                <td className="px-6 py-4 text-sm">{req.package}</td>
                <td className="px-6 py-4 font-semibold">{t('common.egp')} {req.amount?.toLocaleString()}</td>
                <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{req.assignedTo || t('admin.notAssignedYet')}</td>
                <td className="px-6 py-4">
                  <button className="text-sm text-[#059669] hover:underline">{t('common.manage')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
