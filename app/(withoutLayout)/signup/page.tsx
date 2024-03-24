import React from "react";
import defaultAvator from "../../../public/images/avator/default_avator.svg";
import Image from "next/image";
import UploadImageButton from "@/components/SignUp/UploadImageButton";
import uploadImgIcon from "../../../public/images/upload_image_icon.svg";
import { FiUser } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";

const SignUpPage = () => {
  return (
    <section className="bg-[#F7F7F9] flex items-center justify-center w-full h-screen">
      <div className="bg-white w-4/6 py-6 pr-6">
        <div className="flex gap-16 items-center w-full h-full">
          <div className="flex-1 flex flex-col gap-y-4 items-center border-r border-gray-500">
            <h1 className="text-xl font-bold">Parent Profile</h1>
            <p className="text-sm text-gray-600">
              This is your account profile used to <br /> manage the Swop
              ecosystem
            </p>
            <div className="relative w-52 overflow-hidden rounded-full">
              <Image
                src={defaultAvator}
                alt="default avator"
                className="rounded-full "
              />
              <div className="bg-[#3f3f3f43] absolute top-1/2 w-full h-full">
                <button>
                  <Image
                    src={uploadImgIcon}
                    alt="upload image icon"
                    width={28}
                    className="absolute left-1/2 top-8 -translate-x-[50%]"
                  />
                </button>
              </div>
            </div>
            <UploadImageButton />
          </div>
          {/* <div className="border border-r border-black h-5/6 my-10"></div> */}
          <div className="flex-[2]">
            <h6 className="font-semibold mb-4">Parent Profile</h6>
            <div className="flex flex-col gap-y-3">
              <div className="">
                <label htmlFor="fullName" className="mb-2 block">
                  Name<span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <FiUser
                    className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                    size={18}
                  />
                  <input
                    type="text"
                    id="fullName"
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="bio" className="mb-2 block">
                  Bio
                </label>
                <div className="relative">
                  <FaRegUserCircle
                    className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                    size={18}
                  />
                  <input
                    type="text"
                    id="bio"
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="phone" className="mb-2 block">
                  Phone Number<span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <MdOutlinePhoneInTalk
                    className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                    size={18}
                  />
                  <input
                    type="text"
                    id="phone"
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="email" className="mb-2 block">
                  Email<span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <MdOutlineEmail
                    className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                    size={18}
                  />
                  <input
                    type="text"
                    id="email"
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="birthDate" className="mb-2 block">
                  Birth Date
                </label>
                <div className="relative">
                  <SlCalender
                    className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                    size={18}
                  />
                  <input
                    type="text"
                    id="birthDate"
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="address" className="mb-2 block">
                  Address (Shopping Delivery Address)
                </label>
                <div className="relative">
                  <CiLocationOn
                    className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                    size={18}
                  />
                  <input
                    type="text"
                    id="address"
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
