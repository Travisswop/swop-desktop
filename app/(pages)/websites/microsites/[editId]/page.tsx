import Image from "next/image";
import React from "react";
import userAvator from "@/public/images/avator/01.png";
import editIcon from "@/public/images/websites/edit-icon.svg";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { TbUserSquare } from "react-icons/tb";

const EditSmartSite = () => {
  return (
    <main className="main-container overflow-hidden">
      <div className="flex gap-6 items-start">
        <div className="w-[62%] border-r border-gray-300 pr-8 flex flex-col gap-4">
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-center">
              <div className="w-max relative">
                <Image
                  alt="user image"
                  src={userAvator}
                  width={160}
                  className="rounded-full"
                />
                <Image
                  alt="edit icon"
                  src={editIcon}
                  width={40}
                  className="absolute right-0 bottom-4"
                />
              </div>
            </div>
            <form className="flex flex-col gap-4 mt-6">
              <div>
                <label htmlFor="name" className="font-medium text-gray-700">
                  Name
                </label>
                <div className="relative flex-1 mt-1">
                  <FiUser
                    className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder={`Jhon Smith`}
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="name" className="font-medium text-gray-700">
                  Profile Name
                </label>
                <div className="relative flex-1 mt-1">
                  <FiUser
                    className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder={`https://swopme.app/sp/fghh`}
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="name" className="font-medium text-gray-700">
                  Bio
                </label>
                <div className="relative flex-1 mt-1">
                  <TbUserSquare
                    className="absolute left-4 top-3 font-bold text-gray-600"
                    size={18}
                  />
                  <textarea
                    placeholder={`Real Estate Manager`}
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                    rows={4}
                  />
                </div>
              </div>
            </form>
          </div>
          <div>button</div>
        </div>
        <div className="w-[38%]">right</div>
      </div>
    </main>
  );
};

export default EditSmartSite;
