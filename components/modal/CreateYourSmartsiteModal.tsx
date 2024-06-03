"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  //   useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import smartsite from "../../public/images/create-smartsite-logo.png";
// import ModalButton from "../ModalButton";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function CreateYourSmartsiteModal() {
  //   const router = useRouter();
  //   const handleMainAccout = () => {
  //     router.push("/smartsite-opening-info");
  //   };

  const [isOpen, setIsOpen] = useState(true);

  //   const [openModal, setOpenModal] = useState(true);

  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       const isModalShown = localStorage.getItem("modalShown");
  //       console.log("Modal shown status:", isModalShown); // Debugging
  //       if (isModalShown) {
  //         onOpen();
  //         console.log("Modal is opened"); // Debugging
  //       }
  //     }
  //   }, [onOpen]);

  //   const handleChange = () => {
  //     setOpenModal(false);
  //     setOpenModal(false);
  //   };

  console.log("openModal", isOpen);

  return (
    <div className="hidden">
      <button onClick={() => setIsOpen(false)}>Close Modal</button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <div className="w-[91%] mx-auto">
            <ModalHeader className="flex justify-center py-0 pt-6">
              <Image src={smartsite} alt="smartsite image" className="w-1/2" />
            </ModalHeader>
            <ModalBody className="text-center">
              <h4 className="text-2xl font-bold text-[#302F2F]">
                Create Your SmartSite
              </h4>
              <p className="text-gray-500">
                Your SmartSite is a Web3 Enabled Website Built For Connecting
                With People Via Blockchain
              </p>
              <div className="flex items-center gap-1 justify-center">
                <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
                <div className="bg-black w-2 h-2 rounded-full"></div>
                <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
              </div>
            </ModalBody>
            {/* <span onClick={handleMainAccout}> */}
            <ModalFooter className="py-0 pb-6 pt-2">
              {/* <ModalButton>Close</ModalButton> */}
              <button>close</button>
            </ModalFooter>
            {/* </span> */}
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
