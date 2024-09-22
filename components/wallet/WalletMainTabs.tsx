// 'use client';
// import React, { useState } from 'react';
// import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
// import Image from 'next/image';

// type Key = any;

// const tabList = [
//   {
//     key: 'token',
//     title: 'Token',
//     iconUrl: '/images/homepage/wallet/wallet.png',
//   },
//   {
//     key: 'portfolio',
//     title: 'Portfolio',
//     iconUrl: '/images/homepage/wallet/dashboard.png',
//   },
//   {
//     key: 'Message',
//     title: 'Message',
//     iconUrl: '/images/homepage/wallet/message.png',
//   },
//   {
//     key: 'nft',
//     title: 'NFT',
//     iconUrl: '/images/homepage/wallet/NFT.png',
//   },
//   {
//     key: 'defi',
//     title: 'DeFi',
//     iconUrl: '/images/homepage/wallet/Mining.png',
//   },
//   {
//     key: 'transection',
//     title: 'Transection',
//     iconUrl: '/images/homepage/wallet/transaction-history.png',
//   },
// ];

// const WalletMainTabs = () => {
//   const [selected, setSelected] = React.useState<Key>('photos');

//   return (
//     <div>
//       <div className='flex w-full flex-col'>
//         <Tabs
//           variant='underlined'
//           aria-label='Options'
//           selectedKey={selected}
//           onSelectionChange={(key) => setSelected(key)}
//           classNames={{
//             cursor: 'pointer',
//             tab: `max-w-fit`,
//             tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
//           }}
//           color='default' // Ensure no default color is applied
//         >
//           {tabList?.map((el: any, index: number) => (
//             <Tab
//               key={el?.key}
//               title={
//                 <div
//                   className={`flex items-center p-6 bg-transparent gap-x-2 ${
//                     selected === el?.key ? 'border-2 border-black' : ''
//                   }`}
//                 >
//                   <Image
//                     src={el?.iconUrl}
//                     alt={el?.title}
//                     width={32}
//                     height={32}
//                     className='w-8 h-8'
//                   />
//                   <h2 className='font-semibold text-black text-lg'>
//                     {el?.title}
//                   </h2>
//                 </div>
//               }
//             />
//           ))}
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default WalletMainTabs;

'use client';
import useWalletTabValue from '@/zustandStore/walletTabValue';
import Image from 'next/image';
import React, { useState } from 'react';
import TokenView from './TokenView';

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

const WalletMainTabs = ({ session, data, microsites, flowData }: any) => {
  const {
    selectWalletTabValue,
    setSelectTabViewValue,
    setSelectWalletTabValue,
  } = useWalletTabValue();

  console.log('check flowdata 137', flowData);

  return (
    <div>
      <div className='flex items-center gap-x-6 justify-start'>
        <div
          className={`flex items-center bg-white space-x-3 p-2 rounded-lg px-14`}
        >
          <Image
            onClick={() => setSelectTabViewValue('walletCard')}
            src={'/images/homepage/wallet/menu-1.png'}
            alt={'Menu Card'}
            width={32}
            height={32}
            className='w-8 h-8 cursor-pointer'
          />
          <Image
            onClick={() => setSelectTabViewValue('walletList')}
            src={'/images/homepage/wallet/menu-2.png'}
            alt={'Menu Card'}
            width={32}
            height={32}
            className='w-8 h-8 cursor-pointer'
          />
        </div>
        <div className='flex items-center gap-x-6 px-4 justify-stretch'>
          {tabList?.map((el: any, index: number) => (
            <div
              key={index}
              onClick={() => setSelectWalletTabValue(el?.key)}
              className={`flex items-center bg-white space-x-3 p-2 rounded-lg cursor-pointer ${
                selectWalletTabValue === el?.key ? 'border border-black' : ''
              }`}
            >
              <Image
                src={el?.iconUrl}
                alt={el?.title}
                width={32}
                height={32}
                className='w-8 h-8'
              />
              <h2 className='font-semibold text-black text-lg'>{el?.title}</h2>
            </div>
          ))}
        </div>

        <div
          // onClick={() => setSelected(el?.key)}
          className={`flex items-center bg-white space-x-1 p-2 rounded-lg px-14`}
        >
          <Image
            src={'/images/homepage/wallet/network-selection.png'}
            alt={'Menu Card'}
            width={32}
            height={32}
            className='size-9'
          />
          <Image
            src={'/images/homepage/wallet/arrow.png'}
            alt={'Menu Card'}
            width={32}
            height={32}
            className='size-3'
          />
        </div>
      </div>
      <div className='mt-6'>
        {selectWalletTabValue === 'token' ? (
          <TokenView flowData={flowData} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default WalletMainTabs;
