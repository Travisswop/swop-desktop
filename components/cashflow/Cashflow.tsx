import { getCashFlow } from "@/actions/cashflow";
import CashflowData from "./CashflowData";

const Cashflow = async ({ data, microsites, token }: any) => {
  // const { address, isConnected } = useAccount();
  //   console.log("gggg", data);

  const walletObj = {
    ethAddress: data.owner,
    solanaAddress: data.addresses["501"],
    btcAddress: "ererwewfsdsdweew",
  };

  const flowData = await getCashFlow(walletObj, token);
  //   console.log("flow data", flowData);

  return <CashflowData microsites={microsites} flowData={flowData} />;
};

export default Cashflow;
