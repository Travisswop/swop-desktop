import Image from "next/image";
import React from "react";
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
import twitter from "@/public/images/social-icon/twitter.svg";
import SmartSiteInfoModal from "@/components/modal/SmartSiteInfoModal";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";

const SmartsideOpeningInfo = () => {
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
          <form action="">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image alt="email icon" src={email} className="w-7" />
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image alt="email icon" src={facebook} className="w-7" />
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
                  <Image alt="email icon" src={contact} className="w-7" />
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Contact Number"
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg">
                <div className="py-3 px-4 border-r border-gray-300">
                  <Image alt="instagram icon" src={instagram} className="w-7" />
                </div>
                <input
                  type="text"
                  name="phoneNumber"
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
                  placeholder="https://www.twitter.com/username"
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
                  <Image alt="email icon" src={tiktok} className="w-7" />
                </div>
                <input
                  type="text"
                  name="linkedin"
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
                <input
                  type="text"
                  name="location"
                  placeholder="Enter Location"
                  className="w-full py-1.5 bg-gray-100 px-4 focus:outline-none"
                />
              </div>
            </div>
            <DynamicPrimaryBtn className="w-max !px-10 mx-auto mt-8">
              Save
            </DynamicPrimaryBtn>
          </form>
        </div>
      </div>
      <SmartSiteInfoModal />
    </div>
  );
};

export default SmartsideOpeningInfo;
