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
                    <button>
                      <FaFacebook size={28} />
                    </button>
                    <button>
                      <FaInstagramSquare size={28} />
                    </button>
                    <button>
                      <FaXTwitter size={28} />
                    </button>
                    <button>
                      <FaLinkedin size={28} />
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
