"use client";
import React from "react";
import WalletQrButton from "./WalletQrButton";
import Image from "next/image";
import WalletAddsCopy from "./WalletAddsCopy";
import WalletTab from "./WalletTab";
import WalletFeature from "../walletFeature/WalletFeature";
import { useAccount } from "wagmi";
import SetupPrimarySmartsiteWalletModal from "../modal/SetupPrimarySmartsiteWallet";

const HomepageWallet = ({ totalBalance, data, microsites, token }: any) => {
  const { isConnected } = useAccount();
  return (
    <div className={"w-full h-full relative"}>
      <div
        className={`${
          isConnected
            ? "hidden"
            : "w-full h-full absolute z-50 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center scale-105 rounded-lg"
        }`}
      >
        <SetupPrimarySmartsiteWalletModal microsites={microsites} />
      </div>

      <div>
        <div className="flex items-center justify-between mt-6 gap-3">
          <div className="w-[15%] bg-black p-2 rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#424651]">
            <WalletQrButton />
          </div>
          <div className="w-[15%] bg-black p-2 rounded-xl flex items-center justify-center cursor-not-allowed hover:bg-[#424651]">
            <Image
              src={"/images/homepage/wallet/send.png"}
              alt={"Icon"}
              width={500}
              height={500}
              className="mx-auto size-9"
            />
          </div>
          <div className="w-[40%] bg-black p-3 rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#424651]">
            <p className="text-white text-center font-semibold text-2xl">
              ${totalBalance.toFixed(2)}
            </p>
          </div>
          <div className="w-[15%] bg-black p-2 rounded-xl  flex items-center justify-center cursor-not-allowed hover:bg-[#424651]">
            <Image
              src={"/images/homepage/wallet/in-app-swop.png"}
              alt={"Icon"}
              width={500}
              height={500}
              className="mx-auto size-9"
            />
          </div>
          <div className="w-[15%] bg-black p-2 rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#424651]">
            <WalletAddsCopy microsites={microsites} />
          </div>
        </div>

        {/* WalletTab */}

        <div className="mt-8 flex items-center justify-center gap-3">
          <WalletTab />
        </div>

        {/* WalletFeature */}
        <WalletFeature data={data} token={token} microsites={microsites} />
      </div>
    </div>
  );
};

export default HomepageWallet;
