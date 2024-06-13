"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import isUrl from "@/util/isUrl";
import { PiAddressBook } from "react-icons/pi";

const EditSmartSite = ({ data }: any) => {
  const [isGatedAccessOpen, setIsGatedAccessOpen] = useState(true);
  const [isPrimaryMicrosite, setIsPrimaryMicrosite] = useState(false);
  const [brandImage, setBrandImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [backgrundImage, setBackgrundImage] = useState("");
  const [isBackgrundImageSelected, setIsBackgrundImageSelected] =
    useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const backgroundImgArr = [
    "BackgroundImage1.png",
    "BackgroundImage2.png",
    "BackgroundImage3.png",
    "BackgroundImage4.png",
    "BackgroundImage5.png",
    "BackgroundImage6.png",
    "BackgroundImage7.png",
    "BackgroundImage8.png",
    "BackgroundImage9.png",
    "BackgroundImage10.png",
    "BackgroundImage11.png",
    "BackgroundImage12.png",
  ];
  const bannerImgArr = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
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
    "29.png",
    "30.png",
    "31.png",
    "32.png",
    "33.png",
  ];
  const handleModal = () => {
    onOpen();
  };

  useEffect(() => {
    if (data.data.primary) {
      setIsPrimaryMicrosite(true);
    }
    if (data.data.gatedAccess) {
      setIsGatedAccessOpen(true);
    }
  }, [data.data.primary]);

  const handleSmartSiteUpdateInfo = async (e: any) => {
    // setSubmitLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("formData", formData);

    const smartSiteInfo = {
      _id: data.data._id,
      name: formData.get("name") || "",
      bio: formData.get("bio") || "",
      brandImg: brandImage,
      userName: data.data.userName || "",
      profilePic: profileImage,
      backgroundImg: backgrundImage,
      gatedAccess: isGatedAccessOpen,
      gatedInfo: {
        contractAddress: formData.get("contractAddress") || "",
        eventLink: formData.get("eventLink") || "",
        tokenId: formData.get("tokenId") || "",
        network: formData.get("network") || "",
      },
      theme: isBackgrundImageSelected,
      ens: data.data.ens || "",
      primary: isPrimaryMicrosite,
      web3enabled: data.data.web3enabled,
    };

    // try {
    //   const response = await handleSignUp(userInfo);
    //   if (response.state === "success") {
    //     localStorage.setItem(
    //       "primaryMicrosite",
    //       response.data.microsites[0]._id
    //     );
    //     const data = await signIn("credentials", {
    //       email: userInfo.email,
    //       password: userInfo.password,
    //       redirect: false,
    //     });
    //     // console.log("response for login", data);

    //     if (data && !data.error) {
    //       localStorage.removeItem("info");
    //       localStorage.setItem("modalShown", "true");
    //       router.push("/?signup=success");
    //       // toast.success("Welcome to swop");
    //     } else {
    //       toast.warn("Automatic Sign In failed! Please Sign In.");
    //     }
    //   }
    // } catch (error) {
    //   toast.error("something went wrong! Please try again");
    //   console.error("error from hola", error);

    //   setSubmitLoading(false);
    // }
    // console.log("form submitted successfully", userInfo);
  };
  return (
    <main className="main-container overflow-hidden">
      <div className="flex gap-7 items-start">
        <form
          onSubmit={handleSmartSiteUpdateInfo}
          className="w-[62%] border-r border-gray-300 pr-8 flex flex-col gap-4"
        >
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-center">
              <div className="w-max relative">
                {isUrl(data.data.profilePic) ? (
                  <Image
                    alt="user image"
                    src={data.data.profilePic}
                    width={160}
                    height={160}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    alt="user image"
                    src={`/images/user_avator/${data.data.profilePic}.png`}
                    width={160}
                    height={160}
                    className="rounded-full"
                  />
                )}

                <Image
                  alt="edit icon"
                  src={editIcon}
                  width={40}
                  className="absolute right-0 bottom-4"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-6">
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
                    name="name"
                    placeholder={`Jhon Smith`}
                    defaultValue={data.data.name}
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="name" className="font-medium text-gray-700">
                  Profile Url
                </label>
                <div className="relative flex-1 mt-1">
                  <FiUser
                    className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                    size={18}
                  />
                  <input
                    type="text"
                    value={data.data.profileUrl}
                    placeholder={`https://swopme.app/sp/fghh`}
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white cursor-not-allowed"
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
                    defaultValue={data.data.bio}
                    name="bio"
                    className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-8 border border-gray-300 rounded-xl pl-4 pr-3 py-2 text-lg font-medium text-gray-600 w-max">
              <p className="text-base">Make Primary Microsite</p>
              <Switch
                color="default"
                size="sm"
                defaultSelected
                isSelected={isPrimaryMicrosite}
                onValueChange={setIsPrimaryMicrosite}
                // onClick={() => setIsPrimaryMicrosite(!isPrimaryMicrosite)}
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
                readOnly
                value={data.data.ens}
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
              isSelected={isGatedAccessOpen}
              onValueChange={setIsGatedAccessOpen}
              aria-label="Lead Captures"
            />
          </div>
          {isGatedAccessOpen && (
            <div className="bg-white p-5 flex flex-col gap-2">
              <div className="relative flex-1 mt-1">
                <PiAddressBook
                  className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                  size={19}
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
              <div className="relative flex-1 mt-1">
                <IoMdLink
                  className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                  size={18}
                />
                <select
                  // type="text"
                  // placeholder={`Mint URL`}
                  className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
                >
                  <option value="" disabled selected>
                    Select Network
                  </option>
                  <option value="etherium">Ethereum</option>
                  <option value="matic">Polygon</option>
                </select>
              </div>
            </div>
          )}

          <DynamicPrimaryBtn className="py-3 text-base !gap-1">
            <LiaFileMedicalSolid size={20} />
            Update
          </DynamicPrimaryBtn>
        </form>
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
        // setIsModalOpen={setIsModalOpen}
        // handleFileChange={handleFileChange}
      />
    </main>
  );
};

export default EditSmartSite;
