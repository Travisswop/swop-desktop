"use client";
import React from "react";
import { CiSearch } from "react-icons/ci";
import PrimaryButton from "./PrimaryButton";
import { FaAngleDown, FaFileMedical } from "react-icons/fa";
import OutlinePrimaryButton from "./OutlinePrimaryButton";
import { RiRobot2Line } from "react-icons/ri";
import { PiBellSimpleRinging } from "react-icons/pi";
import travis from "../public/travis-image.svg";
import Image from "next/image";

const TopBar = () => {
  const handleOnClick = () => {
    console.log("clicked");
  };
  return (
    <div className="flex items-center gap-4 main-container py-7 bg-white">
      <div className="flex flex-[3] gap-4 items-center">
        <div className="relative flex-1">
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
        <div className="">
          <PrimaryButton
            preIcon={<FaFileMedical />}
            handleOnClick={handleOnClick}
          >
            Create Microsite
          </PrimaryButton>
        </div>

        <div className="">
          <OutlinePrimaryButton
            preIcon={<RiRobot2Line size={18} />}
            handleOnClick={handleOnClick}
          >
            AI Assistant
          </OutlinePrimaryButton>
        </div>
      </div>
      <div className="flex flex-1 gap-4 items-center justify-end">
        <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
          <PiBellSimpleRinging size={18} />
        </div>
        <div className="bg-gray-100 py-2 px-3 flex items-center gap-2 rounded-full">
          <Image src={travis} width={30} alt="travis image" />
          <p className="text-sm">Travis Herron</p>
          <FaAngleDown size={14} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
