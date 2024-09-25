import { Card, Skeleton } from '@nextui-org/react';
import React from 'react';

const QrCodePageLoading = () => {
  return (
    <Card className='h-screen shadow-none rounded-none m-8 overflow-hidden bg-transparent'>
      <div className='w-full'>
        <Skeleton className='rounded-lg h-[40px] w-[200px] mb-4' />

        <Skeleton className='rounded-lg h-[80px] w-full mb-4' />

        <Skeleton className='rounded-lg h-[80px] w-full mb-8' />

        <div className='flex items-center justify-center'>
          <Skeleton className='rounded-lg h-[50px] w-[200px]' />
        </div>
      </div>
    </Card>
  );
};

export default QrCodePageLoading;
