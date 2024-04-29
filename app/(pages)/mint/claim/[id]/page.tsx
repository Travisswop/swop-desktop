import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import Image from "next/image";
import React from "react";

const ClaimMintPage = () => {
  return (
    <div className="main-container">
      <div className="bg-white">
        <div className="w-1/2 mx-auto">
          <h2
            className="text-2xl font-bold
        "
          >
            Create New NFT
          </h2>
          <div>
            <p>Image, Video, Audio, or 3D Model *</p>
            <p>
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
              className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-4 py-2 text-gray-700 bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              External link:{" "}
            </label>
            <p>
              {`OpenSea will include a link to this URL on this item's detail
              page, so that users can click to learn more about it. You are
              welcome to link to your own webpage with more details.`}
            </p>
            <input
              type="text"
              id="name"
              placeholder={`Http://swopme.co`}
              className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-4 py-2 text-gray-700 bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimMintPage;
