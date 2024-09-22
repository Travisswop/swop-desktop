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

const data = [
  { date: '', value: 31 },
  { date: '1H', value: 31 },
  { date: '1D', value: 40 },
  { date: '1W', value: 28 },
  { date: '1M', value: 51 },
  { date: '1Y', value: 42 },
];

const RechartAreaChart = ({ selectToken, flowData }: any) => {
  // const data = flowData?.result
  //   ?.filter((el: any, no: number) => no === selectToken)
  //   ?.map((item: any) =>
  //     item?.data?.map((el: any, no: number) => ({
  //       date: '1H',
  //       value: el?.sparkline,
  //     })),
  //   );

  return (
    <div className='bg-white p-3 rounded-lg mt-4'>
      <div className='mb-2 flex justify-between py-4'>
        <p className='text-lg font-semibold'>Solana</p>
        {/* <p className='font-bold text-green-400'>+20%</p> */}
      </div>
      <ResponsiveContainer width='100%' height={400}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#00E72533' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#00E72533' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='date' />
          {/* <YAxis /> */}
          {/* <CartesianGrid strokeDasharray='3 3' /> */}
          <Tooltip />
          <Area
            type='monotone'
            dataKey='value'
            stroke='#00e72758'
            strokeWidth={4}
            fillOpacity={1}
            fill='url(#colorValue)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartAreaChart;
