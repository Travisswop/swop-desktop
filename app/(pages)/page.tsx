// import Chart from "@/components/Chart";
import Microsite from "@/components/Microsite";
import WebsiteAnalytics from "@/components/Home/WebsiteAnalytics";
import RecentLeads from "@/components/Home/RecentLeads";
// import MainButton from "@/components/MainButton";
// import { MdOutlineQrCode } from "react-icons/md";
// import wallet from "@/public/images/websites/icon/wallet.svg";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import SetupMainAccount from "@/components/SetupMainAccount";
import getHomePageData from "@/util/fetchingData/homePageDataFetching";
import HomePageLoading from "@/components/loading/HomePageLoading";
import ForceSignOut from "@/components/ForceSignOut";
import CreateQRCodeFromHome from "@/components/CreateQRCodeFromHome";
// import HomepageCashFlowChart from "@/components/chart/HomepageCashFlow";
// import TriggerWalletConnectButton from "@/components/TriggerWalletConnectButton";
// import TriggerSolanaWalletConnect from "@/components/TriggerSolanaWalletConnect";
// import SetupWalletModal from "@/components/modal/SetupWallet";

import Dashboard from "@/components/Home/Dashboard";
import Wallet from "@/components/Home/Wallet";
import NewsFeed from "@/components/Home/NewsFeed";
import { Suspense } from "react";

// import { useEffect } from "react";
// import TriggerWalletConnectButton from "@/components/TriggerWalletConnectButton";
// import TriggerSolanaWalletConnect from "@/components/TriggerSolanaWalletConnect";
// import dynamic from "next/dynamic";

export default async function HomePage() {
  const session: any = await isUserAuthenticate(); // check if user exists

  const data = await getHomePageData(session.accessToken as string);

  // console.log("home page data fetching", data);

  if (!data || data.state === "fail" || data.state === "error") {
    return <ForceSignOut />;
  }

  // console.log('home data', data);
  // console.log("parent", data.data.microsites);

  // const getImgSrc = () => {
  //   const imageSrc = isUrl(data && data?.data?.profilePic)
  //     ? data?.data?.profilePic
  //     : `/images/user_avator/${data?.data?.profilePic}.png`;

  //   return imageSrc;
  // };

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

  // const walletData = getEnsData();

  // const getLast30DaysTap = () => {
  //   if (data && data.state === "success") {
  //     const currentTimestamp = Date.now();
  //     const thirtyDaysAgoTimestamp =
  //       currentTimestamp - 30 * 24 * 60 * 60 * 1000;
  //     const tapsInLast30Days =
  //       data &&
  //       data?.data?.tap.filter(
  //         (tap: any) => tap.timestamp >= thirtyDaysAgoTimestamp
  //       );
  //     const tapsInLast30DaysCount = tapsInLast30Days.length;
  //     if (tapsInLast30DaysCount) {
  //       return tapsInLast30DaysCount;
  //     } else {
  //       return 0;
  //     }
  //   } else {
  //     return 0;
  //   }
  // };

  const leads = () => {
    const count = data?.data?.subscriber?.length ?? 0;
    return count;
  };

  const websiteAnalyticsArr = [
    {
      _id: 12344,
      title: "Leads",
      value: leads(),
      days: "30",
      percentage: 24,
    },
    {
      _id: 12344,
      title: "Message",
      value: 0,
      days: "30",
      percentage: 24,
    },
    // {
    //   _id: 123,
    //   title: "Taps",
    //   value: getLast30DaysTap(),
    //   days: 30,
    //   percentage: 24,
    // },
    {
      _id: 133,
      title: "Taps",
      value: data ? data?.data?.tap?.length : 0,
      days: "30",
      percentage: 24,
    },
    {
      _id: 1673,
      title: "Connections",
      value: data ? data?.data?.totalConnection : 0,
      days: "30",
      percentage: -24,
    },
  ];

  return (
    <>
      {data ? (
        <main className="main-container flex-1 h-full overflow-auto">
          <div className="flex justify-between gap-6">
            <div className="w-3/5 gap-6">
              <div className=" bg-white py-5 px-6 flex items-center rounded-lg justify-center">
                <Suspense fallback={<p>Loading newsfeed...</p>}>
                  <Dashboard />
                </Suspense>
              </div>
              <div className="bg-white py-5 px-6 flex items-center rounded-lg justify-center mt-4">
                <Suspense fallback={<p>Loading newsfeed...</p>}>
                  <NewsFeed data={data} session={session} />
                </Suspense>
              </div>
            </div>
            <div className="w-2/5 bg-white px-6 py-6 flex items-start rounded-lg justify-center">
              <Wallet
                profileData={data}
                data={await getEnsData()}
                token={session.accessToken}
                microsites={data.data.microsites}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-6 items-stretch">
            {/* Smartsite */}
            <div>
              <div className="bg-white rounded-lg overflow-hidden">
                <Microsite microsites={data?.data?.microsites} />
              </div>
              <CreateQRCodeFromHome session={session} />
            </div>

            {/* Website Analytics */}

            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-lg text-gray-700 font-semibold mb-4">
                Website Analytics
              </h3>
              <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                {websiteAnalyticsArr.map((data) => (
                  <WebsiteAnalytics
                    key={data._id}
                    title={data.title}
                    days={data.days as any}
                    percentage={data.percentage}
                    value={data.value}
                  />
                ))}
              </div>
              <h3 className="text-lg text-gray-700 font-semibold mt-6 mb-4">
                Recent Leads
              </h3>
              <div>
                {data.state === "success" &&
                  (data?.data?.subscriber.length !== 0 ? (
                    <RecentLeads subscribers={data?.data?.subscriber} />
                  ) : (
                    <p className="font-medium text-center border border-gray-300 rounded-lg py-8">
                      No Leads Available!
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <SetupMainAccount data={data} />
        </main>
      ) : (
        <HomePageLoading />
      )}
    </>
  );
}
