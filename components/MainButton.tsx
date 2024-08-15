import { Spinner } from "@nextui-org/react";
import React from "react";

interface IButtonProps {
  title: string;
  icon: React.ReactNode;
  loading?: boolean;
  className?: any;
}

const MainButton = ({
  title,
  icon,
  loading = false,
  className,
}: IButtonProps) => {
  return (
    <button
      className={`bg-black text-white py-2 rounded-xl flex items-center gap-2 justify-center px-6 font-medium ${className}`}
    >
      {loading ? (
        <Spinner size="sm" color="white" className="py-0.5" />
      ) : (
        <>
          {icon} {title}
        </>
      )}
    </button>
  );
};

export default MainButton;
