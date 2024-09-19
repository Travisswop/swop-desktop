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

  // const getEnsData = async () => {
  //   const dataSet = data.data.microsites.find(
  //     (microsite: any) => microsite.primary
  //   );

  //   // console.log("data set", dataSet);

  //   if (dataSet) {
  //     if (dataSet.ensData) {
  //       return dataSet.ensData;
  //     } else if (dataSet.ens) {
  //       const walletData = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/v4/wallet/getEnsAddress/${dataSet.ens}`
  //       );
  //       const data = await walletData.json();
  //       // console.log('funct', data);

  //       return data;
  //     } else {
  //       return dataSet._id;
  //     }
  //   } else {
  //     return "No Primary microsite found!";
  //   }
  // };

  if (getPrimaryMicrositeData?.ensData) {
    const walletObj = {
      ethAddress: getPrimaryMicrositeData?.ensData?.addresses[60],
      solanaAddress: getPrimaryMicrositeData?.ensData?.addresses[501],
      btcAddress: 'ererwewfsdsdweew',
    };

    flowData = await getCashFlow(walletObj, session);


    // walletBalance = flowData?.result;

    // if (walletBalance) {
    //   totalBalance =
    //     walletBalance?.reduce((acc: any, item: any) => {
    //       const balance = parseFloat(item?.balance) || 0;
    //       const dataBalance = parseFloat(item?.data?.price) || 0;
    //       return acc + balance * dataBalance;
    //     }, 0) || 0;
    // }
  }

  // const walletObj = {
  //   ethAddress: data.owner,
  //   solanaAddress: data.addresses['501'],
  //   btcAddress: 'ererwewfsdsdweew',
  // };

  // const nftDataPromise =
  //   data?.addresses['501'] &&
  //   getNftData(session, data.owner, data.addresses['501']);

  // const transactionDataPromise = getTransactionData(walletObj, session);

  // const [nftData, transactionData] = await Promise.all([
  //   nftDataPromise,
  //   transactionDataPromise,
  // ]);

  // console.log('check flowdata 60', getPrimaryMicrositeData);

  return (
    <div>
      <WalletCheck
        session={session}
        data={data}
        microsites={data.data.microsites}
        flowData={flowData}
      />
    </div>
  );
};

export default WalletPage;
