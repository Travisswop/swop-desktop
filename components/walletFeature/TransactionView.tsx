"use client";
import Image from "next/image";

const TransactionView = ({ transactionData, walletObj }: any) => {
  const convertTimestampToDateTime = (timestamp: any) => {
    const date = new Date(timestamp * 1000);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);

    return `${formattedTime} ${formattedDate}`;
  };

  // console.log("transaction data", transactionData);

  return (
    <div>
      {transactionData?.result?.length === 0 ? (
        <p className="!text-lg text-center py-8">No transaction available!</p>
      ) : (
        <div className="flex flex-col gap-2 relative z-10 p-2">
          {transactionData?.result.map((item: any, index: number) => (
            <div
              key={index}
              className="px-4 py-2 rounded-lg shadow-medium flex items-center bg-white justify-between"
            >
              <div className="flex items-center gap-2 ">
                <div className="flex justify-center">
                  <div className="relative inline-block mx-0">
                    <Image
                      src={
                        item.from === walletObj.ethAddress ||
                        item.from === walletObj.solanaAddress ||
                        item.from === walletObj.btcAddress
                          ? "/images/homepage/transaction-icon/out.png"
                          : "/images/homepage/transaction-icon/in.png"
                      }
                      alt="user image"
                      width={100}
                      height={100}
                      className="mx-auto size-14 rounded-full border"
                    />

                    <div className="absolute bottom-0 right-0">
                      <Image
                        src={
                          item.tokenSymbol === "SOL"
                            ? "/images/homepage/Solana.png"
                            : item.tokenSymbol === "ETH"
                            ? "/images/homepage/ETH.png"
                            : item.tokenSymbol === "USDC" ||
                              item.tokenSymbol === "WETH"
                            ? "/images/homepage/USDC.png"
                            : item.tokenSymbol === "MATIC" ||
                              item.tokenSymbol === "WETH" ||
                              item.tokenSymbol === "DAI" ||
                              item.tokenSymbol === "AAVE" ||
                              item.tokenSymbol === "POL"
                            ? "/images/homepage/Polygon.png"
                            : "/images/homepage/Polygon.png"
                        }
                        alt="coin icon"
                        width={100}
                        height={100}
                        className="size-5 rounded-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <h3 className="font-semibold">
                    {`${item.hash.slice(0, 5)}....${item.hash.slice(-5)}`}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {convertTimestampToDateTime(item?.timeStamp)}
                  </p>
                </div>
              </div>

              <div className="">
                <div className="flex items-center gap-x-2">
                  <h3 className="font-semibold">{`${parseFloat(
                    item.value
                  ).toFixed(4)}`}</h3>
                  <h2 className="font-semibold">{item?.tokenSymbol}</h2>
                </div>

                <p className="text-sm text-gray-500 text-right mt-1">
                  {`$${parseFloat(
                    (item.tokenPrice * item.value) as any
                  ).toFixed(2)}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionView;
