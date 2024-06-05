import Image from "next/image";
import travisImage from "../../public/travis-image.svg";
import { BiSolidEdit } from "react-icons/bi";
import Connections from "@/components/Connections";
import Chart from "@/components/Chart";
import Microsite from "@/components/Microsite";
import WebsiteAnalytics from "@/components/Home/WebsiteAnalytics";
import RecentLeads from "@/components/Home/RecentLeads";
import MainButton from "@/components/MainButton";
import { MdOutlineQrCode } from "react-icons/md";
import qrcode from "@/public/images/websites/qrcode.png";
import edit from "@/public/images/websites/icon/edit.svg";
import send from "@/public/images/websites/icon/send.svg";
import wallet from "@/public/images/websites/icon/wallet.svg";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import SetupMainAccount from "@/components/SetupMainAccount";
import getHomePageData from "@/util/fetchingData/homePageDataFetching";
import Link from "next/link";
import HomePageLoading from "@/components/loading/HomePageLoading";

export default async function HomePage() {
  const session: any = await isUserAuthenticate(); // check is user exist

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

  // console.log(session);

  const data = await getHomePageData(session?.accessToken as string);
  // console.log("data", data);

  return (
    <>
      {data ? (
        <main className="main-container">
          <div className="flex gap-6 h-full items-stretch">
            <div className="w-3/5 h-full">
              <div className="bg-white py-5 px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={data.data.profilePic}
                    alt="user image"
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-gray-800">
                      {data.data.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {data.data.bio}
                    </p>
                    {false ? (
                      <button className="px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg">
                        $ travis.swop.id
                      </button>
                    ) : (
                      <button className="px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg">
                        $ Setup Your Wallet
                      </button>
                    )}
                  </div>
                </div>
                <Link href={"/update-profile"}>
                  <button className="px-10 flex gap-2 font-medium items-center border-1.5 rounded-lg py-1.5 text-gray-500 border-gray-400 hover:bg-gray-700 hover:text-white">
                    <BiSolidEdit />
                    Edit
                  </button>
                </Link>
              </div>
              <Chart />
            </div>

            {/* connections */}
            <div className="w-2/5 min-h-full">
              <Connections data={data} />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-8">
            <div className="p-6 bg-white relative">
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
              <div>
                <RecentLeads />
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg overflow-hidden">
                <Microsite />
              </div>
              <div className="bg-white rounded-lg mt-4 p-6">
                <h5 className="text-xl text-gray-700 font-bold">QR</h5>
                <div>
                  <div className="flex gap-6 items-center justify-between">
                    <form className="w-full">
                      <input
                        type="text"
                        placeholder="URL"
                        className="w-full bg-gray-200 py-1.5 rounded-2xl px-4 focus:outline-none"
                      />
                      <div className="flex justify-center w-full mt-4">
                        <MainButton
                          title={"Generate QR"}
                          icon={<MdOutlineQrCode />}
                        />
                      </div>
                    </form>
                    <div>
                      <Image
                        alt="qr code"
                        src={qrcode}
                        width={130}
                        className="border-2 p-2 border-gray-500 rounded-2xl"
                      />
                      <div className="flex items-center gap-2 justify-center mt-2">
                        <button className="bg-black p-2 rounded-lg">
                          <Image alt="edit" src={edit} width={18} />
                        </button>
                        <button className="bg-black p-2 rounded-lg">
                          <Image alt="send" src={send} width={18} />
                        </button>
                        <button className="bg-black p-2 rounded-lg">
                          <Image alt="wallet" src={wallet} width={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SetupMainAccount />
        </main>
      ) : (
        <HomePageLoading />
      )}
    </>
  );
}
