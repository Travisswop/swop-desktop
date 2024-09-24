import Image from "next/image";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import isUrl from "@/util/isUrl";
import connection from "@/public/images/feed/connection.png";
import { getNewsFeed } from "@/actions/getNewsFeed";
import Link from "next/link";
import { FaHandHoldingHeart } from "react-icons/fa";
import { formatTimestampWithTimeAndDate } from "@/util/getFormattedDateWithtime";

const NewsFeed = async ({ data, session }: any) => {
  console.log("dataassggh", data);

  const feeds = await getNewsFeed(data.data._id, session.accessToken);

  // console.log("feeds", feeds);

  return (
    <div className="w-full h-[800px] overflow-y-auto pr-1">
      {/* {[1]?.map((el: any, index: number) => (
        <div key={index} className="mb-5">
          <div className="w-full flex item justify-between">
            <div className="flex items-start gap-x-4">
              <Image
                src={"/images/homepage/HawkTuah.png"}
                alt={"HawkTuah"}
                width={500}
                height={500}
                className="size-14"
              />
              <h2 className="font-medium text-black text-xl">HawkTuah</h2>
              <h2 className="font-normal text-[#8D8D8D] text-xl">
                Hawktuah.Swop.ID
              </h2>
              <h2 className="font-medium text-black text-xl flex items-center">
                <LuDot className="size-6" />
                <span>1d</span>
              </h2>
            </div>
            <div>
              <BsThreeDots className="size-8 text-[#8D8D8D] hover:text-black " />
            </div>
          </div>
          <div className="w-full flex items-center justify-start gap-x-6 ml-16">
            <div className="bg-white shadow-md rounded-xl p-4">
              <div className="flex justify-end items-center mb-1">
                <GoPlusCircle className="text-2xl text-[#424651] hover:text-black cursor-not-allowed" />
              </div>
              <Image
                src={"/images/homepage/coupon.png"}
                alt={"Coupon"}
                width={500}
                height={500}
                className="size-36"
              />
              <h2 className="text-lg text-center mt-2">$29.99</h2>
            </div>
            <div className="bg-white shadow-md rounded-xl p-4">
              <div className="flex justify-end items-center mb-1">
                <GoPlusCircle className="text-2xl text-[#424651] hover:text-black cursor-not-allowed" />
              </div>
              <Image
                src={"/images/homepage/coupon.png"}
                alt={"Coupon"}
                width={500}
                height={500}
                className="size-36"
              />
              <h2 className="text-lg text-center mt-2">$29.99</h2>
            </div>
            <div className="bg-white shadow-md rounded-xl p-4">
              <div className="flex justify-end items-center mb-1">
                <GoPlusCircle className="text-2xl text-[#424651] hover:text-black cursor-not-allowed" />
              </div>
              <Image
                src={"/images/homepage/coupon.png"}
                alt={"Coupon"}
                width={500}
                height={500}
                className="size-36"
              />
              <h2 className="text-lg text-center mt-2">$29.99</h2>
            </div>
          </div>
          <div className="flex items-center justify-start gap-x-12 mt-4 ml-16">
            <div className="flex items-center gap-x-1">
              <PiArrowFatUp className="text-2xl text-[#424651] hover:text-black" />
              <p>123</p>
            </div>
            <div className="flex items-center gap-x-1">
              <LuRepeat className="text-2xl text-[#424651] hover:text-black" />
              <p>98</p>
            </div>
            <div className="flex items-center gap-x-1">
              <FiHeart className="text-2xl text-[#424651] hover:text-black" />
              <p>7</p>
            </div>
            <div className="flex items-center gap-x-1">
              <HiOutlineUpload className="text-2xl text-[#424651] hover:text-black" />
              <p>7</p>
            </div>
          </div>
        </div>
      ))} */}
      {feeds && feeds?.feedData?.length > 0 && (
        <div className="flex flex-col gap-5">
          {feeds.feedData.map((feed: any) => (
            <div key={feed._id}>
              {feed?.name ? (
                <div className="pb-5 border-b">
                  <div className="w-full flex item justify-between">
                    <div className="flex items-start gap-x-4 justify-between">
                      {isUrl(data.data.profilePic) ? (
                        <Image
                          src={data.data.profilePic}
                          alt={"HawkTuah"}
                          width={500}
                          height={500}
                          className="size-12 rounded-full"
                        />
                      ) : (
                        <Image
                          src={`/images/user_avator/${data.data.profilePic}.png`}
                          alt={"HawkTuah"}
                          width={500}
                          height={500}
                          className="size-12 rounded-full"
                        />
                      )}
                      <div className="flex items-center gap-4">
                        <h2 className="font-semibold text-black text-lg">
                          {data.data.name}
                        </h2>
                        <h2 className="font-normal text-[#8D8D8D]">
                          connected with{" "}
                          <span className="text-gray-700 font-semibold">
                            {feed.name}
                          </span>
                        </h2>
                        <h2 className="font-medium text-black text-base flex items-center">
                          {/* <LuDot className="size-6" /> */}
                          <span>
                            {formatTimestampWithTimeAndDate(feed.date)}
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div>
                      <BsThreeDots className="size-8 text-[#8D8D8D] hover:text-black " />
                    </div>
                  </div>
                  <div className="ml-16">
                    <Image
                      src={connection}
                      alt="create smartsite"
                      className="w-20"
                    />
                  </div>
                  {/* <div className="flex items-center justify-start gap-x-12 mt-16 ml-16">
              <div className="flex items-center gap-x-1">
                <PiArrowFatUp className="text-2xl text-[#424651] hover:text-black" />
                <p>123</p>
              </div>
              <div className="flex items-center gap-x-1">
                <LuRepeat className="text-2xl text-[#424651] hover:text-black" />
                <p>98</p>
              </div>
              <div className="flex items-center gap-x-1">
                <FiHeart className="text-2xl text-[#424651] hover:text-black" />
                <p>7</p>
              </div>
              <div className="flex items-center gap-x-1">
                <HiOutlineUpload className="text-2xl text-[#424651] hover:text-black" />
                <p>7</p>
              </div>
            </div> */}
                </div>
              ) : (
                <div className="pb-5 border-b">
                  <div className="w-full flex item justify-between gap-10">
                    <div className="flex items-start gap-16 flex-1">
                      <div className="flex items-start gap-4">
                        {isUrl(data.data.profilePic) ? (
                          <Image
                            src={data.data.profilePic}
                            alt={"HawkTuah"}
                            width={500}
                            height={500}
                            className="size-12 rounded-full"
                          />
                        ) : (
                          <Image
                            src={`/images/user_avator/${data.data.profilePic}.png`}
                            alt={"HawkTuah"}
                            width={500}
                            height={500}
                            className="size-12 rounded-full"
                          />
                        )}
                        <div className="flex items-center gap-3">
                          <h2 className="font-semibold text-black text-lg">
                            {data.data.name}
                          </h2>
                          <Link
                            href={`/smartsites/${feed._id}`}
                            className="font-medium text-blue-500"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                      <h2 className="font-medium text-black text-base flex items-center">
                        <span>
                          {formatTimestampWithTimeAndDate(feed.createdAt)}
                        </span>
                      </h2>
                    </div>
                    <div>
                      <BsThreeDots className="size-8 text-[#8D8D8D] hover:text-black" />
                    </div>
                  </div>
                  <div className="ml-16 flex items-start gap-2">
                    <p className="text-lg font-semibold">
                      {data.data.name} created a new smartsite
                    </p>
                    <FaHandHoldingHeart
                      className="text-[#D95E5E] -translate-y-2"
                      size={28}
                    />
                  </div>
                  {/* <div className="flex items-center justify-start gap-x-12 mt-16 ml-16">
              <div className="flex items-center gap-x-1">
                <PiArrowFatUp className="text-2xl text-[#424651] hover:text-black" />
                <p>123</p>
              </div>
              <div className="flex items-center gap-x-1">
                <LuRepeat className="text-2xl text-[#424651] hover:text-black" />
                <p>98</p>
              </div>
              <div className="flex items-center gap-x-1">
                <FiHeart className="text-2xl text-[#424651] hover:text-black" />
                <p>7</p>
              </div>
              <div className="flex items-center gap-x-1">
                <HiOutlineUpload className="text-2xl text-[#424651] hover:text-black" />
                <p>7</p>
              </div>
            </div> */}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
