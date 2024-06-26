import Image from "next/image";
import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import message from "@/public/images/live-preview/icon/message.svg";
import deposit from "@/public/images/live-preview/icon/deposit.svg";
import location from "@/public/images/live-preview/icon/location.svg";
import website from "@/public/images/live-preview/icon/website.svg";
import contacts from "@/public/images/live-preview/icon/contacts.svg";
import swop from "@/public/images/live-preview/swop.svg";
import { BiSolidEdit } from "react-icons/bi";
import useSmartsiteFormStore from "@/zustandStore/EditSmartsiteInfo";
import isUrl from "@/util/isUrl";
import getSmallIconImage from "@/util/getSmallIconImage";
import { tintStyle } from "@/util/IconTintStyle";

const LivePreview = ({ data }: { data?: any }) => {
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

  console.log("data form live", data);
  const { formData }: any = useSmartsiteFormStore();
  // console.log("galleryyyy", formData.galleryImg);

  const imgSrc = data.info.socialTop.map((info: any) =>
    getSmallIconImage(info.name, info.group)
  );
  console.log("imgsrcccc", imgSrc);

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
          <div className="flex gap-4 justify-center items-center flex-wrap px-16">
            {/* <BsTwitterX size={20} />
            <FaInstagram size={20} />
            <FaLinkedinIn size={21} />
            <CgMail size={23} /> */}
            {imgSrc.map((src: any) => (
              <Image
                src={src}
                alt="icon"
                style={tintStyle}
                className="w-5"
                quality={100}
              />
            ))}
          </div>
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
