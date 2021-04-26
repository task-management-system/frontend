import React from 'react';
import DateTimeView from './DateTimeView';

interface DateViewProps {
  format?: string;
  children?: number | string;
}

const DateView: React.FC<DateViewProps> = ({ format = 'dd.MM.yyyy', children = Date.now() }) => (
  <DateTimeView format={format}>{children}</DateTimeView>
);

export default DateView;
