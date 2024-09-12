'use client';
import Image from 'next/image';

const NftView = ({ walletObj, nftData }: any) => {
  // console.log('check data value 5', nftData?.result[0]);

  return (
    <div>
      <div className='flex flex-col gap-2 relative z-10 p-2'>
        {nftData?.result.map((item: any, index: number) => (
          <div
            key={index}
            className='px-4 py-2 rounded-lg shadow-medium flex items-center bg-white justify-between gap-5'
          >
            <div className='flex items-center justify-center gap-2'>
              <div className='w-14 h-14'>
                <Image
                  src={item?.media[0]?.thumbnail}
                  alt='user image'
                  width={56} // Fixed width
                  height={56} // Fixed height
                  className='rounded-2xl'
                />
              </div>
            </div>

            <div className=''>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                  <Image
                    src={'/images/cashflow/ETH@2x.png'}
                    alt='user image'
                    width={100}
                    height={100}
                    className='size-4 rounded-full'
                  />
                  <h3 className='font-semibold line-clamp-1'>{item?.title}</h3>
                </div>

                <p className='text-sm text-gray-500 line-clamp-1'>
                  {item?.id?.tokenId}
                </p>
              </div>

              <p className='text-sm text-gray-500 line-clamp-1'>
                {item?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftView;
