import { Link } from "react-router";
import { FileCheck, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { StatsCard } from "../../components/StatsCard";
import { StatusBadge } from "../../components/StatusBadge";
import { useMyRequests } from "../../../hooks/useRequests";
import { useAuth } from "../../../contexts/AuthContext";
import { formatDate } from '../../../utils/date';

export function GovExpertDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: requests, isLoading, error } = useMyRequests();

  const stats = useMemo(() => {
    if (!requests) return { assigned: 0, inProgress: 0, completed: 0, urgent: 0 };
    return {
      assigned: requests.length,
      inProgress: requests.filter(r => r.status === 'in_progress').length,
      completed: requests.filter(r => r.status === 'completed').length,
      urgent: requests.filter(r => {
        if (!r.estimatedCompletion) return false;
        const deadline = new Date(r.estimatedCompletion);
        const now = new Date();
        const diffDays = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays <= 3 && r.status !== 'completed';
      }).length,
    };
  }, [requests]);

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const verifications = requests ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('expert.govDashboard')}</h1>
        <p className="text-muted-foreground">{t('expert.welcomeBackGov')}{user?.fullName ? `, ${user.fullName}` : ''}</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <StatsCard title={t('expert.assignedCases')} value={String(stats.assigned)} icon={FileCheck} iconColor="#1e3a8a" />
        <StatsCard title={t('common.inProgress')} value={String(stats.inProgress)} icon={Clock} iconColor="#d97706" />
        <StatsCard title={t('common.completed')} value={String(stats.completed)} icon={CheckCircle} iconColor="#059669" />
        <StatsCard title={t('expert.urgentCases')} value={String(stats.urgent)} icon={AlertCircle} iconColor="#dc2626" />
      </div>

      <div className="bg-white rounded-xl p-6 border border-border">
        <h2 className="text-xl font-semibold mb-6">{t('expert.verificationCases')}</h2>
        <div className="space-y-3">
          {verifications.map((case_) => (
            <Link
              key={case_.requestNumber}
              to={`/expert/government/case/${case_.requestNumber}`}
              className="block p-4 bg-background rounded-lg border border-border hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-medium mb-1">{case_.requestNumber} - {case_.propertyType} - {case_.location}</div>
                  <div className="text-sm text-muted-foreground">
                    {case_.packageName}
                  </div>
                </div>
                <StatusBadge status={case_.status} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('expert.deadline')} {formatDate(case_.estimatedCompletion)}</span>
                <span className="text-[#1e3a8a] hover:underline">{t('expert.reviewCaseArrow')}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
