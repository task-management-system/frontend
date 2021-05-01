import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const PieChart: React.FC<React.ComponentProps<typeof ResponsivePie>> = ({ data, ...props }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 20, right: 0, bottom: 40, left: 0 }}
    innerRadius={0.5}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    enableArcLinkLabels={false}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
    colors={{ datum: 'data.color' }}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: 40,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 20,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 20,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ]}
    {...props}
  />
);

export default PieChart;
