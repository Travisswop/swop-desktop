"use client";
import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { Providers } from "@/app/providers";
import { MotionSection, easeInOutProp } from "@/util/Motion";
import useSideBarToggleStore from "@/zustandStore/SideBarToggleStore";
import useLoggedInUserStore from "@/zustandStore/SetLogedInUserSession";

const LayoutComponent = ({ children }: any) => {
  const { toggle, setToggle } = useSideBarToggleStore();

  const handleToggle = () => {
    setToggle();
  };

  return (
    <div className={`flex h-screen`}>
      {/* hidden for 2xl 11 */}
      <MotionSection
        initial={{ width: toggle ? "6%" : "16%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "6%" : "16%" }} // Target width based on toggle
        transition={{ duration: 0.4, ease: easeInOutProp }} // Duration of the animation
        className={`px-4 block 2xl:hidden overflow-y-auto ${
          !toggle && "w-[30%] xl:w-[25%] 2xl:w-[15%]"
        }`}
      >
        <SideBar toggle={toggle} onToggle={handleToggle} />
      </MotionSection>

      {/* hidden for 2xl 11 */}
      <MotionSection
        initial={{ width: toggle ? "94%" : "84%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "94%" : "84%" }} // Target width based on toggle
        transition={{ duration: 0.4, ease: easeInOutProp }} // Duration of the animation
        className={`bg-gray-100 block 2xl:hidden overflow-y-auto ${
          !toggle ? "w-[70%] xl:w-[75%] 2xl:w-[85%]" : "w-[96%]"
        }`}
      >
        {/* <TopBar /> */}
        <Providers>{children}</Providers>
      </MotionSection>

      {/* only show for 2xl and so on  */}
      <MotionSection
        initial={{ width: toggle ? "4%" : "14%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "4%" : "14%" }} // Target width based on toggle
        transition={{ duration: 0.4, ease: easeInOutProp }} // Duration of the animation
        className={`px-4 hidden 2xl:block overflow-y-auto ${
          !toggle && "w-[30%] xl:w-[25%] 2xl:w-[15%]"
        }`}
      >
        <SideBar toggle={toggle} onToggle={handleToggle} />
      </MotionSection>
      {/* only show for 2xl and so on  */}
      <MotionSection
        initial={{ width: toggle ? "96%" : "86%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "96%" : "86%" }} // Target width based on toggle
        transition={{ duration: 0.4, ease: easeInOutProp }} // Duration of the animation
        className={`bg-gray-100 hidden 2xl:block overflow-y-auto ${
          !toggle ? "w-[70%] xl:w-[75%] 2xl:w-[85%]" : "w-[96%]"
        }`}
      >
        {/* <TopBar /> */}
        <Providers>{children}</Providers>
      </MotionSection>
    </div>
  );
};

export default LayoutComponent;
