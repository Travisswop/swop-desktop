import isUrl from "@/util/isUrl";
import Image from "next/image";
import React from "react";
import { CiSearch } from "react-icons/ci";

const Connections = ({ data }: any) => {
  return (
    <div className="h-full py-5 px-6 bg-white">
      <p className="text-xl text-gray-700 font-bold mb-4">Connections</p>
      <div className="relative w-full mb-4">
        <CiSearch
          className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
          size={18}
        />
        <input
          type="text"
          placeholder={`Search Connections`}
          className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
        />
      </div>
      <div className="flex flex-col gap-3 h-full">
        {data &&
          data.data &&
          data?.data?.connections?.childConnection.map(
            (data: any, index: number) => (
              <div
                key={index}
                className="bg-white py-4 px-3 flex items-center justify-between shadow-small rounded-xl hover:shadow-medium"
              >
                <div className="flex items-center gap-3">
                  {isUrl(data.account.profilePic) ? (
                    <Image
                      src={data?.account?.profilePic}
                      alt="user image"
                      width={100}
                      height={100}
                      className="border w-14 h-14 rounded-full"
                    />
                  ) : (
                    <Image
                      src={`/images/user_avator/${data?.account?.profilePic}.png`}
                      alt="user image"
                      width={100}
                      height={100}
                      className="border w-14 h-14 rounded-full"
                    />
                  )}
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-bold">{data?.account?.name}</h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {data?.account?.bio}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  Charlotte, NC
                </p>
              </div>
            )
          )}
        {/* <div className="bg-white py-4 px-3 flex items-center justify-between shadow-medium rounded-xl hover:shadow-large">
          <div className="flex items-center gap-3">
            <Image
              src={travisImage}
              alt="user image"
              width={100}
              height={100}
              className="border w-14 h-14 rounded-full"
            />
            <div className="flex flex-col gap-0.5">
              <h3 className="font-bold">terra</h3>
              <p className="text-sm text-gray-500 font-medium">nau</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Connections;
