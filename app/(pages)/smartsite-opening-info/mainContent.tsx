"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import email from "@/public/images/social-icon/email.svg";
import facebook from "@/public/images/social-icon/facebook.svg";
import instagram from "@/public/images/social-icon/instagram.svg";
import linkedin from "@/public/images/social-icon/linkedin.svg";
import location from "@/public/images/social-icon/location.svg";
// import message from "@/public/images/social-icon/message.svg";
// import snapchat from "@/public/images/social-icon/snapchat.svg";
import tiktok from "@/public/images/social-icon/tiktok.svg";
// import video from "@/public/images/social-icon/video.svg";
import website_link from "@/public/images/social-icon/website_link.svg";
import whatsapp from "@/public/images/social-icon/whatsapp.svg";
// import youtube from "@/public/images/social-icon/youtube.svg";
import contact from "@/public/images/social-icon/contact.svg";
import twitter from "@/public/images/social-icon/x.svg";
import SmartSiteInfoModal from "@/components/modal/SmartSiteInfoModal";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { postPrimaryMicrosite } from "@/actions/addParentMicrosite";

// export const maxDuration = 60;

const SmartsideOpeningInfo = ({
  userSessionName,
  userSessionEmail,
  token,
}: {
  userSessionName: string;
  userSessionEmail: string;
  token: string;
}) => {
  //state
  const [micrositeId, setMicrositeId] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialSignedUpUserData, setInitialSignedUpUserData] =
    useState<any>(null);
  const [value, setValue] = useState<any>(initialSignedUpUserData?.location);

  const router = useRouter();

  // console.log("initialSignedUpUserData", initialSignedUpUserData);

  // console.log("value", value);

  // console.log(userSessionName, userSessionEmail, token);

  useEffect(() => {
    //need this to get data from localstorage
    if (typeof window !== "undefined") {
      const primaryMicrositeId = localStorage.getItem("primaryMicrosite");
      setMicrositeId(primaryMicrositeId);
      const storedObject = JSON.parse(
        localStorage.getItem("inititalUserData") as any
      );
      if (storedObject) {
        storedObject.mobileNo = storedObject.mobileNo.split(" ")[1];
        setInitialSignedUpUserData(storedObject);
        setValue({
          label: storedObject.location,
          value: { description: storedObject.location },
        });
      }
    }
  }, []);

  const socialSmall = [] as any;
  const infoBar = [] as any;
  const contacts = [] as any;

  // console.log("social small", socialSmall);

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // console.log("hit");

    const email = formData.get("email");
    if (email) {
      socialSmall.push({
        micrositeId: micrositeId,
        name: "Email",
        value: email,
        url: email,
        iconName: "Email",
        iconPath: "",
        group: "Commands",
      });
    }
    const facebook = formData.get("facebook");
    if (facebook) {
      socialSmall.push({
        micrositeId: micrositeId,
        name: "Facebook",
        value: facebook,
        url: "https://facebook.com",
        iconName: "Facebook",
        iconPath: "",
        group: "Social Media",
      });
    }
    const twitter = formData.get("twitter");
    if (twitter) {
      socialSmall.push({
        micrositeId: micrositeId,
        name: "X",
        value: twitter,
        url: "https://x.com/username",
        iconName: "X",
        iconPath: "",
        group: "Social Media",
      });
    }
    const instagram = formData.get("instagram");
    if (instagram) {
      socialSmall.push({
        micrositeId: micrositeId,
        name: "Instagram",
        value: instagram,
        url: "https://instagram.com/",
        iconName: "Instagram",
        iconPath: "",
        group: "Social Media",
      });
    }
    const linkedin = formData.get("linkedin");
    if (linkedin) {
      socialSmall.push({
        micrositeId: micrositeId,
        name: "Linked In",
        value: linkedin,
        url: "https://linkedin.com/",
        iconName: "Linkedin",
        iconPath: "",
        group: "Social Media",
      });
    }
    const whatsapp = formData.get("whatsapp");
    if (whatsapp) {
      socialSmall.push({
        micrositeId: micrositeId,
        name: "Whatsapp",
        value: whatsapp,
        url: "https://web.whatsapp.com",
        iconName: "Whatsapp",
        iconPath: "",
        group: "Chat Links",
      });
    }
    const tiktok = formData.get("tiktok");
    if (tiktok) {
      socialSmall.push({
        micrositeId: micrositeId,
        name: "TikTok",
        value: tiktok,
        url: "https://tiktok.com",
        iconName: "TikTok",
        iconPath: "",
        group: "Social Media",
      });
    }
    const website = formData.get("website");
    if (website) {
      infoBar.push({
        micrositeId: micrositeId,
        title: website,
        link: website,
        iconName: "Website",
        buttonName: "Website Link",
        description: "Visit website for more information",
        iconPath: "",
        group: "Command/Action",
      });
    }
    const location = value?.value?.description;
    if (location) {
      infoBar.push({
        micrositeId: micrositeId,
        buttonName: "Address",
        title: "Our Location",
        link: "https://www.google.com/maps",
        description: "Get a free tour of our location",
        iconName: "Map",
        iconPath: "",
        group: "Command/Action",
      });
    }
    const phoneNumber = formData.get("phoneNumber");
    if (phoneNumber) {
      contacts.push({
        micrositeId: micrositeId,
        name: userSessionName ? userSessionName : "Contact",
        mobileNo: phoneNumber,
        email: email ? email : "",
        address: location ? location : "",
        websiteUrl: website ? website : "",
      });
    }

    // console.log("social small", socialSmall);
    // console.log("contacts", contacts);
    // console.log("infoBar", infoBar);

    const dataForPost = {
      socialSmall,
      socialLarge: [],
      infoBar,
      contact: contacts,
      micrositeId,
    };

    try {
      const response = await postPrimaryMicrosite(dataForPost, token);

      console.log("dataaaa", response);

      if (response.state === "success") {
        toast.success("smartsite info updated");
        router.push("/ens-swop-id/?signup=success");
      }
    } catch (error) {
      console.error("error from smartsite info page", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="pt-16 py-20">
        <div className="flex flex-col items-center gap-2 mb-12">
          <p className="text-2xl font-bold">SmartSite Information</p>
          <p className="text-sm font-medium text-gray-500">
            Input Below for AI SmartSite Build.
          </p>
          <p className="text-sm font-medium text-gray-500">
            You can edit after Site is generated.
          </p>
        </div>
        <div className="bg-white p-8 w-[80%] 2xl:w-[74%] mx-auto">
          <h3 className="text-xl font-bold text-gray-600 mb-5">
            Contact Details
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image alt="email icon" src={email} className="w-7" />
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  defaultValue={userSessionEmail}
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image alt="facebook icon" src={facebook} className="w-7" />
                </div>
                <input
                  type="text"
                  name="facebook"
                  placeholder="https://www.facebook.com/username"
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image alt="contact icon" src={contact} className="w-7" />
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Contact Number"
                  defaultValue={initialSignedUpUserData?.mobileNo}
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image alt="instagram icon" src={instagram} className="w-7" />
                </div>
                <input
                  type="text"
                  name="instagram"
                  placeholder="https://www.instagram.com/username"
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image alt="whatsapp icon" src={whatsapp} className="w-7" />
                </div>
                <input
                  type="text"
                  name="whatsapp"
                  placeholder="Whatsapp Number"
                  defaultValue={initialSignedUpUserData?.mobileNo}
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image alt="twitter icon" src={twitter} className="w-7" />
                </div>
                <input
                  type="text"
                  name="twitter"
                  placeholder="https://www.x.com/username"
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image alt="linkedin icon" src={linkedin} className="w-7" />
                </div>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="https://www.linkedin.com/in/username"
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image alt="tiktok icon" src={tiktok} className="w-7" />
                </div>
                <input
                  type="text"
                  name="tiktok"
                  placeholder="https://www.tiktok.com/username"
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image
                    alt="website icon"
                    src={website_link}
                    className="w-7"
                  />
                </div>
                <input
                  type="text"
                  name="website"
                  placeholder="https://example.com/xyz"
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image alt="location icon" src={location} className="w-7" />
                </div>
                {/* <input
                  type="text"
                  name="location"
                  placeholder="Enter Location"
                  defaultValue={initialSignedUpUserData?.location}
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                /> */}
                <div className="flex-1">
                  <GooglePlacesAutocomplete
                    apiKey="AIzaSyDaERPmsWGDCk2MrKXsqkMfPkSu614Simk"
                    selectProps={{
                      value,
                      onChange: setValue,
                      placeholder: "Enter address",
                      styles: {
                        control: (provided) => ({
                          ...provided,
                          border: "none", // Remove border
                          boxShadow: "none", // Remove box shadow
                          backgroundColor: "transparent",
                        }),
                        input: (provided) => ({
                          ...provided,
                          border: "none", // Remove input border
                          backgroundColor: "transparent",
                        }),
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="mt-8 bg-black text-white rounded py-2 w-32"
              >
                Save {isLoading && <Spinner size="sm" color="white" />}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SmartSiteInfoModal />
      </Suspense>
    </div>
  );
};

export default SmartsideOpeningInfo;
