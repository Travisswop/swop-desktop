'use client';

import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Client } from '@xmtp/xmtp-js';
import Chat from './chat';
import { getPeerData } from '@/actions/auth';
import Image from 'next/image';
import Link from 'next/link';
import CryptoJs from 'crypto-js';
const API_KEY = process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_KEY;
import { randomColorHex, timeAgo } from '@/util/message';
import { useWeb3Modal } from '@web3modal/wagmi/react';
export default function HomePage({ userDetails }) {
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const [xmtpClient, setXmtpClient] = useState<Client | null>(null);
  const [conversation, setConversation] = useState<any>(null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [messageHistory, setMessageHistory] = useState<any[]>([]);
  const [peerAddressList, setPeerAddressList] = useState<string[]>(
    []
  );
  const [selectedPeer, setSelectedPeer] = useState('');
  const [peerData, setPeerData] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const provider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        const signer = provider.getSigner();
        setWallet(signer as unknown as ethers.Wallet);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        setIsConnected(false);
      }
    } else {
      console.error('Metamask is not installed');
    }
  };

  const initXmtp = useCallback(async () => {
    if (wallet) {
      try {
        const xmtp = await Client.create(wallet, {
          env: 'production',
        });

        const conversations = await xmtp.conversations.list();
        console.log('🚀 ~ initXmtp ~ conversations:', conversations);
        setXmtpClient(xmtp);
      } catch (error) {
        console.error('Failed to initialize XMTP client:', error);
      }
    }
  });

  const fetchConversations = useCallback(async () => {
    if (xmtpClient) {
      try {
        const conversations = await xmtpClient.conversations.list();
        const peerList = conversations.map((conversation) => {
          return conversation.peerAddress;
        });
        setPeerAddressList(peerList);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    }
  }, [xmtpClient]);

  const startConversation = async (recipientAddress) => {
    if (recipientAddress) {
      try {
        const conversation =
          await xmtpClient.conversations.newConversation(
            recipientAddress
          );
        setConversation(conversation);
        const messages = await conversation.messages();
        setMessageHistory(messages);
      } catch (error) {
        console.error('Failed to start conversation:', error);
      }
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await getPeerData(
        peerAddressList,
        userDetails.accessToken
      );
      setPeerData(response.data);
      // Do something with the data here
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation:',
        error
      );
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
    const streamMessages = async () => {
      if (conversation) {
        for await (const message of await conversation.streamMessages()) {
          setMessageHistory((prevMessages) => [
            ...prevMessages,
            message,
          ]);
        }
      }
    };
    streamMessages();
  }, [conversation]);

  console.log('🚀 ~ messageHistory:', peerData);

  return (
    <div className="main-container h-[calc(100vh-120px)]">
      {!conversation && peerData.length && (
        <div className="flow-root relative">
          <ul role="list" className="">
            {peerData.map((person, index) => (
              <li
                key={index}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow mb-2"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      className="w-8 h-8 rounded-full"
                      src="https://res.cloudinary.com/bayshore/image/upload/v1681031967/default_avatar_pxnxzs.png"
                      alt="Neil image"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {person.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate ">
                      {person.bio}
                    </p>
                  </div>
                  <div className="flex w-24  justify-end items-end">
                    <p className="text-sm text-gray-500 truncate ">
                      {person.date}
                    </p>
                  </div>
                  <div className="flex-none w-14 "></div>
                  <div className="flex-none w-24 ">
                    <div className="w-full h-full">
                      <button
                        className="bg-gray-200 px-4 py-2 w-max rounded-lg text-sm font-semibold"
                        onClick={() =>
                          startConversation(person.ethAddress)
                        }
                      >
                        view
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!wallet && (
        <div className="w-full max-w-md mx-auto">
          <div>
            <h2>XMTP Wallet-to-Wallet Chat</h2>
          </div>
          <div>
            <button onClick={connectWallet}>Connect Wallet</button>
          </div>
        </div>
      )}

      {isConnected && conversation && (
        <div className="flex gap-7 items-start h-full">
          <div className="w-[62%] bg-white rounded-xl h-full overflow-y-auto">
            <div className="w-full relative overflow-x-hidden h-full">
              <Chat
                client={xmtpClient}
                conversation={conversation}
                messageHistory={messageHistory}
              />
            </div>
          </div>
          <div className="w-[38%] bg-white rounded-xl h-full overflow-y-auto">
            <div className="flow-root relative">
              <ul role="list" className="">
                {peerData.map((person, index) => (
                  <li
                    key={index}
                    className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow mb-2"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          className="w-8 h-8 rounded-full"
                          src="https://res.cloudinary.com/bayshore/image/upload/v1681031967/default_avatar_pxnxzs.png"
                          alt="Neil image"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {person.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate ">
                          {person.bio}
                        </p>
                      </div>
                      <div className="flex w-24  justify-end items-end">
                        <p className="text-sm text-gray-500 truncate ">
                          {person.date}
                        </p>
                      </div>
                      <div className="flex-none w-14 "></div>
                      <div className="flex-none w-24 ">
                        <div className="w-full h-full">
                          <button
                            className="bg-gray-200 px-4 py-2 w-max rounded-lg text-sm font-semibold"
                            onClick={() =>
                              startConversation(person.ethAddress)
                            }
                          >
                            view
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
