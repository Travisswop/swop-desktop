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
      <section
        className={`px-4 ${!toggle && "w-[20%] xl:w-[18%] 2xl:w-[15%]"} `}
      >
        <SideBar toggle={toggle} onToggle={handleToggle} />
      </section>

      <section
        className={`bg-gray-100 ${
          !toggle ? "w-[80%] xl:w-[82%] 2xl:w-[85%]" : "w-[96%]"
        }`}
      >
        <TopBar />
        <Providers>{children} </Providers>
      </section>
    </div>
  );
};

export default LayoutComponent;
