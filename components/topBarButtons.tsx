"use client";
import PrimaryButton from "./PrimaryButton";
import { FaFileMedical } from "react-icons/fa";
import OutlinePrimaryButton from "./OutlinePrimaryButton";
import { RiRobot2Line } from "react-icons/ri";

const TopBarButtons = () => {
  const handleOnClick = () => {
    console.log("clicked");
  };
  return (
    <>
      <div className="">
        <PrimaryButton
          preIcon={<FaFileMedical />}
          handleOnClick={handleOnClick}
        >
          Create Microsite
        </PrimaryButton>
      </div>

      <div className="">
        <OutlinePrimaryButton
          preIcon={<RiRobot2Line size={18} />}
          handleOnClick={handleOnClick}
        >
          AI Assistant
        </OutlinePrimaryButton>
      </div>
    </>
  );
};

export default TopBarButtons;
