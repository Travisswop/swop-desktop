'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import DashboardPieChart from '@/components/walletFeature/DashboardPieChart';
import PortfolioSlider from './PortfolioSlider';
import PortfolioTokenView from './PortfolioTokenView';
import TokenCashFlow from '../token/TokenCashFlow';

const PortfolioView = ({ flowData, walletList, totalBalance }: any) => {
  const [selectToken, setSelectToken] = useState(0);

  return (
    <div>
      <div className='flex items-stretch gap-x-6 '>
        <div className='flex-1 bg-white p-6'>
          <DashboardPieChart
            totalBalance={totalBalance}
            flowData={flowData?.result || []}
          />
          <div className='mt-4'>
            <PortfolioSlider
              walletList={flowData?.result || []}
              totalBalance={totalBalance}
            />
          </div>
        </div>
        <div className='flex-1 bg-white p-6'>
          <PortfolioTokenView flowData={flowData} totalBalance={totalBalance} />
        </div>
      </div>
      <div className='mt-6'>
        <TokenCashFlow
          flowData={flowData}
          selectToken={selectToken}
          setSelectToken={setSelectToken}
        />
      </div>
    </div>
  );
};

export default PortfolioView;
