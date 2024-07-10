import Image from "next/image";
import React, { useMemo } from "react";
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
import { FaEdit, FaEye } from "react-icons/fa";
import TikTokEmbed from "./embed/tiktokEmbed";
import TwitterEmbed from "./embed/twitterEmbed";
import useSideBarToggleStore from "@/zustandStore/SideBarToggleStore";
import AnimateButton from "./Button/AnimateButton";
import AudioPlayer from "react-h5-audio-player";
import EmbedPlayer from "./livePreviewSmartsitesIcons/renderEmbedPlayer";

const LivePreview = ({ data }: { data?: any }) => {
  const setSmartSiteData = useUpdateSmartIcon((state: any) => state.setState);
  const { toggle } = useSideBarToggleStore();

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

  console.log("audio", data.info.audio);

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
          {/* blog display here start */}
          <div className="flex flex-col gap-y-3 px-4">
            {data.info.blog.map((item: any, index: number) => (
              <div
                key={index}
                className="shadow-small hover:shadow-medium p-3 2xl:p-4 rounded-lg"
              >
                <div>
                  <div>
                    <div className="relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-32 2xl:h-60 object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      {item?.title && (
                        <p className="text-lg font-bold text-gray-700 mt-2 mb-1">
                          {item.title}
                        </p>
                      )}
                      {item?.headline && (
                        <p className="text-sm font-medium text-gray-600 truncate">
                          {item.headline}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <AnimateButton
                    type="button"
                    onClick={() =>
                      handleTriggerUpdate({
                        data: item,
                        categoryForTrigger: "blog",
                      })
                    }
                    width="w-30"
                    className="!py-1 !rounded-md"
                  >
                    <FaEdit /> Edit
                  </AnimateButton>

                  <AnimateButton
                    type="button"
                    onClick={() =>
                      handleTriggerUpdate({
                        data: item,
                        categoryForTrigger: "showBlog",
                      })
                    }
                    width="w-30"
                    className="!py-1 !rounded-md !gap-1.5"
                  >
                    <FaEye size={18} /> Read More
                  </AnimateButton>
                </div>
              </div>
            ))}
          </div>
          {/* blog display here end */}
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
          {/* card here  */}
          <div className="flex flex-col gap-y-3">
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

            {/* swop pay display here start */}
            <div className="flex flex-col gap-y-3 px-4">
              {data.info.product.map((data: any) => (
                <div key={data._id} className="flex items-center gap-2 w-full">
                  <div
                    className={`w-full h-full bg-white py-2 px-3 rounded-lg shadow-medium`}
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() =>
                          handleTriggerUpdate({
                            data: data,
                            categoryForTrigger: "audio",
                          })
                        }
                        className="flex items-center gap-3"
                      >
                        <div className="relative">
                          <Image
                            src={data.imageUrl}
                            alt="cover photo"
                            width={120}
                            height={60}
                            className="w-11 h-11 rounded-md object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{data.title}</p>
                          <p className="text-sm">{data.description}</p>
                        </div>
                      </button>
                      <div className="custom-audio">${data.price}</div>
                    </div>
                  </div>
                  {/* <div className="w-[4%]">
                  <button
                    onClick={() =>
                      handleTriggerUpdate({
                        data: audioData,
                        categoryForTrigger: "audio",
                      })
                    }
                    className=""
                  >
                    <FaEdit size={18} />
                  </button>
                </div> */}
                </div>
              ))}
            </div>
            {/* swop pay display here end */}

            {/* audio||music display here start */}
            <div className="flex flex-col gap-y-3 px-4">
              {data.info.audio.map((audioData: any) => (
                <div
                  key={audioData._id}
                  className="flex items-center gap-2 w-full"
                >
                  <div
                    className={`w-full h-full bg-white py-2 px-3 rounded-lg shadow-medium`}
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() =>
                          handleTriggerUpdate({
                            data: audioData,
                            categoryForTrigger: "audio",
                          })
                        }
                        className="flex items-center gap-3"
                      >
                        <div className="relative">
                          <Image
                            src={audioData.coverPhoto}
                            alt="cover photo"
                            width={120}
                            height={60}
                            className="w-11 h-11 rounded-md object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{audioData.name}</p>
                          <p className="text-sm">
                            Tap play button to listen the audio
                          </p>
                        </div>
                      </button>
                      <div className="custom-audio">
                        <AudioPlayer
                          key={audioData.fileUrl}
                          autoPlay={false}
                          src={audioData.fileUrl}
                          showJumpControls={false}
                          customAdditionalControls={[]}
                          customVolumeControls={[]}
                          layout="stacked-reverse"
                          className="!w-max !p-0 !shadow-none translate-y-1"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="w-[4%]">
                  <button
                    onClick={() =>
                      handleTriggerUpdate({
                        data: audioData,
                        categoryForTrigger: "audio",
                      })
                    }
                    className=""
                  >
                    <FaEdit size={18} />
                  </button>
                </div> */}
                </div>
              ))}
            </div>
            {/* audio||music display here end */}
          </div>
          {/* video display here start */}
          <div key={"video"} className="flex flex-col gap-y-3 px-4">
            {data.info.video.map((videoData: any) => (
              <div
                key={videoData._id}
                className="flex items-center gap-2 w-full"
              >
                <div
                  className={`w-[96%] h-full border-4 border-[#c685ff] rounded-2xl overflow-hidden`}
                >
                  <video
                    key={videoData.link as string}
                    className="w-full h-auto"
                    controls
                  >
                    <source src={videoData.link} type="video/mp4" />
                    <track
                      src={videoData.link}
                      kind="subtitles"
                      srcLang="en"
                      label="English"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="w-[4%]">
                  <button
                    onClick={() =>
                      handleTriggerUpdate({
                        data: videoData,
                        categoryForTrigger: "video",
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
          {/* video display here end */}
          {/* embed link display here start */}
          <div key={"embed"} className="flex flex-col gap-y-3 px-4 w-full">
            <EmbedPlayer
              items={data.info.videoUrl}
              toggle={toggle}
              handleTriggerUpdate={handleTriggerUpdate}
            />
          </div>
          {/* embed link display here end */}
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
