'use client';
import React from 'react';
import WalletMainTabs from './WalletMainTabs';
import { useAccount } from 'wagmi';
import SetupPrimarySmartsiteWalletModal from '../modal/SetupPrimarySmartsiteWallet';

const WalletCheck = ({
  session,
  data,
  microsites,
  flowData,
  nftData,
  totalBalance,
  transactionData,
  walletObj,
}: any) => {
  const { isConnected } = useAccount();

  return (
    // <div className='relative'>
    //   <div className='flex flex-col items-center justify-center mx-0'>
    //     <div className='absolute top-[18%] left-1/2 transform -translate-x-1/2 z-50 w-full h-[400px] max-w-lg md:max-w-xl lg:max-w-2xl mx-0'>
    //       <div className='flex items-center justify-center mx-0'>
    //         <SetupPrimarySmartsiteWalletModal microsites={microsites} />
    //       </div>
    //     </div>

    // <div className='bg-opacity-50 backdrop-blur-sm w-full h-[1500px] max-w-[1500px] absolute z-40' />

    //     <WalletMainTabs
    //       session={session}
    //       data={data}
    //       microsites={microsites}
    //       flowData={flowData}
    //       nftData={nftData}
    //       totalBalance={totalBalance}
    //       transactionData={transactionData}
    //       walletObj={walletObj}
    //     />
    //   </div>
    // </div>

    // <div className='relative'>
    //   <div className='bg-opacity-50 backdrop-blur-sm w-full h-[1500px] max-w-[1500px] absolute z-40' />
    //   <div className='absolute z-50'>
    //     <div className='flex items-center justify-center'>
    //       <SetupPrimarySmartsiteWalletModal microsites={microsites} />
    //     </div>
    //   </div>
    // <WalletMainTabs
    //   session={session}
    //   data={data}
    //   microsites={microsites}
    //   flowData={flowData}
    //   nftData={nftData}
    //   totalBalance={totalBalance}
    //   transactionData={transactionData}
    //   walletObj={walletObj}
    // />
    <div
      className={'w-full relative overflow-hidden'}
      style={{ height: 'calc(100vh - 108px)' }}
    >
      <div
        className={`${
          isConnected
            ? 'hidden'
            : 'w-full h-full absolute z-50 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center scale-105 rounded-lg'
        }`}
      >
        <SetupPrimarySmartsiteWalletModal microsites={microsites} />
      </div>
      <div className='main-container'>
        <WalletMainTabs
          session={session}
          data={data}
          microsites={microsites}
          flowData={flowData}
          nftData={nftData}
          totalBalance={totalBalance}
          transactionData={transactionData}
          walletObj={walletObj}
        />
      </div>
    </div>
  );
};

export default WalletCheck;
