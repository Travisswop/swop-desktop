"use client";
import React from "react";
import useLoggedInUserStore from "../zustandStore/SetLogedInUserSession";

const WalletInfo = () => {
  const { state } = useLoggedInUserStore();

  console.log('Current state in WalletInfo:', state);

  return (
    <div>
      <h2>Wallet Information</h2>
      {state.wallet ? (
        <div>
          <p>Account: {state.wallet.account}</p>
          <p>Balance: {state.wallet.balance}</p>
        </div>
      ) : (
        <p>No wallet connected</p>
      )}
    </div>
  );
};

export default WalletInfo;
