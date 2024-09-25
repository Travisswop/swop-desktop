'use client';
import Image from 'next/image';
import React from 'react';

const PortfolioTokenView = ({ flowData, totalBalance }: any) => {
  return (
    <div className='max-w-full max-h-[500px] overflow-y-scroll'>
      <div className='border-b-1 rounded-2xl mt-8'>
        {flowData?.result
          ?.filter((el: any) => parseFloat(el?.balance) !== 0)
          ?.map((item: any, index: number) => (
            <div
              key={index}
              className='flex items-center justify-between p-4 font-medium border-b'
            >
              <div className='flex items-center gap-x-2'>
                <div
                  className='size-3'
                  style={{
                    backgroundColor: item?.data?.color || 'transparent',
                  }}
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
                  ? `${(
                      (parseFloat(item.balance) / totalBalance) *
                      100
                    ).toFixed(4)}%`
                  : '0.00%'}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PortfolioTokenView;
