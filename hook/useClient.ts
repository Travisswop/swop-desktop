import { Client } from "@xmtp/xmtp-js";
import { Wallet, Signer, providers } from "ethers";
const API_KEY = process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_KEY;

export const useClient = async () => {
  const wallet = Wallet.createRandom();
  // console.log("Wallet address: " + wallet.address);
  const provider = new providers.JsonRpcProvider(API_KEY);
  const signer = new Wallet(wallet.privateKey, provider);
  const xmtp = await Client.create(signer, { env: "dev" });
  return xmtp;
};
