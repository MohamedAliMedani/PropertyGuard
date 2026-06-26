import { useParams, useLocation } from "react-router";
import { Upload, Download, Save } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import { useRequest, useUpdateRequestStatus } from "../../../hooks/useRequests";
import { useUploadDocument } from "../../../hooks/useDocuments";
import { documentsApi } from "../../../api/documents";

export function ExpertCaseDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const [notes, setNotes] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("approved");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const numericId = id ? parseInt(id.replace(/\D/g, ''), 10) : 0;
  const { data: request, isLoading, error } = useRequest(numericId);
  const updateStatus = useUpdateRequestStatus();
  const uploadDocument = useUploadDocument();

  const isLawyer = location.pathname.includes("/lawyer");
  const isEngineer = location.pathname.includes("/engineer");

  const handleSubmitReport = async () => {
    if (!request) return;

    // RequestStatus enum: Submitted=0, UnderReview=1, ExpertReview=2, Completed=3, Rejected=4
    const statusMap: Record<string, { status: number; progress: number }> = {
      approved: { status: 3, progress: 100 },
      approved_with_conditions: { status: 3, progress: 100 },
      requires_attention: { status: 2, progress: 50 },
      rejected: { status: 4, progress: 100 },
    };

    const mapped = statusMap[selectedStatus] ?? { status: 2, progress: 50 };

    try {
      await updateStatus.mutateAsync({
        id: request.id,
        status: mapped.status,
        progress: mapped.progress,
        notes,
      });
      toast.success(t('expert.reportSubmitted'));
    } catch {
      toast.error('Failed to submit report');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !request) return;

    try {
      await uploadDocument.mutateAsync({ requestId: request.id, file });
      toast.success('Photo uploaded successfully');
    } catch {
      toast.error('Failed to upload photo');
    }
  };

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error || !request) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('expert.caseDetails')} {request.requestNumber}</h1>
        <p className="text-muted-foreground">{request.propertyType} - {request.location} • {t('expert.customer')} {request.packageName}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">{t('expert.propertyDocuments')}</h2>
            <div className="space-y-3">
              {(request.documents && request.documents.length > 0)
                ? request.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                      <span className="text-sm">{doc.fileName}</span>
                      <button onClick={() => documentsApi.download(doc.id)} className="text-sm text-[#059669] hover:underline flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {t('common.download')}
                      </button>
                    </div>
                  ))
                : (
                    <div className="text-sm text-muted-foreground py-2">No documents uploaded yet.</div>
                  )
              }
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">
              {isLawyer && t('expert.legalReviewNotes')}
              {isEngineer && t('expert.inspectionReport')}
              {!isLawyer && !isEngineer && t('expert.verificationNotes')}
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] resize-none"
              placeholder={t('expert.enterFindings')}
            />
            {isEngineer && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">{t('expert.uploadPhotos')}</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-[#059669] transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {uploadDocument.isPending ? t('common.loading') : t('expert.dropPhotos')}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">{t('expert.submitReport')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('expert.overallStatus')}</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                >
                  <option value="approved">{t('expert.approved')}</option>
                  <option value="approved_with_conditions">{t('expert.approvedWithConditions')}</option>
                  <option value="requires_attention">{t('expert.requiresAttention')}</option>
                  <option value="rejected">{t('expert.rejected')}</option>
                </select>
              </div>
              <button
                onClick={handleSubmitReport}
                disabled={updateStatus.isPending}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {updateStatus.isPending ? t('common.loading') : t('expert.submitReport')}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-border">
            <h3 className="font-semibold mb-4">{t('expert.caseInfo')}</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-muted-foreground">{t('expert.requestId')}</div>
                <div className="font-medium">{request.requestNumber}</div>
              </div>
              <div>
                <div className="text-muted-foreground">{t('expert.propertyType')}</div>
                <div className="font-medium">{request.propertyType}</div>
              </div>
              <div>
                <div className="text-muted-foreground">{t('expert.location')}</div>
                <div className="font-medium">{request.location}</div>
              </div>
              <div>
                <div className="text-muted-foreground">{t('expert.deadline')}</div>
                <div className="font-medium">{request.estimatedCompletion ?? '-'}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <h3 className="font-semibold mb-4">{t('expert.customerContact')}</h3>
            <div className="space-y-2 text-sm">
              <div>
                <div className="text-muted-foreground">{t('common.name')}</div>
                <div className="font-medium">{request.packageName}</div>
              </div>
              {request.notes && (
                <div>
                  <div className="text-muted-foreground">{t('expert.verificationNotes')}</div>
                  <div className="font-medium">{request.notes}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
