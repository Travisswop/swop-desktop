import React from "react";
import { CiSearch } from "react-icons/ci";
import { PiBellSimpleRinging } from "react-icons/pi";
import TopBarButtons from "./topBarButtons";
import UserProfile from "./topBar/UserProfile";
import { auth } from "@/auth";

const TopBar = async () => {
  const session = await auth();
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
        <TopBarButtons />
      </div>
      <div className="flex flex-1 gap-4 items-center justify-end">
        <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
          <PiBellSimpleRinging size={18} />
        </div>
        {session?.user && <UserProfile />}
      </div>
    </div>
  );
};

export default TopBar;
