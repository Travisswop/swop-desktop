'use client';
import React, { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import Image from 'next/image';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import useWalletTabValue from '@/zustandStore/walletTabValue';
import { GoDotFill } from 'react-icons/go';

interface WalletTabProps {}

const WalletTab: React.FC<WalletTabProps> = () => {
  const tabList = [
    { title: 'wallet', url: '/images/homepage/wallet/wallet.png' },
    { title: 'message', url: '/images/homepage/wallet/message.png' },
    { title: 'dashborad', url: '/images/homepage/wallet/dashboard.png' },
    { title: 'nft', url: '/images/homepage/wallet/NFT.png' },
    { title: 'mining', url: '/images/homepage/wallet/Mining.png' },
    {
      title: 'transaction',
      url: '/images/homepage/wallet/transaction-history.png',
    },
  ];
  const {
    selectTabValue,
    selectTabViewValue,
    setSelectTabValue,
    setSelectTabViewValue,
  } = useWalletTabValue();

  const [selected, setSelected] = React.useState('');
  const [selectedView, setSelectedView] = React.useState('walletList');
  const [dropdownSelect, setDropdownSelect] = useState('ethereum');

  const handleSelectionChange = (key: React.Key) => {
    const selectedKey = String(key);
    setSelected(selectedKey);
    setSelectTabValue(selectedKey);
  };

  const handleSelectionViewChange = (key: React.Key) => {
    const selectedKey = String(key);
    setSelectedView(selectedKey);
    setSelectTabViewValue(selectedKey);
  };

  return (
    <div className='flex flex-wrap items-center gap-1'>
      <div className='bg-[#EEEEEE] p-2 rounded-lg gap-x-2 flex items-center'>
        <Image
          src={'/images/homepage/wallet/menu-1.png'}
          alt={'Icon'}
          width={500}
          height={500}
          className='mx-auto size-8 cursor-pointer'
          onClick={() => {
            handleSelectionViewChange('walletList');
          }}
        />
        <Image
          src={'/images/homepage/wallet/menu-2.png'}
          alt={'Icon'}
          width={500}
          height={500}
          className='mx-auto size-8 cursor-pointer'
          onClick={() => {
            handleSelectionViewChange('walletCard');
          }}
        />
      </div>
      <Tabs
        selectedKey={selected}
        onSelectionChange={handleSelectionChange}
        variant={'underlined'}
        aria-label='Tabs variants'
        classNames={{
          cursor: 'pointer',
          tab: 'max-w-fit px-0 h-16',
          tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
        }}
      >
        {tabList?.map((el) => (
          <Tab
            key={el?.title}
            title={
              <div className='flex justify-center w-14 h-12'>
                {/* Adjusted width and height */}
                <div className='bg-[#EEEEEE] p-3 rounded-lg flex items-center'>
                  {/* Adjust padding */}
                  <Image
                    src={el?.url}
                    alt={el?.title}
                    width={32} /* Adjust width */
                    height={32} /* Adjust height */
                    className='w-8 h-8' /* Adjust the image size */
                  />
                </div>
              </div>
            }
          />
        ))}
      </Tabs>

      <div className='flex items-center gap-4'>
        <Dropdown placement='bottom-start'>
          <DropdownTrigger>
            <div className='bg-[#EEEEEE] p-2 rounded-lg flex items-center'>
              <Image
                src={'/images/homepage/wallet/network-selection.png'}
                alt={'Icon'}
                width={500}
                height={500}
                className='mx-auto size-8'
              />
              <Image
                src={'/images/homepage/wallet/arrow.png'}
                alt={'Icon'}
                width={500}
                height={500}
                className='mx-auto size-3'
              />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label='User Actions' variant='flat'>
            <DropdownItem
              key='ethereum'
              onClick={() => setDropdownSelect('ethereum')}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-1'>
                  <Image
                    src={'/images/homepage/ETH.png'}
                    alt={'Icon'}
                    width={100}
                    height={100}
                    className='size-4 rounded-full'
                  />
                  <p>Ethereum</p>
                </div>
                {dropdownSelect === 'ethereum' && (
                  <GoDotFill className='size-3 text-green-700' />
                )}
              </div>
            </DropdownItem>
            <DropdownItem
              key='polygon'
              onClick={() => setDropdownSelect('polygon')}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-1'>
                  <Image
                    src={'/images/homepage/Polygon.png'}
                    alt={'Icon'}
                    width={100}
                    height={100}
                    className='size-4 rounded-full'
                  />
                  <p>Polygon </p>
                </div>
                {dropdownSelect === 'polygon' && (
                  <GoDotFill className='size-3 text-green-700' />
                )}
              </div>
            </DropdownItem>
            <DropdownItem key='base' onClick={() => setDropdownSelect('base')}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-1'>
                  <Image
                    src={'/images/homepage/coinbase.png'}
                    alt={'Icon'}
                    width={100}
                    height={100}
                    className='size-4 rounded-full'
                  />
                  <p>Base</p>
                </div>
                {dropdownSelect === 'base' && (
                  <GoDotFill className='size-3 text-green-700' />
                )}
              </div>
            </DropdownItem>
            <DropdownItem
              key='solana'
              onClick={() => setDropdownSelect('solana')}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-1'>
                  <Image
                    src={'/images/homepage/Solana.png'}
                    alt={'Icon'}
                    width={100}
                    height={100}
                    className='size-4 rounded-full'
                  />
                  <p>Solana</p>
                </div>
                {dropdownSelect === 'solana' && (
                  <GoDotFill className='size-3 text-green-700' />
                )}
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default WalletTab;
