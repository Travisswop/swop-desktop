'use client';
import React, { useState } from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';

type Key = any;

const tabList = [
  {
    key: 'token',
    title: 'Token',
    iconUrl: '/images/homepage/wallet/wallet.png',
  },
  {
    key: 'portfolio',
    title: 'Portfolio',
    iconUrl: '/images/homepage/wallet/dashboard.png',
  },
  {
    key: 'Message',
    title: 'Message',
    iconUrl: '/images/homepage/wallet/message.png',
  },
  {
    key: 'nft',
    title: 'NFT',
    iconUrl: '/images/homepage/wallet/NFT.png',
  },
  {
    key: 'defi',
    title: 'DeFi',
    iconUrl: '/images/homepage/wallet/Mining.png',
  },
  {
    key: 'transection',
    title: 'Transection',
    iconUrl: '/images/homepage/wallet/transaction-history.png',
  },
];

const WalletMainTabs = () => {
  const [selected, setSelected] = React.useState<Key>('photos');

  return (
    <div>
      <div className='flex w-full flex-col'>
        <Tabs
          aria-label='Options'
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key)}
        >
          <Tab key='photos' title='Photos'></Tab>
          <Tab key='music' title='Music'></Tab>
          <Tab key='videos' title='Videos'></Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default WalletMainTabs;
