"use client";
import React from "react";

interface PrimaryButtonProps {
  handleOnClick: () => void;
  type?: string;
  icon?: any;
  preIcon?: any;
  children?: any;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  handleOnClick,
  icon,
  children,
  preIcon,
  type,
}) => {
  return (
    <button
      type={type as any}
      className="bg-black text-white w-full py-2 rounded-xl flex items-center gap-2 justify-center px-4"
      onClick={handleOnClick}
    >
      {preIcon && preIcon} {children ? children : "Log In"} {icon && icon}
    </button>
  );
};

export default PrimaryButton;
