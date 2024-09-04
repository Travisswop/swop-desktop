import React from "react";
import playstoreQrCode from "@/public/images/playstoreQrCode.png";
import playStore from "@/public/images/playStore.png";
import appleStore from "@/public/images/appleStore.png";
import appleQRCode from "@/public/images/appleQRCode.png";
import subscribe from "@/public/images/subscribe.png";
import Image from "next/image";

const SubscribePage = () => {
  return (
    <div
      style={{ minHeight: "calc(100vh - 108px)" }}
      className="w-full flex items-center justify-center bg-[#F3F4F6] overflow-y-auto"
    >
      <div className="bg-white p-8 w-5/6 lg:w-2/3 rounded-xl flex flex-col items-center h-full">
        <div className="flex flex-col gap-4 items-center">
          <Image alt="subscribe" src={subscribe} className="w-14 h-auto" />
          <div className="flex flex-col gap-1 items-center">
            <h1 className="font-bold text-3xl">You Need To Subscribe First</h1>
            <p className="text-gray-600 font-medium">
              You need to subscribe from our swop app
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <Image
                alt="apple qr code"
                src={appleQRCode}
                className="w-52 h-auto"
              />
              <a
                href="https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322"
                target="_blank"
              >
                <Image
                  alt="apple qr code"
                  src={appleStore}
                  className="w-32 h-auto"
                />
              </a>
            </div>
            <div className="flex flex-col items-center">
              <Image
                alt="apple qr code"
                src={playstoreQrCode}
                className="w-52 h-auto"
              />
              <a
                href="https://play.google.com/store/apps/details?id=com.travisheron.swopapp"
                target="_blank"
              >
                <Image
                  alt="apple qr code"
                  src={playStore}
                  className="w-32 h-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
