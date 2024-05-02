"use client";
import React from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import EditMicrositeBtn from "../Button/EditMicrositeBtn";
import DynamicPrimaryBtn from "../Button/DynamicPrimaryBtn";

export default function AddPropertiesModel({ isOpen, onOpenChange }: any) {
  return (
    <>
      {isOpen && (
        <>
          <Modal
            size="xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop={"blur"}
          >
            <ModalContent>
              <div className="w-[91%] mx-auto py-6">
                <ModalBody className="text-center">
                  <div>
                    <p className="font-bold text-xl">Add Properties</p>
                    <p className="text-sm text-gray-500 my-3 font-medium">
                      {`Properties show up underneath your item, are clickable, and can be filtered in your
collection's sidebar.`}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div>
                      <p className="mb-1 font-medium text-start">Type </p>
                      <input
                        type="text"
                        id="name"
                        placeholder={`Item Type`}
                        className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none pl-4 py-2 text-gray-700 bg-gray-100"
                      />
                    </div>
                    <div>
                      <p className="mb-1 font-medium text-start">Name </p>
                      <input
                        type="text"
                        id="name"
                        placeholder={`Item Name`}
                        className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none pl-4 py-2 text-gray-700 bg-gray-100"
                      />
                    </div>
                  </div>
                  <EditMicrositeBtn className="w-max !rounded-md !text-gray-700">
                    Add more
                  </EditMicrositeBtn>
                  <DynamicPrimaryBtn className="!rounded-md mt-4">
                    Save
                  </DynamicPrimaryBtn>
                </ModalBody>
              </div>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
