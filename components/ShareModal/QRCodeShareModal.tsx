"use client";
import React from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function QRCodeShareModal({ isOpen, onOpenChange }: any) {
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
                    <p className="font-bold">Share Your QR Code Link Via</p>
                    <p className="text-sm text-gray-500 my-3 font-medium">
                      Select from our wide variety of links and contact info
                      below.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 justify-center">
                    <button className="flex flex-col items-center gap-1 font-medium">
                      <FaFacebook size={40} color="#1877F2" />
                      <p className="text-xs">Facebook</p>
                    </button>
                    <button className="flex flex-col items-center gap-1 font-medium">
                      <FaInstagramSquare size={40} color="red" />
                      <p className="text-xs">Instagram</p>
                    </button>
                    <button className="flex flex-col items-center gap-1 font-medium">
                      <FaXTwitter size={40} />
                      <p className="text-xs">Twitter</p>
                    </button>
                    <button className="flex flex-col items-center gap-1 font-medium">
                      <FaLinkedin size={40} color="#0076B2" />
                      <p className="text-xs">Linkedin</p>
                    </button>
                  </div>
                </ModalBody>
              </div>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
