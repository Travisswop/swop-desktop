"use client";
import React from "react";

interface PrimaryButtonProps {
  handleOnClick: () => void;
  icon?: any;
  preIcon?: any;
  children?: any;
}

const OutlinePrimaryButton: React.FC<PrimaryButtonProps> = ({
  handleOnClick,
  icon,
  children,
  preIcon,
}) => {
  return (
    <button
      className="bg-white text-[#424651] outline outline-[1.5px] outline-gray-600 w-full py-2 px-4 rounded-xl flex items-center gap-2 justify-center font-medium hover:bg-gray-700 hover:text-white"
      onClick={handleOnClick}
    >
      {preIcon && preIcon} {children ? children : "Log In"} {icon && icon}
    </button>
  );
};

export default OutlinePrimaryButton;
