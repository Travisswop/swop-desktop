'use client';
import { fetchMicrositeInfo } from '@/actions/fetchMicrositeInfo';
import { Client } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';
import { Avatar, Checkbox, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { getPeerData } from '@/actions/auth';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import SetupWallet from '../HandleWallet';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { IoWalletOutline } from 'react-icons/io5';
import Chat from './Chat';
import { CiSearch } from 'react-icons/ci';
import { randomColorHex, timeAgo } from '@/util/message';
import { debounce, set } from 'lodash';
import axios, { AxiosError } from 'axios';
const MessageList = ({ userDetails }: any) => {
  const [ensname, setEnsname] = useState('');
  const [result, setResult] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [xmtpClient, setXmtpClient] = useState<Client | null>(null);
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);

  const [conversation, setConversation] = useState<any>(null);
  const [peerData, setPeerData] = useState<any[]>([]);
  const [messageHistory, setMessageHistory] = useState<any[]>([]);
  const [peerAddressList, setPeerAddressList] = useState<string[]>(
    []
  );
  const [peerAddress, setPeerAddress] = useState(null);
  const [messageType, setMessageType] = useState('allInbox');
  const [changeConversationLoading, setChangeConversationLoading] =
    useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [micrositeData, setMicrositeData] = useState<any>(null);

  // Create a cancel token source
  const cancelTokenSource = axios.CancelToken.source();

  // Debounced API call function
  const debouncedFetchEnsData = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm) {
        setResult(null);
        return;
      }

      setIsLoading(true);

      try {
        const { data } = await axios.get(
          `https://app.apiswop.co/api/v4/wallet/getEnsAddress/${searchTerm}`,
          {
            cancelToken: cancelTokenSource.token,
          }
        );

        const info = {
          profilePic: data.domainOwner.name,
          profileUrl: data.domainOwner.profileUrl,
          bio: data.domainOwner.bio,
          ens: data.name,
          ethAddress: data.owner,
          name: data.domainOwner.name,
        };

        setResult(info);
      } catch (err) {
        setResult(null);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  // Effect to cancel any pending requests on unmount
  useEffect(() => {
    return () => {
      cancelTokenSource.cancel('Component unmounted');
    };
  }, [cancelTokenSource]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);
    const value = e.target.value;
    setEnsname(value);
    if (value.length == 0) {
      setIsLoading(false);
      setResult(null);
      return;
    }
    if (value.length > 2 && value.endsWith('.swop.id')) {
      debouncedFetchEnsData(value);
    }
  };

  const initXmtp = useCallback(async () => {
    if (wallet) {
      try {
        const xmtp = await Client.create(wallet, {
          env: 'production',
        });

        const conversations = await xmtp.conversations.list();
        setXmtpClient(xmtp);
      } catch (error) {
        console.error('Failed to initialize XMTP client:', error);
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
        console.error('Failed to fetch messages:', error);
      }
    }
  }, [xmtpClient]);

  const startConversation = async (recipientAddress: string) => {
    if (recipientAddress && xmtpClient) {
      try {
        const conversation =
          await xmtpClient.conversations.newConversation(
            recipientAddress
          );
        setConversation(conversation);
        const messages = await conversation.messages();
        setMessageHistory(messages);
        if (!result) {
          const microsite = peerData.map((peer) => {
            if (peer.ethAddress === recipientAddress) {
              return peer;
            }
          });
          const filtered = microsite.filter(Boolean);
          setMicrositeData(filtered[0]);
        } else {
          setMicrositeData(result);
        }
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

  const connectWallet = async () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      try {
        ((await window) as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        );
        const signer = provider.getSigner();
        setWallet(signer as unknown as ethers.Wallet);
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.error('Metamask is not installed');
    }
  };

  const handleWalletClick = async (chat: any) => {
    setChangeConversationLoading(true);
    await startConversation(chat.ethAddress);
    setChangeConversationLoading(false);
  };

  console.log('result', result);

  return (
    <div className="mt-5 mx-5">
      {!conversation && peerData.length > 0 && (
        <div className="main-container">
          <h1 className="text-lg font-semibold mb-5">Messages</h1>
          <div>
            <div className="flex items-center mb-5">
              <div className="w-[60%]">
                <button className="bg-white rounded-full px-4 py-1">
                  <Checkbox size="sm" className="font-medium">
                    Select all
                  </Checkbox>
                </button>
              </div>
              <p className="text-gray-500 text-sm w-[20%] font-medium">
                Connected
              </p>
              <p className="text-gray-500 text-sm w-[20%] font-medium">
                Smartsite
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {peerData.map((person, index) => (
                <div
                  className="flex items-center gap-1 bg-white rounded-lg p-3"
                  key={index}
                >
                  <div className="flex items-center gap-1 w-[60%]">
                    <Checkbox size="sm" />
                    <div className="flex items-center gap-3">
                      <Avatar src={'/images/user-image/travis.png'} />
                      <div>
                        <p className="font-semibold">{person.name}</p>
                        <p className="text-gray-500 text-xs font-medium">
                          {person.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="w-[20%] text-gray-500 font-medium">
                    June 23, 2024
                  </p>
                  <div className="w-[20%]">
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
      {wallet && !conversation && peerData.length === 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1 bg-white rounded-lg p-3">
            <div className="flex items-center gap-1 w-[60%]">
              <Checkbox size="sm" />
              <div className="flex items-center gap-3">
                <Avatar src={'/images/user-image/travis.png'} />
                <div>
                  <p className="font-semibold">Travis Herron</p>
                  <p className="text-gray-500 text-xs font-medium">
                    Founder at swop
                  </p>
                </div>
              </div>
            </div>
            <p className="w-[20%] text-gray-500 font-medium">
              June 23, 2024
            </p>
            <div className="w-[20%]">
              <Link
                href={'/messages/travis.swop.id'}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md font-medium text-sm"
              >
                View
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white rounded-lg p-3">
            <div className="flex items-center gap-1 w-[60%]">
              <Checkbox size="sm" />
              <div className="flex items-center gap-3">
                <Avatar src="/images/user-image/salman.png" />
                <div>
                  <p className="font-semibold">Salman H Saikote</p>
                  <p className="text-gray-500 text-xs font-medium">
                    CTO
                  </p>
                </div>
              </div>
            </div>
            <p className="w-[20%] text-gray-500 font-medium">
              June 23, 2024
            </p>
            <div className="w-[20%]">
              <Link
                href={'/messages/travis.swop.id'}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md font-medium text-sm"
              >
                View
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white rounded-lg p-3">
            <div className="flex items-center gap-1 w-[60%]">
              <Checkbox size="sm" />
              <div className="flex items-center gap-3">
                <Avatar src="/images/user-image/neel.png" />
                <div>
                  <p className="font-semibold">Arjo Neel</p>
                  <p className="text-gray-500 text-xs font-medium">
                    COO
                  </p>
                </div>
              </div>
            </div>
            <p className="w-[20%] text-gray-500 font-medium">
              June 23, 2024
            </p>
            <div className="w-[20%]">
              <Link
                href={'/messages/travis.swop.id'}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md font-medium text-sm"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      )}
      {!wallet && (
        <div
          style={{ height: 'calc(100vh - 108px)' }}
          className={`${isConnected && 'overflow-y-auto'} relative`}
        >
          <div
            className={`${
              isConnected
                ? 'hidden'
                : 'w-full h-full absolute z-50 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center'
            }`}
          >
            <button
              className="px-4 py-1.5 text-sm font-medium text-gray-500 bg-gray-300 hover:bg-gray-500 hover:text-gray-200 rounded-lg"
              onClick={connectWallet}
            >
              $ Connect XMTP
            </button>
          </div>

          <div className="pt-8">
            <div className="flex items-center mb-5">
              <div className="w-[60%]">
                <button className="bg-white rounded-full px-4 py-1">
                  <Checkbox size="sm" className="font-medium">
                    Select all
                  </Checkbox>
                </button>
              </div>
              <p className="text-gray-500 text-sm w-[20%] font-medium">
                Connected
              </p>
              <p className="text-gray-500 text-sm w-[20%] font-medium">
                Smartsite
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 bg-white rounded-lg p-3">
                <div className="flex items-center gap-1 w-[60%]">
                  <Checkbox size="sm" />
                  <div className="flex items-center gap-3">
                    <Avatar src={'/images/user-image/travis.png'} />
                    <div>
                      <p className="font-semibold">Travis Herron</p>
                      <p className="text-gray-500 text-xs font-medium">
                        Founder at swop
                      </p>
                    </div>
                  </div>
                </div>
                <p className="w-[20%] text-gray-500 font-medium">
                  June 23, 2024
                </p>
                <div className="w-[20%]">
                  <Link
                    href={'/messages/travis.swop.id'}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md font-medium text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white rounded-lg p-3">
                <div className="flex items-center gap-1 w-[60%]">
                  <Checkbox size="sm" />
                  <div className="flex items-center gap-3">
                    <Avatar src="/images/user-image/salman.png" />
                    <div>
                      <p className="font-semibold">
                        Salman H Saikote
                      </p>
                      <p className="text-gray-500 text-xs font-medium">
                        CTO
                      </p>
                    </div>
                  </div>
                </div>
                <p className="w-[20%] text-gray-500 font-medium">
                  June 23, 2024
                </p>
                <div className="w-[20%]">
                  <Link
                    href={'/messages/travis.swop.id'}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md font-medium text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-white rounded-lg p-3">
                <div className="flex items-center gap-1 w-[60%]">
                  <Checkbox size="sm" />
                  <div className="flex items-center gap-3">
                    <Avatar src="/images/user-image/neel.png" />
                    <div>
                      <p className="font-semibold">Arjo Neel</p>
                      <p className="text-gray-500 text-xs font-medium">
                        COO
                      </p>
                    </div>
                  </div>
                </div>
                <p className="w-[20%] text-gray-500 font-medium">
                  June 23, 2024
                </p>
                <div className="w-[20%]">
                  <Link
                    href={'/messages/travis.swop.id'}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md font-medium text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isConnected && conversation && (
        <div className="flex gap-7 items-start h-full">
          <div
            style={{ height: 'calc(100vh - 130px)' }}
            className="w-[62%] bg-white rounded-xl relative"
          >
            {changeConversationLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner label="Loading..." color="primary" />
              </div>
            )}
            {micrositeData && (
              <div className="w-full overflow-x-hidden h-full">
                <div className="flex items-center gap-3 justify-between border rounded-2xl border-gray-300 bg-white px-4 py-2 sticky top-0 left-0 mb-2">
                  <div className="flex items-center flex-1 gap-3">
                    <Image
                      alt="user image"
                      src={'/images/user-image/travis.png'}
                      width={60}
                      height={60}
                      className="w-14 h-14"
                    />
                    <div>
                      <h1 className="font-bold">
                        {micrositeData.name}
                      </h1>
                      <p className="text-gray-500 text-xs font-medium">
                        {micrositeData.ens}
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                    <button>
                      <IoWalletOutline />
                    </button>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                    <button>
                      <Image
                        alt="user info"
                        src={'/images/user-info.svg'}
                        width={100}
                        height={100}
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
                <div className="h-full">
                  {xmtpClient && (
                    <Chat
                      client={xmtpClient}
                      conversation={conversation}
                      messageHistory={messageHistory}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="w-[38%] bg-white rounded-xl px-6 py-4 flex gap-3 flex-col">
            <>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMessageType('allInbox')}
                  className={`${
                    messageType === 'allInbox'
                      ? 'font-bold text-gray-800'
                      : 'font-medium text-gray-600'
                  } `}
                >
                  All Inbox
                </button>
              </div>
              <div className="relative">
                <CiSearch
                  className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                  size={18}
                />
                <input
                  type="text"
                  value={ensname}
                  onChange={handleInputChange}
                  placeholder={`Search Here....`}
                  className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                />
              </div>
              {isLoading && <Spinner size="sm" color="primary" />}
              {!isLoading &&
                !result &&
                micrositeData &&
                peerData.map((chat, index) => (
                  <div
                    key={index}
                    onClick={() => handleWalletClick(chat)}
                    className={`${
                      chat.ethAddress === micrositeData.ethAddress
                        ? 'bg-black text-white'
                        : 'text-black'
                    }  flex items-center justify-between p-2 rounded-lg cursor-pointer border`}
                  >
                    <div className="flex items-center gap-2 justify-between">
                      {/* <Image
                          alt="user image"
                          src={"/images/travis.png"}
                          width={40}
                          height={40}
                          className="rounded-full"
                        /> */}
                      <div
                        className={`w-10 h-10 rounded-full`}
                        style={{
                          backgroundColor: randomColorHex(),
                        }}
                      ></div>
                      <div>
                        <p className="font-sembold">{chat.name}</p>
                        <p
                          className={`text-sm ${
                            peerAddress === chat.ethAddress
                              ? 'text-white'
                              : 'text-gray-500'
                          } font-medium`}
                        >
                          {chat.bio}
                        </p>
                      </div>
                    </div>
                    {/* <div className="bg-[#FFFFFF] opacity-40 rounded-full w-6 h-6 flex items-center justify-center"> */}
                    {/* <BsThreeDots color="black" size={17} /> */}

                    {/* </div> */}
                  </div>
                ))}
              {result && !isLoading && (
                <div
                  onClick={() => handleWalletClick(result)}
                  className="text-black flex items-center justify-between p-2 rounded-lg cursor-pointer border"
                >
                  <div className="flex items-center gap-2 justify-between">
                    {/* <Image
                          alt="user image"
                          src={"/images/travis.png"}
                          width={40}
                          height={40}
                          className="rounded-full"
                        /> */}
                    <div
                      className={`w-10 h-10 rounded-full`}
                      style={{
                        backgroundColor: randomColorHex(),
                      }}
                    ></div>
                    <div>
                      <p className="font-sembold">
                        {(result as any).name}
                      </p>
                      <p
                        className="text-sm                        text-gray-500
                      font-medium"
                      >
                        {(result as any).bio}
                      </p>
                    </div>
                  </div>
                  {/* <div className="bg-[#FFFFFF] opacity-40 rounded-full w-6 h-6 flex items-center justify-center"> */}
                  {/* <BsThreeDots color="black" size={17} /> */}

                  {/* </div> */}
                </div>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
