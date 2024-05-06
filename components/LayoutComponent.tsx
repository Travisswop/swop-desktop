"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Providers } from "@/app/providers";
import { motion } from "framer-motion";

const LayoutComponent = ({ children }: any) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="flex">
      <motion.section
        initial={{ width: toggle ? "4%" : "15%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "4%" : "15%" }} // Target width based on toggle
        transition={{ duration: 0.5 }} // Duration of the animation
        className={`px-4 ${!toggle && "w-[20%] xl:w-[18%] 2xl:w-[15%]"}`}
      >
        <SideBar toggle={toggle} onToggle={handleToggle} />
      </motion.section>
      {/* <section
        className={`px-4 ${!toggle && "w-[20%] xl:w-[18%] 2xl:w-[15%]"} `}
      >
        <SideBar toggle={toggle} onToggle={handleToggle} />
      </section> */}

      <motion.section
        initial={{ width: toggle ? "96%" : "85%" }} // Initial width when toggle is false
        animate={{ width: toggle ? "96%" : "85%" }} // Target width based on toggle
        transition={{ duration: 0.5 }} // Duration of the animation
        className={`bg-gray-100 ${
          !toggle ? "w-[80%] xl:w-[82%] 2xl:w-[85%]" : "w-[96%]"
        }`}
      >
        <TopBar />
        <Providers>{children}</Providers>
      </motion.section>
      {/* <motion.section
        className={`bg-gray-100 ${
          !toggle ? "w-[80%] xl:w-[82%] 2xl:w-[85%]" : "w-[96%]"
        }`}
      >
        <TopBar />
        <Providers>{children}</Providers>
      </motion.section> */}
    </div>
  );
};

export default LayoutComponent;
