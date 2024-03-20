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
      <section className={`${!toggle ? "flex-[1.5]" : ""} px-4`}>
        <SideBar toggle={toggle} onToggle={handleToggle} />
      </section>

      <section className="flex-[10.5] bg-gray-100">
        <TopBar />
        {children}
      </section>
    </div>
  );
};

export default LayoutComponent;
