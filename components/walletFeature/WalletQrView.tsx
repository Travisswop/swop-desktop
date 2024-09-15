'use client';
import React, { useState } from 'react';
import useWalletQrCode from '@/zustandStore/walletQrCode';
import Image from 'next/image';
import { Tabs, Tab } from '@nextui-org/react';
import { FaRegCopy } from 'react-icons/fa6';
import { IoQrCodeOutline } from 'react-icons/io5';

const WalletQrView: React.FC = () => {
  const { walletQrCode, setWalletQrCode } = useWalletQrCode();
  const [selected, setSelected] = useState<any>('address');

  return (
    <div className='flex flex-col gap-2 relative z-10'>
      <div className='flex flex-wrap gap-4'>
        <Tabs
          variant='underlined'
          aria-label='Tabs variants'
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key='address' title='Address' />
          <Tab key='username' title='Username' />
        </Tabs>
      </div>
      {selected === 'address' ? (
        <div>
          <div className='flex items-center justify-between my-3 border rounded-2xl p-4'>
            <div className=''>
              <h3 className='text-lg text-gray-700 font-semibold mb-2'>
                Your Ethereum Address
              </h3>
              <p className='text-gray-500 font-normal mb-1 text-base'>
                {' '}
                {`${'34234532423432dgssgdsfgdsfgd'.slice(
                  0,
                  5,
                )}....${'34234532423432dgssgdsfgdsfgd'.slice(-5)}`}
              </p>
              <div className='flex items-center gap-x-1'>
                <Image
                  src={'/images/homepage/ETH.png'}
                  alt={'Icon'}
                  width={100}
                  height={100}
                  className='size-4 rounded-full'
                />
                <Image
                  src={'/images/homepage/Polygon.png'}
                  alt={'Icon'}
                  width={100}
                  height={100}
                  className='size-4 rounded-full'
                />

                <Image
                  src={'/images/homepage/coinbase.png'}
                  alt={'Icon'}
                  width={100}
                  height={100}
                  className='size-4 rounded-full'
                />
              </div>
            </div>
            <div className='flex items-center gap-x-6'>
              <IoQrCodeOutline className='size-6 text-black cursor-pointer' />
              <FaRegCopy className='size-6 text-black cursor-pointer' />
            </div>
          </div>
          <div className='flex items-center justify-between my-3 border rounded-2xl p-4'>
            <div className=''>
              <h3 className='text-lg text-gray-700 font-semibold mb-2'>
                Your Solana Address
              </h3>
              <p className='text-gray-500 font-normal mb-1 text-base'>
                {' '}
                {`${'34234532423432dgssgdsfgdsfgd'.slice(
                  0,
                  5,
                )}....${'34234532423432dgssgdsfgdsfgd'.slice(-5)}`}
              </p>
              <div className='flex items-center gap-x-1'>
                <Image
                  src={'/images/homepage/Solana.png'}
                  alt={'Icon'}
                  width={100}
                  height={100}
                  className='size-4 rounded-full'
                />
              </div>
            </div>
            <div className='flex items-center gap-x-6'>
              <IoQrCodeOutline className='size-6 text-black cursor-pointer' />
              <FaRegCopy className='size-6 text-black cursor-pointer' />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className='flex items-center justify-center my-10'>
            <Image
              src={'/images/homepage/userName.jpg'}
              alt={'Icon'}
              width={300}
              height={300}
              className='max-w-[200px] h-auto mx-0'
            />
          </div>
          <h3 className='text-2xl text-black font-semibold mb-6 text-center'>
            $Raihan.swop.id
          </h3>
          <p className='text-gray-500 font-light mb-1 text-sm text-center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className='flex justify-center mt-10'>
            <button>
              <button className='bg-black text-white py-2.5 rounded-lg flex items-center gap-2 justify-center px-6 font-medium'>
                Share your username
              </button>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletQrView;
