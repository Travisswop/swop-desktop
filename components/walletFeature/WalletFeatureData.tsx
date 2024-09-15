'use client';
import SetupPrimarySmartsiteWalletModal from '../modal/SetupPrimarySmartsiteWallet';
import { useAccount } from 'wagmi';
import useWalletTabValue from '@/zustandStore/walletTabValue';
import CashFlowView from './CashFlowView';
import TransactionView from './TransactionView';
import NftView from './NftView';
import DashboradView from './DashboradView';
import useWalletQrCode from '@/zustandStore/walletQrCode';
import WalletQrView from './WalletQrView';

const WalletFeatureData = ({
  microsites,
  flowData,
  transactionData,
  nftData,
  walletObj,
}: any) => {
  const { address, isConnected } = useAccount();

  const { selectTabValue } = useWalletTabValue();
  const { walletQrCode } = useWalletQrCode();

  return (
    <div
      className={`h-[520px] ${isConnected && 'overflow-y-auto'} relative mt-4 `}
    >
      <div
        className={`${
          isConnected
            ? 'hidden'
            : 'w-full h-full absolute z-50 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center'
        }`}
      >
        <SetupPrimarySmartsiteWalletModal microsites={microsites} />
      </div>
      {!walletQrCode ? (
        <div>
          {selectTabValue === 'wallet' ? (
            <CashFlowView flowData={flowData} />
          ) : selectTabValue === 'transaction' ? (
            <TransactionView
              transactionData={transactionData}
              walletObj={walletObj}
            />
          ) : selectTabValue === 'nft' ? (
            <NftView walletObj={walletObj} nftData={nftData} />
          ) : selectTabValue === 'dashborad' ? (
            <DashboradView walletObj={walletObj} nftData={nftData} />
          ) : (
            ''
          )}
        </div>
      ) : (
        <WalletQrView walletObj={walletObj} microsites={microsites} />
      )}
    </div>
  );
};

export default WalletFeatureData;
