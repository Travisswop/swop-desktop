"use client"; // for onsubmit -> replace this with server action
import React, { useEffect, useRef, useState } from "react";
import defaultAvator from "../../../public/images/avator/default_avator.svg";
import Image from "next/image";
import UploadImageButton from "@/components/SignUp/UploadImageButton";
import uploadImgIcon from "../../../public/images/upload_image_icon.svg";
import { FiUser } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import SelectAvatorModal from "@/components/modal/SelectAvatorModal";
import { Spinner, useDisclosure } from "@nextui-org/react";
import { decryptData } from "@/util/cryptoUtils";
import { sendCloudinaryImage } from "@/util/SendCloudineryImage";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import axios from "axios";
import ProfileLoading from "@/components/loading/ProfileLoading";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import { handleSignUp } from "@/actions/signUp";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const UpdateProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImage, setGalleryImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userLocation, setUserLocation] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [value, setValue] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [dobDate, setDobDate] = useState<any>(new Date().getTime());

  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // console.log("selectedCountryCode", selectedCountryCode);

  // useEffect(() => {
  //   //need this to get data from localstorage
  //   if (typeof window !== "undefined") {
  //     // Safe to use localStorage here
  //     const encInfo = localStorage.getItem("info");
  //     const decryptInfo = decryptData(encInfo);
  //     setUserData(decryptInfo);
  //   }
  // }, []);

  useEffect(() => {
    const geoTimeout = setTimeout(() => {
      console.error("Geolocation request timed out.");
      setLoading(false);
    }, 5000); // 4 seconds timeout

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          clearTimeout(geoTimeout);
          const { latitude, longitude } = pos.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          axios
            .get(url)
            .then((response) => {
              setUserLocation(response.data);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching geolocation data:", error);
              setLoading(false);
            });
        },
        (error) => {
          clearTimeout(geoTimeout);
          console.error("Error retrieving geolocation:", error);
          setLoading(false);
        },
        { timeout: 5000 } // 10 seconds timeout for geolocation API
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      setLoading(false);
    }
  }, []);

  const images = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
  ];

  if (galleryImage) {
    //get cloudinery uploaded image
    sendCloudinaryImage(galleryImage)
      .then((url) => {
        // console.log("Uploaded image URL:", url);
        setUploadedImageUrl(url);
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
      });
  }

  const handleSubmit = async (e: any) => {
    setSubmitLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const countryCode = formData.get("mobileNo") as string;
    const userInfo = {
      name: formData.get("name"),
      email: userData.email,
      password: userData.password,
      mobileNo: formData.get("mobileNo") || "",
      address: value?.label || "",
      bio: formData.get("bio"),
      dob: dobDate,
      profilePic: selectedImage || uploadedImageUrl || "1",
      socialSignup: false,
      isPremiumUser: false,
      notificationToken: "swop-desktop",
      countryCode: countryCode?.split(" ")[0] || "+1",
      countryFlag:
        selectedCountryCode || userLocation.address.country_code || "us",
      apt: "N/A",
    };

    try {
      const response = await handleSignUp(userInfo);
      if (response.state === "success") {
        localStorage.setItem(
          "primaryMicrosite",
          response.data.microsites[0]._id
        );
        const data = await signIn("credentials", {
          email: userInfo.email,
          password: userInfo.password,
          redirect: false,
        });
        // console.log("response for login", data);

        if (data && !data.error) {
          localStorage.removeItem("info");
          localStorage.setItem("modalShown", "true");
          router.push("/?signup=success");
          // toast.success("Welcome to swop");
        } else {
          toast.warn("Automatic Sign In failed! Please Sign In.");
        }
      }
    } catch (error) {
      toast.error("something went wrong! Please try again");
      console.error("error from hola", error);

      setSubmitLoading(false);
    }
    // console.log("form submitted successfully", userInfo);
  };

  const handleSelectImage = (image: any) => {
    setSelectedImage(image);
    setGalleryImage(null);
  };

  // console.log("galleryImage", galleryImage);

  // console.log("selectedImage", selectedImage);

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

  const dateInputRef = useRef<any>(null);

  const handleDateIconClick = () => {
    dateInputRef?.current?.showPicker(); // Triggers the native date picker
  };

  // console.log("dobDate", dobDate.getTime());

  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   const parsedDate = parse(value, "yyyy-MM-dd", new Date());
  //   setDobDate(parsedDate);
  // };

  const handleChange = (e: any) => {
    const { value } = e.target;
    const parsedDate = parse(value, "yyyy-MM-dd", new Date());
    const timestamp = parsedDate.getTime(); // Get Unix timestamp (milliseconds)
    setDobDate(timestamp);
  };

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
            <div className="w-52 h-52 overflow-hidden rounded-full border-2 border-[#8A2BE2] border-opacity-20 relative">
              <div className="bg-white ">
                {galleryImage ? (
                  <Image
                    src={galleryImage}
                    width={400}
                    height={400}
                    alt="image"
                    quality={100}
                    className="rounded-full bg-white w-52 h-52"
                  />
                ) : (
                  <Image
                    src={
                      selectedImage
                        ? `/images/user_avator/${selectedImage}.png`
                        : `/images/user_avator/1.png`
                    }
                    width={260}
                    height={260}
                    alt="avator"
                    quality={100}
                    className="rounded-full w-full h-full bg-white"
                  />
                )}
              </div>
              <div className="bg-[#3f3f3f50] absolute top-1/2 w-full h-full">
                <button type="button" onClick={handleModal}>
                  <Image
                    src={uploadImgIcon}
                    alt="upload image icon"
                    width={28}
                    className="absolute left-1/2 top-8 -translate-x-[50%]"
                  />
                </button>
              </div>
            </div>
            {/* <div className="relative w-52 h-52 overflow-hidden rounded-full">
              <div className="bg-white">
                {galleryImage ? (
                  <Image
                    src={galleryImage}
                    width={260}
                    height={260}
                    alt="image"
                    quality={100}
                    className="rounded-full w-full h-full bg-white"
                  />
                ) : (
                  <Image
                    src={
                      selectedImage
                        ? `/images/user_avator/${selectedImage}.png`
                        : `/images/user_avator/1.png`
                    }
                    width={260}
                    height={260}
                    alt="avator"
                    quality={100}
                    className="rounded-full w-full h-full bg-white"
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
            </div> */}
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
                      size={19}
                    />
                    <input
                      type="text"
                      id="fullName"
                      name="name"
                      defaultValue={userData.name}
                      required
                      placeholder="Enter name"
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
                      name="bio"
                      placeholder="Enter bio"
                      className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                    />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="phone" className="mb-2 block">
                    Phone Number
                  </label>
                  {loading ? (
                    "loading..."
                  ) : (
                    <PhoneInput
                      defaultCountry={
                        userLocation?.address?.country_code || "us"
                      }
                      forceDialCode={true}
                      value={phone}
                      name="mobileNo"
                      onChange={(phone, country) => {
                        setPhone(phone);
                        setSelectedCountryCode(country.country.iso2); // Update the selected country code
                      }}
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
                      size={19}
                    />
                    <input
                      type="text"
                      id="email"
                      defaultValue={userData.email}
                      required
                      readOnly
                      placeholder="Enter email"
                      className="w-full cursor-not-allowed border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                    />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="birthDate" className="mb-2 block">
                    Birth Date<span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative" onClick={handleDateIconClick}>
                    <button type="button">
                      <SlCalender
                        className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                        size={16}
                      />
                    </button>
                    <input
                      type="date"
                      id="birthDate"
                      ref={dateInputRef}
                      required
                      // value={dobDate}
                      value={format(dobDate, "yyyy-MM-dd")} // Format dobDate to 'yyyy-MM-dd'
                      // onChange={(e) =>
                      //   setDobDate(
                      //     format(new Date(e.target.value), "yyyy-MM-dd")
                      //   )
                      // }
                      onChange={handleChange}
                      placeholder="Enter birth date"
                      className="w-full border appearance-none pr-2 border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                    />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="address" className="mb-2 block">
                    Address (Shopping Delivery Address)
                  </label>

                  <GooglePlacesAutocomplete
                    apiKey="AIzaSyDaERPmsWGDCk2MrKXsqkMfPkSu614Simk"
                    selectProps={{
                      value,
                      onChange: setValue as any,
                      placeholder: "Enter address",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={submitLoading}
          className="bg-black text-white py-2 rounded-xl flex items-center gap-2 justify-center px-10 mx-auto text-sm w-full sm:w-auto"
        >
          Save {submitLoading && <Spinner size="sm" color="white" />}
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

export default UpdateProfile;
