import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(localizedFormat);

export const getLocalDate = (date?: string, format: string = 'MMM D, YYYY') => {
  if (!date) return date;
  const utcDate = dayjs.utc(date).local();
  return utcDate.format(format);
};

export const formatTimestamp = (date?: string) => {
  if (!date) return date;

  const utcDate = dayjs.utc(date).local();
  const now = dayjs();
  const yesterday = now.subtract(1, 'day');

  if (utcDate.isSame(now, 'day')) {
    return `Today at ${utcDate.format('hh:mm A')}`;
  } else if (utcDate.isSame(yesterday, 'day')) {
    return `Yesterday at ${utcDate.format('hh:mm A')}`;
  }

  return `${utcDate.format('MMM D, YYYY')} at ${utcDate.format('hh:mm A')}`;
};
