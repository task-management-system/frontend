import { parse, isDate } from 'date-fns';
import { DATE_FORMAT } from 'constants/fields';

export const currentDate = () => {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};

export const parseDateString = (value: any, originalValue: any): Date | null => {
  if (originalValue !== null) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, DATE_FORMAT, new Date());

    return parsedDate;
  } else {
    return null;
  }
};
