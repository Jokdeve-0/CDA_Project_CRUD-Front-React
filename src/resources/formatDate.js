import { DateTime } from 'luxon';

export function formatDate(stringDate) {
  return DateTime.fromISO(stringDate).toLocaleString(DateTime.DATETIME_SHORT);
}

export function formatDateMilliseconds(millisecondsDate) {
  return DateTime.fromMillis(millisecondsDate).toLocaleString(DateTime.DATETIME_SHORT);
}
