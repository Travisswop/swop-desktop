"use client";
import Link from "next/link";
import React from "react";
import AnimateButton from "../Button/AnimateButton";
import SecondaryButton from "../SecondaryButton";
import { BiWallet } from "react-icons/bi";
import { MdQrCodeScanner } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

const ButtonList = ({ microsite }: any) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      <Link href={`/smartsites/${microsite._id}`}>
        <AnimateButton width="w-28">
          <TbEdit size={18} /> Details
        </AnimateButton>
      </Link>
      <Link href={`/smartsites/icons/${microsite._id}`}>
        <AnimateButton width="w-28">
          <TbEdit size={18} /> Icons
        </AnimateButton>
      </Link>
      <Link href={`/smartsites/qr-code/${microsite._id}`}>
        <AnimateButton width="w-28">
          <MdQrCodeScanner size={18} /> QR
        </AnimateButton>
      </Link>
      {/* <SecondaryButton>
        <span className="text-sm">Wallet</span>
        <BiWallet size={18} />
      </SecondaryButton> */}
    </div>
  );
};

export default ButtonList;
