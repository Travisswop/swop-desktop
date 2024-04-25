"use client";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import EditMicrositeBtn from "@/components/Button/EditMicrositeBtn";
import QRCodeShareModal from "@/components/ShareModal/QRCodeShareModal";
import { Radio, RadioGroup, Switch, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { CiSearch } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import { IoIosLock } from "react-icons/io";
import { IoLinkSharp } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";

const EditQRCode = () => {
  const [color, setColor] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    shape: "",
    border: "",
    text: "",
    link: "",
  });

  const defaultColorArray = [
    {
      _id: "1234",
      hexCode: "#000000",
    },
    {
      _id: "11234",
      hexCode: "#E6379A",
    },
    {
      _id: "12534",
      hexCode: "#6F2FC0",
    },
    {
      _id: "12314",
      hexCode: "#FF6C08",
    },
    {
      _id: "15234",
      hexCode: "#FF9500",
    },
    {
      _id: "12334",
      hexCode: "#6B6B6B",
    },
    {
      _id: "12324",
      hexCode: "#BF0000",
    },
    {
      _id: "12344",
      hexCode: "#027AFF",
    },
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleModal = () => {
    onOpen();
    setIsModalOpen(true);
  };

  return (
    <main className="main-container overflow-hidden">
      <div className="flex gap-6 items-start">
        <div className="w-[62%] border-r border-gray-300 pr-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-700">Customize QR</p>
            <div onClick={handleModal}>
              <EditMicrositeBtn>
                <FiSend />
                Share
              </EditMicrositeBtn>
            </div>
          </div>
          <div className="bg-white py-4 px-10 flex flex-col gap-4">
            <div>
              <p className="heading-4 mb-2">Choose A Pattern: </p>
              <Image
                alt="qrcode image"
                src={"/images/qrcodelist.png"}
                width={300}
                height={60}
              />
            </div>
            <div>
              <p className="heading-4 mb-2">Pick Your Color: </p>
              <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg">
                <button onClick={() => setToggle(!toggle)}>
                  <Image
                    alt="pick color"
                    src={"/images/color.png"}
                    width={40}
                    height={40}
                  />
                </button>
                <p className="text-gray-400">
                  {!color || color === "#NaNNaNNaN" ? "#HEX" : color}
                </p>
              </div>
              {toggle && <HexColorPicker color={color} onChange={setColor} />}
            </div>
            <div>
              <p className="heading-4 mb-2">Default Colors: </p>
              <div className="flex items-center gap-3">
                {defaultColorArray.map((data) => (
                  <button
                    key={data._id}
                    onClick={() => setColor(data.hexCode)}
                    className={`rounded-full ${
                      color === data.hexCode && "border-2 border-[#027AFF] p-1"
                    } `}
                  >
                    <div
                      style={{ backgroundColor: data.hexCode }}
                      className={`w-11 h-11 rounded-full`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="heading-4 mb-2">Choose Shape: </p>
              <div className="flex items-center gap-3">
                <button
                  // onClick={() => setColor(data.hexCode)}
                  className={`rounded-full border border-[#027AFF] p-1 `}
                >
                  <div
                    className={`w-8 h-8 rounded-full border-[3px] border-gray-700`}
                  ></div>
                </button>
                <button
                  // onClick={() => setColor(data.hexCode)}
                  className={`border border-[#027AFF] p-1 `}
                >
                  <div className={`w-8 h-8 border-[3px] border-gray-700`}></div>
                </button>
                <button
                  // onClick={() => setColor(data.hexCode)}
                  className={`rounded-lg border border-[#027AFF] p-1 `}
                >
                  <div
                    className={`w-8 h-8 rounded-lg border-[3px] border-gray-700`}
                  ></div>
                </button>
              </div>
            </div>
            <div>
              <p className="heading-4 mb-2">Choose Frame Border: </p>
              <div className="flex items-center gap-3">
                <button
                  // onClick={() => setColor(data.hexCode)}
                  className={`rounded-full border border-[#027AFF] p-1 `}
                >
                  <div
                    className={`w-8 h-8 rounded-full border-[3px] border-gray-700`}
                  ></div>
                </button>
                <button
                  // onClick={() => setColor(data.hexCode)}
                  className={`border border-[#027AFF] p-1 `}
                >
                  <div className={`w-8 h-8 border-[3px] border-gray-700`}></div>
                </button>
                <button
                  // onClick={() => setColor(data.hexCode)}
                  className={`rounded-lg border border-[#027AFF] p-1 `}
                >
                  <div
                    className={`w-8 h-8 rounded-lg border-[3px] border-gray-700`}
                  ></div>
                </button>
              </div>
            </div>
            <div>
              <p className="heading-4 mb-2">Your Text: </p>
              <div>
                <input
                  type="text"
                  placeholder={`Scan Me`}
                  className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none px-4 py-2.5 text-gray-700 bg-gray-100"
                />
                <div className="relative flex-1 py-6">
                  <IoLinkSharp
                    className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder={`Search Connections`}
                    className="w-full border border-gray-500 focus:border-[#e5e0e0] rounded-md focus:outline-none pl-10 py-2.5 text-gray-700 bg-gray-100"
                  />
                  {/* <IoLinkSharp
                    className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
                    size={18}
                  /> */}
                  <DynamicPrimaryBtn className="absolute right-4 top-1/2 -translate-y-[50%] font-bold text-gray-600 !rounded-full !py-1.5 !text-sm !gap-1">
                    <MdOutlineFileUpload size={18} /> Upload
                  </DynamicPrimaryBtn>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <p className="heading-4 mb-2">QR Code Branding</p>
                <DynamicPrimaryBtn className="text-xs !py-1 !px-2 !gap-1">
                  <IoIosLock /> Pro
                </DynamicPrimaryBtn>
              </div>
              <div className="flex items-center gap-2">
                <p>I want to remove the swop logo: </p>
                <Switch
                  color="default"
                  size="sm"
                  defaultSelected
                  aria-label="Lead Captures"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[38%] flex flex-col items-center gap-4">
          <p className="text-gray-500 font-medium mb-6">Live Preview</p>
          <Image
            alt="qr code"
            src={"/images/websites/qrcode.png"}
            width={200}
            height={200}
          />
          <p className="heading-4 mt-4">Select Download Type</p>
          <div>
            <RadioGroup value="PDF" orientation="horizontal" color="success">
              <Radio value="PDF">PDF</Radio>
              <Radio value="JPG">JPG</Radio>
              <Radio value="PNG">PNG</Radio>
              <Radio value="SVG">SVG</Radio>
            </RadioGroup>
          </div>
        </div>
      </div>
      <QRCodeShareModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // bannerImgArr={bannerImgArr}
        // backgroundImgArr={backgroundImgArr}
        // onSelectImage={handleSelectImage}
        setIsModalOpen={setIsModalOpen}
        // handleFileChange={handleFileChange}
      />
    </main>
  );
};

export default EditQRCode;
