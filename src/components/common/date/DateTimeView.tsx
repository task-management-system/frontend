import React, { useMemo } from 'react';
import { format as formatDate } from 'date-fns';

interface DateTimeViewProps {
  format?: string;
  children?: number | string;
}

const DateTimeView: React.FC<DateTimeViewProps> = ({
  format = 'dd.MM.yyyy HH:mm:ss',
  children = Date.now(),
}) => {
  const formatted = useMemo(() => {
    const date = new Date(children);

    return formatDate(date, format);
  }, [children, format]);

  return <>{formatted}</>;
};

export default DateTimeView;
