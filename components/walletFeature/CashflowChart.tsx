'use client';
import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const SparklineChart = ({ data, color = '#8884d8' }: any) => {
  const formattedData = data.map((value: any, index: number) => ({
    index,
    value: parseFloat(value), // Convert string to number
  }));

  return (
    <div style={{ width: '100%', height: '50px' }}>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={formattedData}>
          {/* Set the domain based on your data range */}
          <YAxis domain={['dataMin', 'dataMax']} hide={true} />
          <Line
            type='monotone'
            dataKey='value'
            stroke={color}
            dot={false} // Remove dots for a sparkline look
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SparklineChart;
