import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowRight, MapPin, DollarSign, FileText, Calendar, UserPlus, RefreshCw, Download } from "lucide-react";
import { TimelineStep } from "../../components/TimelineStep";
import { StatusBadge } from "../../components/StatusBadge";
import { useTranslation } from 'react-i18next';
import { toast } from "sonner";
import { useRequest } from '../../../hooks/useRequests';
import { useAdminExperts, useAssignExpert } from '../../../hooks/useAdmin';
import { requestsApi } from '../../../api/requests';
import { documentsApi } from '../../../api/documents';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function AdminRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: request, isLoading, error } = useRequest(Number(id));
  const { data: experts } = useAdminExperts();
  const assignExpert = useAssignExpert();

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedExpertId, setSelectedExpertId] = useState('');
  const [selectedRole, setSelectedRole] = useState('Lawyer');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState(0);
  const [statusNotes, setStatusNotes] = useState('');

  const updateStatusMutation = useMutation({
    mutationFn: (data: { status: number; notes?: string }) =>
      requestsApi.updateStatus(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests', Number(id)] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      setShowStatusModal(false);
      setStatusNotes('');
    },
  });

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error || !request) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const timeline = request.timeline || [];
  const assignedExperts = request.experts || [];
  const documents = request.documents || [];

  const statusOptions = [
    { value: 0, label: t('status.submitted', { defaultValue: 'Submitted' }) },
    { value: 1, label: t('status.underReview', { defaultValue: 'Under Review' }) },
    { value: 2, label: t('status.expertReview', { defaultValue: 'Expert Review' }) },
    { value: 3, label: t('status.completed', { defaultValue: 'Completed' }) },
    { value: 4, label: t('status.rejected', { defaultValue: 'Rejected' }) },
  ];

  const handleAssignExpert = () => {
    if (!selectedExpertId) return;
    assignExpert.mutate(
      { requestId: Number(id), expertId: selectedExpertId, role: selectedRole },
      {
        onSuccess: () => { setShowAssignModal(false); setSelectedExpertId(''); },
        onError: (err: any) => {
          const msg = err?.response?.data?.message || 'Failed to assign expert';
          toast.error(msg);
        },
      }
    );
  };

  const handleUpdateStatus = () => {
    updateStatusMutation.mutate({ status: newStatus, notes: statusNotes || undefined });
  };

  const availableExperts = experts?.filter((e: any) =>
    e.role.toLowerCase() === selectedRole.toLowerCase() && e.isActive
  ) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <button onClick={() => navigate('/admin/requests')} className="hover:text-foreground">
          {t('admin.requestManagement')}
        </button>
        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        <span className="text-foreground">{request.requestNumber}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{request.requestNumber}</h1>
            <StatusBadge status={request.status} />
          </div>
          <p className="text-muted-foreground">{request.propertyType} - {request.location}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => requestsApi.downloadReport(Number(id))}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Download className="w-4 h-4" />
            {t('request.downloadReport', { defaultValue: 'Download Report' })}
          </button>
          <button
            onClick={() => { setNewStatus(0); setShowStatusModal(true); }}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {t('admin.updateStatus', { defaultValue: 'Update Status' })}
          </button>
          <button
            onClick={() => setShowAssignModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            {t('admin.assignExpert', { defaultValue: 'Assign Expert' })}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Info */}
          <div className="bg-white rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">{t('request.propertyInfo')}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1e3a8a] mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">{t('request.location')}</div>
                  <div className="font-medium">{request.address || request.location}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-[#059669] mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">{t('request.propertyValue')}</div>
                  <div className="font-medium">{request.propertyPrice ? `${t('common.egp')} ${request.propertyPrice.toLocaleString()}` : '-'}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#d97706] mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">{t('request.package')}</div>
                  <div className="font-medium">{request.packageName}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#8b5cf6] mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">{t('request.estCompletion')}</div>
                  <div className="font-medium">{request.estimatedCompletion || '-'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-6">{t('request.trackingTimeline')}</h2>
            <div>
              {timeline.map((step: any, index: number) => (
                <TimelineStep
                  key={index}
                  title={step.title}
                  description={step.description}
                  status={step.status}
                  date={step.date}
                  isLast={index === timeline.length - 1}
                />
              ))}
              {timeline.length === 0 && (
                <p className="text-sm text-muted-foreground">{t('request.noTimeline', { defaultValue: 'No timeline data available' })}</p>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">{t('request.documents')}</h2>
            <div className="space-y-3">
              {documents.map((doc: any) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#059669]" />
                    <div>
                      <div className="font-medium text-sm">{doc.fileName}</div>
                      <div className="text-xs text-muted-foreground">{t('request.uploadedBy')} {doc.uploadedBy}</div>
                    </div>
                  </div>
                  <button onClick={() => documentsApi.download(doc.id)} className="text-sm text-[#059669] hover:underline">{t('common.download')}</button>
                </div>
              ))}
              {documents.length === 0 && (
                <p className="text-sm text-muted-foreground">{t('request.noDocuments', { defaultValue: 'No documents uploaded yet' })}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assigned Experts */}
          <div className="bg-white rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">{t('request.assignedExperts')}</h2>
            <div className="space-y-4">
              {assignedExperts.map((expert: any, index: number) => (
                <div key={index} className="p-3 bg-background rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground mb-1">{expert.role}</div>
                  <div className="font-medium mb-2">{expert.name}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Status: {expert.status}</span>
                    {expert.hasReport && (
                      <button onClick={() => requestsApi.downloadReport(Number(id))} className="text-[#059669] hover:underline">{t('request.viewReport')}</button>
                    )}
                  </div>
                </div>
              ))}
              {assignedExperts.length === 0 && (
                <p className="text-sm text-muted-foreground">{t('request.noExperts', { defaultValue: 'No experts assigned yet' })}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          {request.notes && (
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-semibold mb-2">{t('admin.notes', { defaultValue: 'Notes' })}</h3>
              <p className="text-sm text-muted-foreground">{request.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Assign Expert Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAssignModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4">{t('admin.assignExpert', { defaultValue: 'Assign Expert' })}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('admin.role')}</label>
                <select
                  value={selectedRole}
                  onChange={(e) => { setSelectedRole(e.target.value); setSelectedExpertId(''); }}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                >
                  <option value="Lawyer">{t('admin.lawyers', { defaultValue: 'Lawyer' })}</option>
                  <option value="Engineer">{t('admin.engineers', { defaultValue: 'Engineer' })}</option>
                  <option value="GovExpert">{t('admin.governmentExperts', { defaultValue: 'Government Expert' })}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t('admin.selectExpert', { defaultValue: 'Select Expert' })}</label>
                <select
                  value={selectedExpertId}
                  onChange={(e) => setSelectedExpertId(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                >
                  <option value="">{t('admin.selectExpertPlaceholder', { defaultValue: '-- Select an expert --' })}</option>
                  {availableExperts.map((expert: any) => (
                    <option key={expert.id} value={expert.id}>
                      {expert.fullName} ({expert.assignedCases} {t('admin.activeCases')})
                    </option>
                  ))}
                </select>
                {availableExperts.length === 0 && (
                  <p className="text-xs text-muted-foreground mt-1">{t('admin.noExpertsAvailable', { defaultValue: 'No experts available for this role' })}</p>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                {t('common.cancel', { defaultValue: 'Cancel' })}
              </button>
              <button
                onClick={handleAssignExpert}
                disabled={!selectedExpertId || assignExpert.isPending}
                className="flex-1 px-4 py-2 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors disabled:opacity-50"
              >
                {assignExpert.isPending ? t('common.loading') : t('admin.assign', { defaultValue: 'Assign' })}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowStatusModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4">{t('admin.updateStatus', { defaultValue: 'Update Status' })}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('common.status')}</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t('admin.notes', { defaultValue: 'Notes' })}</label>
                <textarea
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg resize-none"
                  placeholder={t('admin.notesPlaceholder', { defaultValue: 'Add notes (optional)...' })}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                {t('common.cancel', { defaultValue: 'Cancel' })}
              </button>
              <button
                onClick={handleUpdateStatus}
                disabled={updateStatusMutation.isPending}
                className="flex-1 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#152e6e] transition-colors disabled:opacity-50"
              >
                {updateStatusMutation.isPending ? t('common.loading') : t('common.update', { defaultValue: 'Update' })}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
