import { Users, FileText, DollarSign, UserCog, CheckCircle } from "lucide-react";
import { StatsCard } from "../../components/StatsCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useTranslation } from 'react-i18next';
import { useAdminDashboard } from '../../../hooks/useAdmin';

export function AdminDashboard() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useAdminDashboard();

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const monthlyData = data?.monthlyData ?? [];
  const packageData = data?.packageDistribution ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('admin.dashboard')}</h1>
        <p className="text-muted-foreground">{t('admin.platformOverview')}</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title={t('admin.totalUsers')} value={data?.totalUsers?.toLocaleString() ?? '0'} change={data?.usersChange ?? t('admin.thisMonth')} changeType="positive" icon={Users} iconColor="#1e3a8a" />
        <StatsCard title={t('admin.activeRequests')} value={data?.activeRequests?.toLocaleString() ?? '0'} change={data?.requestsChange ?? t('admin.thisWeek')} changeType="positive" icon={FileText} iconColor="#059669" />
        <StatsCard title={t('admin.monthlyRevenue')} value={`EGP ${((data?.monthlyRevenue ?? 0) / 1000).toFixed(0)}K`} change={data?.revenueChange ?? t('admin.vsLastMonth')} changeType="positive" icon={DollarSign} iconColor="#d97706" />
        <StatsCard title={t('admin.activeExperts')} value={data?.activeExperts?.toLocaleString() ?? '0'} change={`${data?.pendingApprovals ?? 0} ${t('admin.pendingApproval')}`} changeType="neutral" icon={UserCog} iconColor="#8b5cf6" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">{t('admin.monthlyChart')}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="requests" fill="#059669" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">{t('admin.packageDistribution')}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={packageData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {packageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">{t('admin.recentRequests')}</h2>
          <div className="space-y-3">
            {monthlyData.length > 0 ? monthlyData.slice(-3).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div>
                  <div className="font-medium text-sm">{item.month}</div>
                  <div className="text-xs text-muted-foreground">{item.requests} {t('admin.requests')}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">EGP {item.revenue.toLocaleString()}</div>
                </div>
              </div>
            )) : (
              <div className="text-sm text-muted-foreground">{t('common.loading')}</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">{t('admin.systemStatus')}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">{t('admin.allSystemsOperational')}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-background rounded-lg border border-border">
                <div className="text-xs text-muted-foreground">{t('admin.pendingReviews')}</div>
                <div className="text-2xl font-bold text-[#d97706]">{data?.pendingApprovals ?? 0}</div>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border">
                <div className="text-xs text-muted-foreground">{t('admin.supportTickets')}</div>
                <div className="text-2xl font-bold text-[#1e3a8a]">{data?.activeRequests ?? 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
