"use client"; // for onsubmit -> replace this with server action
import React, { useEffect, useState } from "react";
import defaultAvator from "../../../public/images/avator/default_avator.svg";
import Image from "next/image";
import UploadImageButton from "@/components/SignUp/UploadImageButton";
import uploadImgIcon from "../../../public/images/upload_image_icon.svg";
import { FiUser } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import SelectAvatorModal from "@/components/SelectAvatorModal";
import { useDisclosure } from "@nextui-org/react";
import { decryptData } from "@/util/cryptoUtils";
import { sendCloudinaryImage } from "@/util/SendCloudineryImage";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import axios from "axios";
import ProfileLoading from "@/util/loading/ProfileLoading";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const ParentProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImage, setGalleryImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [countryCode, setCountryCode] = useState("us");
  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState<any>(null);

  const [phone, setPhone] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    //need this to get data from localstorage
    if (typeof window !== "undefined") {
      // Safe to use localStorage here
      const encInfo = localStorage.getItem("info");
      const decryptInfo = decryptData(encInfo);
      setUserData(decryptInfo);
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      axios
        .get(url)
        .then((response) => {
          // if (response.data) {
          setCountryCode(response.data.address.country_code);
          // }
          console.log("location", response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching geolocation data:", error);
        });
    });
  }, []);

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

  if (galleryImage) {
    //get cloudinery uploaded image
    sendCloudinaryImage(galleryImage)
      .then((url) => {
        console.log("Uploaded image URL:", url);
        setUploadedImageUrl(url);
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
      });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userInfo = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: userData.password,
      mobileNo: formData.get("mobileNo"),
      address: formData.get("address"),
      bio: formData.get("bio"),
      dob: formData.get("dob"),
      profilePic: selectedImage || uploadedImageUrl || "1",
      socialSignUp: false,
      isPremiumUser: false,
      NotificationToken: "swop-desktop",
      countryCode: "",
      countryFlag: "",
      apt: "",
    };
    console.log("form submitted successfully");
  };

  const handleSelectImage = (image: any) => {
    setSelectedImage(image);
    setGalleryImage(null);
  };

  console.log("galleryImage", galleryImage);

  console.log("selectedImage", selectedImage);

  const handleModal = () => {
    onOpen();
    setIsModalOpen(true);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(null);
      setIsModalOpen(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryImage(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };

  // console.log("value", value);

  return (
    <section className="bg-white sm:bg-[#F7F7F9] flex sm:items-center justify-center w-full h-full sm:h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full md:w-5/6 lg:w-4/6 mx-6 md:mx-0 py-10 sm:py-6 sm:pr-6 h-full sm:h-auto"
      >
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 lg:gap-10 2xl:gap-16 sm:items-center w-full h-full mb-4 sm:mb-10">
          <div className="flex-1 flex flex-col gap-y-4 items-center sm:border-r border-gray-500 lg:px-3 xl:px-0">
            <h1 className="text-xl font-bold">Parent Profile</h1>
            <p className="text-sm text-gray-600 text-center">
              This is your account profile used to <br /> manage the Swop
              ecosystem
            </p>
            <div className="relative w-52 h-52 overflow-hidden rounded-full">
              <div className="bg-[#A7B3C4]">
                {galleryImage ? (
                  <Image
                    src={galleryImage}
                    width={260}
                    height={260}
                    alt="default avator"
                    quality={100}
                    className="rounded-full w-full h-full"
                  />
                ) : (
                  <Image
                    src={
                      selectedImage
                        ? `/images/avator/${selectedImage}`
                        : defaultAvator
                    }
                    width={260}
                    height={260}
                    alt="default avator"
                    quality={100}
                    className="rounded-full w-full h-full"
                  />
                )}
              </div>
              <div className="bg-[#3f3f3f43] absolute top-1/2 w-full h-full">
                <button onClick={handleModal}>
                  <Image
                    src={uploadImgIcon}
                    alt="upload image icon"
                    width={28}
                    className="absolute left-1/2 top-8 -translate-x-[50%]"
                  />
                </button>
              </div>
            </div>
            <UploadImageButton handleModal={handleModal} />
          </div>
          {loading ? (
            <div className="flex-1 lg:flex-[1.5] xl:flex-[2]">
              <ProfileLoading />
            </div>
          ) : (
            <div className="flex-1 lg:flex-[1.5] xl:flex-[2]">
              <h6 className="font-semibold mb-4 text-lg">Parent Profile</h6>
              {/* <p>country code: {countryCode}</p> */}
              <div className="flex flex-col gap-y-4">
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
                      defaultValue={userData.name}
                      placeholder="Enter name"
                      className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                    />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="bio" className="mb-2 block">
                    Bio<span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <FaRegUserCircle
                      className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                      size={18}
                    />
                    <input
                      type="text"
                      id="bio"
                      placeholder="Enter bio"
                      className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                    />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="phone" className="mb-2 block">
                    Phone Number
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  {loading ? (
                    "loading..."
                  ) : (
                    <PhoneInput
                      defaultCountry={countryCode}
                      forceDialCode={true}
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                      className="w-full"
                    />
                  )}
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
                      defaultValue={userData.email}
                      placeholder="Enter email"
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
                      placeholder="Enter birth date"
                      className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                    />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="address" className="mb-2 block">
                    Address (Shopping Delivery Address)
                  </label>

                  {/* <p>value: {value && value?.label}</p> */}
                  <GooglePlacesAutocomplete
                    apiKey="AIzaSyDaERPmsWGDCk2MrKXsqkMfPkSu614Simk"
                    selectProps={{
                      value,
                      onChange: setValue as any,
                    }}
                  />
                  {/* <div className="relative">
                    <CiLocationOn
                      className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                      size={18}
                    />
                    <input
                      type="address"
                      id="address"
                      placeholder="Enter address"
                      className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2 rounded-xl flex items-center gap-1 justify-center px-10 mx-auto text-sm w-full sm:w-auto"
        >
          Save
        </button>
      </form>

      {/* modal here  */}
      {isModalOpen && (
        <SelectAvatorModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          images={images}
          onSelectImage={handleSelectImage}
          setIsModalOpen={setIsModalOpen}
          handleFileChange={handleFileChange}
        />
      )}
    </section>
  );
};

export default ParentProfilePage;
