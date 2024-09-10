'use client';
import { getPeerData } from '@/actions/auth';
import Chat from '@/components/xmtp/Chat';
import { randomColorHex, timeAgo } from '@/util/message';
import { Spinner } from '@nextui-org/react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Client } from '@xmtp/xmtp-js';
import CryptoJs from 'crypto-js';
import { providers } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useAccount } from 'wagmi';
import SetupPrimarySmartsiteWalletModal from '../modal/SetupPrimarySmartsiteWallet';
import { debounce } from 'lodash';
import { BsThreeDots } from 'react-icons/bs';
import { IoWalletOutline } from 'react-icons/io5';
import MessageInput from '../xmtp/MessageInput';
const API_KEY = process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_KEY;
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
const Messages = ({ userDetails }) => {
  // check is user exist
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
  const [hasFetchedConversations, setHasFetchedConversations] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [changeConversationLoading, setChangeConversationLoading] =
    useState(false);
  const [walletType, setWalletType] = useState('metamask');
  const [messageType, setMessageType] = useState('allInbox');
  const [ensname, setEnsname] = useState('');
  const [ensSearchData, setEnsSearchData] = useState('');
  const [isEnsSearchLoading, setIsEnsSearchLoading] = useState(false);

  // console.log("ensSearchData", ensSearchData);

  const { open, close } = useWeb3Modal();

  // console.log("messages", messages);
  // console.log("messageList", messageList);
  // console.log("peerAddress", peerAddress);

  useEffect(() => {
    const getSigner = async () => {
      try {
        let provider = new providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner(`${address}`);
        setSigner(signer);
        setIsConnected(true);
      } catch (error) {
        console.error('Error getting signer:', error);
        setSigner(null);
        setIsConnected(false);
      }
    };

    if (typeof window !== 'undefined' && address) {
      getSigner();
    }
  }, [address, walletType]);

  // console.log("signer", signer);

  const fetchData = useCallback(async () => {
    try {
      const peerAddresses = messageList.map(
        (message) => message.peerAddress
      );
      // console.log("peerAddresses", peerAddresses);

      const response = await getPeerData(
        peerAddresses,
        userDetails.accessToken
      );
      // console.log("🚀 ~ fetchData ~ data:", response.data);

      const filterMessageList = messageList.map((message) => {
        const peerData = response.data.find(
          (data) => data.ethAddress === message.peerAddress
        );

        if (peerData) {
          return {
            ...message,
            ...peerData,
          };
        }
      });

      setMessageList(filterMessageList.filter(Boolean));
      // Do something with the data here
    } catch (error) {
      console.error(
        'There was a problem with the fetch operation:',
        error
      );
    }
  }, [messageList, userDetails.accessToken]);

  useEffect(() => {
    if (messageList.length > 0) {
      fetchData();
    }
  }, [messageList, fetchData]);

  // console.log("user access token", userDetails.accessToken);

  useEffect(() => {
    const fetchConversations = async () => {
      if (signer) {
        try {
          // console.log("hit");
          setLoading(true);
          const xmtp = await Client.create(signer, {
            env: 'production',
          });
          // console.log("xmtp", xmtp);

          const encryptedMessageList =
            localStorage.getItem('messageList');

          if (encryptedMessageList) {
            const bytes = CryptoJs.AES.decrypt(
              encryptedMessageList,
              API_KEY
            );
            const decryptedMessageList = JSON.parse(
              bytes.toString(CryptoJs.enc.Utf8)
            );

            setMessageList(decryptedMessageList);
            setPeerAddress(decryptedMessageList[0].peerAddress);
            await newConversation(
              xmtp,
              decryptedMessageList[0].peerAddress
            );
            setIsOnNetwork(true);
            clientRef.current = xmtp;
            return;
          }

          const newMessageList = [];
          for (const conversation of await xmtp.conversations.list()) {
            const messagesInConversation =
              await conversation.messages(
                new Date(
                  new Date().setDate(new Date().getDate() - 1)
                ),
                new Date()
              );

            const lastMessage =
              messagesInConversation[
                messagesInConversation.length - 1
              ];
            const conversationData = {
              peerAddress: conversation.peerAddress,
              peerColor: randomColorHex(),
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
            await newConversation(xmtp, firstPeerAddress);
            setIsOnNetwork(true);
            clientRef.current = xmtp;

            const encryptedMessage = CryptoJs.AES.encrypt(
              JSON.stringify(reverseList),
              API_KEY
            ).toString();
            localStorage.setItem('messageList', encryptedMessage);
          }

          setHasFetchedConversations(true);
        } catch (error) {
          console.error('Error fetching conversations:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!hasFetchedConversations && messageList.length === 0) {
      fetchConversations();
    }
  }, [signer, messageList, hasFetchedConversations]);

  const newConversation = async (xmtp_client, addressTo) => {
    try {
      const conversation =
        await xmtp_client.conversations.newConversation(addressTo);
      convRef.current = conversation;
      const messages = await conversation.messages();
      setMessages(messages);
    } catch (error) {
      console.error('Error starting new conversation:', error);
    }
  };

  const initXmtp = async () => {
    try {
      const xmtp = await Client.create(signer, { env: 'production' });

      const canMessage = await xmtp.canMessage(peerAddress);
      if (canMessage) {
        await newConversation(xmtp, peerAddress);
        setIsOnNetwork(true);
        clientRef.current = xmtp;
      } else {
        // console.log("Peer is not on the network");
      }
    } catch (error) {
      console.error('Error initializing XMTP:', error);
    }
  };

  useEffect(() => {
    if (isOnNetwork && convRef.current) {
      const streamMessages = async () => {
        try {
          const newStream = await convRef.current.streamMessages();
          for await (const msg of newStream) {
            if (!messages.find((m) => m.id === msg.id)) {
              setMessages((prevMessages) => [...prevMessages, msg]);
            }
          }
        } catch (error) {
          console.error('Error streaming messages:', error);
        }
      };
      streamMessages();
    }
  }, [messages, isOnNetwork]);

  const handleWalletOpen = () => {
    open();
  };

  const loadConversation = async (addressTo) => {
    try {
      const conversation =
        await clientRef.current.conversations.newConversation(
          addressTo
        );
      convRef.current = conversation;
      const messages = await conversation.messages();
      setMessages(messages);
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const handleWalletClick = async (chat) => {
    setChangeConversationLoading(true);
    setPeerAddress(chat.peerAddress);
    setIsOnNetwork(false);
    await loadConversation(chat.peerAddress);
    setIsOnNetwork(true);
    setChangeConversationLoading(false);
  };

  const checkUsernameAvailability = useCallback(
    debounce(async (ensname) => {
      if (ensname.length > 2) {
        try {
          setIsEnsSearchLoading(true);
          //   setUsername("");
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v4/wallet/getEnsAddress/${ensname}`
          );
          const data = await response.json();
          // console.log("datasdfsdf", data);

          if (data) {
            setEnsSearchData(data);
          } else {
            setEnsSearchData(null);
          }
        } catch (error) {
          console.error(
            'Error checking username availability:',
            error
          );
        } finally {
          setIsEnsSearchLoading(false);
          // setEnsname(null);
        }
      }
    }, 800), // Adjust the debounce delay as needed
    []
  );

  useEffect(() => {
    checkUsernameAvailability(ensname);
  }, [checkUsernameAvailability, ensname]);

  const onSendMessage = async (value) => {
    return convRef.current.send(value);
  };

  return (
    <main className="main-container h-[calc(100vh-120px)]">
      {!address && (
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
                onClick={handleWalletOpen}
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
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${
          isConnected
            ? 'hidden'
            : 'w-full h-full absolute z-50 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex items-center justify-center'
        }`}
      >
        {/* <SetupPrimarySmartsiteWalletModal microsites={microsites} /> */}
      </div>
      {/* <p>address: {address}</p> */}
      {isConnected && (
        <div className="flex gap-7 items-start h-full">
          <div
            style={{ height: 'calc(100vh - 200px)' }}
            className="w-[62%] bg-white rounded-xl relative"
          >
            {changeConversationLoading && (
              <div className="w-full h-full flex items-center justify-center">
                <Spinner label="Loading..." color="primary" />
              </div>
            )}
            {!isOnNetwork && !changeConversationLoading && (
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
                    Loading Conversation ...
                  </div>
                </div>
              </div>
            )}
            {isOnNetwork && messages && (
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
                      <h1 className="font-bold">Travis Herron</h1>
                      <p className="text-gray-500 text-xs font-medium">
                        Travis.Swop.ID
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
                  <Chat
                    client={clientRef.current}
                    conversation={convRef.current}
                    messageHistory={messages}
                  />
                </div>
                <div className="sticky bottom-0 bg-white py-2">
                  <MessageInput onSendMessage={onSendMessage} />
                </div>
              </div>
            )}
          </div>
          <div className="w-[38%] bg-white rounded-xl px-6 py-4 flex gap-3 flex-col">
            {messageList && (
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
                  <button
                    onClick={() => setMessageType('requests')}
                    className={`${
                      messageType === 'requests'
                        ? 'font-bold text-gray-800'
                        : 'font-medium text-gray-600'
                    } `}
                  >
                    Requests
                  </button>
                </div>
                {messageType === 'allInbox' && (
                  <div className="relative">
                    <CiSearch
                      className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                      size={18}
                    />
                    <input
                      type="text"
                      value={ensname}
                      onChange={(e) => setEnsname(e.target.value)}
                      placeholder={`Search Here....`}
                      className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
                    />
                  </div>
                )}
                {isEnsSearchLoading ? (
                  <Spinner size="sm" color="primary" />
                ) : (
                  <>
                    {ensSearchData &&
                    ensSearchData?.message === 'Name not found' &&
                    ensname?.length > 0 ? (
                      <div className="flex justify-center text-sm font-medium text-gray-600">
                        <p>ENS not valid!</p>
                      </div>
                    ) : (
                      <>
                        {ensSearchData && ensname?.length > 0 ? (
                          <div
                            // onClick={() => handleWalletClick(chat)}
                            className={`${
                              true
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
                                style={{ backgroundColor: 'green' }}
                              ></div>
                              <div>
                                <p className="font-sembold">{}</p>
                                <p
                                  className={`text-sm ${
                                    true
                                      ? 'text-white'
                                      : 'text-gray-500'
                                  } font-medium`}
                                >
                                  {ensSearchData?.name}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">
                              {/* {timeAgo(chat.lastMessageTime)}
                               */}
                              10 min ago
                            </p>
                          </div>
                        ) : (
                          <>
                            {messageList.map((chat) => (
                              <div
                                key={chat.id}
                                onClick={() =>
                                  handleWalletClick(chat)
                                }
                                className={`${
                                  peerAddress === chat.peerAddress
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
                                      backgroundColor: chat.peerColor,
                                    }}
                                  ></div>
                                  <div>
                                    <p className="font-sembold">
                                      {chat.name}
                                    </p>
                                    <p
                                      className={`text-sm ${
                                        peerAddress ===
                                        chat.peerAddress
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
                                <p className="text-sm text-gray-500 font-medium">
                                  {timeAgo(chat.lastMessageTime)}
                                </p>
                                {/* </div> */}
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
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
    </main>
  );
};

export default Messages;
