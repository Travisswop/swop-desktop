'use client';
import React, { useState } from 'react';
import TransectionList from './TransectionList';
import TransectionDetailsView from './TransectionDetailsView';

const TransectionView = ({ microsites, transactionData, walletObj }: any) => {
  const [selectTransection, setSelectTransection] = useState(0);

  return (
    <div>
      <div className='flex items-stretch gap-x-6 '>
        <div className='w-[60%] bg-white p-6'>
          <TransectionList
            transactionData={transactionData}
            walletObj={walletObj}
            selectTransection={selectTransection}
            setSelectTransection={setSelectTransection}
          />
        </div>
        <div className='w-[40%] bg-white p-6'>
          <TransectionDetailsView
            selectTransection={selectTransection}
            transactionData={transactionData}
            walletObj={walletObj}
            microsites={microsites}
          />
        </div>
      </div>
    </div>
  );
};

export default TransectionView;
