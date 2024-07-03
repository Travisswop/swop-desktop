import Image from "next/image";
import React from "react";
import message from "@/public/images/live-preview/icon/message.svg";
import deposit from "@/public/images/live-preview/icon/deposit.svg";
import location from "@/public/images/live-preview/icon/location.svg";
import website from "@/public/images/live-preview/icon/website.svg";
import contacts from "@/public/images/live-preview/icon/contacts.svg";
import swop from "@/public/images/live-preview/swop.svg";
import { BiSolidEdit } from "react-icons/bi";
import useSmartsiteFormStore from "@/zustandStore/EditSmartsiteInfo";
import isUrl from "@/util/isUrl";
import { tintStyle } from "@/util/IconTintStyle";
import useUpdateSmartIcon from "@/zustandStore/UpdateSmartIcon";
import useSmallIconToggleStore from "@/zustandStore/SmallIconModalToggle";
import getSmallIconImage from "@/util/retriveIconImage/getSmallIconImage";
import getAppIconImage from "@/util/retriveIconImage/getAppIconImage";
import { FaEdit } from "react-icons/fa";
import TikTokEmbed from "./embed/tiktokEmbed";
import TwitterEmbed from "./embed/twitterEmbed";
import useSideBarToggleStore from "@/zustandStore/SideBarToggleStore";

const LivePreview = ({ data }: { data?: any }) => {
  const setSmartSiteData = useUpdateSmartIcon((state: any) => state.setState);
  const { toggle } = useSideBarToggleStore();

  const listArry = [
    {
      _id: 123,
      img: message,
      title: "Travis.Swopple.Id",
      text: "Message Me Using the Swopple Wallet",
    },
    {
      _id: 133,
      img: contacts,
      title: "Travis Herron",
      text: `(408) 555-1234`,
    },
    {
      _id: 143,
      img: deposit,
      title: "Deposit",
      text: "Use my Swopple.Id to send to my self wallet",
    },
    {
      _id: 153,
      img: location,
      title: "Our Headquarters",
      text: "Get A Free tour of Our headquarters",
    },
    {
      _id: 12366,
      img: website,
      title: "Our Website",
      text: "www.swopme.co",
    },
  ];

  // console.log("data form live", data);
  const { formData }: any = useSmartsiteFormStore();
  const { setOn }: any = useSmallIconToggleStore();

  const handleTriggerUpdate = (data: {
    data: any;
    categoryForTrigger: string;
  }) => {
    setSmartSiteData(data);
    setOn(true);
  };

  return (
    <section className="">
      <p className="text-sm text-gray-500 mb-2">Preview</p>
      <div
        className={`shadow-md bg-white rounded-xl bg-cover`}
        style={{
          backgroundImage:
            formData.theme &&
            `url(/images/smartsite-background/${formData.backgroundImg}.png)`,
        }}
      >
        <div className="relative">
          {!formData.theme && (
            <>
              {formData.backgroundImg ? (
                <>
                  <div className="bg-white p-2 rounded-xl shadow-md">
                    <Image
                      alt="banner image"
                      src={`/images/smartsite-banner/${formData.backgroundImg}.png`}
                      width={800}
                      height={400}
                      className="rounded-xl w-full h-auto"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white p-2 rounded-xl shadow-md">
                    <Image
                      alt="banner image"
                      src={`/images/smartsite-banner/${data.backgroundImg}.png`}
                      width={800}
                      height={400}
                      className="rounded-xl w-full h-auto"
                    />
                  </div>
                </>
              )}
            </>
          )}

          <div
            className={`${
              !formData.theme
                ? "absolute top-full -translate-y-1/2 left-1/2 -translate-x-1/2"
                : "flex justify-center pt-24"
            } `}
          >
            {formData.galleryImg ? (
              <>
                <Image
                  alt="user image"
                  src={formData.galleryImg}
                  width={140}
                  height={140}
                  className="rounded-full w-28 xl:w-36 2xl:w-44 h-28 xl:h-36 2xl:h-44 p-1 bg-white shadow-medium"
                />
              </>
            ) : (
              <>
                {formData.profileImg ? (
                  <>
                    {isUrl(formData.profileImg) ? (
                      <Image
                        alt="user image"
                        src={formData.galleryImg}
                        width={140}
                        height={140}
                        className="rounded-full w-28 xl:w-36 2xl:w-44 h-28 xl:h-36 2xl:h-44 p-1 bg-white shadow-medium"
                      />
                    ) : (
                      <Image
                        alt="user image"
                        src={`/images/user_avator/${formData.profileImg}.png`}
                        width={140}
                        height={140}
                        className="rounded-full w-28 xl:w-36 2xl:w-44 h-auto p-1 bg-white shadow-medium border-2 border-gray-200"
                      />
                    )}
                  </>
                ) : (
                  <>
                    {isUrl(data.profilePic) ? (
                      <Image
                        alt="user image"
                        src={data.profilePic}
                        width={140}
                        height={140}
                        className="rounded-full w-28 xl:w-36 2xl:w-44 h-auto p-1 bg-white shadow-md"
                      />
                    ) : (
                      <Image
                        alt="user image"
                        src={`/images/user_avator/${data.profilePic}.png`}
                        width={140}
                        height={140}
                        className="rounded-full w-28 xl:w-36 2xl:w-44 h-auto p-1 bg-white shadow-medium border-2 border-gray-200"
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div
          className={`${
            !formData.theme && "mt-[4.5rem] xl:mt-20 2xl:mt-28"
          }  flex flex-col gap-6 mt-6`}
        >
          <div className="flex flex-col items-center">
            <p className="text-lg font-bold text-gray-700">
              {formData.name || data?.name}
            </p>
            <p className="text-gray-500 font-medium text-sm">
              {formData.bio || data?.bio}
            </p>
          </div>

          {/* small icon display here start */}
          <div className="flex gap-x-4 gap-y-2 justify-center items-center flex-wrap px-16">
            {data.info.socialTop.map((data: any, index: number) => (
              <button
                key={index}
                onClick={() =>
                  handleTriggerUpdate({
                    data,
                    categoryForTrigger: "socialTop",
                  })
                }
              >
                <Image
                  src={getSmallIconImage(data.name, data.group) as any}
                  alt="icon"
                  style={tintStyle}
                  className="w-5"
                  quality={100}
                />
              </button>
            ))}
          </div>
          {/* small icon display here end */}

          {/* app icon display here start */}
          <div className="flex gap-x-5 gap-y-3 justify-center items-center flex-wrap px-10">
            {data.info.socialLarge.map((data: any, index: number) => (
              <div className="flex flex-col items-center gap-1" key={index}>
                <button
                  onClick={() =>
                    handleTriggerUpdate({
                      data,
                      categoryForTrigger: "socialLarge",
                    })
                  }
                >
                  <Image
                    src={getAppIconImage(data.name, data.group) as any}
                    alt="icon"
                    // style={tintStyle}
                    className="w-[4.2rem]"
                    quality={100}
                  />
                </button>
                <p className="text-sm">{data.name}</p>
              </div>
            ))}
          </div>
          {/* app icon display here end */}

          {/* contact card display here start */}
          <div className="flex flex-col gap-y-3 px-4">
            {data.info.contact.map((data: any) => (
              <button
                key={data._id}
                onClick={() =>
                  handleTriggerUpdate({
                    data,
                    categoryForTrigger: "contactCard",
                  })
                }
                className="flex items-center gap-2 bg-white py-2 px-3 rounded-lg shadow-medium"
              >
                <Image
                  src={
                    "/images/iconShop/outline-icons/dark/business-card-outline@3x.png"
                  }
                  alt="icon"
                  width={40}
                  height={40}
                  style={tintStyle}
                />
                <div className="flex flex-col items-start gap-0.5 text-start">
                  <p className="font-semibold text-gray-700">{data.name}</p>
                  <p className="text-xs text-gray-400">{data.mobileNo}</p>
                </div>
              </button>
            ))}
          </div>
          {/* contact card display here end */}

          {/* info bar display here start */}
          <div className="flex flex-col gap-y-3 px-4">
            {data.info.infoBar.map((data: any) => (
              <button
                key={data._id}
                onClick={() =>
                  handleTriggerUpdate({
                    data,
                    categoryForTrigger: "infoBar",
                  })
                }
                className="flex items-center gap-2 bg-white py-2 px-3 rounded-lg shadow-medium"
              >
                <Image
                  src={getAppIconImage(data.iconName, data.group) as any}
                  alt="icon"
                  width={40}
                  height={40}
                />
                <div className="flex flex-col items-start gap-0.5 text-start">
                  <p className="font-semibold text-gray-700">
                    {data.buttonName}
                  </p>
                  <p className="text-xs text-gray-400">{data.description}</p>
                </div>
              </button>
            ))}
          </div>
          {/* info bar display here end */}

          {/* embed link display here start */}
          <div className="flex flex-col gap-y-3 px-4 w-full">
            {data.info.videoUrl.map((videoData: any) => (
              <div
                key={videoData._id}
                className="flex items-center gap-2 w-full"
              >
                <div
                  className={`w-[96%] ${
                    videoData.type === "spotify"
                      ? `${
                          !toggle
                            ? "h-[90px] lg:h-[160px] xl:h-[160px] 2xl:h-[240px]"
                            : "h-[100px] lg:h-[160px] 2xl:h-[240px]"
                        }`
                      : "h-full"
                  } border-4 border-[#c685ff] rounded-2xl overflow-hidden`}
                >
                  {videoData.type === "tiktok" ? (
                    <div className="embed-container-tiktok">
                      <TikTokEmbed embedHtml={videoData.videoUrl} />
                    </div>
                  ) : videoData.type === "twitter" ? (
                    <div className="embed-container">
                      {" "}
                      <TwitterEmbed embedHtml={videoData.videoUrl} />
                    </div>
                  ) : (
                    <div className="embed-responsive">
                      <div
                        className="w-full"
                        dangerouslySetInnerHTML={{ __html: videoData.videoUrl }}
                      />
                    </div>
                  )}
                </div>
                <div className="w-[4%]">
                  <button
                    onClick={() =>
                      handleTriggerUpdate({
                        data: videoData,
                        categoryForTrigger: "embed",
                      })
                    }
                    className=""
                  >
                    <FaEdit size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* embed link display here end */}

          <div className="flex flex-col gap-4 px-4">
            {listArry.map((data) => (
              <div
                key={data._id}
                className="flex items-center gap-2 bg-white py-2 px-3 rounded-lg shadow-medium"
              >
                <Image src={data.img} alt="icon" width={40} />
                <div>
                  <p className="font-semibold text-gray-700">{data.title}</p>
                  <p className="text-xs text-gray-400">{data.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 pb-6 pt-2">
            <Image alt="swop logo" src={swop} />
            <BiSolidEdit />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivePreview;
