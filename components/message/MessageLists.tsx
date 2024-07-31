"use client";
import { isENSAvailable } from "@/actions/message";
import isUrl from "@/util/isUrl";
import { Spinner } from "@nextui-org/react";
import { debounce } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { GoCheckCircleFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";

interface Session {
  accessToken: string;
}

interface MessagesListsProps {
  session: Session;
}

const MessagesLists: React.FC<MessagesListsProps> = ({ session }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnsSearchLoading, setIsEnsSearchLoading] = useState<boolean>(false);
  const [ens, setEns] = useState<string>("");
  const [ensData, setEnsData] = useState<any>(null);
  const [isEnsNotAvailable, setIsEnsNotAvailable] = useState<boolean | null>(
    null
  );

  const checkEnsDataAvailability = useCallback(
    debounce(async (ens: string) => {
      if (ens.length > 2) {
        try {
          setIsEnsSearchLoading(true);
          setIsEnsNotAvailable(false);
          setEnsData(null);

          const response = await isENSAvailable(ens, session.accessToken);

          if (response?.name) {
            setEnsData(response);
            setIsEnsNotAvailable(true);
          } else {
            setIsEnsNotAvailable(false);
          }
        } catch (error) {
          console.error("Error checking username availability:", error);
        } finally {
          setIsEnsSearchLoading(false);
        }
      } else {
        setEnsData(null);
        setIsEnsNotAvailable(null);
      }
    }, 500),
    [session.accessToken]
  );

  useEffect(() => {
    if (ens.length < 3) {
      setEnsData(null);
      setIsEnsSearchLoading(false);
    }
  }, [ens.length, ensData]);

  useEffect(() => {
    if (ens.length > 2) {
      checkEnsDataAvailability(ens);
    }
  }, [checkEnsDataAvailability, ens]);

  const handleEnsnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEns(event.target.value);
  };

  return (
    <div className="main-container">
      <div className="flex items-start justify-between">
        <p className="text-gray-700 font-semibold text-lg mb-10">Messages</p>
        <div className="relative mb-4 w-1/2 xl:w-1/3">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <IoSearch size="18" color="gray" />
          </div>
          <input
            type="text"
            name="ens"
            value={ens}
            onChange={handleEnsnameChange}
            placeholder="Register your free ENS Swop.ID"
            className="w-full py-2 bg-gray-100 pl-9 pr-4 focus:outline-none rounded-lg border border-gray-300 focus:border-gray-400 font-medium text-gray-700"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {isEnsSearchLoading ? (
              <Spinner size="sm" color="secondary" />
            ) : isEnsNotAvailable === null || ens.length === 0 ? (
              ""
            ) : ens.length > 0 && ens.length < 3 ? (
              <BsXCircleFill color="red" size={20} />
            ) : isEnsNotAvailable && ens.length > 2 ? (
              <GoCheckCircleFill color="green" size={20} />
            ) : (
              <BsXCircleFill color="red" size={19} />
            )}
          </div>
        </div>
      </div>
      <table className="w-full">
        <thead className="mb-4">
          <tr>
            <th className="text-gray-500 w-[15%] text-start -translate-y-2">
              Details
            </th>
            <th className="text-gray-500 w-[15%] text-start -translate-y-2">
              Joined In
            </th>
            <th className="text-gray-500 w-[15%] text-start -translate-y-2">
              Chat
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-full bg-white mb-6 border-b">
            <td className="flex items-center gap-4 w-[100%] py-2 pl-4">
              <Image
                alt="default user image"
                src={
                  "https://res.cloudinary.com/bayshore/image/upload/v1681031967/default_avatar_pxnxzs.png"
                }
                width={50}
                height={50}
              />
              <div>
                <p>Welcome to SWOP</p>
                <p className="text-xs text-gray-500">
                  I am the SWOP chat welcomer
                </p>
              </div>
            </td>
            <td className="w-[15%] text-gray-400 font-semibold">
              June 23, 2023
            </td>
            <td className="w-[15%]">
              <Link className="w-full h-full" href={`/messages/123`}>
                <div className="bg-gray-200 px-4 py-2 w-max rounded-lg text-sm font-semibold">
                  view
                </div>
              </Link>
            </td>
          </tr>
          {ensData && ensData?.name && (
            <tr className="w-full bg-white mb-6 border-b">
              <td className="flex items-center gap-4 w-[100%] py-2 pl-4">
                <Image
                  alt="user image"
                  src={
                    isUrl(ensData.domainOwner.avatar)
                      ? ensData.domainOwner.avatar
                      : `/images/user_avator/${ensData.domainOwner.avatar}.png`
                  }
                  width={50}
                  height={50}
                />
                <div>
                  <p>{ensData.name}</p>
                  <p className="text-xs text-gray-500">Founder at swop</p>
                </div>
              </td>
              <td className="w-[15%] text-gray-400 font-semibold">
                {ensData.createdAt}
              </td>
              <td className="w-[15%]">
                <Link className="w-full h-full" href={`/messages/12ss3`}>
                  <div className="bg-gray-200 px-4 py-2 w-max rounded-lg text-sm font-semibold">
                    view
                  </div>
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesLists;
