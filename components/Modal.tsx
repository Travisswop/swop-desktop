"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  //   Button,
  //   useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import astronot from "../public/images/setup-account/account-astronot.png";
import ModalButton from "./ModalButton";

export default function ModalComponent() {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      {isOpen && (
        <Modal
          isOpen={true}
          //   onOpenChange={onOpenChange}
          defaultOpen={true}
          isDismissable={false}
          //   isKeyboardDismissDisabled={true}
          backdrop={"blur"}
          hideCloseButton={true}
        >
          <ModalContent>
            {/* {(onClose) => ( */}
            <div className="w-[91%] mx-auto">
              <ModalHeader className="flex justify-center py-0 pt-6">
                <Image src={astronot} alt="astronot image" />
              </ModalHeader>
              <ModalBody className="text-center">
                <h4 className="text-xl font-bold text-[#302F2F]">
                  Setup Your Main Account
                </h4>
                <p className="text-gray-500">
                  Your Main Account Manages Your Connections, Leads, Wallets,
                  Smartsites For The Swop Ecosystem
                </p>
                <div className="flex items-center gap-1 justify-center">
                  <div className="bg-black w-2 h-2 rounded-full"></div>
                  <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
                  <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
                </div>
              </ModalBody>
              <ModalFooter className="py-0 pb-6 pt-2">
                <ModalButton>Next</ModalButton>
              </ModalFooter>
            </div>
            {/*  )} */}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
