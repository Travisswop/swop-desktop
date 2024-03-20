"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const LayoutComponent = ({ children }: any) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="flex">
      <section className="px-4">
        <SideBar toggle={toggle} onToggle={handleToggle} />
      </section>

      <section className="w-full bg-gray-100">
        <TopBar />
        {children}
      </section>
    </div>
  );
};

export default LayoutComponent;
