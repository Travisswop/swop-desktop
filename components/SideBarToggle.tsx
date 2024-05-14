"use client";
import SideBarToggleContext from "@/contexts/sideBarToggleContext";
import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";

const SideBarToggle = ({ onToggle }: any) => {
  const { settingToggle } = useContext(SideBarToggleContext);
  const handleToggle = () => {
    onToggle();
    settingToggle();
  };
  return (
    <button onClick={handleToggle} className="">
      <FaBars className="text-gray-600" size={18} />
    </button>
  );
};

export default SideBarToggle;
