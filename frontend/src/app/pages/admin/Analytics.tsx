import { TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from 'react-i18next';
import { useAdminDashboard } from '../../../hooks/useAdmin';

export function Analytics() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useAdminDashboard();

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const monthlyData = data?.monthlyData ?? [];

  const revenueData = monthlyData.map((item) => ({ month: item.month, revenue: item.revenue }));
  const requestsData = monthlyData.map((item) => ({ month: item.month, requests: item.requests }));

  const totalRevenue = monthlyData.reduce((sum, item) => sum + item.revenue, 0);
  const totalRequests = monthlyData.reduce((sum, item) => sum + item.requests, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('admin.analytics')}</h1>
        <p className="text-muted-foreground">{t('admin.analyticsDesc')}</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-1">{t('admin.totalRevenue')}</div>
          <div className="text-3xl font-bold">{t('common.egp')} {(totalRevenue / 1000000).toFixed(1)}M</div>
          <div className="text-sm mt-2 opacity-90">{data?.revenueChange ?? t('admin.totalRevenueChange')}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-1">{t('admin.totalRequests')}</div>
          <div className="text-3xl font-bold">{totalRequests.toLocaleString()}</div>
          <div className="text-sm mt-2 opacity-90">{data?.requestsChange ?? t('admin.totalRequestsChange')}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-1">{t('admin.activeUsers')}</div>
          <div className="text-3xl font-bold">{data?.totalUsers?.toLocaleString() ?? '0'}</div>
          <div className="text-sm mt-2 opacity-90">{data?.usersChange ?? t('admin.activeUsersChange')}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6">
          <div className="text-sm opacity-90 mb-1">{t('admin.avgResponseTime')}</div>
          <div className="text-3xl font-bold">2.4 hrs</div>
          <div className="text-sm mt-2 opacity-90">{t('admin.avgResponseTimeChange')}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#059669]" />
            {t('admin.revenueTrend')}
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">{t('admin.requestsTrend')}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={requestsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="requests" fill="#1e3a8a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
