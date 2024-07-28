import SecondaryButton from "@/components/SecondaryButton";
import { Checkbox } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { AiOutlineSelect } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { IoDuplicateOutline } from "react-icons/io5";
import { TbEdit, TbTransfer } from "react-icons/tb";
import travisImg from "@/public/images/websites/travis-image.png";
import { BiWallet } from "react-icons/bi";
import { MdQrCodeScanner } from "react-icons/md";
import { LiaFileMedicalSolid } from "react-icons/lia";
import Link from "next/link";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import isUrl from "@/util/isUrl";
import AnimateButton from "@/components/Button/AnimateButton";
import ButtonList from "@/components/smartsiteList/ButtonList";

const WebsitesPage = async () => {
  const userDetails: any = await isUserAuthenticate(); // check is user exist

  // console.log("userDetails", userDetails);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/desktop/user/${userDetails._id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userDetails.accessToken}`,
      },
    }
  );
  const data = await response.json();
  // console.log("data", data);

  return (
    <div className="main-container">
      <div className="flex items-center justify-between mb-3">
        <SecondaryButton>
          <AiOutlineSelect />
          Select
        </SecondaryButton>
        <div className="flex items-center gap-2">
          <SecondaryButton>
            <IoDuplicateOutline />
            Duplicate
          </SecondaryButton>
          <SecondaryButton>
            <TbTransfer />
            Transfer
          </SecondaryButton>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data &&
          data.data.microsites.map((microsite: any) => (
            <div
              key={microsite._id}
              className="bg-white p-4 rounded-xl shadow-small"
            >
              <div className="flex justify-between items-start mb-3">
                <Checkbox />
                <div>
                  <Image
                    alt="user image"
                    src={
                      isUrl(microsite.profilePic)
                        ? microsite.profilePic
                        : `/images/user_avator/${microsite.profilePic}.png`
                    }
                    width={300}
                    height={300}
                    className="rounded-full w-28 h-28"
                  />
                </div>
                <div className="border-[1.8px] border-gray-600 rounded-md p-2 w-max">
                  <BsSend size={18} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-700">
                    {microsite.name}
                  </h3>
                  <p className="font-medium text-gray-500">{microsite.bio}</p>
                </div>
                <ButtonList microsite={microsite} />
              </div>
            </div>
          ))}

        <div className="bg-white px-4 py-[4rem] rounded-xl shadow-small flex flex-col gap-6 items-center">
          <Link
            href={"/smartsites/create-smartsite"}
            className="p-5 bg-gray-200 w-max rounded-full"
          >
            <LiaFileMedicalSolid size={20} />
          </Link>
          <p className="text-lg font-bold text-gray-700">
            Create New Microsite
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebsitesPage;
