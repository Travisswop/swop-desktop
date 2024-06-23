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
import SelectAvatorModal from "@/components/modal/SelectAvatorModal";
import userProfileImages from "@/util/data/userProfileImage";
import { sendCloudinaryImage } from "@/util/SendCloudineryImage";
import smatsiteBackgroundImageList from "@/util/data/smatsiteBackgroundImageList";
import smatsiteBannerImageList from "@/util/data/smartsiteBannerImageList";
import useSmartsiteFormStore from "@/zustandStore/EditSmartsiteInfo";

const EditSmartSite = ({ data }: any) => {
  const [selectedImage, setSelectedImage] = useState(null); // get user avator image
  const [galleryImage, setGalleryImage] = useState(null); // get upload image base64 data
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // get uploaded url from cloudinery

  // console.log(
  //   "selected",
  //   selectedImage,
  //   "gallery",
  //   galleryImage,
  //   "upload url",
  //   uploadedImageUrl
  // );

  const [isGatedAccessOpen, setIsGatedAccessOpen] = useState(false);
  const [gatedAccessError, setGatedAccessError] = useState({
    contractAddress: "",
    tokenId: "",
    eventLink: "",
    network: "",
  });
  const [isPrimaryMicrosite, setIsPrimaryMicrosite] = useState(false);
  const [brandImage, setBrandImage] = useState("");
  const [name, setName] = useState(data.data.name);
  console.log("name", name);

  // const [profileImage, setProfileImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState({
    background: "",
    banner: "",
  });
  console.log("backgroundImage", backgroundImage);

  const [isBackgrundImageSelected, setIsBackgrundImageSelected] =
    useState(false);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  // console.log("gatedAccessError", gatedAccessError);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleBannerModal = () => {
    setIsUserProfileModalOpen(false);
    setIsBannerModalOpen(true);
    onOpen();
  };

  useEffect(() => {
    if (data.data.primary) {
      setIsPrimaryMicrosite(true);
    }
    if (data.data.gatedAccess) {
      setIsGatedAccessOpen(true);
    }
    if (data.data.theme) {
      setIsBackgrundImageSelected(true);
    }
  }, [data.data.primary, data.data.theme, data.data.gatedAccess]);

  // image upload for user profile
  const handleSelectImage = (image: any) => {
    setSelectedImage(image);
    setFormData("profileImg", image);
    setGalleryImage(null);
  };

  const handleUserProfileModal = () => {
    onOpen();
    setIsBannerModalOpen(false);
    setIsUserProfileModalOpen(true);
  };

  if (galleryImage) {
    //get cloudinery uploaded image
    sendCloudinaryImage(galleryImage)
      .then((url) => {
        // console.log("Uploaded image URL:", url);
        setUploadedImageUrl(url);
        setFormData("profileImg", url);
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
      });
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(null);
      setIsUserProfileModalOpen(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryImage(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSmartSiteUpdateInfo = async (e: any) => {
    // setSubmitLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // console.log("formData", formData);

    setGatedAccessError({
      contractAddress: "",
      tokenId: "",
      eventLink: "",
      network: "",
    });

    //set gated access error
    if (isGatedAccessOpen) {
      const errors = {
        contractAddress: "",
        tokenId: "",
        eventLink: "",
        network: "",
      };

      if (!formData.get("contractAddress")) {
        errors.contractAddress = "Contract address can't be empty!";
      }

      if (!formData.get("tokenId")) {
        errors.tokenId = "Token ID can't be empty!";
      }

      if (!formData.get("eventLink")) {
        errors.eventLink = "Mint Url can't be empty!";
      } else {
        const urlPattern = /^(https?:\/\/)/i;
        if (!urlPattern.test(formData.get("eventLink") as string)) {
          errors.eventLink = "Mint Url must start with http:// or https://";
        }
      }

      if (!formData.get("network")) {
        errors.network = "Network can't be empty!";
      }

      setGatedAccessError(errors);
      if (
        errors.contractAddress ||
        errors.eventLink ||
        errors.tokenId ||
        errors.network
      ) {
        return;
      }
    }

    const selectedTheme = backgroundImage.background ? true : false;

    const smartSiteInfo = {
      _id: data.data._id,
      name: formData.get("name") || "",
      bio: formData.get("bio") || "",
      brandImg: brandImage, //need to setup
      userName: data.data.username || "",
      profilePic: uploadedImageUrl || selectedImage || data.data.profilePic,
      backgroundImg: backgroundImage.background || backgroundImage.banner,
      gatedAccess: isGatedAccessOpen,
      gatedInfo: {
        contractAddress: formData.get("contractAddress") || "",
        tokenId: formData.get("tokenId") || "",
        eventLink: formData.get("eventLink") || "",
        network: formData.get("network") || "",
      },
      theme: selectedTheme,
      ens: data.data.ens || "",
      primary: isPrimaryMicrosite,
      web3enabled: data.data.web3enabled,
    };

    console.log("smartsite info", smartSiteInfo);

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

  const { formData, setFormData }: any = useSmartsiteFormStore();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(name, value);
  };

  console.log("formdata", formData);

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
                {selectedImage || galleryImage ? (
                  <>
                    {selectedImage ? (
                      <Image
                        alt="user image"
                        src={
                          selectedImage
                            ? `/images/user_avator/${selectedImage}.png`
                            : `/images/user_avator/1.png`
                        }
                        width={160}
                        height={160}
                        className="rounded-full"
                      />
                    ) : (
                      <Image
                        alt="user image"
                        src={galleryImage as any}
                        width={160}
                        height={160}
                        className="rounded-full w-44 h-44"
                      />
                    )}
                  </>
                ) : (
                  <>
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
                  </>
                )}
                <button
                  className="absolute right-0 bottom-4"
                  onClick={handleUserProfileModal}
                  type="button"
                >
                  <Image alt="edit icon" src={editIcon} width={40} />
                </button>
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
                    onChange={handleChange}
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
                    readOnly
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
                    onChange={handleChange}
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
            <EditMicrositeBtn
              onClick={handleBannerModal}
              className="rounded-lg text-base !bg-transparent border-gray-300 py-2 w-max"
            >
              <LiaFileMedicalSolid size={20} color="#001534" /> Edit
              Background/Banner
            </EditMicrositeBtn>
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
                  defaultValue={data.data.gatedInfo.contractAddress}
                  name="contractAddress"
                  className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
                />
              </div>
              {gatedAccessError.contractAddress && (
                <p className="text-sm text-red-600 font-medium">
                  {gatedAccessError.contractAddress}
                </p>
              )}
              <div className="relative flex-1 mt-1">
                <FiUser
                  className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                  size={18}
                />
                <input
                  type="text"
                  placeholder={`Token ID`}
                  name="tokenId"
                  defaultValue={data.data.gatedInfo.tokenId}
                  className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
                />
              </div>
              {gatedAccessError.tokenId && (
                <p className="text-sm text-red-600 font-medium">
                  {gatedAccessError.tokenId}
                </p>
              )}
              <div className="relative flex-1 mt-1">
                <IoMdLink
                  className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                  size={18}
                />
                <input
                  type="text"
                  placeholder={`Mint URL`}
                  name="eventLink"
                  defaultValue={data.data.gatedInfo.eventLink}
                  className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
                />
              </div>
              {gatedAccessError.eventLink && (
                <p className="text-sm text-red-600 font-medium">
                  {gatedAccessError.eventLink}
                </p>
              )}
              <div className="relative flex-1 mt-1">
                <IoMdLink
                  className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                  size={18}
                />
                <select
                  name="network"
                  defaultValue={data.data.gatedInfo.network || ""}
                  className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-white"
                >
                  <option value="" disabled>
                    Select Network
                  </option>
                  <option value="etherium">Ethereum</option>
                  <option value="matic">Polygon</option>
                </select>
              </div>
              {gatedAccessError.network && (
                <p className="text-sm text-red-600 font-medium">
                  {gatedAccessError.network}
                </p>
              )}
            </div>
          )}

          <DynamicPrimaryBtn className="py-3 text-base !gap-1">
            <LiaFileMedicalSolid size={20} />
            Update
          </DynamicPrimaryBtn>
        </form>
        <div className="w-[38%]">
          <LivePreview data={data.data} isBackgroundImg={true} />
        </div>
      </div>

      {isUserProfileModalOpen && (
        <SelectAvatorModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          images={userProfileImages}
          onSelectImage={handleSelectImage}
          setIsModalOpen={setIsUserProfileModalOpen}
          handleFileChange={handleFileChange}
        />
      )}

      {isBannerModalOpen && (
        <SelectBackgroudOrBannerModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          bannerImgArr={smatsiteBannerImageList}
          backgroundImgArr={smatsiteBackgroundImageList}
          setBackgroundImage={setBackgroundImage}
        />
      )}
    </main>
  );
};

export default EditSmartSite;
