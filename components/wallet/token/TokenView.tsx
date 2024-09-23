'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import RechartAreaChart from '../../chart/HomepageCashFlow';
import TokenCashFlow from './TokenCashFlow';

const TokenView = ({ totalBalance, flowData }: any) => {
  const [selectToken, setSelectToken] = useState(0);

  const cashFlowChartData = flowData?.result
    ?.filter((el: any, no: number) => no === selectToken)
    ?.flatMap((item: any) => ({ ...item }));

  return (
    <div>
      <div className='flex items-start gap-x-6'>
        <div className='w-[75%]'>
          <h2 className='text-2xl font-bold text-black'>
            ${totalBalance.toFixed(4)}
          </h2>
          <div className='flex items-center gap-x-2 mt-3'>
            <p className='text-lg text-black'>
              {cashFlowChartData[0]?.data?.btcPrice}
            </p>
            <p className='text-lg text-black'>
              {cashFlowChartData[0]?.data?.symbol}
            </p>
            <Image
              src={cashFlowChartData[0]?.data?.iconUrl}
              alt={cashFlowChartData[0]?.data?.symbol}
              width={32}
              height={32}
              className='size-5'
            />
          </div>
          <div className='mb-6'>
            <RechartAreaChart flowData={cashFlowChartData[0]?.data} />
          </div>
          <div>
            <TokenCashFlow
              flowData={flowData}
              selectToken={selectToken}
              setSelectToken={setSelectToken}
            />
          </div>
        </div>
        <div className='w-[1%] flex items-start justify-center'>
          <hr className='w-px h-[1300px] bg-gray-300 border-0' />
        </div>
        <div className='w-[34%] bg-white p-6'>
          <p className='text-lg text-black py-4'>Overview</p>
          <div className='flex justify-center'>
            <Image
              src={'/images/wallet/mobile-view.png'}
              alt={'Solana'}
              width={800}
              height={600}
              className='w-[300px] h-auto'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenView;