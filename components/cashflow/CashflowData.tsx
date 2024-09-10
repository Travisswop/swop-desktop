"use client";
import Image from "next/image";
import SparklineChart from "./CashflowChart";
import SetupPrimarySmartsiteWalletModal from "../modal/SetupPrimarySmartsiteWallet";
import { useAccount } from "wagmi";

const CashflowData = ({ microsites, flowData }: any) => {
  const { address, isConnected } = useAccount();

  // console.log("address", address);

  return (
    <div
      className={`h-[520px] ${isConnected && "overflow-y-auto"} relative mt-4 `}
    >
      <div
        className={`${
          isConnected
            ? "hidden"
            : "w-full h-full absolute z-50 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
        }`}
      >
        <SetupPrimarySmartsiteWalletModal microsites={microsites} />
      </div>
      <div className="flex flex-col gap-2 relative z-10">
        {flowData.result.map((item: any, index: number) => (
          <div
            key={index}
            className="px-3 py-2 rounded-lg shadow-medium flex items-center bg-white"
          >
            <div className="w-[20%] flex items-start gap-1 ">
              <Image
                src={item.metadata.logo}
                alt="eth logo"
                width={40}
                height={40}
                className="w-8 h-auto"
              />
              {item.data.change < 0 ? (
                <p className="text-red-500 text-sm font-medium">
                  {item.data.change}%
                </p>
              ) : (
                <p className="text-green-500 text-sm font-medium">
                  +{item.data.change}%
                </p>
              )}
            </div>
            <div className="w-[20%]">
              <h3 className="font-semibold">{item.data.name}</h3>
              <p className="text-sm text-gray-500">{item.data.symbol}</p>
            </div>
            <div className="w-[40%] px-14">
              <SparklineChart
                data={item.data.sparkline}
                color={item.data.color}
              />
            </div>
            <div className="flex gap-2 items-end w-[30%] justify-end">
              <div>
                <h4 className="font-medium">{`${parseFloat(
                  (item.balance * item.data.price) as any
                ).toFixed(2)}`}</h4>
                <p className="text-sm text-gray-500 w-20">{`${parseFloat(
                  item.balance
                ).toFixed(2)} ${item.data.symbol}`}</p>
              </div>
              {item.network === "ethereum" && (
                <Image
                  src={"/images/cashflow/ETH@2x.png"}
                  alt="eth logo"
                  width={40}
                  height={40}
                  className="w-5 h-5 rounded-full"
                />
              )}
              {item.network === "polygon" && (
                <Image
                  src={"/images/cashflow/Polygon@2x.png"}
                  alt="eth logo"
                  width={40}
                  height={40}
                  className="w-5 h-5 rounded-full"
                />
              )}
              {item.network === "solana" && (
                <Image
                  src={"/images/cashflow/SOL.webp"}
                  alt="eth logo"
                  width={40}
                  height={40}
                  className="w-5 h-5 rounded-full"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CashflowData;
