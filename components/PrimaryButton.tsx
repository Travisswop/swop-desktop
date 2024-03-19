import React from "react";

interface PrimaryButtonProps {
  handleOnClick: () => void;
  icon?: any;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  handleOnClick,
  icon,
}) => {
  return (
    <button
      className="bg-black text-white w-full py-2 rounded-xl flex items-center gap-1 justify-center"
      onClick={handleOnClick}
    >
      Log In {icon && icon}
    </button>
  );
};

export default PrimaryButton;
