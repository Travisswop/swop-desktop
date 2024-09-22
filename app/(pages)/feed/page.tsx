import UserImageAvatar from "@/components/Avatar";
import AnimateButton from "@/components/Button/AnimateButton";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import { Avatar } from "@nextui-org/react";
import React from "react";
import { CiSearch } from "react-icons/ci";

const feedPage = () => {
  return (
    <div className="main-container">
      <div className="bg-white rounded-xl">
        <div className="pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-2">
              <DynamicPrimaryBtn>Feed</DynamicPrimaryBtn>
              <AnimateButton width="w-40">Transactions</AnimateButton>
            </div>
            <div className="relative w-1/2">
              <CiSearch
                className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                size={18}
              />
              <input
                type="text"
                placeholder={`Search Swop ID...`}
                className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
              />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-6">
            <UserImageAvatar src="/images/user_avator/1.png" />
            <textarea
              name="user-feed"
              id="user-feed"
              rows={5}
              className="flex-1 bg-gray-100 rounded-lg p-3 focus:outline-gray-200"
              placeholder="What’s happening?"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default feedPage;
