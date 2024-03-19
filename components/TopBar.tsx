import React from "react";
import { CiSearch } from "react-icons/ci";

const TopBar = () => {
  return (
    <div>
      <div className="relative">
        <CiSearch
          className="absolute left-2 top-1/2 -translate-y-[50%]"
          color="gray"
        />
        <input
          type="text"
          placeholder={`Search Connections`}
          className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl bg-white focus:outline-none pl-7 py-2 text-gray-700"
        />
      </div>
    </div>
  );
};

export default TopBar;
