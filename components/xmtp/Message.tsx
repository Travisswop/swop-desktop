import isUserAuthenticate from "@/util/isUserAuthenticate";
import Image from "next/image";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import { IoWalletOutline } from "react-icons/io5";
import { LuSendHorizonal } from "react-icons/lu";

const IndividualMessage = async ({ data }: any) => {
  await isUserAuthenticate(); // check is user exist
  return (
    <main className="main-container overflow-hidden">
      <div className="flex gap-7 items-start">
        <div className="w-[62%] flex flex-col gap-4 bg-white rounded-xl">
          {/* top heading  */}
          <div className="py-4 px-6 border flex items-center justify-between rounded-xl">
            <div className="flex items-center gap-2 ">
              {data?.domainOwner?.avatar && (
                <Image
                  alt="user image"
                  src={data.domainOwner.avatar}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="heading-3">{data.name}</h3>
                <p className="text-[13px] text-gray-400 font-medium">
                  {data.owner}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 bg-gray-100 flex items-center justify-center rounded-full">
                <IoWalletOutline size={18} />
              </div>
              <div className="w-11 h-11 bg-gray-100 flex items-center justify-center rounded-full">
                <FaRegUserCircle size={18} />
              </div>
            </div>
          </div>
          {/* message  */}
          <div className="py-4 px-6 text-sm text-gray-600 font-medium flex flex-col gap-3">
            <div className="flex flex-col items-end gap-2">
              <p className="bg-gray-100 px-4 py-1.5 rounded-lg">Hey Chris</p>
              <div className="bg-gray-100 px-4 py-1.5 rounded-lg">
                <p>
                  Thanks so much for showing me round the property last night
                </p>
                <p className="text-end text-xs font-medium text-gray-400 mt-1">
                  now
                </p>
              </div>
            </div>
            <div className="flex items-end gap-1.5">
              <div>
                <Image
                  alt="user image"
                  src={"/images/travis.png"}
                  width={30}
                  height={30}
                  className="border border-gray-400 rounded-full"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="bg-[#EEEEFF] px-4 py-1.5 rounded-lg">
                  Hey Julian
                </p>
                <div className="bg-[#EEEEFF] px-4 py-1.5 rounded-lg">
                  <p>
                    You’re very welcome. If you’d like to register your interest
                    complete the form below. Thanks again
                  </p>
                  <p className="text-xs font-medium text-gray-400 mt-1">
                    09:37
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 my-4">
              <div className="h-[1px] bg-gray-300 w-full"></div>
              <div className="min-w-max text-gray-400 text-xs">TODAY 15.09</div>
              <div className="h-[1px] bg-gray-300 w-full"></div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="bg-gray-100 px-4 py-1.5 rounded-lg">Hey Chris</p>
              <div className="bg-gray-100 px-4 py-1.5 rounded-lg">
                <p>Was great to see you last night!</p>
                <p className="text-end text-xs font-medium text-gray-400 mt-1">
                  now
                </p>
              </div>
            </div>
            <div className="flex items-end gap-1.5">
              <div>
                <Image
                  alt="user image"
                  src={"/images/travis.png"}
                  width={30}
                  height={30}
                  className="border border-gray-400 rounded-full"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="bg-[#EEEEFF] px-4 py-1.5 rounded-lg">
                  Hey Julian
                </p>
                <div className="bg-[#EEEEFF] px-4 py-1.5 rounded-lg">
                  <p>
                    Sorry to be a pest but could you pay me back for dinner the
                    other night
                  </p>
                  <p className="text-xs font-medium text-gray-400 mt-1">
                    09:57
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form action="" className="px-6 flex items-center gap-5 pb-4">
            <div className="relative flex-1">
              <GrEmoji
                className="absolute right-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                size={20}
                color="gray"
              />
              <input
                type="text"
                placeholder={`Type your message here.....`}
                className="w-full border border-gray-300 focus:border-gray-400 rounded-lg focus:outline-none pl-4 py-3 text-gray-700"
              />
            </div>
            <button type="submit">
              <LuSendHorizonal size={22} />
            </button>
          </form>
        </div>
        <div className="w-[38%] bg-white rounded-xl px-6 py-4 flex gap-3 flex-col">
          <p className="heading-4">All Inbox</p>
          <div className="relative flex-1">
            <CiSearch
              className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
              size={18}
            />
            <input
              type="text"
              placeholder={`Search Here....`}
              className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
            />
          </div>
          <div className="bg-black text-white flex items-center justify-between p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Image
                alt="user image"
                src={"/images/travis.png"}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-sembold">Travis Herron</p>
                <p className="text-sm text-gray-500 font-medium">Today 10:40</p>
              </div>
            </div>
            <div className="bg-[#FFFFFF] opacity-40 rounded-full w-6 h-6 flex items-center justify-center">
              <BsThreeDots color="black" size={17} />
            </div>
          </div>
          <div className="bg-gray-100 text-gray-700 flex items-center justify-between p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Image
                alt="user image"
                src={"/images/travis.png"}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-gray-800 text-base font-semibold">
                  After Jalil
                </p>
                <p className="text-sm text-gray-400 font-medium">Today 10:40</p>
              </div>
            </div>
            <div className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
              <BsThreeDots color="black" size={17} />
            </div>
          </div>
          <div className="bg-gray-100 text-gray-700 flex items-center justify-between p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Image
                alt="user image"
                src={"/images/travis.png"}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-gray-800 text-base font-semibold">
                  After Jalil
                </p>
                <p className="text-sm text-gray-400 font-medium">Today 10:40</p>
              </div>
            </div>
            <div className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
              <BsThreeDots color="black" size={17} />
            </div>
          </div>
          <div className="bg-gray-100 text-gray-700 flex items-center justify-between p-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Image
                alt="user image"
                src={"/images/travis.png"}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-gray-800 text-base font-semibold">
                  After Jalil
                </p>
                <p className="text-sm text-gray-400 font-medium">Today 10:40</p>
              </div>
            </div>
            <div className="bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center">
              <BsThreeDots color="black" size={17} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndividualMessage;
