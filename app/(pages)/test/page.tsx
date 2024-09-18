"use client";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import React from "react";

const TestPage = () => {
  const { open, close } = useWeb3Modal();

  // open();
  return (
    <div>
      <button onClick={() => open()}>open wallet</button>
    </div>
  );
};

export default TestPage;
