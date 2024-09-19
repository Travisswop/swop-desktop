'use client';
import Image from 'next/image';
import React from 'react';
import TokenCashFlow from './TokenCashFlow';

const TokenView = ({ data }: any) => {
  console.log('data check 8', data);

  return (
    <div>
      <div className='flex items-start'>
        <div className='w-[75%]'>
          <h2 className='text-2xl font-bold text-black'>$29.8799</h2>
          <div className='flex items-center gap-x-2 mt-3'>
            <p className='text-lg text-black'>0.014518948 SOL</p>
            <Image
              src={'/images/homepage/Solana.png'}
              alt={'Solana'}
              width={32}
              height={32}
              className='size-5'
            />
          </div>
          {/* <TokenCashFlow flowData={flowData} /> */}
        </div>
        <div className='divide-x divide-black'></div>
        <div className='w-[35%] bg-white p-6'>
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
