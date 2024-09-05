import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

const Persons = [
  {
    name: "Neil Sims",
    bio: "Hi this is Neil",
    date: "June 23, 2023",
  },
  {
    name: "Bonnie Green",
    bio: "Hi this is Bonnie",
    date: "June 18, 2024",
  },
  {
    name: "Michael Gough",
    bio: "Hi this is Michael",
    date: "June 18, 2024",
  },
  {
    name: "Lana Byrd",
    bio: "Hi this is Lana",
    date: "June 18, 2024",
  },
  {
    name: "Thomes Lean",
    bio: "Hi this is Thomes",
    date: "June 18, 2024",
  },
];

const ChatListCard = ({ isConnect }: any) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { open, close } = useWeb3Modal();
  const handleConnect = () => {
    open();
  };

  return (
    <div className="w-full">
      <div className="flex items-center p-4">
        <div className="flex-1 min-w-0 ms-4">
          <h5 className="text-md font-bold leading-none text-gray-900">
            Messages
          </h5>
        </div>
        <div className=" flex-shrink-0"></div>
        <div className="flex w-24  justify-end items-end">
          <label className="text-sm text-gray-500">Connectded</label>
        </div>
        <div className="flex-none w-14 "></div>
        <div className="flex-none w-24 ">
          <label className="text-sm text-gray-500">Smartsite</label>
        </div>
      </div>

      <div>
        {isConnect ? (
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
                      <Link className="w-full h-full" href={`/messages/123`}>
                        <div className="bg-gray-200 px-4 py-2 w-max rounded-lg text-sm font-semibold">
                          view
                        </div>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
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
                      <Link className="w-full h-full" href={`/messages/123`}>
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
                filter: "blur(15px)",
              }}
            />
            <div className="absolute inset-0">
              <div className="flex h-full items-center justify-center">
                <button
                  className="flex items-center bg-slate-200 border border-gray-700 rounded-full p-4"
                  onClick={handleConnect}
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
      </div>
    </div>
  );
};

export default ChatListCard;
