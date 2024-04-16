import Image from "next/image";
import React from "react";
import { CiSearch } from "react-icons/ci";
import travisImage from "../public/travis-image.svg";

const Connections = () => {
  return (
    <div className=" py-5 px-6 bg-white">
      <p className="font-semibold text-gray-700 mb-4 text-lg">Connections</p>
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
      <div className="bg-white py-4 px-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={travisImage} alt="user image" width={50} height={50} />
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">Travis Herron</h3>
            <p className="text-sm text-gray-500 font-medium">CEO Of Swop</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium">Charlotte, NC</p>
      </div>
      <div className="bg-white py-4 px-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={travisImage} alt="user image" width={50} height={50} />
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">Travis Herron</h3>
            <p className="text-sm text-gray-500 font-medium">CEO Of Swop</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium">Charlotte, NC</p>
      </div>
      <div className="bg-white py-4 px-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={travisImage} alt="user image" width={50} height={50} />
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">Travis Herron</h3>
            <p className="text-sm text-gray-500 font-medium">CEO Of Swop</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium">Charlotte, NC</p>
      </div>
    </div>
  );
};

export default Connections;
