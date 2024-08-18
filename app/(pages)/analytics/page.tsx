import Image from "next/image";
import { BiSolidEdit } from "react-icons/bi";
import Connections from "@/components/Connections";
import Chart from "@/components/Chart";
import Microsite from "@/components/Microsite";
import WebsiteAnalytics from "@/components/Home/WebsiteAnalytics";
import RecentLeads from "@/components/Home/RecentLeads";
import MainButton from "@/components/MainButton";
import { MdOutlineQrCode } from "react-icons/md";
import wallet from "@/public/images/websites/icon/wallet.svg";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import SetupMainAccount from "@/components/SetupMainAccount";
import getHomePageData from "@/util/fetchingData/homePageDataFetching";
import Link from "next/link";
import HomePageLoading from "@/components/loading/HomePageLoading";
import isUrl from "@/util/isUrl";
import { FaUserTie } from "react-icons/fa";
import AnimateButton from "@/components/Button/AnimateButton";
import ForceSignOut from "@/components/ForceSignOut";
import CreateQRCodeFromHome from "@/components/CreateQRCodeFromHome";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { IoInformationCircle } from "react-icons/io5";
import ViewsPerDayChart from "@/components/chart/AnalyticsViewsPerDay";
// import TriggerWalletConnectButton from "@/components/TriggerWalletConnectButton";
// import TriggerSolanaWalletConnect from "@/components/TriggerSolanaWalletConnect";
// import dynamic from "next/dynamic";
export default async function AnalyticsPage() {
  const session: any = await isUserAuthenticate(); // check if user exists

  const data = await getHomePageData(session.accessToken as string);

  // console.log("home page data fetching", data);

  if (!data || data.state === "fail" || data.state === "error") {
    return <ForceSignOut />;
  }

  // console.log("home data", data);
  // console.log("parent", data.data.microsites);

  const getImgSrc = () => {
    const imageSrc = isUrl(data && data?.data?.profilePic)
      ? data?.data?.profilePic
      : `/images/user_avator/${data?.data?.profilePic}.png`;

    return imageSrc;
  };

  const getLast30DaysTap = () => {
    if (data && data.state === "success") {
      const currentTimestamp = Date.now();
      const thirtyDaysAgoTimestamp =
        currentTimestamp - 30 * 24 * 60 * 60 * 1000;
      const tapsInLast30Days =
        data &&
        data?.data?.tap.filter(
          (tap: any) => tap.timestamp >= thirtyDaysAgoTimestamp
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

  const websiteAnalyticsArr = [
    {
      _id: 123,
      title: "Taps",
      value: getLast30DaysTap(),
      days: 30,
      percentage: 24,
    },
    {
      _id: 133,
      title: "Taps",
      value: data ? data?.data?.tap?.length : 0,
      days: "Life Time",
      percentage: 24,
    },
    {
      _id: 124,
      title: "Connections",
      value: data ? data?.data?.totalConnection : 0,
      days: 20,
      percentage: 24,
    },
    {
      _id: 1673,
      title: "Connections",
      value: data ? data?.data?.totalConnection : 0,
      days: "Life Time",
      percentage: -24,
    },
  ];

  return (
    <>
      {data ? (
        <main className="main-container">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-lg text-gray-700 font-semibold mb-4">
                Website Analytics
              </h3>
              <div className="grid grid-cols-2 gap-6">
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
                {data.state === "success" && (
                  <RecentLeads subscribers={data?.data?.subscriber} />
                )}
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden">
              <Microsite microsites={data?.data?.microsites} />
            </div>
          </div>
          <SetupMainAccount />

          <div className="mt-4 flex gap-6">
            <div className="bg-white rounded-lg p-4 flex-[0.5]">
              <p className="text-lg text-gray-700 font-semibold mb-2">
                List of Viewers
              </p>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Country
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Device
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {`Travis`}
                      </th>
                      {/* <td className="px-6 py-4">Travis</td> */}
                      <td className="px-6 py-4">USA</td>
                      <td className="px-6 py-4">MAC</td>
                    </tr>
                    <tr className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {`Salman`}
                      </th>
                      {/* <td className="px-6 py-4">Travis</td> */}
                      <td className="px-6 py-4">Bangladesh</td>
                      <td className="px-6 py-4">Phone</td>
                    </tr>
                    <tr className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {`Jon`}
                      </th>
                      {/* <td className="px-6 py-4">Travis</td> */}
                      <td className="px-6 py-4">Uganda</td>
                      <td className="px-6 py-4">Phone</td>
                    </tr>
                    <tr className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {`Smith`}
                      </th>
                      {/* <td className="px-6 py-4">Travis</td> */}
                      <td className="px-6 py-4">Australia</td>
                      <td className="px-6 py-4">Laptop</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 flex-[0.5]">
              <div className="flex items-center justify-between border-b">
                <div>
                  <p className="text-lg text-gray-700 font-semibold mb-1">
                    Views Per Day
                  </p>
                  <p className="text-lg text-gray-700 font-semibold mb-2">
                    128
                  </p>
                </div>
                <IoInformationCircle size={20} color="black" />
              </div>
              <ViewsPerDayChart />
            </div>
          </div>
        </main>
      ) : (
        <HomePageLoading />
      )}
    </>
  );
}
