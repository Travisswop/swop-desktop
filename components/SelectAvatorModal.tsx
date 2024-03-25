"use client";
import React from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import Image from "next/image";

export default function SelectAvatorModal({
  isOpen,
  onOpenChange,
  images,
  onSelectImage,
  setIsModalOpen,
}: any) {
  const selectAvator = (image: any) => {
    isOpen = false;
    onSelectImage(image);
    setIsModalOpen(false);
  };
  console.log(isOpen, onOpenChange);

  return (
    <>
      {isOpen && (
        <Modal
          size="2xl"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop={"blur"}
        >
          <ModalContent>
            <div className="w-[91%] mx-auto py-6">
              <ModalBody className="text-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-700">
                    Select Your Avator
                  </h2>
                  <p className="text-sm text-gray-600 my-3">
                    Select from our wide variety of links and contact info
                    below.
                  </p>
                </div>
                <div className="grid grid-cols-6 gap-4">
                  {images.map((image: string) => (
                    <Image
                      key={image}
                      src={`/images/avator/${image}`}
                      alt="avator"
                      width={120}
                      height={120}
                      className="cursor-pointer"
                      onClick={() => selectAvator(image)}
                    />
                  ))}
                </div>
              </ModalBody>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
