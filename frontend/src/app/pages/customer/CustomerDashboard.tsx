import { Link } from "react-router";
import { FileText, Clock, CheckCircle, AlertCircle, Plus, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { StatsCard } from "../../components/StatsCard";
import { StatusBadge } from "../../components/StatusBadge";
import { useTranslation } from 'react-i18next';
import { useMyRequests } from '../../../hooks/useRequests';
import { useVisits } from '../../../hooks/useVisits';
import { useNotifications } from '../../../hooks/useNotifications';
import { useAuth } from '../../../contexts/AuthContext';

export function CustomerDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: requests, isLoading: requestsLoading, error: requestsError } = useMyRequests();
  const { data: visits, isLoading: visitsLoading } = useVisits();
  const { data: notifications, isLoading: notificationsLoading } = useNotifications();

  const isLoading = requestsLoading || visitsLoading || notificationsLoading;

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (requestsError) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const recentRequests = (requests || []).slice(0, 3);
  const upcomingVisits = (visits || []).filter(v => v.status !== 'completed');

  const activeCount = (requests || []).filter(r => r.status !== 'completed' && r.status !== 'cancelled').length;
  const inProgressCount = (requests || []).filter(r => r.progress > 0 && r.progress < 100).length;
  const completedCount = (requests || []).filter(r => r.status === 'completed').length;
  const totalSpent = (requests || []).reduce((sum, r) => sum + (r.packagePrice || 0), 0);

  const formatSpent = (amount: number) => {
    if (amount >= 1000) return `EGP ${Math.round(amount / 1000)}K`;
    return `EGP ${amount}`;
  };

  const recentNotifications = (notifications || []).slice(0, 3);

  const userName = user?.fullName || 'User';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('customer.welcomeBackName', { name: userName })}</h1>
        <p className="text-muted-foreground">{t('customer.trackRequests')}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t('customer.activeRequests')}
          value={String(activeCount)}
          icon={FileText}
          iconColor="#1e3a8a"
        />
        <StatsCard
          title={t('customer.inProgress')}
          value={String(inProgressCount)}
          icon={Clock}
          iconColor="#d97706"
        />
        <StatsCard
          title={t('customer.completedRequests')}
          value={String(completedCount)}
          icon={CheckCircle}
          iconColor="#059669"
        />
        <StatsCard
          title={t('customer.totalSpent')}
          value={formatSpent(totalSpent)}
          icon={DollarSign}
          iconColor="#8b5cf6"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          to="/customer/create-request"
          className="flex items-center gap-4 p-6 bg-gradient-to-br from-[#059669] to-[#047857] text-white rounded-xl hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <div className="font-semibold">{t('customer.createNewRequest')}</div>
            <div className="text-sm text-white/80">{t('customer.startVerification')}</div>
          </div>
        </Link>

        <Link
          to="/customer/requests"
          className="flex items-center gap-4 p-6 bg-white border border-border rounded-xl hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-[#1e3a8a]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6 text-[#1e3a8a]" />
          </div>
          <div>
            <div className="font-semibold">{t('customer.viewAllRequests')}</div>
            <div className="text-sm text-muted-foreground">{t('customer.trackProperties')}</div>
          </div>
        </Link>

        <Link
          to="/customer/documents"
          className="flex items-center gap-4 p-6 bg-white border border-border rounded-xl hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-[#d97706]/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6 text-[#d97706]" />
          </div>
          <div>
            <div className="font-semibold">{t('customer.myDocuments')}</div>
            <div className="text-sm text-muted-foreground">{t('customer.accessFiles')}</div>
          </div>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Requests */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">{t('customer.recentRequests')}</h2>
            <Link to="/customer/requests" className="text-sm text-[#059669] hover:underline">
              {t('customer.viewAll')}
            </Link>
          </div>

          <div className="space-y-4">
            {recentRequests.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">{t('customer.noRequests', { defaultValue: 'No requests yet' })}</p>
              </div>
            )}
            {recentRequests.map((request) => (
              <Link
                key={request.id}
                to={`/customer/requests/${request.id}`}
                className="block p-4 bg-background rounded-lg border border-border hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium mb-1">{request.requestNumber}</div>
                    <div className="text-sm text-muted-foreground">
                      {request.propertyType} - {request.location}
                    </div>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>{t('request.progress')}</span>
                    <span>{request.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#059669] h-2 rounded-full transition-all"
                      style={{ width: `${request.progress}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{t('request.submitted')}: {request.submittedDate}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Visits */}
        <div className="bg-white rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-[#1e3a8a]" />
            <h2 className="text-xl font-semibold">{t('customer.upcomingVisits')}</h2>
          </div>

          <div className="space-y-4">
            {upcomingVisits.map((visit) => (
              <div key={visit.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-medium mb-2">{visit.expertName}</div>
                <div className="text-sm text-muted-foreground mb-3">{visit.propertyInfo}</div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-[#1e3a8a]" />
                  <span>{visit.scheduledDate} at {visit.scheduledTime}</span>
                </div>
              </div>
            ))}

            {upcomingVisits.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">{t('customer.noUpcomingVisits')}</p>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-medium mb-4">{t('customer.recentNotifications')}</h3>
            <div className="space-y-3">
              {recentNotifications.length === 0 && (
                <p className="text-sm text-muted-foreground">{t('customer.noNotifications', { defaultValue: 'No notifications' })}</p>
              )}
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex gap-3">
                  <div className={`w-2 h-2 ${notification.isRead ? 'bg-gray-400' : 'bg-[#059669]'} rounded-full mt-2 flex-shrink-0`} />
                  <div className="text-sm">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
