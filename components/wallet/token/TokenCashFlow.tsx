-'use client';
import SparklineChart from '@/components/walletFeature/CashflowChart';
import useWalletTabValue from '@/zustandStore/walletTabValue';
import Image from 'next/image';

const TokenCashFlow = ({ flowData, selectToken, setSelectToken }: any) => {
  const { selectTabViewValue } = useWalletTabValue();

  return (
    <div className='max-h-[700px] overflow-y-scroll bg-white p-6'>
      <p className='text-lg text-black pb-4'>Assets</p>
      {selectTabViewValue === 'walletList' ? (
        <div className='flex flex-col gap-4 relative z-10 '>
          {flowData?.result.map((item: any, index: number) => (
            <div
              key={index}
              className={`px-3 py-3 rounded-lg shadow-medium flex items-center bg-white ${
                selectToken === index ? 'border border-black' : ''
              }`}
              onClick={() => setSelectToken(index)}
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
                <Image
                  src={
                    item?.network === 'solana'
                      ? '/images/homepage/Solana.png'
                      : item?.network === 'ethereum'
                      ? '/images/homepage/eth-with-bg.png'
                      : item?.network === 'polygon'
                      ? '/images/homepage/Polygon.png'
                      : item?.network === 'base'
                      ? '/images/homepage/eth-with-bg.png'
                      : ''
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
            <div
              key={index}
              className={`rounded-lg shadow-medium p-4 ${
                selectToken === index ? 'border border-black' : ''
              }`}
              onClick={() => setSelectToken(index)}
            >
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
                      item?.network === 'solana'
                        ? '/images/homepage/Solana.png'
                        : item?.network === 'ethereum'
                        ? '/images/homepage/eth-with-bg.png'
                        : item?.network === 'polygon'
                        ? '/images/homepage/Polygon.png'
                        : item?.network === 'base'
                        ? '/images/homepage/eth-with-bg.png'
                        : ''
                    }
                    alt='coin icon'
                    width={40}
                    height={40}
                    className='w-5 h-5 rounded-full'
                  />
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
