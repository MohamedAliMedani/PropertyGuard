import { useState } from "react";
import { Search, Filter, UserPlus } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { useTranslation } from 'react-i18next';
import { useAdminUsers } from '../../../hooks/useAdmin';

export function UserManagement() {
  const { t } = useTranslation();
  const { data: users, isLoading, error } = useAdminUsers();
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const filteredUsers = (users ?? []).filter((user: any) => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;
    return (
      user.fullName?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phone?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('admin.userManagement')}</h1>
          <p className="text-muted-foreground">{t('admin.userManagementDesc')}</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857]">
          <UserPlus className="w-4 h-4" />
          {t('admin.addUser')}
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('admin.searchUsers')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-lg">
          <Filter className="w-5 h-5" />
          {t('common.filter')}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.name')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.email')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.phone')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('admin.requests')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('payment.totalSpent')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.status')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('admin.joined')}</th>
              <th className="px-6 py-3 text-left text-sm font-medium">{t('common.action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredUsers.map((user: any) => (
              <tr key={user.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 font-medium">{user.fullName}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                <td className="px-6 py-4 text-sm">{user.phone}</td>
                <td className="px-6 py-4 text-sm">{user.requestCount}</td>
                <td className="px-6 py-4 font-semibold">{t('common.egp')} {user.totalSpent?.toLocaleString()}</td>
                <td className="px-6 py-4"><StatusBadge status={user.isActive ? 'active' : 'inactive'} /></td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{user.createdAt}</td>
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
