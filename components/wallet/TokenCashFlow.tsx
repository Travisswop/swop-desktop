'use client';
import useWalletTabValue from '@/zustandStore/walletTabValue';
import Image from 'next/image';
import SparklineChart from '../walletFeature/CashflowChart';

const TokenCashFlow = ({ flowData }: any) => {
  const { selectTabViewValue } = useWalletTabValue();

  return (
    <div className='max-h-[700px] overflow-y-scroll bg-white p-6'>
      {selectTabViewValue === 'walletList' ? (
        <div className='flex flex-col gap-4 relative z-10 '>
          {flowData?.result.map((item: any, index: number) => (
            <div
              key={index}
              className='px-3 py-3 rounded-lg shadow-medium flex items-center bg-white'
            >
              <div className='w-[40%] flex items-start gap-1 '>
                {item.data.change < 0 ? (
                  <p className='text-red-500 text-sm font-medium'>
                    {item.data.change}%
                  </p>
                ) : (
                  <p className='text-green-500 text-sm font-medium'>
                    +{item.data.change}%
                  </p>
                )}
                <div className='flex items-center'>
                  <Image
                    src={item.metadata.logo}
                    alt='eth logo'
                    width={40}
                    height={40}
                    className='size-14'
                  />
                  <div className='ml-2'>
                    <h3 className='font-semibold'>{item.data.name}</h3>
                    <p className='text-sm text-gray-500'>{item.data.symbol}</p>
                  </div>
                </div>
              </div>

              <div className='w-[40%] px-14'>
                <SparklineChart
                  data={item.data.sparkline}
                  color={item.data.color}
                />
              </div>
              <div className='flex gap-2 items-end w-[30%] justify-end'>
                <div>
                  <h4 className='font-medium'>{`${parseFloat(
                    (item.balance * item.data.price) as any,
                  ).toFixed(2)}`}</h4>
                  <p className='text-sm text-gray-500 w-20'>{`${parseFloat(
                    item.balance,
                  ).toFixed(2)} ${item.data.symbol}`}</p>
                </div>
                {/* {item.network === 'ethereum' && (
                  <Image
                    src={'/images/cashflow/ETH@2x.png'}
                    alt='eth logo'
                    width={40}
                    height={40}
                    className='w-5 h-5 rounded-full'
                  />
                )}
                {item.network === 'polygon' && (
                  <Image
                    src={'/images/cashflow/Polygon@2x.png'}
                    alt='eth logo'
                    width={40}
                    height={40}
                    className='w-5 h-5 rounded-full'
                  />
                )}
                {item.network === 'solana' && (
                  <Image
                    src={'/images/cashflow/SOL.webp'}
                    alt='eth logo'
                    width={40}
                    height={40}
                    className='w-5 h-5 rounded-full'
                  />
                )} */}
                <Image
                  src={
                    item?.data?.symbol === 'SOL'
                      ? '/images/homepage/Solana.png'
                      : item?.data?.symbol === 'ETH'
                      ? '/images/homepage/eth-with-bg.png'
                      : item?.data?.symbol === 'USDC' ||
                        item?.data?.symbol === 'WETH'
                      ? '/images/homepage/USDC.png'
                      : item?.data?.symbol === 'MATIC' ||
                        item?.data?.symbol === 'WETH' ||
                        item?.data?.symbol === 'DAI' ||
                        item?.data?.symbol === 'AAVE' ||
                        item?.data?.symbol === 'POL'
                      ? '/images/homepage/Polygon.png'
                      : '/images/homepage/Polygon.png'
                  }
                  alt='coin icon'
                  width={40}
                  height={40}
                  className='w-5 h-5 rounded-full'
                />
              </div>
            </div>
          ))}{' '}
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-3 relative z-10'>
          {flowData.result.map((item: any, index: number) => (
            <div key={index} className='rounded-lg shadow-medium p-4'>
              <div className='flex items-start justify-between gap-2 '>
                <div className='flex items-center gap-x-2'>
                  <Image
                    src={item.metadata.logo}
                    alt='eth logo'
                    width={40}
                    height={40}
                    className='w-14 h-14'
                  />
                  <div className=''>
                    <p className='text-sm text-gray-500'>{item.data.name}</p>
                    <h3 className='font-semibold'>{item.data.symbol}</h3>
                  </div>
                </div>

                <div>
                  <Image
                    src={
                      item?.data?.symbol === 'SOL'
                        ? '/images/homepage/Solana.png'
                        : item?.data?.symbol === 'ETH'
                        ? '/images/homepage/eth-with-bg.png'
                        : item?.data?.symbol === 'USDC' ||
                          item?.data?.symbol === 'WETH'
                        ? '/images/homepage/USDC.png'
                        : item?.data?.symbol === 'MATIC' ||
                          item?.data?.symbol === 'WETH' ||
                          item?.data?.symbol === 'DAI' ||
                          item?.data?.symbol === 'AAVE' ||
                          item?.data?.symbol === 'POL'
                        ? '/images/homepage/Polygon.png'
                        : '/images/homepage/Polygon.png'
                    }
                    alt='coin icon'
                    width={40}
                    height={40}
                    className='w-5 h-5 rounded-full'
                  />
                  {/* {item.network === 'ethereum' && (
                    <Image
                      src={'/images/cashflow/ETH@2x.png'}
                      alt='eth logo'
                      width={40}
                      height={40}
                      className='w-5 h-5 rounded-full'
                    />
                  )}
                  {item.network === 'polygon' && (
                    <Image
                      src={'/images/cashflow/Polygon@2x.png'}
                      alt='eth logo'
                      width={40}
                      height={40}
                      className='w-5 h-5 rounded-full'
                    />
                  )}
                  {item.network === 'solana' && (
                    <Image
                      src={'/images/cashflow/SOL.webp'}
                      alt='eth logo'
                      width={40}
                      height={40}
                      className='w-5 h-5 rounded-full'
                    />
                  )} */}
                </div>
              </div>

              <div className='py-4'>
                <SparklineChart
                  data={item.data.sparkline}
                  color={item.data.color}
                />
              </div>

              <div className='flex gap-2 items-center justify-between'>
                <div>
                  <h4 className='font-medium'>{`${parseFloat(
                    (item.balance * item.data.price) as any,
                  ).toFixed(2)}`}</h4>
                  <p className='text-sm text-gray-500 w-20'>{`${parseFloat(
                    item.balance,
                  ).toFixed(2)} ${item.data.symbol}`}</p>
                </div>
                <div>
                  {item.data.change < 0 ? (
                    <p className='text-red-500 text-sm font-medium'>
                      {item.data.change}%
                    </p>
                  ) : (
                    <p className='text-green-500 text-sm font-medium'>
                      +{item.data.change}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TokenCashFlow;
