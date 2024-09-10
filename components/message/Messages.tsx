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

const Persons = [
  {
    name: 'Neil Sims',
    bio: 'Hi this is Neil',
    date: 'June 23, 2023',
  },
  {
    name: 'Bonnie Green',
    bio: 'Hi this is Bonnie',
    date: 'June 18, 2024',
  },
  {
    name: 'Michael Gough',
    bio: 'Hi this is Michael',
    date: 'June 18, 2024',
  },
  {
    name: 'Lana Byrd',
    bio: 'Hi this is Lana',
    date: 'June 18, 2024',
  },
  {
    name: 'Thomes Lean',
    bio: 'Hi this is Thomes',
    date: 'June 18, 2024',
  },
];
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
      if (response.data) {
        setPeerData(response.data);
      }
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
      {!conversation && peerData.length > 0 && (
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
        <div className="w-full mx-auto">
          <div className="flow-root relative">
            <ul role="list" className="">
              {Persons.map((person, index) => (
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
                      <Link
                        className="w-full h-full"
                        href={`/messages/123`}
                      >
                        <div className="bg-gray-200 px-4 py-2 w-max rounded-lg text-sm font-semibold">
                          view
                        </div>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div
              className="absolute inset-0 opacity-95 bg-white"
              style={{
                filter: 'blur(15px)',
              }}
            />
            <div className="absolute inset-0">
              <div className="flex h-full items-center justify-center">
                <button
                  className="flex items-center bg-slate-200 border border-gray-700 rounded-full p-4"
                  onClick={connectWallet}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
                  </svg>
                  Connect XMTP
                </button>
              </div>
            </div>
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
