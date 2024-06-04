"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import claimUserImg from "@/public/images/claim-user-name.png";

const ClaimUserNameModal = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("signup");
  const [open, setOpen] = useState(true);

  // Function to close the modal
  const closeModal = () => {
    setOpen(false);
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
      {search && open && (
        <div
          className="fixed z-10 left-0 top-0 h-full w-full overflow-auto flex items-center justify-center bg-overlay/50 backdrop"
          onClick={handleBackdropClick}
        >
          <div className="h-max w-96 lg:w-[28rem] bg-white relative rounded-xl">
            <button
              className="btn btn-sm btn-circle absolute right-3 top-[9px]"
              onClick={closeModal}
            >
              <FaTimes color="gray" />
            </button>
            <div className="text-primary-color text-center py-7 mx-4">
              <Image
                src={claimUserImg}
                alt="bridal_top"
                width={160}
                height={90}
                className="mx-auto"
              />
              <div className="px-10">
                <div className="flex flex-col gap-4">
                  <p className="text-xl font-bold text-gray-700">
                    Claim Your Username
                  </p>
                  <p className="text-sm text-center font-medium text-gray-400">
                    Use Your Swop.ID To Message, And Transact Through The
                    Blockchain Via Encryption
                  </p>
                  <div className="flex items-center gap-1 justify-center">
                    <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
                    <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
                    <div className="bg-black w-2 h-2 rounded-full"></div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full py-1.5 rounded-lg bg-gray-300 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClaimUserNameModal;
