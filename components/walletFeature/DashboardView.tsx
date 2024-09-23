'use client';
import React from 'react';
import Image from 'next/image';
import DashboardPieChart from './DashboardPieChart';
import DashboardSlider from './DashboardSlider';

// Define interfaces for type safety
interface FlowItem {
  balance: string;
  data: {
    color: string;
    symbol: string;
    price: string;
  };
  metadata: {
    logo: string;
  };
}

interface FlowData {
  result?: FlowItem[];
}

interface DashboardViewProps {
  flowData: FlowData;
  totalBalance?: number;
}

const DashboardView = ({ flowData }: DashboardViewProps) => {
  const totalBalance =
    flowData?.result?.reduce((acc, item) => {
      const balance = parseFloat(item?.balance) || 0;
      const dataBalance = parseFloat(item?.data?.price) || 0;
      return acc + balance * dataBalance;
    }, 0) || 0;

  return (
    <div>
      <div>
        <DashboardPieChart
          totalBalance={totalBalance}
          flowData={flowData?.result || []}
        />
      </div>
      <div className='mt-4'>
        <DashboardSlider
          walletList={flowData?.result || []}
          totalBalance={totalBalance}
        />
      </div>
      <div className='border rounded-2xl mt-8'>
        {flowData?.result?.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-between p-4 font-medium border-b'
          >
            <div className='flex items-center gap-x-2'>
              <div
                className='size-3'
                style={{ backgroundColor: item?.data?.color || 'transparent' }}
              />

              {item?.metadata?.logo && (
                <Image
                  src={item?.metadata?.logo}
                  alt={'Icon'}
                  width={500}
                  height={500}
                  className='mx-auto size-10 rounded-full'
                />
              )}
              <p className='text-lg'>{item?.data?.symbol || 'N/A'}</p>
            </div>

            <p className='text-base'>
              {parseFloat(item.balance) !== 0
                ? `${((parseFloat(item.balance) / totalBalance) * 100).toFixed(
                    2,
                  )}%`
                : '0.00%'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
