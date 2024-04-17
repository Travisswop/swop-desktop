import React from "react";

interface IButtonProps {
  children?: any;
}

const SecondaryButton = ({ children }: IButtonProps) => {
  return (
    <button className="bg-white text-[#424651] border border-gray-600 hover:border-transparent py-2 px-6 rounded-xl flex items-center gap-2 justify-center font-medium hover:bg-gray-700 hover:text-white">
      {children}
    </button>
  );
};

export default SecondaryButton;
