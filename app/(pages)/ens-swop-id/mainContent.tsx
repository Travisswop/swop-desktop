"use client";
// import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import { toast } from "react-toastify";
import { Checkbox, Spinner, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { debounce } from "lodash";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
import { BsXCircleFill } from "react-icons/bs";
import { createWalletAction } from "@/actions/createWallet";
import { PiWarningFill } from "react-icons/pi";
import { RiShieldKeyholeFill, RiShieldKeyholeLine } from "react-icons/ri";
import AnimateButton from "@/components/Button/AnimateButton";

export const maxDuration = 60;

type FlowType = "handleEns" | "recoveryPhraseWarning" | "revealSecretPhrase";

const ClaimEnsUserName = ({ token }: any) => {
  //state
  const [micrositeId, setMicrositeId] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnsSearchLoading, setIsEnsSearchLoading] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState(false);
  const [username, setUsername] = useState("");
  const [canProceed, setCanProceed] = useState(false);
  const [isUsernameNotAvailable, setIsUsernameNotAvailable] = useState<
    boolean | null
  >(null);
  const [flow, setFlow] = useState<FlowType>("recoveryPhraseWarning");
  const [isRecoverySelected, setIsRecoverySelected] = useState(false);

  //   console.log("username", username);
  // console.log("isUsernameAvailable", isUsernameNotAvailable);

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
    event.preventDefault();
    if (!canProceed) {
      return;
    }
    setIsLoading(true);
    const data = await createWalletAction(username, micrositeId, token);
    console.log("wallet data", data);
    if (data.state === "success") {
      toast.success("ENS created");
      // router.push("/");
      setFlow("recoveryPhraseWarning");
    } else {
      toast.error("something went wrong");
    }
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
          );
          const data = await response.json();
          // console.log("daatatat", data);

          if (data.state === "success") {
            setIsUsernameNotAvailable(true);
          } else {
            setIsUsernameNotAvailable(false);
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

  useEffect(() => {
    // if (username.length > 0 && username.length < 3) {
    //   setCanProceed(false);
    // }
    if (isSelected && isUsernameNotAvailable && username.length > 2) {
      setCanProceed(true);
    } else {
      setCanProceed(false);
    }
  }, [username.length, isSelected, isUsernameNotAvailable]);

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  return (
    <div className="bg-white p-8 w-5/6 lg:w-2/3 2xl:w-1/2 rounded-xl shadow-large">
      {flow === "handleEns" && (
        <div>
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
                    blockchain that allows you to have a website domain, address
                    to transact with, and address to message
                  </div>
                }
              >
                <button>
                  <HiOutlineInformationCircle size={20} />
                </button>
              </Tooltip>
            </h3>

            <p className="text-sm text-gray-400 font-medium">
              Swop.ID lets wallet users send crypto and NFTs with a simple
              username
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
            <div className="relative mb-4">
              <input
                type="text"
                name="userName"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Register your free ENS Swop.ID"
                className="w-full py-2 bg-gray-100 px-4 focus:outline-none rounded-lg border  font-medium"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {isEnsSearchLoading ? (
                  <Spinner size="sm" color="secondary" />
                ) : isUsernameNotAvailable === null || username.length === 0 ? (
                  ""
                ) : username.length > 0 && username.length < 3 ? (
                  <BsXCircleFill color="red" size={20} />
                ) : isUsernameNotAvailable && username.length > 2 ? (
                  <GoCheckCircleFill color="green" size={20} />
                ) : (
                  <BsXCircleFill color="red" size={19} />
                )}
              </div>
            </div>
            <Checkbox
              isSelected={isSelected}
              onValueChange={setIsSelected}
              size="md"
              color="default"
            >
              <span className="text-sm text-gray-400 font-medium">
                By clicking this checkbox, you agree to create a wallet using
                this ENS address.
              </span>
            </Checkbox>
            <DynamicPrimaryBtn
              className={`!px-10 mx-auto mt-8 ${
                !canProceed && "!bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!canProceed}
            >
              Continue {isLoading && <Spinner size="sm" color="white" />}
            </DynamicPrimaryBtn>
          </form>
        </div>
      )}
      {flow === "recoveryPhraseWarning" && (
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-bold text-2xl text-center">
            Secret Recovery Phrase Warning
          </h1>
          <p className="text-gray-600 text-center">
            On the next page, you will receive your secret <br /> recovery
            phrase.
          </p>
          <div className="px-4 flex flex-col gap-2">
            <div className="bg-black text-gray-300 rounded-lg p-4 flex items-center gap-4">
              <PiWarningFill color="orange" size={24} />
              <p>
                This is the <span className="font-medium text-white">ONLY</span>{" "}
                way to recover your account if you lose access to your device or
                password.
              </p>
            </div>
            <div className="bg-black text-gray-300 rounded-lg p-4 flex items-center gap-4">
              <RiShieldKeyholeFill color="green" size={24} />
              <p>
                Write it down, store it in a safe place, and{" "}
                <span className="font-medium text-white">NEVER</span> share it
                with anyone.
              </p>
            </div>
          </div>
          <Checkbox
            isSelected={isRecoverySelected}
            onValueChange={setIsRecoverySelected}
            className="px-6 text-sm"
          >
            I understand that I am responsible for saving my secret recovery
            phrase, and that it is the only way to recover my wallet.
          </Checkbox>
          {isRecoverySelected ? (
            <DynamicPrimaryBtn className="w-52">Next</DynamicPrimaryBtn>
          ) : (
            <button className="w-52 bg-gray-400 rounded-lg text-white py-2 font-medium cursor-not-allowed">
              Next
            </button>
          )}
        </div>
      )}
      {flow === "revealSecretPhrase" && <div></div>}
    </div>
  );
};

export default ClaimEnsUserName;
