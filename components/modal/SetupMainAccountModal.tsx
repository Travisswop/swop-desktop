"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import astronot from "@/public/images/setup-account/account-astronot.png";

const Modal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("signup");
  const [open, setOpen] = useState(true);

  const handleNext = () => {
    router.push("/smartsite-opening-info/?signup=success");
  };

  return (
    <>
      {search && open && (
        <div className="fixed z-10 left-0 top-0 h-full w-full overflow-auto flex items-center justify-center bg-overlay/50">
          <div className="h-max w-96 lg:w-[28rem] bg-white relative rounded-xl">
            <div className="text-primary-color text-center py-7 mx-4">
              <Image
                src={astronot}
                alt="bridal_top"
                width={160}
                height={90}
                className="mx-auto"
              />
              <div className="px-10">
                <div className="flex flex-col gap-4">
                  <p className="text-xl font-bold text-gray-700">
                    Setup Your Main Account
                  </p>
                  <p className="text-sm text-center font-medium text-gray-400">
                    Your Main Account Manages Your Connections, Leads, Wallets,
                    Smartsites For The Swop Ecosystem
                  </p>
                  <div className="flex items-center gap-1 justify-center">
                    <div className="bg-black w-2 h-2 rounded-full"></div>
                    <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
                    <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full py-1.5 rounded-lg bg-gray-300 font-medium"
                  >
                    Next
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

export default Modal;
