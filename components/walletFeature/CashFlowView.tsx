"use client";
import Image from "next/image";
import SparklineChart from "./CashflowChart";
import useWalletTabValue from "@/zustandStore/walletTabValue";

const CashFlowView = ({ flowData }: any) => {
  const { selectTabViewValue } = useWalletTabValue();

  return (
    <div>
      {selectTabViewValue === "walletList" ? (
        <div className="flex flex-col gap-2 relative z-10">
          {flowData?.result.map((item: any, index: number) => (
            <div
              key={index}
              className="px-3 py-2 rounded-lg shadow-medium flex gap-1 2xl:gap-2 items-center bg-white w-[30rem] 2xl:w-full"
            >
              <div className="w-[20%] flex items-start gap-1">
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
              <div className="w-[35%] px-4 xl:px-6">
                <SparklineChart
                  data={item.data.sparkline}
                  color={item.data.color}
                />
              </div>
              <div className="flex gap-2 items-end w-[25%] justify-end">
                <div>
                  <h4 className="font-medium">{`${parseFloat(
                    (item.balance * item.data.price) as any
                  ).toFixed(2)}`}</h4>
                  <p className="text-sm text-gray-500 w-20">{`${parseFloat(
                    item.balance
                  ).toFixed(2)} ${item.data.symbol}`}</p>
                </div>

                <Image
                  src={
                    item?.network === "solana"
                      ? "/images/homepage/Solana.png"
                      : item?.network === "ethereum"
                      ? "/images/homepage/eth-with-bg.png"
                      : item?.network === "polygon"
                      ? "/images/homepage/Polygon.png"
                      : item?.network === "base"
                      ? "/images/homepage/eth-with-bg.png"
                      : ""
                  }
                  alt="coin icon"
                  width={40}
                  height={40}
                  className="w-5 h-5 rounded-full"
                />
              </div>
            </div>
          ))}{" "}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 relative z-10">
          {flowData.result.map((item: any, index: number) => (
            <div key={index} className="rounded-lg shadow-medium p-4">
              <div className="flex items-start justify-between gap-2 ">
                <div className="flex items-center gap-x-2">
                  <Image
                    src={item.metadata.logo}
                    alt="eth logo"
                    width={40}
                    height={40}
                    className="w-14 h-14"
                  />
                  <div className="">
                    <p className="text-sm text-gray-500">{item.data.name}</p>
                    <h3 className="font-semibold">{item.data.symbol}</h3>
                  </div>
                </div>

                <div>
                  <Image
                    src={
                      item?.network === "solana"
                        ? "/images/homepage/Solana.png"
                        : item?.network === "ethereum"
                        ? "/images/homepage/eth-with-bg.png"
                        : item?.network === "polygon"
                        ? "/images/homepage/Polygon.png"
                        : item?.network === "base"
                        ? "/images/homepage/eth-with-bg.png"
                        : ""
                    }
                    alt="coin icon"
                    width={40}
                    height={40}
                    className="w-5 h-5 rounded-full"
                  />
                </div>
              </div>

              <div className="py-4">
                <SparklineChart
                  data={item.data.sparkline}
                  color={item.data.color}
                />
              </div>

              <div className="flex gap-2 items-center justify-between">
                <div>
                  <h4 className="font-medium">{`${parseFloat(
                    (item.balance * item.data.price) as any
                  ).toFixed(2)}`}</h4>
                  <p className="text-sm text-gray-500 w-20">{`${parseFloat(
                    item.balance
                  ).toFixed(2)} ${item.data.symbol}`}</p>
                </div>
                <div>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CashFlowView;
