import getHomePageData from '@/util/fetchingData/homePageDataFetching';
import isUserAuthenticate from '@/util/isUserAuthenticate';
import WalletCheck from './WalletCheck';
import { getCashFlow } from '@/actions/cashflow';
import { getNftData } from '@/actions/nftData';
import { getTransactionData } from '@/actions/transactionData';

const WalletPage = async () => {
  const session: any = await isUserAuthenticate();

  const data = await getHomePageData(session.accessToken as string);

  const getPrimaryMicrositeData = data.data.microsites?.find(
    (microsite: any) => microsite?.primary,
  );

  let walletBalance;
  let totalBalance = 0;

  let flowData;

  if (getPrimaryMicrositeData?.ensData) {
    const walletObj = {
      ethAddress: getPrimaryMicrositeData?.ensData?.addresses[60],
      solanaAddress: getPrimaryMicrositeData?.ensData?.addresses[501],
      btcAddress: 'ererwewfsdsdweew',
    };

    flowData = await getCashFlow(walletObj, session);

    walletBalance = flowData?.result;

    if (walletBalance) {
      totalBalance =
        walletBalance?.reduce((acc: any, item: any) => {
          const balance = parseFloat(item?.balance) || 0;
          const dataBalance = parseFloat(item?.data?.price) || 0;
          return acc + balance * dataBalance;
        }, 0) || 0;
    }
  }

  const walletObj = {
    ethAddress: getPrimaryMicrositeData?.ensData?.addresses[60],
    solanaAddress: getPrimaryMicrositeData?.ensData?.addresses[501],
    btcAddress: 'ererwewfsdsdweew',
  };

  const nftDataPromise =
    getPrimaryMicrositeData?.ensData?.addresses[501] &&
    getNftData(
      session,
      getPrimaryMicrositeData?.ensData?.addresses[60],
      getPrimaryMicrositeData?.ensData?.addresses[501],
    );

  const transactionDataPromise = getTransactionData(walletObj, session);

  const [nftData, transactionData] = await Promise.all([
    nftDataPromise,
    transactionDataPromise,
  ]);

  return (
    <div>
      <WalletCheck
        session={session}
        data={data}
        microsites={data.data.microsites}
        flowData={flowData}
        totalBalance={totalBalance}
        nftData={nftData}
        transactionData={transactionData}
        walletObj={walletObj}
      />
    </div>
  );
};

export default WalletPage;
