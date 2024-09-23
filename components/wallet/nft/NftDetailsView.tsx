import Image from 'next/image';
import React from 'react';

const NftDetailsView = ({ nftData, selectNft }: any) => {
  return (
    <div>
      {nftData?.result
        ?.filter((el: any, no: number) => no === selectNft)
        ?.map((el: any, index: number) => (
          <div key={index}>
            <Image
              src={el?.media[0]?.thumbnail}
              alt='NFT image'
              width={500}
              height={500}
              className='rounded-2xl object-cover w-full h-full'
            />

            <div className='flex items-center gap-x-2 mt-4'>
              <Image
                src={'/images/cashflow/ETH@2x.png'}
                alt='ETH icon'
                width={24}
                height={24}
                className='rounded-full size-5'
              />
              <h3 className='font-semibold text-base line-clamp-1'>
                {el?.title}
              </h3>
            </div>

            <div className='text-sm text-gray-500 text-ellipsis overflow-hidden mt-2 ml-7'>
              {`${el?.contract?.address.slice(0, 9)}...`}
            </div>

            <div className='border-b-1 mb-4 mt-4' />

            <p className='text-sm text-gray-500 mt-1'>{el?.description}</p>
          </div>
        ))}
    </div>
  );
};

export default NftDetailsView;
