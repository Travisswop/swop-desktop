"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface ILinkProps {
  data: any;
  toggle: boolean;
}

const SideBarLink = ({ data, toggle }: ILinkProps) => {
  const pathname = usePathname();

  // Function to determine if the link is active
  const isActive = () => {
    if (data.href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(data.href);
  };

  return (
    <Link href={data.href} className="relative">
      <motion.li
        className={`flex items-center gap-2 ${isActive() && "bg-[#8A2BE21A]"} ${
          !toggle ? "px-4" : "px-2 w-max"
        } hover:bg-[#8A2BE21A] py-2.5 rounded-lg`}
      >
        {data.icon} {/* {!toggle && ( */}
        <motion.span
          initial={{
            opacity: toggle ? 0 : 1,
            display: !toggle ? "block" : "hidden",
            // x: toggle ? 50 : 0,
          }}
          animate={{
            opacity: toggle ? 0 : 1,
            display: !toggle ? "block" : "hidden",
            // x: toggle ? 50 : 0,
          }}
          transition={{ delay: toggle ? 0 : 0.3, duration: 0.6 }}
          // className={`${toggle ? "hidden" : "block"}`}
          className="absolute left-11"
        >
          {data.title}
        </motion.span>
        {/* )} */}
      </motion.li>
    </Link>
  );
};

export default SideBarLink;
