"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CiSettings } from "react-icons/ci";
import Image from "next/image";
import edit from "@/public/images/websites/icon/edit.svg";
import send from "@/public/images/websites/icon/send.svg";
import { LiaFileMedicalSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { Navigation } from "swiper/modules";
import { EffectCreative } from "swiper/modules";
import isUrl from "@/util/isUrl";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import AnimateButton from "./Button/AnimateButton";
import { useDisclosure } from "@nextui-org/react";
import QRCodeShareModal from "./ShareModal/QRCodeShareModal";
import { useEffect, useState } from "react";
import SmartSiteUrlShareModal from "./ShareModal/SmartsiteShareModal";

const Microsite = ({ microsites }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isSmartsiteOpen,
    onOpen: onSmartsiteOpen,
    onOpenChange: onSmartsiteOpenChange,
  } = useDisclosure();
  const [qrCode, setQrCode] = useState<any>(null);
  const [smartSiteProfileUrl, setSmartSiteProfileUrl] = useState<any>(null);
  const [activeMicrosite, setActiveMicrosite] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeMicrositeId = localStorage.getItem("selected smartsite");

      // console.log("active id", activeMicrositeId);

      const foundMicrosite = microsites.find(
        (microsite: any) => microsite._id === activeMicrositeId
      );

      // console.log("foundMicrosite", foundMicrosite);

      setActiveMicrosite(foundMicrosite);
    }
  }, [microsites]);

  // console.log("microstiessfs", microsites);

  useEffect(() => {
    if (typeof window !== undefined) {
      const primaryMicrosite = microsites.find(
        (microsite: any) => microsite.primary
      );
      localStorage.setItem("userPrimaryMicrosite", primaryMicrosite._id);
    }
  }, [microsites]);

  // console.log("active mircc", activeMicrosite);

  const handleOpenShareModal = (qrCodeUrl: any) => {
    onOpen();
    setSmartSiteProfileUrl(null);
    setQrCode(qrCodeUrl);
  };

  const handleOpenSmartSiteProfileShareModal = (smartsiteUrl: any) => {
    onSmartsiteOpen();
    setQrCode(null);
    setSmartSiteProfileUrl(smartsiteUrl);
  };

  return (
    <div className="">
      {microsites?.length > 0 && (
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
            <div key={microsite._id}>
              <SwiperSlide key={microsite._id}>
                <div className="py-8 px-8 bg-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg text-gray-700 font-semibold">
                      Smart Sites
                    </h3>
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
                  <div
                    className={`bg-[#F7F7F9] rounded-2xl my-6 mx-16 pt-3 pb-8 `}
                  >
                    <div className="">
                      <div className="relative px-6">
                        {isUrl(microsite.profilePic) ? (
                          <Image
                            alt="travis image"
                            src={microsite.profilePic}
                            width={130}
                            height={130}
                            className={`rounded-full border mx-auto translate-y-6`}
                          />
                        ) : (
                          <Image
                            alt="travis image"
                            src={`/images/user_avator/${microsite.profilePic}.png`}
                            width={130}
                            height={130}
                            className={`rounded-full border mx-auto translate-y-6`}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-center pt-10">
                      <h2 className="text-xl font-bold">{microsite.name}</h2>
                      <p className="text-gray-500 font-medium text-sm">
                        {microsite.jobTitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 justify-center mt-6">
                      <Link href={`/smartsites/${microsite._id}`}>
                        <button className="bg-black p-2.5 rounded-lg hover:bg-slate-800">
                          <Image
                            alt="edit"
                            src={"/images/homepage/edit.png"}
                            width={18}
                            height={18}
                            className="size-4"
                          />
                        </button>
                      </Link>
                      <button
                        onClick={() =>
                          handleOpenSmartSiteProfileShareModal(
                            microsite.profileUrl
                          )
                        }
                        className="bg-black p-2.5 rounded-lg hover:bg-slate-800"
                      >
                        <Image
                          alt="send"
                          src={"/images/homepage/send.png"}
                          width={18}
                          height={18}
                          className="size-4"
                        />
                      </button>
                      {/* <button
                        // onClick={() =>
                        //   handleOpenSmartSiteProfileShareModal(
                        //     microsite.profileUrl,
                        //   )
                        // }
                        className="bg-black p-2.5 rounded-lg hover:bg-slate-800"
                      >
                        <Image
                          alt="qr"
                          src={"/images/homepage/qr.png"}
                          width={18}
                          height={18}
                          className="size-5"
                        />
                      </button>
                      <button
                        // onClick={() =>
                        //   handleOpenSmartSiteProfileShareModal(
                        //     microsite.profileUrl,
                        //   )
                        // }
                        className="bg-black p-2.5 rounded-lg hover:bg-slate-800"
                      >
                        <Image
                          alt="wallet"
                          src={"/images/homepage/wallet.png"}
                          width={18}
                          height={18}
                          className="size-5"
                        />
                      </button> */}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Image
                      alt="qr code"
                      src={microsite.qrcodeUrl}
                      width={150}
                      height={150}
                      className="border-2 border-gray-500 rounded-2xl"
                    />
                    <div className="flex items-center gap-3">
                      <Link href={`/smartsites/qr-code/${microsite._id}`}>
                        <button className="bg-black p-2.5 rounded-lg">
                          <Image alt="edit" src={edit} width={18} />
                        </button>
                      </Link>
                      <button
                        onClick={() =>
                          handleOpenShareModal(microsite.qrcodeUrl)
                        }
                        className="bg-black p-2.5 rounded-lg"
                      >
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
                  <div className="flex justify-center mt-6">
                    <Link href={`/smartsites/create-smartsite`}>
                      <button className="bg-black text-white py-2.5 rounded-lg flex items-center gap-2 justify-center px-6 font-medium">
                        <LiaFileMedicalSolid size={22} /> Create Smart Site
                      </button>
                    </Link>
                  </div>
                  {/* <p className='text-sm text-gray-500 text-center mt-3'>
                    Deploy a website with decentralized content hosting
                  </p> */}
                </div>
              </SwiperSlide>
            </div>
          ))}
          {/* <div key={activeMicrosite._id}>
            <SwiperSlide>
              <div className="py-8 px-8 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg text-gray-700 font-semibold">
                    Smart Sites
                  </h3>
                  <Link href={`/smartsites/icons/${activeMicrosite._id}`}>
                    <AnimateButton
                      width="w-48"
                      className="text-gray-700 flex gap-1"
                    >
                      <CiSettings size={20} />
                      Manage Sites
                    </AnimateButton>
                  </Link>
                </div>
                <div
                  className={`shadow-medium rounded-2xl my-6 mx-10 pt-3 pb-8`}
                >
                  <div className="">
                    <div className="relative px-6">
                      {isUrl(activeMicrosite.profilePic) ? (
                        <Image
                          alt="travis image"
                          src={activeMicrosite.profilePic}
                          width={130}
                          height={130}
                          className={`rounded-full border mx-auto translate-y-6`}
                        />
                      ) : (
                        <Image
                          alt="travis image"
                          src={`/images/user_avator/${activeMicrosite.profilePic}.png`}
                          width={130}
                          height={130}
                          className={`rounded-full border mx-auto translate-y-6`}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-center pt-10">
                    <h2 className="text-xl font-bold">
                      {activeMicrosite.name}
                    </h2>
                    <p className="text-gray-500 font-medium text-sm">
                      {activeMicrosite.bio}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 justify-center mt-6">
                    <Link href={`/smartsites/${activeMicrosite._id}`}>
                      <button className="bg-black p-2.5 rounded-lg">
                        <Image alt="edit" src={edit} width={18} />
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        handleOpenSmartSiteProfileShareModal(
                          activeMicrosite.profileUrl
                        )
                      }
                      className="bg-black p-2.5 rounded-lg"
                    >
                      <Image alt="send" src={send} width={18} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Image
                    alt="qr code"
                    src={activeMicrosite.qrcodeUrl}
                    width={150}
                    height={150}
                    className="border-2 p-2 border-gray-500 rounded-2xl"
                  />
                  <div className="flex items-center gap-3">
                    <Link href={`/smartsites/qr-code/${activeMicrosite._id}`}>
                      <button className="bg-black p-2.5 rounded-lg">
                        <Image alt="edit" src={edit} width={18} />
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        handleOpenShareModal(activeMicrosite.qrcodeUrl)
                      }
                      className="bg-black p-2.5 rounded-lg"
                    >
                      <Image alt="send" src={send} width={18} />
                    </button>
                    <a
                      href={activeMicrosite.qrcodeUrl}
                      download="qrcode.png"
                      className="bg-black p-2 rounded-lg"
                    >
                      <FiDownload color="white" size={20} />
                    </a>
                  </div>
                </div>
                <div className="flex justify-center mt-10">
                  <Link href={`/smartsites/create-smartsite`}>
                    <button className="bg-black text-white py-2.5 rounded-lg flex items-center gap-2 justify-center px-6 font-medium">
                      <LiaFileMedicalSolid size={22} /> Create Smart Site
                    </button>
                  </Link>
                </div>
                <p className="text-sm text-gray-500 text-center mt-3">
                  Deploy a website with decentralized content hosting
                </p>
              </div>
            </SwiperSlide>
          </div> */}
        </Swiper>
      )}

      {qrCode && (
        <QRCodeShareModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          qrCodeUrl={qrCode}
        />
      )}

      {smartSiteProfileUrl && (
        <SmartSiteUrlShareModal
          isOpen={isSmartsiteOpen}
          onOpenChange={onSmartsiteOpenChange}
          smartSiteProfileUrl={smartSiteProfileUrl}
        />
      )}
    </div>
  );
};

export default Microsite;
