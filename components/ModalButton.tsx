import React from "react";

const ModalButton = ({ children }: any) => {
  return (
    <button className="bg-gray-300 text-[#302F2F] px-4 py-1.5 font-medium w-full rounded-lg">
      {children}
    </button>
  );
};

export default ModalButton;
