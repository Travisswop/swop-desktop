import { Card, Skeleton } from '@nextui-org/react';
import React from 'react';

const WalletPageLoading = () => {
  return (
    <Card className='h-screen shadow-none rounded-none m-8 overflow-hidden bg-transparent'>
      <div className='flex items-center w-full gap-x-4'>
        {[1, 2, 3, 4, 5, 6, 7, 8]?.map((el: any, index: number) => (
          <Skeleton key={index} className='rounded-lg h-[48px] w-full' />
        ))}
      </div>
      <div className='flex items-start gap-x-6 mt-6'>
        <div className='w-[75%] bg-white p-6'>
          <Skeleton className='flex rounded-lg w-[200px] h-[45px] mb-2' />
          <Skeleton className='flex rounded-lg w-[300px] h-[45px] mb-2' />
          <Skeleton className='flex rounded-lg w-full h-[500px]' />
          <Skeleton className='flex rounded-lg w-full h-[500px] mt-6' />
        </div>
        <div className='w-[1%] flex items-start justify-center'>
          <hr className='w-px h-[1300px] bg-gray-300 border-0' />
        </div>
        <div className='w-[34%] bg-white p-6'>
          <Skeleton className='flex rounded-lg w-full h-[800px]' />
        </div>
      </div>
      {/* <div className='flex gap-6 mb-6'>
        <div className='w-[60%]'>
          <div className='flex items-center gap-3 mb-6'>
            <div>
              <Skeleton className='flex rounded-full w-14 h-14' />
            </div>
            <div className='flex justify-between items-center w-full'>
              <div className='flex flex-col gap-3 w-[90%]'>
                <Skeleton className='h-6 w-1/2 rounded-lg' />
                <Skeleton className='h-6 w-1/2 rounded-lg' />
                <Skeleton className='h-6 w-1/2 rounded-lg' />
              </div>
              <Skeleton className='h-10 w-[20%] rounded-lg' />
            </div>
          </div>
          <div>
            <Skeleton className='flex w-full h-48' />
          </div>
        </div>
        <div className='w-[40%]'>
          <Skeleton className='flex w-full h-full' />
        </div>
      </div>
      <div className='w-full flex gap-6'>
        <div className='w-1/2'>
          <Skeleton className='flex w-full h-[30rem]' />
        </div>
        <div className='w-1/2'>
          <Skeleton className='flex w-full h-full' />
        </div>
      </div> */}
    </Card>
  );
};

export default WalletPageLoading;
