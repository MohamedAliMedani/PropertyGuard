import { Link } from "react-router";
import { Search, Filter } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { useTranslation } from 'react-i18next';
import { useMyRequests } from '../../../hooks/useRequests';
import { formatDate } from '../../../utils/date';

export function MyRequests() {
  const { t } = useTranslation();
  const { data: requests, isLoading, error } = useMyRequests();

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const requestsList = requests || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('nav.myRequests')}</h1>
          <p className="text-muted-foreground">{t('request.trackRequests')}</p>
        </div>
        <Link
          to="/customer/create-request"
          className="px-5 py-2.5 bg-[#059669] text-white rounded-lg hover:bg-[#047857] transition-colors"
        >
          {t('common.newRequest')}
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('request.searchRequests')}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-lg hover:bg-muted transition-colors">
          <Filter className="w-5 h-5" />
          {t('common.filter')}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('request.requestId')}</th>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('request.propertyType')}</th>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('request.location')}</th>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('common.status')}</th>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('request.progress')}</th>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('common.date')}</th>
                <th className="px-6 py-3 text-left text-sm font-medium">{t('common.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requestsList.map((request) => (
                <tr key={request.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium">{request.requestNumber}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">{request.propertyType}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{request.location}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-[#059669] h-2 rounded-full"
                          style={{ width: `${request.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{request.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(request.submittedDate)}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/customer/requests/${request.id}`}
                      className="text-sm text-[#059669] hover:underline"
                    >
                      {t('common.viewDetails')}
                    </Link>
                  </td>
                </tr>
              ))}
              {requestsList.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    {t('customer.noRequests', { defaultValue: 'No requests yet' })}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
