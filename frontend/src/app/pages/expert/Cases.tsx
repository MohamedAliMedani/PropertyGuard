import { Link, useLocation } from "react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { StatusBadge } from "../../components/StatusBadge";
import { useMyRequests } from "../../../hooks/useRequests";
import { formatDate } from "../../../utils/date";

export default function ExpertCases() {
  const { t } = useTranslation();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { data: requests, isLoading, error } = useMyRequests();

  // Determine expert role from URL path to build correct case link
  const expertRole = location.pathname.includes('/lawyer')
    ? 'lawyer'
    : location.pathname.includes('/engineer')
    ? 'engineer'
    : 'government';

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const allCases = requests ?? [];

  const filteredCases = allCases.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || c.requestNumber.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || c.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('expert.myCases')}</h1>
        <p className="text-muted-foreground">{t('expert.verificationCases')}</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('expert.requestId') + ' / ' + t('expert.location')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] md:w-[200px]"
          >
            <option value="all">{t('admin.allStatus')}</option>
            <option value="submitted">{t('status.submitted')}</option>
            <option value="underreview">{t('status.underReview')}</option>
            <option value="expertreview">{t('status.expertReview')}</option>
            <option value="completed">{t('status.completed')}</option>
            <option value="rejected">{t('status.rejected')}</option>
          </select>
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-white rounded-xl border border-border">
            {t('common.noData')}
          </div>
        )}
        {filteredCases.map((caseItem) => (
          <div key={caseItem.id} className="bg-white rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-semibold text-[#1e3a8a]">
                      {caseItem.requestNumber}
                    </h3>
                    <StatusBadge status={caseItem.status} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">{t('expert.propertyType')}: </span>
                      <span className="font-medium">{t(`request.${caseItem.propertyType.toLowerCase()}`, { defaultValue: caseItem.propertyType })}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('expert.location')}: </span>
                      <span className="font-medium">{t(`locations.${caseItem.location}`, { defaultValue: caseItem.location })}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('request.package')}: </span>
                      <span className="font-medium">{caseItem.packageName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('common.date')}: </span>
                      <span className="font-medium">{formatDate(caseItem.submittedDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-48">
                  <Link
                    to={`../case/${caseItem.id}`}
                    relative="path"
                    className="block w-full px-4 py-2.5 bg-[#1e3a8a] text-white text-center rounded-lg hover:bg-[#1e40af] transition-colors text-sm font-medium"
                  >
                    {t('expert.reviewCase')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
