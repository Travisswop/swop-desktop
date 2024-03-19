import React from "react";
import swopLogo from "../public/images/logo/swop-logo.svg";
import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { FaPoll } from "react-icons/fa";
import {
  RiBarChartLine,
  RiMessage2Line,
  RiMessage3Line,
  RiRobot2Line,
} from "react-icons/ri";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { TbMessageChatbot } from "react-icons/tb";

const SideBar = () => {
  const sidebarArray = [
    {
      id: 101,
      icon: <RxDashboard />,
      title: "Dashboard",
    },
    {
      id: 102,
      icon: <RiBarChartLine />,
      title: "Websites",
    },
    {
      id: 103,
      icon: <MdOutlineQrCodeScanner />,
      title: "QR Code",
    },
    {
      id: 104,
      icon: <RiBarChartLine />,
      title: "Analytics",
    },
    {
      id: 105,
      icon: <RiMessage3Line size={18} />,
      title: "Messages",
    },
    {
      id: 106,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M8.2474 10.9998C8.73363 10.9998 9.19994 10.8067 9.54376 10.4629C9.88757 10.119 10.0807 9.65273 10.0807 9.1665C10.0807 8.68027 9.88757 8.21396 9.54376 7.87014C9.19994 7.52632 8.73363 7.33317 8.2474 7.33317C7.76117 7.33317 7.29485 7.52632 6.95103 7.87014C6.60722 8.21396 6.41406 8.68027 6.41406 9.1665C6.41406 9.65273 6.60722 10.119 6.95103 10.4629C7.29485 10.8067 7.76117 10.9998 8.2474 10.9998ZM19.7057 5.95817L10.9974 0.916504L2.28906 5.95817V16.0415L10.9974 21.0832L19.7057 16.0415V5.95817ZM10.9974 3.03492L17.8724 7.01509V13.3218L13.6906 10.8138L6.38381 16.2936L4.1224 14.9846V7.01509L10.9974 3.03492ZM10.9974 18.9648L8.10806 17.2918L13.8042 13.0202L17.4691 15.2183L10.9974 18.9648Z"
            fill="#424651"
          />
        </svg>
      ),
      title: "Mint",
    },
    {
      id: 107,
      icon: <CiViewList size={18} />,
      title: "Orders",
    },
    {
      id: 108,
      icon: <RiRobot2Line size={18} />,
      title: "Automations",
    },
    {
      id: 109,
      icon: <TbMessageChatbot size={20} />,
      title: "Support Center",
    },
  ];
  return (
    <div className="">
      <Image
        src={swopLogo}
        alt="swop logo"
        width={140}
        className="py-10 pl-4"
      />
      <div>
        <ul className="flex flex-col gap-y-3">
          {sidebarArray.map((data) => (
            <li
              className="flex items-center gap-2 pl-4 hover:bg-[#8A2BE21A] py-1.5 rounded-lg"
              key={data.id}
            >
              {data.icon} {data.title}
            </li>
          ))}
        </ul>

        {/* divider */}
        <hr className="my-10" />

        {/* upgrade plan  */}
        <div className="bg-gray-100 p-4 flex flex-col gap-y-4">
          <AiOutlineShoppingCart size={18} />
          <div>
            <p className="mb-2 text-[#454547] font-medium">
              Unlock Unlimited Access
            </p>
            <p className="text-[#454547CC]">
              Free NFC with a yearly subscription
            </p>
          </div>
          <div className="flex justify-between items-center mr-4">
            <button className="font-medium text-[#68686A]">Dismiss</button>
            <button className="font-semibold text-[#8A2BE2]">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* logout  */}
        <button className="flex items-center gap-1 mt-6 ml-4 font-medium text-[#424651]">
          <IoLogOutOutline size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
