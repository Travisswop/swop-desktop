"use client";
// import React from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
// import { useWalletInfo } from "@web3modal/wagmi/react";
// import { useAccount, useDisconnect } from "wagmi";

// import { Flip, toast } from "react-toastify";

const TriggerWalletConnectButton = ({
  // ethAddress,
  isLoading,
}: // setIsLoading,
any) => {
  const { open } = useWeb3Modal();
  // const { walletInfo } = useWalletInfo();
  // const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  // const { disconnect } = useDisconnect();

  // useEffect(() => {
  //   // Check if the address is available and does not match the expected address
  //   console.log("ddd", address);

  //   if (address && address !== ethAddress) {
  //     setIsLoading(true);
  //     toast.error("Wallet Not Matched!", {
  //       toastId: "customId",
  //       transition: Flip,
  //     });
  //     setTimeout(() => {
  //       disconnect();
  //       setIsLoading(false);
  //     }, 1000);
  //   }
  // }, [address, ethAddress, disconnect, setIsLoading]);

  return (
    <div>
      {isLoading ? (
        <button
          disabled
          className="px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg w-max"
        >
          Loading...
        </button>
      ) : (
        <button
          onClick={() => open()}
          className="px-4 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-lg"
        >
          $ Connect Your Wallet
        </button>
      )}
    </div>
  );
};

export default TriggerWalletConnectButton;
