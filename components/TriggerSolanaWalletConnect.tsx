"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function TriggerSolanaWalletConnect() {
  return (
    <WalletMultiButton
      style={{
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
      }}
    />
  );
}
