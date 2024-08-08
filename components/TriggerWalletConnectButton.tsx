"use client";
import React from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWalletInfo } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const TriggerWalletConnectButton = () => {
  const { open, close } = useWeb3Modal();
  const { walletInfo } = useWalletInfo();
  const { address, isConnecting, isDisconnected } = useAccount();
  console.log(walletInfo?.name, walletInfo?.icon);
  console.log(address, isConnecting, isDisconnected);
  return (
    <div>
      {!isDisconnected ? (
        <button className="px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg">
          {address}
        </button>
      ) : (
        <button
          onClick={() => open()}
          className="px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg"
        >
          $ Setup Your Wallet
        </button>
      )}
    </div>
  );
};

export default TriggerWalletConnectButton;
