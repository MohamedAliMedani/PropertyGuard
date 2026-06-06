import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useVisits } from "../../../hooks/useVisits";

export function ExpertSchedule() {
  const { t } = useTranslation();
  const { data: visits, isLoading, error } = useVisits();

  if (isLoading) return <div className="flex items-center justify-center py-20"><div className="text-muted-foreground">{t('common.loading')}</div></div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load data</div>;

  const events = visits ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('expert.mySchedule')}</h1>
        <p className="text-muted-foreground">{t('expert.myScheduleDesc')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-border">
          <h2 className="text-xl font-semibold mb-6">{t('expert.upcomingVisits')}</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium">{event.propertyInfo}</div>
                    <div className="text-sm text-muted-foreground">{event.customerName}</div>
                  </div>
                  <button className="text-sm text-[#059669] hover:underline">{t('common.edit')}</button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{event.scheduledDate} at {event.scheduledTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-xl font-semibold mb-6">{t('expert.calendar')}</h2>
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <CalendarIcon className="w-12 h-12 mx-auto mb-2" />
              <p className="text-sm">{t('expert.calendarView')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
