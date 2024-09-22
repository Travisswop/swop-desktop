"use client";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";
import { Avatar, Spinner } from "@nextui-org/react";
import { getPeerData } from "@/actions/auth";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { IoWalletOutline } from "react-icons/io5";
import axios from "axios";
import { fetchMicrositeInfo } from "@/actions/fetchMicrositeInfo";
import { useAccount } from "wagmi";
import SetupWallet from "../HandleWallet";
import isUrl from "@/util/isUrl";
import { FaChevronLeft } from "react-icons/fa";
import useLoggedInUserStore from "@/zustandStore/SetLogedInUserSession";
import WalletChat from "./WalletChat";
import UserImageAvatar from "../Avatar";
const WalletMessageList = () => {
  const userDetails = useLoggedInUserStore((state: any) => state.state.user);
  const [micrositeId, setMicrositeId] = useState<any>(null);
  const [xmtpClient, setXmtpClient] = useState<Client | null>(null);
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const [conversation, setConversation] = useState<any>(null);
  const [peerData, setPeerData] = useState<any[]>([]);
  const [messageHistory, setMessageHistory] = useState<any[]>([]);
  const [peerAddressList, setPeerAddressList] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [micrositeData, setMicrositeData] = useState<any>(null);
  const [isMicrositeConnected, setIsMicrositeConnected] = useState<any>(false);
  const [result, setResult] = useState<object | null>(null);

  console.log("micrositeData", micrositeData);

  const [isSignerLoading, setIsSignerLoading] = useState<any>(false);

  const { address, isConnected: isWalletAddresConnected } = useAccount();

  // Create a cancel token source
  const cancelTokenSource = axios.CancelToken.source();

  // Effect to cancel any pending requests on unmount
  useEffect(() => {
    return () => {
      cancelTokenSource.cancel("Component unmounted");
    };
  }, [cancelTokenSource]);

  const initXmtp = useCallback(async () => {
    if (wallet) {
      try {
        const xmtp = await Client.create(wallet, {
          env: "production",
        });

        // const conversations = await xmtp.conversations.list();
        setXmtpClient(xmtp);
      } catch (error) {
        console.error("Failed to initialize XMTP client:", error);
      }
    }
  }, [wallet]);

  const fetchConversations = useCallback(async () => {
    if (xmtpClient) {
      try {
        const conversations = await xmtpClient.conversations.list();
        const peerList = conversations.map((conversation) => {
          return conversation.peerAddress;
        });
        setPeerAddressList(peerList);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    }
  }, [xmtpClient]);

  const startConversation = async (recipientAddress: string) => {
    if (recipientAddress && xmtpClient) {
      try {
        const conversation = await xmtpClient.conversations.newConversation(
          recipientAddress
        );
        setConversation(conversation);
        const messages = await conversation.messages();
        setMessageHistory(messages);
        // if (!result) {
        const microsite = peerData.map((peer) => {
          if (peer.ethAddress === recipientAddress) {
            return peer;
          }
        });
        const filtered = microsite.filter(Boolean);
        setMicrositeData(filtered[0]);
        // } else {
        //   setMicrositeData(result);
        // }
      } catch (error) {
        console.error("Failed to start conversation:", error);
      }
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await getPeerData(
        peerAddressList,
        userDetails.accessToken
      );
      if (response.data) {
        setPeerData(response.data);
      }
      // Do something with the data here
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }, [peerAddressList, userDetails]);

  useEffect(() => {
    if (wallet && !xmtpClient) {
      initXmtp();
    }
  }, [initXmtp, wallet, xmtpClient]);

  useEffect(() => {
    if (wallet && xmtpClient) {
      fetchConversations();
    }
  }, [fetchConversations, wallet, xmtpClient]);

  useEffect(() => {
    if (peerAddressList.length > 0) {
      fetchData();
    }
  }, [peerAddressList, fetchData]);

  useEffect(() => {
    // setIsSignerLoading(true);
    const streamMessages = async () => {
      if (conversation) {
        for await (const message of await conversation.streamMessages()) {
          setMessageHistory((prevMessages) => [...prevMessages, message]);
        }
      }
    };
    streamMessages();
  }, [conversation]);

  useEffect(() => {
    if (!conversation && peerData.length > 0) {
      setIsSignerLoading(false);
    }
  }, [conversation, peerData.length]);

  useEffect(() => {
    const connectWallet = async () => {
      setIsSignerLoading(true);
      if (typeof (window as any).ethereum !== "undefined") {
        try {
          ((await window) as any).ethereum.request({
            method: "eth_requestAccounts",
          });
          const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
          );
          const signer = provider.getSigner();
          setWallet(signer as unknown as ethers.Wallet);
          setIsConnected(true);
          // setIsSignerLoading(false);
        } catch (error) {
          setIsConnected(false);
          setIsSignerLoading(false);
          console.error("Failed to connect wallet:", error);
        }
      } else {
        setIsSignerLoading(false);
        console.error("Metamask is not installed");
      }
    };
    if (address && isWalletAddresConnected && isMicrositeConnected) {
      connectWallet();
    }
  }, [address, isMicrositeConnected, isWalletAddresConnected]);

  useEffect(() => {
    // get primary microsite from localstorage
    if (window !== undefined) {
      const primaryMicrositeId = localStorage.getItem("userPrimaryMicrosite");
      if (primaryMicrositeId) {
        setMicrositeId(primaryMicrositeId);
      }
    }
  }, [userDetails.accessToken]);

  useEffect(() => {
    // fetch data from using primary microsite id
    if (micrositeId) {
      const fetchData = async () => {
        const data = await fetchMicrositeInfo(
          micrositeId,
          userDetails?.accessToken
        );
        // const data = await datas.json();
        if (data) {
          setMicrositeData(data);
        }
      };
      fetchData();
    }
  }, [micrositeId, userDetails?.accessToken]);

  useEffect(() => {
    if (address && isWalletAddresConnected) {
      setIsMicrositeConnected(true);
    } else {
      setIsMicrositeConnected(false);
    }
  }, [address, isWalletAddresConnected]);

  return (
    <div className="h-full">
      {address && isWalletAddresConnected && isMicrositeConnected ? (
        <>
          {isSignerLoading ? (
            <div
              //   style={{ height: "calc(100vh - 108px)" }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="flex flex-col justify-center gap-1">
                <Spinner size="lg" color="secondary" />
                <p>Loading...</p>
              </div>
            </div>
          ) : (
            <>
              {!conversation && peerData.length > 0 && (
                <div className="h-full">
                  {/* <h1 className="text-lg font-semibold mb-5">Messages</h1> */}
                  <div className="h-full overflow-y-auto">
                    <div className="flex items-center justify-between mb-3">
                      <div className="">
                        <p className="text-gray-500 text-sm font-medium ml-6">
                          User
                        </p>
                      </div>
                      {/* <p className="text-gray-500 text-sm w-[20%] font-medium">
                        Connected
                      </p> */}
                      <p className="text-gray-500 text-sm w-16 font-medium">
                        Chat
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {peerData.map((person, index) => (
                        <div
                          className="flex items-center justify-between gap-1 bg-white rounded-lg p-3"
                          key={index}
                        >
                          <div className="flex items-center gap-1">
                            {/* <Checkbox size="sm" /> */}
                            <div className="flex items-center gap-3">
                              {isUrl(person.profilePic) ? (
                                <Avatar src={person.profilePic} />
                              ) : (
                                <Avatar
                                  src={`/images/user_avator/${person.profilePic}.png`}
                                />
                              )}

                              <div>
                                <p className="font-semibold">{person.name}</p>
                                <p className="text-gray-500 text-xs font-medium">
                                  {person.ens}
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* <p className="w-[20%] text-gray-500 font-medium">
                            June 23, 2024
                          </p> */}
                          <div className="w-16">
                            <button
                              onClick={() =>
                                startConversation(person.ethAddress)
                              }
                              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md font-medium text-sm"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {isConnected && conversation && (
                <div
                  //   style={{ height: "calc(100vh - 112px)" }}
                  className="flex gap-7 items-start h-full"
                >
                  <div className="w-full bg-white rounded-xl relative h-full">
                    {micrositeData && (
                      <div className="w-full h-full overflow-x-hidden">
                        <div className="flex items-center gap-3 justify-between border rounded-2xl border-gray-300 bg-white px-4 py-3 sticky top-0 left-0 mb-2">
                          <div className="flex items-center flex-1 gap-3">
                            <button onClick={() => setConversation(null)}>
                              <FaChevronLeft />
                            </button>

                            <a
                              href={micrositeData.profileUrl}
                              target="_blank"
                              className="flex items-center gap-3"
                            >
                              {micrositeData && (
                                <>
                                  {isUrl(micrositeData.profilePic) ? (
                                    <UserImageAvatar
                                      src={micrositeData.profilePic}
                                    />
                                  ) : (
                                    <UserImageAvatar
                                      src={`/images/user_avator/${micrositeData.profilePic}.png`}
                                    />
                                  )}
                                </>
                              )}
                              <div>
                                <h1 className="font-bold">
                                  {micrositeData.name}
                                </h1>
                                <p className="text-gray-500 text-xs font-medium">
                                  {micrositeData.ens}
                                </p>
                              </div>
                            </a>
                          </div>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 cursor-not-allowed">
                            <button className="cursor-not-allowed">
                              <IoWalletOutline />
                            </button>
                          </div>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 cursor-not-allowed">
                            <button className="cursor-not-allowed">
                              <Image
                                alt="user info"
                                src={"/images/user-info.svg"}
                                width={100}
                                height={100}
                                className="w-5 h-5"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="h-full">
                          {xmtpClient && (
                            <WalletChat
                              client={xmtpClient}
                              conversation={conversation}
                              messageHistory={messageHistory}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div
          style={{ height: "calc(100vh - 108px)" }}
          className={`${isWalletAddresConnected && "overflow-y-auto"} relative`}
        >
          <div
            className={`${
              isWalletAddresConnected
                ? "hidden"
                : "w-full h-full absolute z-10 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
            }`}
          >
            {micrositeData && (
              <SetupWallet
                micrositeData={micrositeData}
                setIsMicrositeConnected={setIsMicrositeConnected}
              />
            )}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default WalletMessageList;
