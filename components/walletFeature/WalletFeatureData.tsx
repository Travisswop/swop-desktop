"use client";
import useWalletTabValue from "@/zustandStore/walletTabValue";
import CashFlowView from "./CashFlowView";
import TransactionView from "./TransactionView";
import NftView from "./NftView";
import useWalletQrCode from "@/zustandStore/walletQrCode";
import WalletQrView from "./WalletQrView";
import DashboardView from "./DashboardView";
import HomepageWalletMessage from "./Message";
import DiFiView from "./DiFiView";

const WalletFeatureData = ({
  microsites,
  flowData,
  transactionData,
  nftData,
  walletObj,
}: any) => {
  const { selectTabValue } = useWalletTabValue();
  const { walletQrCode } = useWalletQrCode();

  return (
    <div className={`h-[580px] overflow-y-auto relative mt-4 custom-scrollbar`}>
      {!walletQrCode ? (
        <div className="h-full">
          {selectTabValue === "wallet" ? (
            <CashFlowView flowData={flowData} />
          ) : selectTabValue === "transaction" ? (
            <TransactionView
              transactionData={transactionData}
              walletObj={walletObj}
            />
          ) : selectTabValue === "nft" ? (
            <NftView walletObj={walletObj} nftData={nftData} />
          ) : selectTabValue === "dashborad" ? (
            <DashboardView flowData={flowData} />
          ) : selectTabValue === "message" ? (
            <HomepageWalletMessage />
          ) : selectTabValue === "difi" ? (
            <DiFiView />
          ) : (
            ""
          )}
        </div>
      ) : (
        <WalletQrView walletObj={walletObj} microsites={microsites} />
      )}
    </div>
  );
};

export default WalletFeatureData;
