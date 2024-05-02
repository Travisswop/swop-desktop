"use client"; // need for collection select item
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import AddPropertiesModel from "@/components/mintClaimModal/AddProperties";
import {
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { CiUnlock } from "react-icons/ci";
import { FaListUl } from "react-icons/fa";
import { LuBarChart2 } from "react-icons/lu";
import { MdOutlineWatchLater } from "react-icons/md";

const ClaimMintPage = () => {
  const [activeModal, setActiveModal] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handlePropertiesModal = () => {
    onOpen();
    setActiveModal("properties");
  };
  const collectionItemArray = ["test1", "test2", "test3", "test4"];
  return (
    <div className="main-container">
      <div className="bg-white">
        <div className="w-1/2 mx-auto flex flex-col gap-4 py-5">
          <h2 className="text-2xl font-bold">Create New NFT</h2>
          <div>
            <p className="text-lg font-semibold">
              Image, Video, Audio, or 3D Model *
            </p>
            <p className="mb-2 text-xs text-gray-400">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. Max size: 100 MB
            </p>
            <div className="relative w-max">
              <Image
                alt="image placeholder"
                src={"/images/image_placeholder.png"}
                width={320}
                height={300}
              />
              <DynamicPrimaryBtn className="absolute bottom-6 left-1/2 -translate-x-1/2 min-w-max">
                Choose From Library
              </DynamicPrimaryBtn>
            </div>
          </div>
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Name:{" "}
            </label>
            <input
              type="text"
              id="name"
              placeholder={`Item Name`}
              className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none pl-4 py-2 text-gray-700 bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              External link:{" "}
            </label>
            <p className="text-sm text-gray-400 mb-2">
              {`OpenSea will include a link to this URL on this item's detail
              page, so that users can click to learn more about it. You are
              welcome to link to your own webpage with more details.`}
            </p>
            <input
              type="text"
              id="name"
              placeholder={`Http://swopme.co`}
              className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none pl-4 py-2 text-gray-700 bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Description:{" "}
            </label>
            <p className="text-sm text-gray-400 mb-2">
              {`The description will be included on the item's detail page underneath its image.
Markdown syntax is supported.`}
            </p>
            <textarea
              id="name"
              placeholder={`Provide a detailed description for your item`}
              className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none pl-4 py-2 text-gray-700 bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Collection:{" "}
            </label>
            <p className="text-sm text-gray-400 mb-2">
              {`This is the collection where your item will appear. info`}
            </p>
            {/* <input
              type="text"
              id="name"
              placeholder={`Http://swopme.co`}
              className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none pl-4 py-2 text-gray-700 bg-gray-100"
            /> */}
            <Select label="Select Collection" className="">
              {collectionItemArray.map((data, index) => (
                <SelectItem key={index} value={data}>
                  {data}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <div className="mt-4 pb-4 font-medium flex justify-between border-b">
              <div className="flex gap-4">
                <FaListUl />
                <div className="-m-1.5">
                  <h6>Properties</h6>
                  <p className="text-gray-400 text-sm">
                    Textual traits that show up as rectangles
                  </p>
                </div>
              </div>
              <button onClick={() => handlePropertiesModal()}>
                <AiOutlinePlusSquare size={28} color="#5F76EF" />
              </button>
            </div>
          </div>
          <div>
            <div className="mt-4 pb-4 font-medium flex justify-between border-b">
              <div className="flex gap-4">
                <MdOutlineWatchLater size={22} />
                <div className="-m-1.5">
                  <h6>Expiration</h6>
                  <p className="text-gray-400 text-sm">
                    Numerical traits that show as a progress bar
                  </p>
                </div>
              </div>
              <AiOutlinePlusSquare size={28} color="#5F76EF" />
            </div>
          </div>
          <div>
            <div className="mt-4 pb-4 font-medium flex justify-between border-b">
              <div className="flex gap-4">
                <LuBarChart2 size={22} />
                <div className="-m-1.5">
                  <h6>Stats</h6>
                  <p className="text-gray-400 text-sm">
                    Numerical traits that show as a progress bar
                  </p>
                </div>
              </div>
              <AiOutlinePlusSquare size={28} color="#5F76EF" />
            </div>
          </div>
          <div>
            <div className="mt-4 pb-4 font-medium flex justify-between border-b">
              <div className="flex gap-4">
                <CiUnlock size={22} color="#5F76EF" />
                <div className="-m-1.5">
                  <h6>Unlockable content</h6>
                  <p className="text-gray-400 text-sm">
                    Include unlockable content that can only be revealed by the
                    owner of the item.
                  </p>
                </div>
              </div>
              <Switch
                defaultSelected
                aria-label="Automatic updates"
                color="default"
                size="sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Supply:{" "}
            </label>
            <p className="text-sm text-gray-400 mb-2">
              {`The number of items that can be minted. No gas cost to you!`}
            </p>
            <input
              type="text"
              id="name"
              placeholder={`1`}
              className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none pl-4 py-2 text-gray-700 bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Blockchain:{" "}
            </label>
            <Select label="Select Collection" className="">
              {collectionItemArray.map((data, index) => (
                <SelectItem key={index} value={data}>
                  {data}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="pb-4 border-b">
            <label htmlFor="name" className="mb-1 block font-medium">
              Freeze metadata:{" "}
            </label>
            <p className="text-sm text-gray-400 mb-2">
              {`Freezing your metadata will allow you to permanently lock and store all of this
item's content in decentralized file storage.`}
            </p>
            <input
              type="text"
              id="name"
              placeholder={`To freeze your metadata, you must create your item first.`}
              className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-lg focus:outline-none pl-4 py-2 text-gray-700 bg-gray-100"
            />
          </div>
          <RadioGroup>
            <Radio size="sm" color="default" value="buenos-aires">
              Buenos Aires
            </Radio>
            <Radio size="sm" color="default" value="sydney">
              Sydney
            </Radio>
            <Radio size="sm" color="default" value="san-francisco">
              San Francisco
            </Radio>
            <Radio size="sm" color="default" value="london">
              London
            </Radio>
            <Radio size="sm" color="default" value="tokyo">
              Tokyo
            </Radio>
          </RadioGroup>
          <DynamicPrimaryBtn className="w-max !px-10 !rounded-lg">
            Create
          </DynamicPrimaryBtn>
        </div>
        <AddPropertiesModel
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          // bannerImgArr={bannerImgArr}
          // backgroundImgArr={backgroundImgArr}
          // onSelectImage={handleSelectImage}
          setIsModalOpen={setActiveModal}
          // handleFileChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ClaimMintPage;
