import Image from "next/image";
import React from "react";
import banner1 from "@/public/images/live-preview/banner/1.png";
import avator from "@/public/images/user_avator/1.png";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import message from "@/public/images/live-preview/icon/message.svg";
import deposit from "@/public/images/live-preview/icon/deposit.svg";
import location from "@/public/images/live-preview/icon/location.svg";
import website from "@/public/images/live-preview/icon/website.svg";
import contacts from "@/public/images/live-preview/icon/contacts.svg";
import swop from "@/public/images/live-preview/swop.svg";
import { BiSolidEdit } from "react-icons/bi";
import useSmartsiteFormStore from "@/zustandStore/EditSmartsiteInfo";

const LivePreview = ({
  isBackgroundImg,
  data,
}: {
  isBackgroundImg: boolean;
  data?: any;
}) => {
  const listArry = [
    {
      _id: 123,
      img: message,
      title: "Travis.Swopple.Id",
      text: "Message Me Using the Swopple Wallet",
    },
    {
      _id: 133,
      img: contacts,
      title: "Travis Herron",
      text: `(408) 555-1234`,
    },
    {
      _id: 143,
      img: deposit,
      title: "Deposit",
      text: "Use my Swopple.Id to send to my self wallet",
    },
    {
      _id: 153,
      img: location,
      title: "Our Headquarters",
      text: "Get A Free tour of Our headquarters",
    },
    {
      _id: 12366,
      img: website,
      title: "Our Website",
      text: "www.swopme.co",
    },
  ];

  // console.log("data form live", data);
  const { formData, setFormData }: any = useSmartsiteFormStore();

  return (
    <section className="">
      <p className="text-sm text-gray-500 mb-2">Preview</p>
      <div
        className={`shadow-md ${
          isBackgroundImg &&
          "bg-[url('/images/live-preview/background/background-1.png')]"
        } bg-white rounded-xl`}
      >
        <div className="relative">
          {!isBackgroundImg && (
            <div className="bg-white p-2 rounded-xl shadow-md">
              <Image alt="banner image" src={banner1} className="rounded-xl" />
            </div>
          )}

          <div
            className={`${
              !isBackgroundImg
                ? "absolute top-full -translate-y-1/2 left-1/2 -translate-x-1/2"
                : "flex justify-center pt-24"
            } `}
          >
            <Image
              alt="user image"
              src={`/images/user_avator/${data?.profilePic}.png`}
              width={140}
              height={140}
              className="rounded-full w-28 xl:w-36 2xl:w-44 h-auto p-1 bg-white shadow-md"
            />
          </div>
        </div>
        <div
          className={`${
            !isBackgroundImg && "mt-16 xl:mt-20 2xl:mt-28"
          }  flex flex-col gap-6 mt-6`}
        >
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold text-gray-700">
              {formData.name || data?.name}
            </p>
            <p className="text-gray-500 font-medium text-sm">
              {formData.bio || data?.bio}
            </p>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <BsTwitterX size={20} />
            <FaInstagram size={20} />
            <FaLinkedinIn size={21} />
            <CgMail size={23} />
          </div>
          <div className="flex flex-col gap-4 px-4">
            {listArry.map((data) => (
              <div
                key={data._id}
                className="flex items-center gap-2 bg-white py-2 px-3 rounded-lg shadow-medium"
              >
                <Image src={data.img} alt="icon" width={40} />
                <div>
                  <p className="font-semibold text-gray-700">{data.title}</p>
                  <p className="text-xs text-gray-400">{data.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 pb-6 pt-2">
            <Image alt="swop logo" src={swop} />
            <BiSolidEdit />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivePreview;
