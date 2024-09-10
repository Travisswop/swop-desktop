import React from "react";
import Image from "next/image";
import { GoPlusCircle } from "react-icons/go";
import Link from "next/link";

interface DashboardItem {
  title: string;
  icon: string;
  bgColor: string;
  link: string;
}

const items: DashboardItem[] = [
  {
    title: "Mint",
    icon: "/images/homepage/dashboard-icon/mint.png",
    bgColor: "bg-[#E5C5FF7D]",
    link: "/mint",
  },
  {
    title: "Blink",
    icon: "/images/homepage/dashboard-icon/blink.png",
    bgColor: "bg-[#83D0FF80]",
    link: "#",
  },
  {
    title: "Smartsite",
    icon: "/images/homepage/dashboard-icon/smartsite.png",
    bgColor: "bg-[#B4FFB78A]",
    link: "/smartsites/create-smartsite",
  },
  {
    title: "Orders",
    icon: "/images/homepage/dashboard-icon/orders.png",
    bgColor: "bg-[#FF989878]",
    link: "#",
  },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center flex-row gap-10">
        {items.map((el, index) => (
          <Link
            href={el.link}
            key={index}
            className={`text-center py-4 px-10 rounded-xl text-[#424651] ${
              el.bgColor
            } ${el.link === "#" && "cursor-not-allowed"}`}
          >
            <h2 className="text-lg font-bold ">{el.title}</h2>
            <Image
              src={el.icon}
              alt={el.title}
              width={100}
              height={100}
              className="mx-auto py-6"
            />
            <div className="flex justify-center items-center mt-2">
              <GoPlusCircle className="text-2xl text-[#424651] " />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
