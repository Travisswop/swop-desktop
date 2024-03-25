"use client";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import { ImCloudUpload } from "react-icons/im";

const UploadImageButton = () => {
  const handleClickOnUploadImage = () => {
    console.log("clicked");
  };
  return (
    <div className="w-full sm:w-max">
      <PrimaryButton
        handleOnClick={handleClickOnUploadImage}
        preIcon={<ImCloudUpload />}
      >
        Upload Image
      </PrimaryButton>
    </div>
  );
};

export default UploadImageButton;
