'use client';
import React from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import Image from 'next/image';

const WalletTab = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      <Tabs variant={'underlined'} aria-label='Tabs variants' className='mb-8'>
        <Tab
          key='101'
          title={
            <div className='flex items-center justify-center bg-[#EEEEEE] p-4 size-28 space-x-2'>
              <Image
                src={'/images/homepage/wallet/dashboard.png'}
                alt={'Travis'}
                width={200}
                height={200}
                className='mx-auto size-28'
              />
            </div>
          }
        />
        <Tab
          key='102'
          title={
            <div className='flex items-center justify-center bg-[#EEEEEE] p-4 space-x-2'>
              <Image
                src={'/images/homepage/wallet/Mining.png'}
                alt={'Icon'}
                width={200}
                height={200}
                className='mx-auto size-28'
              />
            </div>
          }
        />
      </Tabs>
    </div>
  );
};
export default WalletTab;
