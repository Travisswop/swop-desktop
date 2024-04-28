"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

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
    <Link href={data.href}>
      <li
        className={`flex items-center gap-2 ${isActive() && "bg-[#8A2BE21A]"} ${
          !toggle ? "pl-4" : "px-2"
        } hover:bg-[#8A2BE21A] py-1.5 rounded-lg`}
      >
        {data.icon} {!toggle && data.title}
      </li>
    </Link>
  );
};

export default SideBarLink;
