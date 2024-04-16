import Image from "next/image";
import travisImage from "../../public/travis-image.svg";
import { FaEdit } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import Connections from "@/components/Connections";
import Chart from "@/components/Chart";
import Microsite from "@/components/Microsite";
import square from "@/public/images/homepage/square.svg";
import WebsiteAnalytics from "@/components/Home/WebsiteAnalytics";
import RecentLeads from "@/components/Home/RecentLeads";

export default function HomePage() {
  const websiteAnalyticsArr = [
    {
      _id: 123,
      title: "Leads",
      value: 34,
      days: 30,
      percentage: 24,
    },
    {
      _id: 133,
      title: "Taps",
      value: 34,
      days: 30,
      percentage: 24,
    },
    {
      _id: 124,
      title: "Taps",
      value: 24,
      days: 20,
      percentage: 24,
    },
    {
      _id: 1673,
      title: "Connections",
      value: 34,
      days: 30,
      percentage: -24,
    },
  ];
  return (
    <main className="main-container my-8">
      <div className="flex gap-6 items-start">
        <div className="w-3/5">
          <div className="bg-white py-5 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={travisImage}
                alt="user image"
                width={50}
                height={50}
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">Travis Herron</h3>
                <p className="text-sm text-gray-500 font-medium">
                  Travis.Swopple.ID
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  Charlotte, NC
                </p>
              </div>
            </div>
            <button className="px-10 flex gap-1 items-center  border-1.5 rounded-lg py-1 text-gray-500 border-gray-400">
              <BiSolidEdit />
              Edit
            </button>
          </div>
          <Chart />
        </div>

        {/* connections */}
        <div className="w-2/5">
          <Connections />
        </div>
      </div>
      <div className="my-4 flex gap-8">
        <div className="bg-white w-1/2 py-6 px-10">
          <h3 className="text-xl text-gray-700 font-bold mb-4">
            Website Analytics
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {websiteAnalyticsArr.map((data) => (
              <WebsiteAnalytics
                key={data._id}
                title={data.title}
                days={data.days}
                percentage={data.percentage}
                value={data.value}
              />
            ))}
          </div>
          <h3 className="text-xl text-gray-700 font-bold mt-6 mb-4">
            Recent Leads
          </h3>
          <RecentLeads />
        </div>
        <div className="bg-white w-1/2 rounded-lg">
          <Microsite />
        </div>
      </div>
    </main>
  );
}
