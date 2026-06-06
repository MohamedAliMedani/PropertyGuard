import { Link } from "react-router";
import { Calendar, MapPin, Clock, CheckCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { StatsCard } from "../../components/StatsCard";
import { StatusBadge } from "../../components/StatusBadge";
import { useVisits } from "../../../hooks/useVisits";
import { useMyRequests } from "../../../hooks/useRequests";
import { useAuth } from "../../../contexts/AuthContext";

export function EngineerDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: visits, isLoading: visitsLoading, error: visitsError } = useVisits();
  const { data: requests, isLoading: requestsLoading, error: requestsError } = useMyRequests();

  const isLoading = visitsLoading || requestsLoading;
  const error = visitsError || requestsError;

  const stats = useMemo(() => {
    const allVisits = visits ?? [];
    const today = new Date().toDateString();
    return {
      totalInspections: allVisits.filter(v => v.status === 'completed').length,
      scheduledVisits: allVisits.filter(v => v.status === 'scheduled').length,
      completedThisMonth: allVisits.filter(v => {
        if (v.status !== 'completed' || !v.completedAt) return false;
        const completedDate = new Date(v.completedAt);
        const now = new Date();
        return completedDate.getMonth() === now.getMonth() && completedDate.getFullYear() === now.getFullYear();
      }).length,
      todayVisits: allVisits.filter(v => {
        const visitDate = new Date(v.scheduledDate);
        return visitDate.toDateString() === today && v.status === 'scheduled';
      }).length,
    };
  }, [visits]);

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const allVisits = visits ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('expert.engineerDashboard')}</h1>
        <p className="text-muted-foreground">{t('expert.welcomeBackEngineer')}{user?.fullName ? `, ${user.fullName}` : ''}</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <StatsCard title={t('expert.totalInspections')} value={String(stats.totalInspections)} icon={CheckCircle} iconColor="#059669" />
        <StatsCard title={t('expert.scheduledVisits')} value={String(stats.scheduledVisits)} icon={Calendar} iconColor="#1e3a8a" />
        <StatsCard title={t('expert.completedThisMonth')} value={String(stats.completedThisMonth)} icon={CheckCircle} iconColor="#d97706" />
        <StatsCard title={t('expert.todayVisits')} value={String(stats.todayVisits)} icon={Clock} iconColor="#8b5cf6" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-xl font-semibold mb-6">{t('expert.upcomingVisits')}</h2>
          <div className="space-y-4">
            {allVisits.filter(v => v.status === 'scheduled').map((visit) => (
              <div key={visit.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium mb-1">{visit.propertyInfo}</div>
                    <div className="text-sm text-muted-foreground">{visit.customerName}</div>
                  </div>
                  <StatusBadge status={visit.status} />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1e3a8a]" />
                    <span>{visit.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#059669]" />
                    <span>{visit.scheduledDate} at {visit.scheduledTime}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/expert/engineer/case/${visit.requestNumber}`}
                    className="flex-1 px-4 py-2 bg-[#059669] text-white text-center rounded-lg hover:bg-[#047857] transition-colors text-sm"
                  >
                    {t('expert.startVisit')}
                  </Link>
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                    {t('expert.reschedule')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-xl font-semibold mb-6">{t('expert.recentInspections')}</h2>
          <div className="space-y-3">
            {allVisits.filter(v => v.status === 'completed').map((visit) => (
              <div key={visit.id} className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-sm">{visit.propertyInfo}</div>
                    <div className="text-xs text-muted-foreground">{visit.customerName}</div>
                  </div>
                  <StatusBadge status={visit.status} />
                </div>
                <div className="text-xs text-muted-foreground">{t('expert.completedDate')} {visit.completedAt ?? visit.scheduledDate}</div>
                <Link
                  to={`/expert/engineer/case/${visit.requestNumber}`}
                  className="mt-3 block text-sm text-[#059669] hover:underline"
                >
                  {t('expert.viewReportArrow')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
