import { useTranslation } from 'react-i18next';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation();

  const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    submitted: { bg: "bg-blue-100", text: "text-blue-700", label: t('status.submitted') },
    under_review: { bg: "bg-yellow-100", text: "text-yellow-700", label: t('status.underReview') },
    underreview: { bg: "bg-yellow-100", text: "text-yellow-700", label: t('status.underReview') },
    expert_review: { bg: "bg-purple-100", text: "text-purple-700", label: t('status.expertReview') },
    expertreview: { bg: "bg-purple-100", text: "text-purple-700", label: t('status.expertReview') },
    completed: { bg: "bg-green-100", text: "text-green-700", label: t('status.completed') },
    rejected: { bg: "bg-red-100", text: "text-red-700", label: t('status.rejected') },
    pending: { bg: "bg-gray-100", text: "text-gray-700", label: t('status.pending') },
    approved: { bg: "bg-emerald-100", text: "text-emerald-700", label: t('status.approved') },
    in_progress: { bg: "bg-blue-100", text: "text-blue-700", label: t('status.inProgress') },
  };

  const config = statusConfig[status.toLowerCase().replace(" ", "_")] || statusConfig.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
