"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import smartsite from "@/public/images/create-smartsite-logo.png";
import { sendCloudinaryImage } from "@/util/SendCloudineryImage";
import { Spinner } from "@nextui-org/react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

const ShareQrCodeModal = ({ isModalOpen, setIsModalOpen, qrCodeUrl }: any) => {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(null);

  console.log("imageurl", imageUrl);

  useEffect(() => {
    setLoading(true);
    sendCloudinaryImage(qrCodeUrl)
      .then((imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setLoading(false);
        setError("Something went wrong! Please try again later.");
      });
  }, [qrCodeUrl]);

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle click on the backdrop
  const handleBackdropClick = (e: any) => {
    // Check if the click is on the backdrop element (with class 'backdrop')
    if (e.target.classList.contains("backdrop")) {
      closeModal();
    }
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed z-10 left-0 top-0 h-full w-full overflow-auto flex items-center justify-center bg-overlay/50 backdrop"
          onClick={handleBackdropClick}
        >
          <div className="h-max w-96 lg:w-[28rem] bg-white relative rounded-xl">
            <div className="w-[91%] mx-auto py-6">
              <div className="text-center">
                <p className="font-bold">Share Your QR Code Link Via</p>
                <p className="text-sm text-gray-500 my-3 font-medium">
                  Select from our wide variety of links and contact info below.
                </p>
              </div>

              {error ? (
                <p className="text-sm font-medium text-red-600">{error}</p>
              ) : (
                <>
                  {loading ? (
                    <div className="flex justify-center">
                      <Spinner size="sm" color="secondary" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 justify-center">
                      <FacebookShareButton url={imageUrl}>
                        <FacebookIcon size={38} round />
                      </FacebookShareButton>

                      <WhatsappShareButton url={imageUrl}>
                        <WhatsappIcon size={38} round />
                      </WhatsappShareButton>

                      <LinkedinShareButton url={imageUrl}>
                        <LinkedinIcon size={38} round />
                      </LinkedinShareButton>

                      <TwitterShareButton url={imageUrl}>
                        <XIcon size={38} round />
                      </TwitterShareButton>

                      <TelegramShareButton url={imageUrl}>
                        <TelegramIcon size={38} round />
                      </TelegramShareButton>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareQrCodeModal;
