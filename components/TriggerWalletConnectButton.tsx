"use client";
import React, { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWalletInfo } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const TriggerWalletConnectButton = ({ ens, ethAddress }: any) => {
  const { open, close } = useWeb3Modal();
  const { walletInfo } = useWalletInfo();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  const [isHit, setIsHit] = useState(false);
  // console.log(walletInfo?.name, walletInfo?.icon);
  // console.log("isConnected", isConnected);
  const { disconnect } = useDisconnect();

  // console.log("address", address);
  // console.log("ethAddress", ethAddress);
  console.log("isHit", isHit);

  useEffect(() => {
    if (!isHit && address && address !== ethAddress) {
      console.log("hit");

      setIsHit(true);
      disconnect();
    }
  }, [address, disconnect, ethAddress, isHit]);

  useEffect(() => {
    if (isHit) {
      // window.location.reload();
      toast.error("wallet not matched", {
        toastId: "customId",
      });
    }
  });

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center gap-1">
          <button className="px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg">
            {ens}
          </button>
          <button onClick={() => disconnect()}>
            <FaTimes color="red" size={18} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => open()}
          className="px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg"
        >
          $ Setup Your Wallet {isHit && <p>got it</p>}
        </button>
      )}
    </div>
  );
};

export default TriggerWalletConnectButton;
