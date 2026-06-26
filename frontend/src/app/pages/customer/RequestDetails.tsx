import { useParams } from "react-router";
import { Download, MessageSquare, Calendar, MapPin, DollarSign, FileText } from "lucide-react";
import { TimelineStep } from "../../components/TimelineStep";
import { StatusBadge } from "../../components/StatusBadge";
import { useTranslation } from 'react-i18next';
import { useRequest } from '../../../hooks/useRequests';
import { documentsApi } from '../../../api/documents';
import { requestsApi } from '../../../api/requests';

export function RequestDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: request, isLoading, error } = useRequest(Number(id));

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error || !request) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const timeline = request.timeline || [];
  const experts = request.experts || [];
  const documents = request.documents || [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{request.requestNumber}</h1>
            <StatusBadge status={request.status} />
          </div>
          <p className="text-muted-foreground">{request.propertyType} - {request.location}</p>
        </div>
        <button onClick={() => requestsApi.downloadReport(Number(id))} className="flex items-center gap-2 px-4 py-2 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors">
          <Download className="w-4 h-4" />
          {t('request.downloadReport')}
        </button>
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
                  <div className="font-medium">{request.propertyPrice ? `EGP ${request.propertyPrice.toLocaleString()}` : '-'}</div>
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
              {timeline.map((step, index) => (
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
              {documents.map((doc) => (
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
          {/* Experts */}
          <div className="bg-white rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">{t('request.assignedExperts')}</h2>
            <div className="space-y-4">
              {experts.map((expert, index) => (
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
              {experts.length === 0 && (
                <p className="text-sm text-muted-foreground">{t('request.noExperts', { defaultValue: 'No experts assigned yet' })}</p>
              )}
            </div>
          </div>

          {/* Upcoming Visit */}
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-[#1e3a8a]" />
              <h3 className="font-semibold">{t('request.upcomingVisit')}</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{t('request.engineerInspection')}</p>
              <p className="text-muted-foreground">{request.estimatedCompletion || '-'}</p>
              <button className="mt-3 w-full px-4 py-2 bg-white border border-border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                {t('request.trackEngineer')}
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{t('nav.messages')}</h3>
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </div>
            <button className="w-full px-4 py-2 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors text-sm">
              {t('request.sendMessage')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
