"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Providers } from "@/app/providers";

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
        <Providers>{children} </Providers>
      </section>
    </div>
  );
};

export default LayoutComponent;
