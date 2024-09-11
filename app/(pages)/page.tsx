import Image from 'next/image';
import { BiSolidEdit } from 'react-icons/bi';
import Connections from '@/components/Connections';
// import Chart from "@/components/Chart";
import Microsite from '@/components/Microsite';
import WebsiteAnalytics from '@/components/Home/WebsiteAnalytics';
import RecentLeads from '@/components/Home/RecentLeads';
// import MainButton from "@/components/MainButton";
// import { MdOutlineQrCode } from "react-icons/md";
// import wallet from "@/public/images/websites/icon/wallet.svg";
import isUserAuthenticate from '@/util/isUserAuthenticate';
import SetupMainAccount from '@/components/SetupMainAccount';
import getHomePageData from '@/util/fetchingData/homePageDataFetching';
import Link from 'next/link';
import HomePageLoading from '@/components/loading/HomePageLoading';
import isUrl from '@/util/isUrl';
import { FaUserTie } from 'react-icons/fa';
import AnimateButton from '@/components/Button/AnimateButton';
import ForceSignOut from '@/components/ForceSignOut';
import CreateQRCodeFromHome from '@/components/CreateQRCodeFromHome';
// import HomepageCashFlowChart from "@/components/chart/HomepageCashFlow";
// import TriggerWalletConnectButton from "@/components/TriggerWalletConnectButton";
// import TriggerSolanaWalletConnect from "@/components/TriggerSolanaWalletConnect";
// import SetupWalletModal from "@/components/modal/SetupWallet";

import ShowEnsName from '@/components/ShowEnsName';
import Dashboard from '@/components/Home/Dashboard';
import Wallet from '@/components/Home/Wallet';
import NewsFeed from '@/components/Home/NewsFeed';
import { TbLocation } from 'react-icons/tb';

// import { useEffect } from "react";
// import TriggerWalletConnectButton from "@/components/TriggerWalletConnectButton";
// import TriggerSolanaWalletConnect from "@/components/TriggerSolanaWalletConnect";
// import dynamic from "next/dynamic";

export default async function HomePage() {
  const session: any = await isUserAuthenticate(); // check if user exists

  const data = await getHomePageData(session.accessToken as string);

  // console.log("home page data fetching", data);

  if (!data || data.state === 'fail' || data.state === 'error') {
    return <ForceSignOut />;
  }

  // console.log('home data', data);
  // console.log("parent", data.data.microsites);

  const getImgSrc = () => {
    const imageSrc = isUrl(data && data?.data?.profilePic)
      ? data?.data?.profilePic
      : `/images/user_avator/${data?.data?.profilePic}.png`;

    return imageSrc;
  };

  const getEnsData = async () => {
    const dataSet = data.data.microsites.find(
      (microsite: any) => microsite.primary,
    );
    // console.log("data set", dataSet);

    if (dataSet) {
      if (dataSet.ensData) {
        return dataSet.ensData;
      } else if (dataSet.ens) {
        const walletData = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v4/wallet/getEnsAddress/${dataSet.ens}`,
        );
        const data = await walletData.json();
        // console.log('funct', data);

        return data;
      } else {
        return dataSet._id;
      }
    } else {
      return 'No Primary microsite found!';
    }
  };

  // const walletData = getEnsData();

  const getLast30DaysTap = () => {
    if (data && data.state === 'success') {
      const currentTimestamp = Date.now();
      const thirtyDaysAgoTimestamp =
        currentTimestamp - 30 * 24 * 60 * 60 * 1000;
      const tapsInLast30Days =
        data &&
        data?.data?.tap.filter(
          (tap: any) => tap.timestamp >= thirtyDaysAgoTimestamp,
        );
      const tapsInLast30DaysCount = tapsInLast30Days.length;
      if (tapsInLast30DaysCount) {
        return tapsInLast30DaysCount;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const leads = () => {
    const count = data?.data?.subscriber?.length ?? 0;
    return count;
  };

  const websiteAnalyticsArr = [
    {
      _id: 12344,
      title: 'Leads',
      value: leads(),
      days: '30',
      percentage: 24,
    },
    {
      _id: 12344,
      title: 'Message',
      value: 0,
      days: '30',
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
      title: 'Taps',
      value: data ? data?.data?.tap?.length : 0,
      days: '30',
      percentage: 24,
    },
    {
      _id: 1673,
      title: 'Connections',
      value: data ? data?.data?.totalConnection : 0,
      days: '30',
      percentage: -24,
    },
  ];

  return (
    <>
      {data ? (
        <main className='main-container '>
          <div className='flex justify-between gap-6'>
            <div className='w-3/5 gap-6'>
              <div className=' bg-white py-5 px-6 flex items-center rounded-lg justify-center'>
                <Dashboard />
              </div>
              <div className=' bg-white py-5 px-6 flex items-center rounded-lg justify-center'>
                <NewsFeed />
              </div>
            </div>
            <div className='w-2/5 bg-white px-6 py-6 flex items-start rounded-lg justify-center'>
              <Wallet
                profileData={data}
                data={await getEnsData()}
                token={session.accessToken}
                microsites={data.data.microsites}
              />
            </div>
          </div>

          {/* Create ENS and Connections */}

          {/* <div className='flex gap-6 h-full items-stretch'>
            <div className='w-3/5 h-full'>
              <div className='bg-white py-5 px-6 flex items-center justify-between rounded-lg'>
                <div className='flex items-center gap-3'>
                  {data && data?.data?.profilePic ? (
                    <Image
                      src={getImgSrc()}
                      alt='user image'
                      width={100}
                      height={100}
                      className='w-[3.6rem] h-[3.6rem] rounded-full border'
                    />
                  ) : (
                    <div className='border rounded-full p-2'>
                      <FaUserTie size={40} />
                    </div>
                  )}

                  <div className='flex flex-col gap-1'>
                    <h3 className='font-bold text-gray-800'>
                      {data?.data?.name}
                    </h3>
                    <p className='text-sm text-gray-500 font-medium'>
                      {data?.data?.bio}
                    </p>
                    <ShowEnsName data={data.data} />
                  </div>
                </div>
                <Link href={`/update-profile/${data.data._id}`}>
                  <AnimateButton
                    width='w-32'
                    className='flex gap-1 text-gray-700'
                  >
                    <BiSolidEdit size={18} />
                    Edit
                  </AnimateButton>
                </Link>
              </div>
            </div>
          </div> */}

          {/* <div className='flex gap-6 h-full items-stretch'>
            <div className='w-3/5 h-full'>
              <div className='bg-white py-5 px-6 flex items-center justify-between rounded-lg'>
                <div className='flex items-center gap-3'>
                  {data && data?.data?.profilePic ? (
                    <Image
                      src={getImgSrc()}
                      alt='user image'
                      width={100}
                      height={100}
                      className='w-[3.6rem] h-[3.6rem] rounded-full border'
                    />
                  ) : (
                    <div className='border rounded-full p-2'>
                      <FaUserTie size={40} />
                    </div>
                  )}

                  <div className='flex flex-col gap-1'>
                    <h3 className='font-bold text-gray-800'>
                      {data?.data?.name}
                    </h3>
                    <p className='text-sm text-gray-500 font-medium'>
                      {data?.data?.bio}
                    </p>
                    <ShowEnsName data={data.data} />
                  </div>
                </div>
                <Link href={`/update-profile/${data.data._id}`}>
                  <AnimateButton
                    width='w-32'
                    className='flex gap-1 text-gray-700'
                  >
                    <BiSolidEdit size={18} />
                    Edit
                  </AnimateButton>
                </Link>
              </div>

              <Cashflow
                data={await getEnsData()}
                token={session.accessToken}
                microsites={data.data.microsites}
              />
            </div>

    
            <div className='w-2/5 min-h-full'>
              <Connections data={data} />
            </div>
          </div> */}

          <div className='mt-6 grid grid-cols-2 gap-x-6 items-stretch'>
            {/* Smartsite */}
            <div>
              <div className='bg-white rounded-lg overflow-hidden'>
                <Microsite microsites={data?.data?.microsites} />
              </div>
              <CreateQRCodeFromHome session={session} />
            </div>

            {/* Website Analytics */}

            <div className='p-6 bg-white rounded-lg'>
              <h3 className='text-lg text-gray-700 font-semibold mb-4'>
                Website Analytics
              </h3>
              <div className='grid grid-cols-2 gap-x-10 gap-y-6'>
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
              <h3 className='text-lg text-gray-700 font-semibold mt-6 mb-4'>
                Recent Leads
              </h3>
              <div>
                {data.state === 'success' && (
                  <RecentLeads subscribers={data?.data?.subscriber} />
                )}
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
