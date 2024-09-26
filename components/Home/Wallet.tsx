import Image from "next/image";
import React from "react";
import { TbEdit } from "react-icons/tb";
import isUrl from "@/util/isUrl";
import { FaUserTie } from "react-icons/fa";
import ShowEnsName from "../ShowEnsName";
import Link from "next/link";
import { getCashFlow } from "@/actions/cashflow";
import HomepageWallet from "./HomepageWallet";
import { getNftData } from "@/actions/nftData";
import { getTransactionData } from "@/actions/transactionData";

const Wallet = async ({ data, token, homepageData }: any) => {
  const getPrimaryMicrositeData = homepageData?.data?.microsites?.find(
    (microsite: any) => microsite?.primary
  );
  // ! when new user signup processed, then it doesn't shown
  if (getPrimaryMicrositeData.ens) {
    const getImgSrc = () => {
      const imageSrc = isUrl(
        getPrimaryMicrositeData && getPrimaryMicrositeData?.profilePic
      )
        ? getPrimaryMicrositeData?.profilePic
        : `/images/user_avator/${getPrimaryMicrositeData?.profilePic}.png`;

      return imageSrc;
    };

    let walletBalance;
    let totalBalance = 0;

    let flowData;

    if (data?.owner && data?.addresses["501"]) {
      const walletObj = {
        ethAddress: data.owner,
        solanaAddress: data.addresses["501"],
        btcAddress: "ererwewfsdsdweew",
      };

      flowData = await getCashFlow(walletObj, token);

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
      ethAddress: data.owner,
      solanaAddress: data.addresses["501"],
      btcAddress: "ererwewfsdsdweew",
    };

    const nftDataPromise =
      data?.addresses["501"] &&
      getNftData(token, data.owner, data.addresses["501"]);

    const transactionDataPromise = getTransactionData(walletObj, token);

    const [nftData, transactionData] = await Promise.all([
      nftDataPromise,
      transactionDataPromise,
    ]);

    return (
      <div className="w-full">
        {/* <div className='flex justify-end items-start'>
        <FiSettings className='size-5 text-[#424651] cursor-pointer hover:text-black' />
      </div> */}

        <div className="flex justify-center">
          <div className="relative inline-block mx-0">
            {getPrimaryMicrositeData && getPrimaryMicrositeData?.profilePic ? (
              <Image
                src={getImgSrc()}
                alt="user image"
                width={100}
                height={100}
                className="mx-auto size-28 rounded-full border"
              />
            ) : (
              <div className="border rounded-full p-2">
                <FaUserTie className="mx-auto size-28" />
              </div>
            )}
            <div className="absolute bottom-0 right-0">
              <Link href={`/smartsites/${getPrimaryMicrositeData?._id}`}>
                <TbEdit className="size-8 text-[#424651] bg-white rounded-full p-1.5 cursor-pointer hover:bg-slate-50 hover:text-black border" />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-[#424651] text-center mt-6">
          <h2 className="text-[22px] font-bold">
            {getPrimaryMicrositeData?.name}
          </h2>

          <div className="flex justify-center">
            <ShowEnsName data={homepageData?.data} />
          </div>
        </div>
        <div className="text-black text-center mt-10 flex gap-6 justify-center items-start">
          <div>
            <h2 className="text-[22px] font-bold">
              {" "}
              {homepageData?.data?.connections?.following?.length}
            </h2>
            <h3 className="text-[20px]">Following</h3>
          </div>
          <div className="h-[60px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-black to-transparent"></div>
          <div>
            <h2 className="text-[22px] font-bold flex items-center text-center justify-center">
              {homepageData?.data?.connections?.followers?.length}
              {/* <span className='text-xs bg-[#7ae38b3c] p-1 text-[#00E725] rounded-full ml-1'>
              +24%
            </span> */}
            </h2>
            <h3 className="text-[20px]">Followers</h3>
          </div>
        </div>

        {flowData && nftData && transactionData && (
          <HomepageWallet
            totalBalance={totalBalance}
            data={data}
            microsites={homepageData?.data?.microsites}
            token={token}
            flowData={flowData}
            nftData={nftData}
            transactionData={transactionData}
          />
        )}
      </div>
    );
  }
};

export default Wallet;
