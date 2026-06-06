import { FileText, Upload, Download } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useMyRequests } from '../../../hooks/useRequests';
import type { Document as DocType } from '../../../types';

export function Documents() {
  const { t } = useTranslation();
  const { data: requests, isLoading, error } = useMyRequests();

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  // Aggregate documents from all requests
  const documents: (DocType & { requestNumber?: string })[] = (requests || []).flatMap(
    (req) => (req.documents || []).map((doc) => ({ ...doc, requestNumber: req.requestNumber }))
  );

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('customer.myDocuments')}</h1>
          <p className="text-muted-foreground">{t('customer.myDocumentsDesc')}</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors">
          <Upload className="w-4 h-4" />
          {t('customer.uploadDocument')}
        </button>
      </div>

      {documents.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p className="text-sm">{t('customer.noDocuments', { defaultValue: 'No documents yet' })}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl p-5 border border-border hover:shadow-md transition-all group">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-[#059669]/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#059669]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{doc.fileName}</h3>
                <p className="text-xs text-muted-foreground">{doc.contentType}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span>{formatFileSize(doc.fileSize)}</span>
              <span>{doc.uploadedAt}</span>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-sm group-hover:bg-[#059669] group-hover:text-white group-hover:border-[#059669]">
              <Download className="w-4 h-4" />
              {t('common.download')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
