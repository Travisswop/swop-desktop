"use client";
import useWalletTabValue from "@/zustandStore/walletTabValue";
import Image from "next/image";
import React, { useState } from "react";
import TokenView from "./token/TokenView";
import PortfolioView from "./portfolio/PortfolioView";
import NftView from "./nft/NftView";
import DefiView from "./defi/DefiView";
import TransectionView from "./transection/TransectionView";
import { motion } from "framer-motion";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { GoDotFill } from "react-icons/go";
import MessageList from "../message/MessageList";

const tabList = [
  {
    key: "token",
    title: "Token",
    iconUrl: "/images/homepage/wallet/wallet.png",
  },
  {
    key: "portfolio",
    title: "Portfolio",
    iconUrl: "/images/homepage/wallet/dashboard.png",
  },
  {
    key: "Message",
    title: "Message",
    iconUrl: "/images/homepage/wallet/message.png",
  },
  {
    key: "nft",
    title: "NFT",
    iconUrl: "/images/homepage/wallet/NFT.png",
  },
  {
    key: "defi",
    title: "DeFi",
    iconUrl: "/images/homepage/wallet/Mining.png",
  },
  {
    key: "transaction",
    title: "Transaction",
    iconUrl: "/images/homepage/wallet/transaction-history.png",
  },
];

const dropdownList = [
  { title: "Ethereum", url: "/images/homepage/eth-with-bg.png" },
  { title: "Polygon", url: "/images/homepage/polygon.png" },
  { title: "Base", url: "/images/homepage/coinbase.png" },
  { title: "Solana", url: "/images/homepage/solana.png" },
];

const WalletMainTabs = ({
  session,
  data,
  microsites,
  flowData,
  totalBalance,
  nftData,
  transactionData,
  walletObj,
}: any) => {
  const {
    selectWalletTabValue,
    selectTabViewValue,
    setSelectTabViewValue,
    setSelectWalletTabValue,
  } = useWalletTabValue();

  const [dropdownSelect, setDropdownSelect] = useState("Ethereum");
  const [dropdownTriggerUrl, setDropdownTriggerUrl] = useState(
    "/images/homepage/eth-with-bg.png"
  );

  return (
    <div className="">
      <div className="flex items-center gap-x-2 justify-start overflow-x-auto pb-3 custom-scrollbar">
        <div
          className={`flex items-center bg-white space-x-3 p-2 rounded-lg px-14`}
        >
          <div className="w-8 h-8">
            <Image
              onClick={() => setSelectTabViewValue("walletList")}
              src={"/images/homepage/wallet/menu-1.png"}
              alt={"Menu List"}
              width={32}
              height={32}
              className={`w-8 h-8 cursor-pointer ${
                selectTabViewValue === "walletList" ? "opacity-35" : ""
              }`}
            />
          </div>
          <div className="w-8 h-8">
            <Image
              onClick={() => setSelectTabViewValue("walletCard")}
              src={"/images/homepage/wallet/menu-2.png"}
              alt={"Menu Card"}
              width={32}
              height={32}
              className={`w-8 h-8 cursor-pointer ${
                selectTabViewValue === "walletCard" ? "opacity-35" : ""
              }`}
            />
          </div>
        </div>
        <div className="flex items-center gap-x-6 px-4 justify-stretch">
          {tabList?.map((el: any, index: number) => (
            <div key={el?.key} className="relative flex-1">
              <button
                onClick={() => setSelectWalletTabValue(el?.key)}
                className={`flex items-center justify-center py-2 px-6 rounded-md font-medium bg-white gap-x-2 w-full ${
                  selectWalletTabValue === el?.key
                    ? "text-black"
                    : "text-gray-500"
                }`}
              >
                <Image
                  src={el?.iconUrl}
                  alt={el?.title}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <h2 className="font-semibold text-black text-lg">
                  {el?.title}
                </h2>
              </button>
              {selectWalletTabValue === el?.key && (
                <motion.div
                  layoutId="highlight"
                  className="absolute inset-0 border border-black rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <div className="bg-white py-[13px] rounded-lg flex items-center gap-1 px-14">
                <div className="size-[21px]">
                  <Image
                    src={dropdownTriggerUrl}
                    alt={"Icon"}
                    width={500}
                    height={500}
                    className="mx-auto size-[21px] rounded-full"
                  />
                </div>
                <div className="size-3">
                  <Image
                    src={"/images/homepage/wallet/arrow.png"}
                    alt={"Icon"}
                    width={500}
                    height={500}
                    className="mx-auto size-3"
                  />
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              {dropdownList?.map((el, index) => (
                <DropdownItem
                  key={el.title}
                  onClick={() => {
                    setDropdownSelect(el?.title);
                    setDropdownTriggerUrl(el?.url);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-1">
                      <Image
                        src={el?.url}
                        alt={"Icon"}
                        width={100}
                        height={100}
                        className="size-4 rounded-full"
                      />
                      <p>{el.title}</p>
                    </div>
                    {dropdownSelect === el.title && (
                      <GoDotFill className="size-3 text-green-700" />
                    )}
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <motion.div
        key={selectWalletTabValue}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        {selectWalletTabValue === "token" ? (
          <TokenView flowData={flowData} totalBalance={totalBalance} />
        ) : selectWalletTabValue === "portfolio" ? (
          <PortfolioView flowData={flowData} totalBalance={totalBalance} />
        ) : selectWalletTabValue === "nft" ? (
          <NftView nftData={nftData} />
        ) : selectWalletTabValue === "defi" ? (
          <DefiView />
        ) : selectWalletTabValue === "transaction" ? (
          <TransectionView
            transactionData={transactionData}
            walletObj={walletObj}
            microsites={microsites}
            flowData={flowData}
          />
        ) : selectWalletTabValue === "Message" ? (
          <MessageList userDetails={session} />
        ) : (
          ""
        )}
      </motion.div>
    </div>
  );
};

export default WalletMainTabs;
