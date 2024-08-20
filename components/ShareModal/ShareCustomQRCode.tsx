"use client";
import { useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import QRCodeShareModal from "./QRCodeShareModal";
import { BsFillSendFill } from "react-icons/bs";

const ShareCustomQRCode = ({ url }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [qrCode, setQrCode] = useState<any>(null);
  const handleQRCodeShare = () => {
    onOpen();
    setQrCode(url);
  };
  return (
    <div>
      <button
        onClick={handleQRCodeShare}
        type="button"
        className="bg-gray-200 w-12 h-10 rounded-lg hover:bg-gray-300 flex items-center justify-center"
      >
        <BsFillSendFill size={16} />
      </button>
      {qrCode && (
        <QRCodeShareModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          qrCodeUrl={qrCode}
        />
      )}
    </div>
  );
};

export default ShareCustomQRCode;
