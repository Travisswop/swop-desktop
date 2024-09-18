// import { getCashFlow } from "@/actions/cashflow";
import WalletFeatureData from "./WalletFeatureData";
// import { getNftData } from "@/actions/nftData";
// import { getTransactionData } from "@/actions/transactionData";

const WalletFeature = async ({
  data,
  microsites,
  token,
  flowData,
  nftData,
  transactionData,
}: any) => {
  if (data?.owner && data?.addresses["501"]) {
    const walletObj = {
      ethAddress: data.owner,
      solanaAddress: data.addresses["501"],
      btcAddress: "ererwewfsdsdweew",
    };

    // const flowData = await getCashFlow(walletObj, token);

    // const nftData = await getNftData(token, data.owner, data.addresses["501"]);

    // const transactionData = await getTransactionData(walletObj, token);

    return (
      <WalletFeatureData
        microsites={microsites}
        flowData={flowData}
        nftData={nftData}
        transactionData={transactionData}
        walletObj={walletObj}
      />
    );
  }
};

export default WalletFeature;
