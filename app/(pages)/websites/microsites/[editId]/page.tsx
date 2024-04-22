"use client";
import Image from "next/image";
import React, { useState } from "react";
import userAvator from "@/public/images/avator/01.png";
import editIcon from "@/public/images/websites/edit-icon.svg";
import { FiUser } from "react-icons/fi";
import { TbUserSquare } from "react-icons/tb";
import { Switch, useDisclosure } from "@nextui-org/react";
import EditMicrositeBtn from "@/components/Button/EditMicrositeBtn";
import { LiaFileMedicalSolid } from "react-icons/lia";
import { IoMdLink } from "react-icons/io";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import LivePreview from "@/components/LivePreview";
import SelectBackgroudOrBannerModal from "@/components/SelectBackgroudOrBannerModal/SelectBackgroudOrBannerModal";

const EditSmartSite = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImage, setGalleryImage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const images = [
    "01.png",
    "02.png",
    "03.png",
    "04.png",
    "05.png",
    "06.png",
    "07.png",
    "08.png",
    "09.png",
    "10.png",
    "11.png",
    "12.png",
    "13.png",
    "14.png",
    "15.png",
    "16.png",
    "17.png",
    "18.png",
    "19.png",
    "20.png",
    "21.png",
    "22.png",
    "23.png",
    "24.png",
    "25.png",
    "26.png",
    "27.png",
    "28.png",
  ];
  const backgroundImgArr = [
    "background-1.png",
    "background-2.png",
    "background-3.png",
    "background-4.png",
    "background-5.png",
    "background-6.png",
    "background-7.png",
  ];
  const bannerImgArr = [
    "banner-1.png",
    "banner-2.png",
    "banner-3.png",
    "banner-4.png",
    "banner-5.png",
    "banner-6.png",
    "banner-7.png",
    "banner-8.png",
    "banner-9.png",
    "banner-10.png",
    "banner-11.png",
    "banner-12.png",
    "banner-13.png",
    "banner-14.png",
    "banner-15.png",
    "banner-16.png",
  ];
  const handleModal = () => {
    onOpen();
    setIsModalOpen(true);
  };
  return (
    <main className="main-container overflow-hidden">
      <div className="flex gap-7 items-start">
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
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
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
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
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
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
                    rows={4}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-8 border border-gray-300 rounded-xl pl-4 pr-3 py-2 text-lg font-medium text-gray-600 w-max">
              <p className="text-base">Make Primary Microsite</p>
              <Switch
                color="default"
                size="sm"
                defaultSelected
                aria-label="Lead Captures"
              />
            </div>
            <div onClick={handleModal}>
              <EditMicrositeBtn className="rounded-lg text-base !bg-transparent border-gray-300 py-2 w-max">
                <LiaFileMedicalSolid size={20} color="#001534" /> Edit
                Background/Banner
              </EditMicrositeBtn>
            </div>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">
              Select Message Address
            </p>
            <div className="relative flex-1 mt-1">
              <TbUserSquare
                className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-600"
                size={18}
              />
              <input
                placeholder={`Swop Username, ENS or Public Address`}
                className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-6 text-gray-700 bg-white"
              />
              <button className="absolute right-6 top-1/2 -translate-y-1/2 font-medium text-gray-500 border px-4 py-1 rounded-xl border-gray-300">
                Connect
              </button>
            </div>
          </div>
          <div className="flex items-center gap-8 border border-gray-300 rounded-xl pl-4 pr-3 py-2 text-lg font-medium text-gray-600 w-max">
            <p className="text-base">Gated Access</p>
            <Switch
              color="default"
              size="sm"
              defaultSelected
              aria-label="Lead Captures"
            />
          </div>
          <div className="bg-white p-5 flex flex-col gap-2">
            <div className="relative flex-1 mt-1">
              <IoMdLink
                className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                size={18}
              />
              <input
                type="text"
                placeholder={`Contract Address`}
                className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
              />
            </div>
            <div className="relative flex-1 mt-1">
              <FiUser
                className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                size={18}
              />
              <input
                type="text"
                placeholder={`Token ID`}
                className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
              />
            </div>
            <div className="relative flex-1 mt-1">
              <IoMdLink
                className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                size={18}
              />
              <input
                type="text"
                placeholder={`Mint URL`}
                className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
              />
            </div>
          </div>
          <DynamicPrimaryBtn className="py-3 text-base !gap-1">
            <LiaFileMedicalSolid size={20} />
            Update
          </DynamicPrimaryBtn>
        </div>
        <div className="w-[38%]">
          <LivePreview isBackgroundImg={true} />
        </div>
      </div>
      <SelectBackgroudOrBannerModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        bannerImgArr={bannerImgArr}
        backgroundImgArr={backgroundImgArr}
        // onSelectImage={handleSelectImage}
        setIsModalOpen={setIsModalOpen}
        // handleFileChange={handleFileChange}
      />
    </main>
  );
};

export default EditSmartSite;
