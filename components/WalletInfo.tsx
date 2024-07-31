"use client";
import React, { useEffect } from "react";
import useLoggedInUserStore from "../zustandStore/SetLogedInUserSession";
import useTorus from "../components/useTorus";

const WalletInfo = () => {
  const { state, setWallet } = useLoggedInUserStore();
  const { walletAddress, balance, connectTorus } = useTorus();

  // console.log("privateKey", privateKey);

  useEffect(() => {
    if (walletAddress && balance !== null) {
      console.log("Updating Zustand Store with:", walletAddress, balance); // Debug log
      setWallet({ account: walletAddress, balance: balance.toString() });
    }
  }, [walletAddress, balance]);

  useEffect(() => {
    console.log("Zustand store state:", state); // Debug log
  }, [state]);

  return (
    <div>
      <h2>Wallet Information</h2>
      {state.wallet ? (
        <div>
          <p>Account: {state.wallet.account}</p>
          <p>Balance: {state.wallet.balance}</p>
        </div>
      ) : (
        <button onClick={connectTorus}>Connect Torus</button>
      )}
    </div>
  );
};

export default WalletInfo;
