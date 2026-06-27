import { format, parseISO, isValid } from 'date-fns';

export function formatDate(dateVal: any): string {
  if (!dateVal) return '-';
  try {
    const d = typeof dateVal === 'string' ? parseISO(dateVal) : new Date(dateVal);
    if (!isValid(d)) {
      // Try fallback parsing for non-ISO string formats
      const fallbackDate = new Date(dateVal);
      if (isValid(fallbackDate)) {
        return format(fallbackDate, 'dd/MM/yyyy');
      }
      return String(dateVal);
    }
    return format(d, 'dd/MM/yyyy');
  } catch (error) {
    return String(dateVal);
  }
}
