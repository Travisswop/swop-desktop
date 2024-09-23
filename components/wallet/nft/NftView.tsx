'use client';
import React, { useState } from 'react';
import NftList from './NftList';
import NftDetailsView from './NftDetailsView';

const NftView = ({ nftData }: any) => {
  const [selectNft, setSelectNft] = useState(0);
  return (
    <div>
      <div className='flex items-start gap-x-6'>
        <div className='w-[60%] bg-white p-6'>
          <NftList
            nftData={nftData}
            setSelectNft={setSelectNft}
            selectNft={selectNft}
          />
        </div>

        <div className='w-[40%] bg-white p-6'>
          <NftDetailsView nftData={nftData} selectNft={selectNft} />
        </div>
      </div>
    </div>
  );
};

export default NftView;
