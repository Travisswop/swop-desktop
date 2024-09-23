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
    <div
      className={`w-full relative ${!isConnected && 'overflow-hidden'}`}
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
