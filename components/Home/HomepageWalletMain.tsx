import React from "react";
import Wallet from "./Wallet";

const HomepageWalletMain = async ({ homepageDataPromise, session }: any) => {
  const data = await homepageDataPromise;
  const getEnsData = async () => {
    const dataSet = data.data.microsites.find(
      (microsite: any) => microsite.primary
    );

    // console.log("data set", dataSet);

    if (dataSet) {
      if (dataSet.ensData) {
        return dataSet.ensData;
      } else if (dataSet.ens) {
        const walletData = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v4/wallet/getEnsAddress/${dataSet.ens}`
        );
        const data = await walletData.json();
        // console.log('funct', data);

        return data;
      } else {
        return dataSet._id;
      }
    } else {
      return "No Primary microsite found!";
    }
  };
  return (
    <div>
      <Wallet
        data={await getEnsData()}
        token={session.accessToken}
        homepageData={data}
      />
    </div>
  );
};

export default HomepageWalletMain;
