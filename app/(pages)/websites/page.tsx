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
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const WebsitesPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect(`/signin`);
  }
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
        <div className="bg-white p-4 rounded-xl shadow-small">
          <div className="flex justify-between items-start mb-3">
            <Checkbox />
            <div>
              <Image alt="user image" src={travisImg} width={100} />
            </div>
            <div className="border-[1.8px] border-gray-600 rounded-md p-2 w-max">
              <BsSend size={18} />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">Travis Herron</h3>
              <p className="font-medium text-gray-500">Founder & CEO at SWOP</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1">
              <Link href={"/websites/travis-herron"}>
                <SecondaryButton>
                  <span className="text-sm">Edit</span>
                  <TbEdit size={18} />
                </SecondaryButton>
              </Link>
              <SecondaryButton>
                <span className="text-sm">Wallet</span>
                <BiWallet size={18} />
              </SecondaryButton>
              <SecondaryButton>
                <span className="text-sm">QR</span>
                <MdQrCodeScanner size={18} />
              </SecondaryButton>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-small">
          <div className="flex justify-between items-start mb-3">
            <Checkbox />
            <div>
              <Image alt="user image" src={travisImg} width={100} />
            </div>
            <div className="border-[1.8px] border-gray-600 rounded-md p-2 w-max">
              <BsSend size={18} />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">Travis Herron</h3>
              <p className="font-medium text-gray-500">Founder & CEO at SWOP</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1">
              <Link href={"/websites/travis-herron"}>
                <SecondaryButton>
                  <span className="text-sm">Edit</span>
                  <TbEdit size={18} />
                </SecondaryButton>
              </Link>
              <SecondaryButton>
                <span className="text-sm">Wallet</span>
                <BiWallet size={18} />
              </SecondaryButton>
              <SecondaryButton>
                <span className="text-sm">QR</span>
                <MdQrCodeScanner size={18} />
              </SecondaryButton>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-small">
          <div className="flex justify-between items-start mb-3">
            <Checkbox />
            <div>
              <Image alt="user image" src={travisImg} width={100} />
            </div>
            <div className="border-[1.8px] border-gray-600 rounded-md p-2 w-max">
              <BsSend size={18} />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">Travis Herron</h3>
              <p className="font-medium text-gray-500">Founder & CEO at SWOP</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1">
              <Link href={"/websites/travis-herron"}>
                <SecondaryButton>
                  <span className="text-sm">Edit</span>
                  <TbEdit size={18} />
                </SecondaryButton>
              </Link>
              <SecondaryButton>
                <span className="text-sm">Wallet</span>
                <BiWallet size={18} />
              </SecondaryButton>
              <SecondaryButton>
                <span className="text-sm">QR</span>
                <MdQrCodeScanner size={18} />
              </SecondaryButton>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-[4rem] rounded-xl shadow-small flex flex-col gap-6 items-center">
          <div className="p-5 bg-gray-200 w-max rounded-full">
            <LiaFileMedicalSolid size={20} />
          </div>
          <p className="text-lg font-bold text-gray-700">
            Create New Microsite
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebsitesPage;
