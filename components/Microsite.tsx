"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiSettings } from "react-icons/ci";
import Image from "next/image";
import travisImg from "@/public/images/websites/travis-image.png";
import bgImg from "@/public/images/websites/background-image.png";
import edit from "@/public/images/websites/icon/edit.svg";
import barcode from "@/public/images/websites/icon/scan-barcode.svg";
import send from "@/public/images/websites/icon/send.svg";
import wallet from "@/public/images/websites/icon/wallet.svg";
import qrcode from "@/public/images/websites/qrcode.png";
import { LiaFileMedicalSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { Navigation } from "swiper/modules";
import { EffectCreative } from "swiper/modules";
import isUrl from "@/util/isUrl";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { IoMdCloudDownload } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import AnimateButton from "./Button/AnimateButton";

const Microsite = ({ microsites }: any) => {
  // console.log("microsites", microsites);

  return (
    <div className="">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        navigation={true}
        grabCursor={true}
        effect={"creative"}
        loop={true}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[Navigation, EffectCreative]}
        className="mySwiper"
      >
        {microsites.map((microsite: any) => (
          <SwiperSlide key={microsite._id}>
            <div className="py-8 px-8 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl text-gray-700 font-bold">Smart Sites</h3>
                <Link href={`/smartsites/icons/${microsite._id}`}>
                  <AnimateButton
                    width="w-48"
                    className="text-gray-700 flex gap-1"
                  >
                    <CiSettings size={20} />
                    Manage Sites
                  </AnimateButton>
                </Link>
              </div>
              <div className={`shadow-medium rounded-2xl my-6 mx-10 pt-3 pb-8`}>
                <div className="">
                  <div className="relative px-6">
                    {/* {!microsite.theme && (
                      <Image
                        alt="background image"
                        src={`/images/live-preview/banner/${microsite.backgroundImg}.png`}
                        quality={100}
                        width={200}
                        height={120}
                        className="w-full"
                      />
                    )} */}
                    {isUrl(microsite.profilePic) ? (
                      <Image
                        alt="travis image"
                        src={microsite.profilePic}
                        width={130}
                        height={130}
                        className={`rounded-full border mx-auto translate-y-6`}
                        // className={`rounded-full border ${
                        //   !microsite.theme
                        //     ? "absolute -translate-y-24 left-1/2 -translate-x-[50%]"
                        //     : "mx-auto translate-y-6"
                        // }`}
                      />
                    ) : (
                      <Image
                        alt="travis image"
                        src={`/images/user_avator/${microsite.profilePic}.png`}
                        width={130}
                        height={130}
                        className={`rounded-full border mx-auto translate-y-6`}
                        // className={`rounded-full border ${
                        //   !microsite.theme
                        //     ? "absolute -translate-y-24 left-1/2 -translate-x-[50%]"
                        //     : "mx-auto translate-y-6"
                        // }`}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-center pt-10">
                  <h2 className="text-xl font-bold">{microsite.name}</h2>
                  <p className="text-gray-500 font-medium text-sm">
                    {microsite.bio}
                  </p>
                </div>
                <div className="flex items-center gap-3 justify-center mt-6">
                  <Link href={`/smartsites/${microsite._id}`}>
                    <button className="bg-black p-2.5 rounded-lg">
                      <Image alt="edit" src={edit} width={18} />
                    </button>
                  </Link>
                  {/* <button className="bg-black p-2.5 rounded-lg">
                    <Image alt="barcode" src={barcode} width={18} />
                  </button> */}
                  <button className="bg-black p-2.5 rounded-lg">
                    <Image alt="send" src={send} width={18} />
                  </button>
                  <button className="bg-black p-2.5 rounded-lg">
                    <Image alt="wallet" src={wallet} width={18} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Image
                  alt="qr code"
                  src={microsite.qrcodeUrl}
                  width={150}
                  height={150}
                  className="border-2 p-2 border-gray-500 rounded-2xl"
                />
                <div className="flex items-center gap-3">
                  <Link href={`/smartsites/qr-code/${microsite._id}`}>
                    <button className="bg-black p-2.5 rounded-lg">
                      <Image alt="edit" src={edit} width={18} />
                    </button>
                  </Link>
                  <button className="bg-black p-2.5 rounded-lg">
                    <Image alt="send" src={send} width={18} />
                  </button>
                  <a
                    href={microsite.qrcodeUrl}
                    download="qrcode.png"
                    className="bg-black p-2 rounded-lg"
                  >
                    <FiDownload color="white" size={20} />
                  </a>
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <button className="bg-black text-white py-2.5 rounded-lg flex items-center gap-2 justify-center px-6 font-medium">
                  <LiaFileMedicalSolid size={22} /> Create Smart Site
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center mt-3">
                Deploy a website with decentralized content hosting
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Microsite;
