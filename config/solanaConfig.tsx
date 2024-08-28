"use client";
import { createWeb3Modal, defaultSolanaConfig } from "@web3modal/solana/react";
import { solana, solanaTestnet, solanaDevnet } from "@web3modal/solana/chains";

export const solanaConfiguration = () => {
  const chains = [solana, solanaTestnet, solanaDevnet];

  // 1. Get projectId from https://cloud.walletconnect.com
  const projectId = process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID;

  if (!projectId) throw new Error("Wallet Project ID is not defined");

  // 2. Create solanaConfig
  const metadata = {
    name: "AppKit",
    description: "AppKit Solana Example",
    url: "https://web3modal.com", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  };

  // if (window !== undefined) {
  const solanaConfig = defaultSolanaConfig({
    metadata,
    chains,
    projectId,
  });

  // 3. Create modal
  createWeb3Modal({
    solanaConfig,
    chains,
    projectId,
  });
  // }
};
