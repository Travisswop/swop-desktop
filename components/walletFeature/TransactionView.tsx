'use client';
import Image from 'next/image';
import SparklineChart from './CashflowChart';

const TransactionView = ({ transactionData, walletObj }: any) => {
  return (
    <div>
      <div className='flex flex-col gap-2 relative z-10 p-2'>
        {transactionData?.result.map((item: any, index: number) => (
          <div
            key={index}
            className='px-4 py-2 rounded-lg shadow-medium flex items-center bg-white justify-between'
          >
            <div className='flex items-center gap-2 '>
              <div className='flex justify-center'>
                <div className='relative inline-block mx-0'>
                  <Image
                    src={'/images/homepage/transaction-icon/out.png'}
                    alt='user image'
                    width={100}
                    height={100}
                    className='mx-auto size-14 rounded-full border'
                  />

                  <div className='absolute bottom-0 right-0'>
                    <Image
                      src={'/images/cashflow/ETH@2x.png'}
                      alt='user image'
                      width={100}
                      height={100}
                      className='size-5 rounded-full'
                    />
                  </div>
                </div>
              </div>
              <div className=''>
                <h3 className='font-semibold'>{item.blockNumber}</h3>
                <p className='text-sm text-gray-500'>{item.timeStamp}</p>
              </div>
            </div>

            <div className=''>
              <h3 className='font-semibold'>{item.blockNumber}</h3>
              <p className='text-sm text-gray-500'>{item.timeStamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionView;
