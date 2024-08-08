"use client";
import React, { useEffect, useState, useRef } from "react";
import { Wallet, providers } from "ethers";
import { useAccount } from "wagmi";
import { Client } from "@xmtp/xmtp-js";

const API_KEY = process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_KEY;

const MessagePage = () => {
  // const [address, setAddress] = useState(null);
  const { address, isConnecting, isDisconnected } = useAccount();
  const [signer, setSigner] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const convRef = useRef(null);
  const clientRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isOnNetwork, setIsOnNetwork] = useState(false);
  const [peerAddress, setPeerAddress] = useState(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined" && address) {
      try {
        async function getSigner() {
          const provider = new providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner(address);
          setSigner(signer);
          console.log("signer", signer);
          // Update the isConnected data property based on whether we have a signer
          setIsConnected(true);
        }
        getSigner();
      } catch (error) {}
    } else {
      setIsConnected(false);
      setSigner(null);
    }
  }, [address]);

  useEffect(() => {
    async function fetchConversations() {
      if (signer) {
        const xmtp = await Client.create(signer, {
          env: "production",
        });

        for (const conversation of await xmtp.conversations.list()) {
          const messagesInConversation = await conversation.messages(
            new Date(new Date().setDate(new Date().getDate() - 1)),
            new Date()
          );
          console.log(messagesInConversation);
        }
      }
    }

    fetchConversations();
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const wallet = Wallet.createRandom();
  //     console.log("Wallet address: " + wallet.address);
  //     const provider = new providers.JsonRpcProvider(API_KEY);
  //     const signer = new Wallet(wallet.privateKey, provider);

  //     const { Client } = await import("@xmtp/xmtp-js");
  //     const xmtp = await Client.create(signer, { env: "dev" });
  //     console.log("Client created", xmtp.address);
  //     setAddress(signer.address as any);
  //     const WALLET_TO = "0x20B572bE48527a770479744AeC6fE5644F97678B";
  //     const isOnProdNetwork = await xmtp.canMessage(WALLET_TO);
  //     console.log("Can message: " + isOnProdNetwork);

  //     const conversation = await xmtp.conversations.newConversation(WALLET_TO);
  //     console.log("Conversation created", conversation);

  //     const message = await conversation.send("gm");
  //     const message2 = await conversation.send("hello nj");
  //     const message3 = await conversation.send("hello nj 2");
  //     console.log("Message sent 1", message);
  //     console.log("Message sent 2", message2);

  //     for await (const message of await xmtp.conversations.streamAllMessages()) {
  //       console.log(
  //         `New message from ${message.senderAddress}: ${message.content}`
  //       );
  //       console.log(
  //         `New message from ${message3.senderAddress}: ${message3.content}`
  //       );
  //     }
  //   };

  //   fetchData();
  // }, []);

  return <div>{address}</div>;
};

export default MessagePage;
