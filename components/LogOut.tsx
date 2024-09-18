"use client";

import { doSignOut } from "@/actions/auth";
// import { useRef } from "react";
import { IoLogOutOutline } from "react-icons/io5";

const LogOutComponent = () => {
  const handleLogOut = async (e: any) => {
    e.preventDefault();
    await doSignOut();
  };
  return (
    <button
      type="button"
      onClick={handleLogOut}
      className={`flex items-center justify-center gap-1 mt-6 pb-6 pl-4 font-medium text-[#424651]`}
    >
      <IoLogOutOutline size={18} />
      Logout
    </button>
  );
};

export default LogOutComponent;
