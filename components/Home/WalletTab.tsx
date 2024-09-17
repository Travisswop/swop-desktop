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
import useWalletQrCode from '@/zustandStore/walletQrCode';

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

  const dropdownList = [
    { title: 'Ethereum', url: '/images/homepage/eth-with-bg.png' },
    { title: 'Polygon', url: '/images/homepage/polygon.png' },
    { title: 'Base', url: '/images/homepage/coinbase.png' },
    { title: 'Solana', url: '/images/homepage/solana.png' },
  ];

  const { setSelectTabValue, setSelectTabViewValue } = useWalletTabValue();
  const { walletQrCode } = useWalletQrCode();

  const [selected, setSelected] = React.useState('');
  const [selectedView, setSelectedView] = React.useState('walletList');
  const [dropdownTriggerUrl, setDropdownTriggerUrl] = useState(
    '/images/homepage/eth-with-bg.png',
  );
  const [dropdownSelect, setDropdownSelect] = useState('Ethereum');

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
    <div>
      {!walletQrCode && (
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
                <div className='bg-[#EEEEEE] p-3.5 rounded-lg flex items-center gap-1'>
                  <Image
                    src={dropdownTriggerUrl}
                    alt={'Icon'}
                    width={500}
                    height={500}
                    className='mx-auto size-[21px] rounded-full'
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
                {dropdownList?.map((el, index) => (
                  <DropdownItem
                    key={el.title}
                    onClick={() => {
                      setDropdownSelect(el?.title);
                      setDropdownTriggerUrl(el?.url);
                    }}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-x-1'>
                        <Image
                          src={el?.url}
                          alt={'Icon'}
                          width={100}
                          height={100}
                          className='size-4 rounded-full'
                        />
                        <p>{el.title}</p>
                      </div>
                      {dropdownSelect === el.title && (
                        <GoDotFill className='size-3 text-green-700' />
                      )}
                    </div>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletTab;
