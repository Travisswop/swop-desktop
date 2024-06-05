"use client";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import { ImCloudUpload } from "react-icons/im";
import { MdFileUpload } from "react-icons/md";

const UploadImageButton = ({ handleModal }: any) => {
  const handleClickOnUploadImage = () => {
    // console.log("clicked");
    handleModal();
  };
  return (
    <div className="w-full sm:w-max">
      <PrimaryButton
        type="button"
        handleOnClick={handleClickOnUploadImage}
        preIcon={<MdFileUpload size={18} />}
      >
        Edit Image
      </PrimaryButton>
    </div>
  );
};

export default UploadImageButton;
