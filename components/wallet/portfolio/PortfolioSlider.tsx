'use client';
import React from 'react';

const PortfolioSlider = ({ walletList, totalBalance }: any) => {
  return (
    <div className='grid grid-cols-3 md:grid-cols-4 items-center justify-between gap-4'>
      {walletList?.map((item: any, index: number) => (
        <div
          key={index}
          className={`flex items-center justify-center p-2.5 rounded-2xl text-white`}
          style={{ backgroundColor: item?.data?.color }}
        >
          <div className='text-base font-medium gap-x-2 flex items-center justify-center'>
            <p>{item?.data?.symbol}</p>
            <p>
              {item.balance
                ? `${((parseFloat(item.balance) / totalBalance) * 100).toFixed(
                    2,
                  )}%`
                : '0.00%'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioSlider;
