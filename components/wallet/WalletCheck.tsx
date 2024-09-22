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
    <div className=''>
      {/* <div
        className={`${
          isConnected
            ? 'hidden'
            : 'h-full absolute z-50 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center scale-105 rounded-lg'
        }`}
      >
        <SetupPrimarySmartsiteWalletModal microsites={microsites} />
      </div> */}

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
  );
};

export default WalletCheck;
