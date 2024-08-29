"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import swopLogo from "@/public/images/logo/swop-logo.svg";
import TriggerWalletConnectButton from "../TriggerWalletConnectButton";
import { BiCopy } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { useAccount, useDisconnect } from "wagmi";
import { Flip, toast } from "react-toastify";

const SetupWalletModal = ({
  ens,
  ethmAddress,
}: {
  ens: string;
  ethmAddress: string;
}) => {
  const [open, setOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [isLoading, setIsLoading] = useState(false);

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

  // * copy wallet address
  const handleSaveEthAddress = () => {
    navigator.clipboard
      .writeText(ethmAddress)
      .then(() => {
        setIsCopied(true);
        // Reset isCopied to false after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  useEffect(() => {
    setOpen(false);
    if (
      address &&
      address === ethmAddress &&
      !localStorage.getItem("connected wallet")
    ) {
      setOpen(false);
      localStorage.setItem("connected wallet", address);
      toast.success("Wallet Connected", {
        toastId: "customId",
        transition: Flip,
      });
    }
  }, [address, ethmAddress]);
  // useEffect(() => {
  //   // console.log("loader", isConnected, isLoading);
  //   if (isConnected && !isLoading && address === ethmAddress) {
  //     console.log("hit connected");

  //     setOpen(false);
  //     toast.success("Wallet Connected", {
  //       toastId: "customId",
  //       transition: Flip,
  //     });
  //   }
  // }, [address, ethmAddress, isConnected, isLoading]);

  // * is user has address and it's not matched then force disconnect it
  useEffect(() => {
    if (address && address !== ethmAddress) {
      localStorage.removeItem("connected wallet");
      setIsLoading(true);
      toast.error("Wallet Not Matched!", {
        toastId: "customId33",
        transition: Flip,
      });
      setTimeout(() => {
        disconnect();
        setIsLoading(false);
      }, 1000);
    }
  }, [address, ethmAddress, disconnect, setIsLoading]);

  //   console.log("isConnected", isConnected);

  const handleWalletDisconnect = () => {
    localStorage.removeItem("connected wallet");
    disconnect();
    toast.error("Wallet Disconnected!", {
      toastId: "customId2",
      transition: Flip,
    });
  };

  return (
    <>
      {isLoading ? (
        <p className="text-gray-500 text-sm">loading...</p>
      ) : (
        <>
          {isConnected ? (
            <div className="flex items-center gap-1">
              <p className="px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg">
                {ens}
              </p>
              <button onClick={handleWalletDisconnect}>
                <FaTimes color="red" size={14} />
              </button>
            </div>
          ) : (
            <button
              className="px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg"
              onClick={() => setOpen(true)}
            >
              $ Connect Your Wallet
            </button>
          )}
        </>
      )}

      {open && (
        <div
          className="fixed z-10 left-0 top-0 h-full w-full overflow-auto flex items-center justify-center bg-overlay/50 backdrop"
          onClick={handleBackdropClick}
        >
          <div className="h-max w-max bg-white relative rounded-xl">
            <button
              className="btn btn-sm btn-circle absolute right-3 top-[9px]"
              onClick={closeModal}
            >
              <FaTimes color="gray" />
            </button>
            <div className="text-primary-color text-center py-7 mx-4">
              <Image
                src={swopLogo}
                alt="bridal_top"
                // width={120}
                // height={60}
                className="mx-auto mb-6 w-36 h-auto"
              />
              <div className="px-10">
                <div className="flex flex-col gap-4">
                  <p className="font-medium text-gray-700">
                    ENS: <span className="font-semibold">{ens}</span>
                  </p>
                  <p className="font-medium text-gray-700 flex items-center gap-2">
                    Etherium Address:{" "}
                    <span className="font-semibold">{ethmAddress}</span>
                    <button onClick={handleSaveEthAddress}>
                      {isCopied ? (
                        <MdDone
                          size={24}
                          color={"green"}
                          className="bg-gray-200 p-1 rounded"
                        />
                      ) : (
                        <BiCopy size={22} />
                      )}
                    </button>
                  </p>
                  <p className="text-sm text-center font-medium text-gray-400">
                    Please connect your wallet with this etherium address
                  </p>
                  <TriggerWalletConnectButton isLoading={isLoading} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SetupWalletModal;