'use client';
import React, { useState } from 'react';
import useWalletQrCode from '@/zustandStore/walletQrCode';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tabs, Tab } from '@nextui-org/react';
import { FaRegCopy } from 'react-icons/fa6';
import { IoQrCodeOutline } from 'react-icons/io5';
import { IoCloseOutline } from 'react-icons/io5';
import QrCodeGenerates from './QrCodeGenerates';
import CopyWalletAddress from './CopyWalletAddress';

const WalletQrView = ({ walletObj, microsites }: any) => {
  const addressList = [
    {
      slug: 'ethAddress',
      title: 'Your Ethereum Address',
      address: walletObj?.ethAddress,
      iconList: [
        '/images/homepage/ETH.png',
        '/images/homepage/Polygon.png',
        '/images/homepage/coinbase.png',
      ],
    },
    {
      slug: 'solanaAddress',
      title: 'Your Solana Address',
      address: walletObj?.solanaAddress,
      iconList: ['/images/homepage/Solana.png'],
    },
  ];

  const { walletQrCode, setWalletQrCode } = useWalletQrCode();
  const [selected, setSelected] = useState<any>('address');
  const [addressSelected, setAddressSelected] = useState<any>('ethAddress');
  const [qrOpen, setQrOpen] = useState<any>(false);

  const onQrCodeSelect = (address: any) => {
    setAddressSelected(address);
    setQrOpen(!qrOpen);
  };

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
        <div className='relative h-auto'>
          {qrOpen && (
            <motion.div className='flex justify-center mx-0'>
              <div
                className='absolute w-[75%] h-auto bg-white z-20 shadow-xl border p-2 mt-6'
                style={{ zIndex: 20 }}
              >
                <div className='flex items-start justify-end'>
                  <IoCloseOutline
                    className='text-gray-800 hover:text-black size-5 cursor-pointer'
                    onClick={() => setQrOpen(false)}
                  />
                </div>
                {addressList
                  ?.filter((select: any) => select?.slug === addressSelected)
                  .map((el: any, index: number) => {
                    return (
                      <div
                        key={el?.slug}
                        className='flex items-center justify-center my-10 flex-col'
                      >
                        {/* QR Code */}
                        <QrCodeGenerates
                          walletAddress={el?.address}
                          slug={el?.slug}
                        />

                        {/* Address Information */}
                        <div className='flex items-center justify-between my-5 border rounded-2xl p-2 gap-x-10'>
                          <div>
                            <h3 className='text-sm text-gray-500 font-light mb-1'>
                              {el.title}
                            </h3>
                            <p className='text-gray-700 font-semibold text-base'>
                              {`${el.address.slice(0, 5)}....${el.address.slice(
                                -5,
                              )}`}
                            </p>
                          </div>
                          <div className='flex items-center gap-x-6'>
                            <CopyWalletAddress walletAddress={el?.address} />
                          </div>
                        </div>

                        {/* Additional Information */}
                        <p className='text-gray-500 font-light mb-1 text-sm text-center'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>

                        {/* Share Address Button */}
                        {/* <div className='flex justify-center mt-5'>
                          <button className='bg-black text-white py-2.5 rounded-lg flex items-center gap-2 justify-center px-6 font-medium'>
                            Share your address
                          </button>
                        </div> */}
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          )}

          <div
            className={`relative z-10 ${
              qrOpen ? 'opacity-45 pointer-events-none' : ''
            }`}
          >
            {addressList?.map((el: any, index: number) => (
              <div
                key={index}
                className='flex items-center justify-between my-3 border rounded-2xl p-4'
              >
                <div>
                  <h3 className='text-lg text-gray-700 font-semibold mb-2'>
                    {el?.title}
                  </h3>
                  <p className='text-gray-500 font-normal mb-1 text-base'>
                    {`${'34234532423432dgssgdsfgdsfgd'.slice(
                      0,
                      5,
                    )}....${'34234532423432dgssgdsfgdsfgd'.slice(-5)}`}
                  </p>
                  <div className='flex items-center gap-x-1'>
                    {el.iconList?.map((icons: any, i: number) => (
                      <Image
                        key={i}
                        src={icons}
                        alt={'Icon'}
                        width={100}
                        height={100}
                        className='size-4 rounded-full'
                      />
                    ))}
                  </div>
                </div>
                <div className='flex items-center gap-x-6'>
                  <IoQrCodeOutline
                    className='text-gray-500 hover:text-black cursor-pointer'
                    onClick={() => onQrCodeSelect(el?.slug)}
                  />
                  <CopyWalletAddress walletAddress={el.address} />
                </div>
              </div>
            ))}
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
          <div className='text-2xl text-black font-semibold mb-6 flex text-center gap-x-2 justify-center'>
            <h3>${microsites[0]?.ens}</h3>
            <CopyWalletAddress walletAddress={microsites[0]?.ens} />
          </div>
          <p className='text-gray-500 font-light mb-1 text-sm text-center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          {/* <div className='flex justify-center mt-10'>
            <button>
              <button className='bg-black text-white py-2.5 rounded-lg flex items-center gap-2 justify-center px-6 font-medium'>
                Share your username
              </button>
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default WalletQrView;
