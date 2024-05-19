"use client";
import React from "react";
import SideBar from "./SideBar";
import { Providers } from "@/app/providers";
import { MotionSection, easeInOutProp } from "@/util/Motion";
import useSideBarToggleStore from "@/zustandStore/SideBarToggleStore";

const LayoutComponent = ({ children }: any) => {
  const { toggle, setToggle } = useSideBarToggleStore();

  const handleToggle = () => {
    setToggle();
  };

  // console.log("count from zustand", count);

  return (
    <div className="flex">
      <MotionSection
        initial={{ width: toggle ? "6%" : "15%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "6%" : "15%" }} // Target width based on toggle
        transition={{ duration: 0.4, ease: easeInOutProp }} // Duration of the animation
        className={`px-4 block 2xl:hidden ${
          !toggle && "w-[20%] xl:w-[18%] 2xl:w-[15%]"
        }`}
      >
        <SideBar toggle={toggle} onToggle={handleToggle} />
      </MotionSection>

      <MotionSection
        initial={{ width: toggle ? "4%" : "15%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "4%" : "15%" }} // Target width based on toggle
        transition={{ duration: 0.4, ease: easeInOutProp }} // Duration of the animation
        className={`px-4 hidden 2xl:block ${
          !toggle && "w-[20%] xl:w-[18%] 2xl:w-[15%]"
        }`}
      >
        <SideBar toggle={toggle} onToggle={handleToggle} />
      </MotionSection>

      <MotionSection
        initial={{ width: toggle ? "94%" : "85%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "94%" : "85%" }} // Target width based on toggle
        transition={{ duration: 0.4, ease: easeInOutProp }} // Duration of the animation
        className={`bg-gray-100 block 2xl:hidden ${
          !toggle ? "w-[80%] xl:w-[82%] 2xl:w-[85%]" : "w-[96%]"
        }`}
      >
        {/* <TopBar /> */}
        <Providers>{children}</Providers>
      </MotionSection>

      <MotionSection
        initial={{ width: toggle ? "96%" : "85%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "96%" : "85%" }} // Target width based on toggle
        transition={{ duration: 0.4, ease: easeInOutProp }} // Duration of the animation
        className={`bg-gray-100 hidden 2xl:block ${
          !toggle ? "w-[80%] xl:w-[82%] 2xl:w-[85%]" : "w-[96%]"
        }`}
      >
        {/* <TopBar /> */}
        <Providers>{children}</Providers>
      </MotionSection>
    </div>
  );
};

export default LayoutComponent;
