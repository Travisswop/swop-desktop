"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import email from "@/public/images/social-icon/email.svg";
import facebook from "@/public/images/social-icon/facebook.svg";
import instagram from "@/public/images/social-icon/instagram.svg";
import linkedin from "@/public/images/social-icon/linkedin.svg";
import location from "@/public/images/social-icon/location.svg";
// import message from "@/public/images/social-icon/message.svg";
// import snapchat from "@/public/images/social-icon/snapchat.svg";
import tiktok from "@/public/images/social-icon/tiktok.svg";
// import video from "@/public/images/social-icon/video.svg";
import website_link from "@/public/images/social-icon/website_link.svg";
import whatsapp from "@/public/images/social-icon/whatsapp.svg";
// import youtube from "@/public/images/social-icon/youtube.svg";
import contact from "@/public/images/social-icon/contact.svg";
import twitter from "@/public/images/social-icon/twitter.svg";
import SmartSiteInfoModal from "@/components/modal/SmartSiteInfoModal";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import { toast } from "react-toastify";
import { Checkbox, Spinner, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { debounce } from "lodash";

const ClaimEnsUserName = () => {
  //state
  const [micrositeId, setMicrositeId] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnsSearchLoading, setIsEnsSearchLoading] = useState<boolean>(false);
  const [isSelected, setIsSelected] = React.useState(false);
  const [username, setUsername] = useState("");
  const [isUsernameNotAvailable, setIsUsernameNotAvailable] = useState<
    boolean | null
  >(null);

  //   console.log("username", username);
  //   console.log("isUsernameAvailable", isUsernameAvailable);

  const router = useRouter();

  useEffect(() => {
    //need this to get data from localstorage
    if (typeof window !== "undefined") {
      const primaryMicrositeId = localStorage.getItem("primaryMicrosite");
      // console.log("primaryMicrositeId", primaryMicrositeId);
      setMicrositeId(primaryMicrositeId);
    }
  }, []);

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  };

  const checkUsernameAvailability = useCallback(
    debounce(async (username) => {
      if (username.length > 2) {
        try {
          setIsEnsSearchLoading(true);
          setIsUsernameNotAvailable(false);
          //   setUsername("");
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v4/wallet/checkEnsName/${username}`
            // {
            //   method: "GET",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({ username }),
            // }
          );
          const data = await response.json();
          console.log("daatatat", data);

          if (data.state === "success") {
            setIsUsernameNotAvailable(true);
          }
        } catch (error) {
          console.error("Error checking username availability:", error);
        } finally {
          setIsEnsSearchLoading(false);
        }
      }
    }, 500), // Adjust the debounce delay as needed
    []
  );

  useEffect(() => {
    checkUsernameAvailability(username);
  }, [username, checkUsernameAvailability]);

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  return (
    <div className="bg-white p-8 w-1/2 rounded-xl shadow-large">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-1">
          Pick your user name{" "}
          <Tooltip
            // showArrow={true}
            placement={"right-start"}
            color={"foreground"}
            className=""
            content={
              <div className="w-60 text-xs font-gray-500 font-medium p-0.5">
                Select a free ENS domain that you will own through the
                blockchain that allows you to have a website domain, address to
                transact with, and address to message
              </div>
            }
          >
            <button>
              <HiOutlineInformationCircle size={20} />
            </button>
          </Tooltip>
        </h3>

        <p className="text-sm text-gray-400 font-medium">
          Swop.ID lets wallet users send crypto and NFTs with a simple username
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <h3 className="text-xl font-bold text-gray-800 mb-2 flex gap-1 items-center">
            Username{" "}
            <Tooltip
              color={"foreground"}
              placement={"right-start"}
              content={
                <div className="text-xs font-gray-500 font-medium p-0.5">
                  Register your free ENS Swop.ID
                </div>
              }
            >
              <button>
                <HiOutlineInformationCircle size={20} />
              </button>
            </Tooltip>
          </h3>
        </div>
        <div className="">
          <input
            type="text"
            name="userName"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Register your free ENS Swop.ID"
            className="w-full py-2 bg-gray-100 px-4 focus:outline-none rounded-lg border mb-4 font-medium"
          />
          {isEnsSearchLoading ? (
            <Spinner size="sm" color="primary" />
          ) : isUsernameNotAvailable === null || username.length === 0 ? (
            ""
          ) : username.length > 0 && username.length < 3 ? (
            <p className="text-red-500">Username is already takens.</p>
          ) : isUsernameNotAvailable && username.length > 2 ? (
            <p className="text-green-500">Username is available!</p>
          ) : (
            <p className="text-red-500">Username is already taken.</p>
          )}
        </div>
        <Checkbox
          isSelected={isSelected}
          onValueChange={setIsSelected}
          size="md"
          color="default"
        >
          <span className="text-sm text-gray-400 font-medium">
            By clicking this checkbox, you agree to create a wallet using this
            ENS address.
          </span>
        </Checkbox>
        <DynamicPrimaryBtn
          className={`!px-10 mx-auto mt-8 ${
            !isSelected && "!bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isSelected}
        >
          Continue {isLoading && <Spinner size="sm" color="white" />}
        </DynamicPrimaryBtn>
      </form>
    </div>
  );
};

export default ClaimEnsUserName;
