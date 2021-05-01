import React from 'react';
import DateTimeView from './DateTimeView';

interface TimeViewProps {
  format?: string;
  children?: number | string;
}

const TimeView: React.FC<TimeViewProps> = ({ format = 'HH:mm:ss', children = Date.now() }) => (
  <DateTimeView format={format}>{children}</DateTimeView>
);

export default TimeView;
