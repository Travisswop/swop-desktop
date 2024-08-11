"use client";
import React, { useEffect, useState, useRef } from "react";
import { Wallet, providers } from "ethers";
import { useAccount } from "wagmi";
import { Client } from "@xmtp/xmtp-js";
import CryptoJs from "crypto-js";
import { randomColorHex, shortenAddress, timeAgo } from "@/util/message";
import Image from "next/image";
import Chat from "@/components/xmtp/Chat";
import { CiSearch } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";

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
  const [hasFetchedConversations, setHasFetchedConversations] = useState(false);

  console.log("messages", messages);
  console.log("messageList", messageList);
  console.log("peerAddress", peerAddress);

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
        // Create the XMTP client
        const xmtp = await Client.create(signer, {
          env: "production",
        });
        const encryptedMessageList = localStorage.getItem("messageList");
        console.log("encryptedMessageList", encryptedMessageList);
        if (encryptedMessageList) {
          const bytes = CryptoJs.AES.decrypt(encryptedMessageList, API_KEY);

          console.log("bytes", bytes);

          try {
            const decryptedMessageList = JSON.parse(
              bytes.toString(CryptoJs.enc.Utf8)
            );

            setMessageList(decryptedMessageList);
            setPeerAddress(decryptedMessageList[0].peerAddress);
            newConversation(xmtp, decryptedMessageList[0].peerAddress);
            setIsOnNetwork(true);
            clientRef.current = xmtp;
            return;
          } catch (error) {
            // Handle any errors that occur during decryption or parsing
            console.error(
              "Error decrypting or parsing the message list:",
              error
            );
          }
        }

        const newMessageList = [];

        for (const conversation of await xmtp.conversations.list()) {
          const messagesInConversation = await conversation.messages(
            new Date(new Date().setDate(new Date().getDate() - 1)),
            new Date()
          );

          const lastMessage =
            messagesInConversation[messagesInConversation.length - 1];
          const peerAddress = conversation.peerAddress;
          const peerColor = randomColorHex();
          const conversationData = {
            peerAddress,
            peerColor,
            lastMessage: lastMessage.content,
            lastMessageTime: lastMessage.sent.getTime(),
          };

          newMessageList.push(conversationData);
        }

        if (newMessageList.length > 0) {
          const reverseList = newMessageList.reverse();
          setMessageList(reverseList);
          const firstPeerAddress = reverseList[0].peerAddress;
          setPeerAddress(firstPeerAddress);
          newConversation(xmtp, firstPeerAddress);
          setIsOnNetwork(true);
          clientRef.current = xmtp;

          const encryptedMessage = CryptoJs.AES.encrypt(
            JSON.stringify(reverseList),
            API_KEY
          ).toString();
          localStorage.setItem("messageList", encryptedMessage);
          setHasFetchedConversations(true);
        }
      }
    }
    if (!hasFetchedConversations && messageList.length === 0) {
      console.log("fetching conversations");
      fetchConversations();
    }
  }, [signer, messageList, hasFetchedConversations]);

  // Function to load the existing messages in a conversation
  const newConversation = async function (xmtp_client, addressTo) {
    const conversation = await xmtp_client.conversations.newConversation(
      addressTo
    );
    convRef.current = conversation;
    const messages = await conversation.messages();
    setMessages(messages);
  };

  // Function to initialize the XMTP client
  const initXmtp = async function () {
    // Create the XMTP client
    const xmtp = await Client.create(signer, {
      env: "production",
    });
    console.log("xmtp", xmtp);

    // check if the peer address is on the network
    const canMessage = await xmtp.canMessage(peerAddress);
    if (canMessage) {
      // create or load conversation with peer
      newConversation(xmtp, peerAddress);
      // Set the XMTP client in state for later use
      setIsOnNetwork(!!xmtp.address);
      //Set the client in the ref
      clientRef.current = xmtp;
    } else {
      console.log("Peer is not on the network");
      // notify();
    }
  };

  useEffect(() => {
    if (isOnNetwork && convRef.current) {
      // Function to stream new messages in the conversation
      const streamMessages = async () => {
        const newStream = await convRef.current.streamMessages();
        console.log("new messages", messages);
        if (messages?.length > 0) {
          for await (const msg of newStream) {
            const exists = messages.find((m) => m.id === msg.id);
            if (!exists) {
              setMessages((prevMessages) => {
                const msgsnew = [...prevMessages, msg];
                return msgsnew;
              });
            }
          }
        }
      };
      streamMessages();
    }
  }, [messages, isOnNetwork]);

  return (
    <div>
      {/* {address && address} */}
      {isConnected && (
        <div className="w-full md:h-full overflow-auto flex flex-col md:flex-row">
          {!isOnNetwork && messageList && (
            <div className="flex flex-col justify-center items-center h-screen relative bg-gray-800">
              <div className="w-full absolute top-0 border-gray-400 bg-zinc-900">
                {/* <ConnectButton
                  showBalance={false}
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                /> */}
                {signer?.address}
              </div>
              <div className="flex flex-col justify-center items-center">
                {/* <Image
                  src={
                    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fchat_5962463&psig=AOvVaw0uvBEs6P9QU-AROEygseI3&ust=1723460133678000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIi03dbj7IcDFQAAAAAdAAAAABAE"
                  }
                  alt="Chat Icon"
                  width={150}
                  height={150}
                /> */}
                <p className="my-4 text-center max-w-xs">
                  Start a conversation to get going with DMs that you own and
                  control
                </p>
              </div>
            </div>
          )}

          {isOnNetwork && messageList && (
            <div className="w-[38%] bg-white rounded-xl px-6 py-4 flex gap-3 flex-col">
              <p className="heading-4">All Inbox</p>
              <div className="relative">
                <CiSearch
                  className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                  size={18}
                />
                <input
                  type="text"
                  placeholder={`Search Here....`}
                  className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                />
              </div>
              {messageList.map((chat) => (
                <div
                  key={chat.id}
                  className="bg-black text-white flex items-center justify-between p-2 rounded-lg"
                >
                  <div className="flex items-center gap-2 justify-between">
                    <Image
                      alt="user image"
                      src={"/images/travis.png"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-sembold">
                        {shortenAddress(chat.peerAddress)}
                      </p>
                      <p className="text-sm text-gray-500 font-medium">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                  {/* <div className="bg-[#FFFFFF] opacity-40 rounded-full w-6 h-6 flex items-center justify-center"> */}
                  {/* <BsThreeDots color="black" size={17} /> */}
                  <p className="text-sm text-gray-500 font-medium">
                    {timeAgo(chat.lastMessageTime)}
                  </p>
                  {/* </div> */}
                </div>
              ))}
            </div>
          )}

          <div className="flex w-full flex-col h-screen overflow-hidden">
            {!isOnNetwork && (
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  Explore the XMTP Universe
                </h1>
                <div className="w-full flex p-3 items-center  border-y border-b-0 border-gray-300">
                  <div
                    className="bg-indigo-100 p-2 mr-4 rounded-md h-fit"
                    data-testid="message-icon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      width="24"
                      className="text-indigo-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold" data-testid="message-header">
                      Send a message
                    </div>
                    <p
                      className="text-gray-500 text-md"
                      data-testid="message-subheader"
                    >
                      Message someone using their 0x wallet, ENS, or UNS address
                    </p>
                  </div>
                </div>
                <input
                  className=" w-3/4 p-3 border-gray-300  bg-slate-200 text-slate-800 mt-2 rounded-md"
                  placeholder="Enter a 0x address, ENS, or UNS address"
                  type="text"
                  onChange={(e) => validateAddress(e.target.value)}
                />
                <button
                  disabled={!peerAddress}
                  onClick={initXmtp}
                  className={`bg-indigo-600  focus:outline-none   px-6 py-4 rounded-full m-4 text-white font-bold  enabled:hover:border-gray-400 ${peerAddress} ? 'hover:bg-indigo-800 cursor-pointer' : ' disabled:opacity-75 '`}
                >
                  <div className="flex justify-center items-center h-fit space-x-1">
                    <div>Send your first message</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      width="24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            )}
            {isOnNetwork && messages && (
              <div className="flex overflow-y-auto flex-1 flex-col-reverse w-full">
                <Chat
                  client={clientRef.current}
                  conversation={convRef.current}
                  messageHistory={messages}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* <button
        // disabled={!peerAddress}
        onClick={initXmtp}
        className={`bg-indigo-600  focus:outline-none   px-6 py-4 rounded-full m-4 text-white font-bold  enabled:hover:border-gray-400 ${peerAddress} ? 'hover:bg-indigo-800 cursor-pointer' : ' disabled:opacity-75 '`}
      >
        <div className="flex justify-center items-center h-fit space-x-1">
          <div>Send your first message</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            width="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </button> */}
    </div>
  );
};

export default MessagePage;
