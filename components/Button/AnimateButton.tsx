import { Spinner } from "@nextui-org/react";
import React, { useState, ReactNode } from "react";

interface AnimateButtonProps {
  children: ReactNode;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  width?: string;
  onClick?: any;
}

const AnimateButton: React.FC<AnimateButtonProps> = ({
  children,
  isLoading = false,
  type = "submit",
  width = "w-52",
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${width} relative overflow-hidden flex justify-center items-center gap-0.5 border border-gray-400 px-4 py-1.5 rounded-xl text-gray-500 font-medium hover:text-white hover:bg-gradient-to-r hover:from-black hover:to-transparent hover:border-gray-400 hover:bg-[length:200%_100%] hover:animate-bg-slide`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <Spinner
          size="sm"
          className="py-0.5"
          color={isHovered ? "white" : "secondary"}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default AnimateButton;
