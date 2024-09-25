'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const RechartAreaChart = ({ flowData }: any) => {
  const chartData = flowData?.sparkline?.map((el: any, index: number) => ({
    index,
    value: parseFloat(el),
  }));

  return (
    <div className='bg-white p-3 rounded-lg mt-6'>
      <div className='mt-2 mx-2 flex justify-between'>
        <p className='text-lg font-semibold'>{flowData?.name}</p>
        <p className='font-bold text-green-400'>
          {flowData?.change < 0 ? (
            <p className='text-red-500 text-sm font-medium'>
              {flowData?.change}%
            </p>
          ) : (
            <p className='text-green-500 text-sm font-medium'>
              +{flowData?.change}%
            </p>
          )}
        </p>
      </div>
      <ResponsiveContainer width='100%' height={380}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={flowData?.color} stopOpacity={0.8} />
              <stop offset='95%' stopColor={flowData?.color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey='time'
            tickFormatter={(value) => value} 
          />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='value'
            stroke={flowData?.color}
            strokeWidth={2}
            fillOpacity={1}
            fill='url(#colorValue)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartAreaChart;
