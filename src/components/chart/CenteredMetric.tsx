import React from 'react';
import { ComputedDatum, PieCustomLayerProps } from '@nivo/pie';
import filesize from 'filesize';

interface CenteredMetricProps {
  format?: (entry: number) => string;
}

const CenteredMetric = <T,>({
  format = entry => entry.toString(),
  dataWithArc,
  centerX,
  centerY,
}: React.PropsWithChildren<CenteredMetricProps & PieCustomLayerProps<T>>) => {
  const total = dataWithArc.reduce((total, datum: ComputedDatum<T>) => total + datum.value, 0);

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: '2.25vmin',
        fontWeight: 600,
      }}
    >
      {format(total)}
    </text>
  );
};

export const CountMetric = <T,>(props: React.PropsWithChildren<PieCustomLayerProps<T>>) => (
  <CenteredMetric {...props} />
);

export const FilesizeMetric = <T,>(props: React.PropsWithChildren<PieCustomLayerProps<T>>) => (
  <CenteredMetric format={filesize} {...props} />
);
