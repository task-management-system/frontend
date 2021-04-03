import React, { useMemo } from 'react';
import { format } from 'date-fns';

interface DateViewProps {
  dateFormat?: string;
  children?: number | string;
}

const DateView: React.FC<DateViewProps> = ({
  dateFormat = 'dd.MM.yyyy',
  children = Date.now(),
}) => {
  const formattedDate = useMemo(() => {
    const date = new Date(children);

    return format(date, dateFormat);
  }, [children, dateFormat]);

  return <>{formattedDate}</>;
};

export default DateView;
