import React from "react";

interface IButtonProps {
  title: string;
  icon: React.ReactNode;
}

const MainButton = ({ title, icon }: IButtonProps) => {
  return (
    <button className="bg-black text-white py-2 rounded-xl flex items-center gap-2 justify-center px-6 font-medium">
      {icon} {title}
    </button>
  );
};

export default MainButton;
