"use client";
import React, { useRef, useState } from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import Image from "next/image";
import { MdFileUpload } from "react-icons/md";

export default function SelectBackgroudOrBannerModal({
  isOpen,
  onOpenChange,
  bannerImgArr,
  backgroundImgArr,
  onSelectImage,
  setIsModalOpen,
  handleFileChange,
}: any) {
  const fileInputRef = useRef<any>(null);
  const [isBannerImg, setIsBannerImg] = useState(true);

  const selectAvator = (image: any) => {
    isOpen = false;
    onSelectImage(image);
    setIsModalOpen(false);
  };
  // console.log(isOpen, onOpenChange);

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <>
      {isOpen && (
        <>
          <Modal
            size="4xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop={"blur"}
          >
            <ModalContent>
              <div className="w-[91%] mx-auto py-6">
                <ModalBody className="text-center">
                  <div>
                    <div className="flex justify-center gap-3">
                      <button
                        className={`${
                          !isBannerImg
                            ? "text-gray-700 font-medium underline underline-offset-4"
                            : "text-gray-400 font-medium"
                        }`}
                        onClick={() => setIsBannerImg(false)}
                      >
                        Banner
                      </button>
                      <button
                        className={`${
                          isBannerImg
                            ? "text-gray-700 font-medium underline underline-offset-4"
                            : "text-gray-400 font-medium"
                        }`}
                        onClick={() => setIsBannerImg(true)}
                      >
                        Background
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 my-3 font-medium">
                      Select from our wide variety of links and contact info
                      below.
                    </p>
                  </div>
                  {!isBannerImg ? (
                    <div className="grid grid-cols-4 gap-3">
                      {bannerImgArr.map((image: string, index: number) => (
                        <div key={index}>
                          <Image
                            src={`/images/live-preview/banner/${image}`}
                            alt="avator"
                            width={180}
                            height={180}
                            className="cursor-pointer"
                            placeholder="blur"
                            blurDataURL="/images/avator/placeholder.png"
                            onClick={() => selectAvator(image)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-5 lg:grid-cols-7 gap-3">
                      {backgroundImgArr.map((image: string, index: number) => (
                        <div key={index}>
                          <Image
                            src={`/images/live-preview/background/${image}`}
                            alt="avator"
                            width={180}
                            height={180}
                            className="cursor-pointer"
                            placeholder="blur"
                            blurDataURL="/images/avator/placeholder.png"
                            onClick={() => selectAvator(image)}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 my-2">
                    <hr className="w-full h-[1.5px] bg-gray-300" />
                    <p>OR</p>
                    <hr className="w-full h-[1.5px] bg-gray-300" />
                  </div>
                  <button
                    onClick={handleButtonClick}
                    className="bg-black text-white w-max mx-auto py-2 rounded-xl flex items-center gap-2 justify-center px-4 text-sm"
                  >
                    <MdFileUpload /> Choose From Gallery
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </ModalBody>
              </div>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
