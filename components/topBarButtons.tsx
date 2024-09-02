"use client";
import PrimaryButton from "./PrimaryButton";
import { FaFileMedical } from "react-icons/fa";
import OutlinePrimaryButton from "./OutlinePrimaryButton";
import { RiRobot2Line } from "react-icons/ri";
import DynamicPrimaryBtn from "./Button/DynamicPrimaryBtn";
import Link from "next/link";

const TopBarButtons = () => {
  const handleOnClick = () => {
    console.log("clicked");
  };
  return (
    <>
      <Link href={"/smartsites/create-smartsite"} className="">
        <DynamicPrimaryBtn>
          <FaFileMedical />
          Create SmartSite
        </DynamicPrimaryBtn>
      </Link>

      {/* <div className="">
        <OutlinePrimaryButton
          preIcon={<RiRobot2Line size={18} />}
          handleOnClick={handleOnClick}
        >
          AI Assistant
        </OutlinePrimaryButton>
      </div> */}
    </>
  );
};

export default TopBarButtons;
