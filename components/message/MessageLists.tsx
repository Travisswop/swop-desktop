"use client";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ChatListCard from "./ChatListCard";

interface Session {
  accessToken: string;
}

interface MessagesListsProps {
  session: Session;
}

const MessagesLists: React.FC<MessagesListsProps> = ({ session }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!signer) {
        console.log("Signer is not available");
        return;
      }

      try {
        console.log("Creating XMTP client...");
        const xmtp = await Client.create(signer, { env: "production" });
        console.log("XMTP client created successfully", xmtp);

        console.log("Fetching conversations...");
        const conversationList = await xmtp.conversations.list();
        console.log("Conversations fetched successfully", conversationList);

        setConversations(conversationList);
        setError(null);
      } catch (error) {
        console.error("Error in fetchConversations:", error);
        setError(`Failed to fetch conversations: ${error.message}`);

        // Additional logging for debugging
        if (error instanceof Error) {
          console.error("Error stack:", error.stack);
        }

        // Check if the error is related to the plugin
        if (error.message.includes("Plugin Closed")) {
          console.log("Plugin state:", await checkPluginState());
        }
      }
    };

    const checkPluginState = async () => {
      // This is a placeholder function. You'll need to implement
      // the actual check based on your wallet plugin's API
      try {
        // Example: Check if the wallet is unlocked
        const isUnlocked = await window.ethereum._metamask.isUnlocked();
        return { isUnlocked };
      } catch (error) {
        return { error: `Failed to check plugin state: ${error.message}` };
      }
    };

    if (address && isConnected && signer) {
      fetchConversations();
    }
  }, [signer, isConnected, address]);

  useEffect(() => {
    const getSigner = async () => {
      if (typeof window.ethereum !== "undefined" && address) {
        try {
          console.log("Getting Web3 provider...");
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          console.log("Getting signer for address:", address);
          const newSigner = provider.getSigner(`${address}`);
          console.log("Signer obtained:", newSigner);

          setSigner(newSigner);
          setIsConnected(true);
          setError(null);
        } catch (error) {
          console.error("Signer error:", error);
          setIsConnected(false);
          setSigner(null);
          setError(`Failed to get signer: ${error.message}`);
        }
      } else {
        console.log("Ethereum provider not found or address not available");
        setIsConnected(false);
        setSigner(null);
        setError("Ethereum provider not found or address not available");
      }
    };

    getSigner();
  }, [address]);

  console.log("Signer:", signer);
  console.log("Is connected:", isConnected);
  console.log("Address:", address);

  return (
    <div className="main-container">
      <div className="flex items-start justify-between">
        <p className="text-gray-700 font-semibold text-lg mb-10">Messages</p>
      </div>
      <ChatListCard isConnect={isConnected} />
      {error && <p className="text-red-500">{error}</p>}
      {conversations.length > 0 && (
        <div>
          <h2>Conversations:</h2>
          <ul>
            {conversations.map((conv, index) => (
              <li key={index}>{conv.topic}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MessagesLists;
