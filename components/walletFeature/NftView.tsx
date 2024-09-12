'use client';
import useWalletTabValue from '@/zustandStore/walletTabValue';
import Image from 'next/image';

const NftView = ({ walletObj, nftData }: any) => {
  const { selectTabViewValue } = useWalletTabValue();

  return (
    <div>
      {selectTabViewValue === 'walletList' ? (
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
                    alt='NFT image'
                    width={56}
                    height={56}
                    className='rounded-2xl object-cover w-full h-full'
                  />
                </div>
              </div>

              <div className='flex flex-col w-full'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Image
                      src={'/images/cashflow/ETH@2x.png'}
                      alt='ETH icon'
                      width={24}
                      height={24}
                      className='rounded-full'
                    />
                    <h3 className='font-semibold text-sm line-clamp-1'>
                      {item?.title}
                    </h3>
                  </div>

                  <div className='text-sm text-gray-500 text-ellipsis overflow-hidden'>
                    {`${item?.contract?.address.slice(0, 9)}...`}
                  </div>
                </div>

                <p className='text-sm text-gray-500 line-clamp-1 mt-1'>
                  {item?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-3 relative z-10'>
          {nftData?.result?.map((item: any, index: number) => (
            <div key={index} className='rounded-lg shadow-medium p-4'>
              <div className='flex items-center justify-center'>
                <div className='w-full'>
                  <Image
                    src={item?.media[0]?.thumbnail}
                    alt='user image'
                    width={500}
                    height={500}
                    className='rounded-lg object-cover w-full h-60'
                  />
                </div>
              </div>

              <div className='mt-2'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-1'>
                    <Image
                      src={'/images/cashflow/ETH@2x.png'}
                      alt='ETH icon'
                      width={32}
                      height={32}
                      className='rounded-full size-5'
                    />
                    <h3 className='font-semibold line-clamp-1'>
                      {item?.title}
                    </h3>
                  </div>
                </div>

                <div className='text-ellipsis overflow-hidden text-sm text-gray-500 mt-1'>
                  {`${item?.contract?.address.slice(0, 9)}...`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NftView;
