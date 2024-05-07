"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Providers } from "@/app/providers";
import { easeIn, easeInOut, easeOut, motion } from "framer-motion";

const LayoutComponent = ({ children }: any) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="flex">
      <motion.section
        initial={{ width: toggle ? "6%" : "15%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "6%" : "15%" }} // Target width based on toggle
        transition={{ duration: 0.4, ease: easeInOut }} // Duration of the animation
        className={`px-4 block 2xl:hidden ${
          !toggle && "w-[20%] xl:w-[18%] 2xl:w-[15%]"
        }`}
      >
        <SideBar toggle={toggle} onToggle={handleToggle} />
      </motion.section>

      <motion.section
        initial={{ width: toggle ? "4%" : "15%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "4%" : "15%" }} // Target width based on toggle
        transition={{ duration: 0.4, ease: easeInOut }} // Duration of the animation
        className={`px-4 hidden 2xl:block ${
          !toggle && "w-[20%] xl:w-[18%] 2xl:w-[15%]"
        }`}
      >
        <SideBar toggle={toggle} onToggle={handleToggle} />
      </motion.section>

      <motion.section
        initial={{ width: toggle ? "94%" : "85%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "94%" : "85%" }} // Target width based on toggle
        transition={{ duration: 0.4, ease: easeInOut }} // Duration of the animation
        className={`bg-gray-100 block 2xl:hidden ${
          !toggle ? "w-[80%] xl:w-[82%] 2xl:w-[85%]" : "w-[96%]"
        }`}
      >
        <TopBar />
        <Providers>{children}</Providers>
      </motion.section>

      <motion.section
        initial={{ width: toggle ? "96%" : "85%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "96%" : "85%" }} // Target width based on toggle
        transition={{ duration: 0.4, ease: easeInOut }} // Duration of the animation
        className={`bg-gray-100 hidden 2xl:block ${
          !toggle ? "w-[80%] xl:w-[82%] 2xl:w-[85%]" : "w-[96%]"
        }`}
      >
        <TopBar />
        <Providers>{children}</Providers>
      </motion.section>
    </div>
  );
};

export default LayoutComponent;
