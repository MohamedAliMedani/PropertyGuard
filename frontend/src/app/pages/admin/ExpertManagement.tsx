import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { useTranslation } from 'react-i18next';
import { useAdminExperts } from '../../../hooks/useAdmin';

export function ExpertManagement() {
  const { t } = useTranslation();
  const { data: experts, isLoading, error } = useAdminExperts();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const expertList = experts ?? [];

  const filteredExperts = expertList.filter((expert: any) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || expert.fullName?.toLowerCase().includes(query) || expert.email?.toLowerCase().includes(query);
    const matchesRole = roleFilter === 'all' || expert.role?.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const totalExperts = expertList.length;
  const activeCases = expertList.reduce((sum: number, e: any) => sum + (e.assignedCases ?? 0), 0);
  const pendingApproval = expertList.filter((e: any) => !e.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('admin.expertManagement')}</h1>
          <p className="text-muted-foreground">{t('admin.expertManagementDesc')}</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857]">
          <UserPlus className="w-4 h-4" />
          {t('admin.addExpert')}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('admin.totalExperts')}</div>
          <div className="text-3xl font-bold text-[#1e3a8a]">{totalExperts}</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('admin.activeCases')}</div>
          <div className="text-3xl font-bold text-[#059669]">{activeCases}</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-border">
          <div className="text-sm text-muted-foreground mb-1">{t('admin.pendingApprovalCount')}</div>
          <div className="text-3xl font-bold text-[#d97706]">{pendingApproval}</div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('admin.searchExperts')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg"
          />
        </div>
        <select
          className="px-4 py-2.5 bg-white border border-border rounded-lg"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">{t('admin.allRoles')}</option>
          <option value="lawyer">{t('admin.lawyers')}</option>
          <option value="engineer">{t('admin.engineers')}</option>
          <option value="govexpert">{t('admin.governmentExperts')}</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.name')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('admin.role')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.email')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('admin.cases')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.completed')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.status')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredExperts.map((expert: any) => (
              <tr key={expert.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 font-medium">{expert.fullName}</td>
                <td className="px-6 py-4 text-sm">{expert.role}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{expert.email}</td>
                <td className="px-6 py-4 text-sm">{expert.assignedCases}</td>
                <td className="px-6 py-4 text-sm">{expert.completedCases}</td>
                <td className="px-6 py-4"><StatusBadge status={expert.isActive ? 'approved' : 'pending'} /></td>
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
