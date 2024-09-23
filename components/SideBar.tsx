'use client';
import React, { useState } from 'react';
import swopLogo from '../public/images/logo/swop-logo.svg';
import Image from 'next/image';
import { RxDashboard } from 'react-icons/rx';
// import { IoLogOutOutline } from "react-icons/io5";
import { RiBarChartLine, RiMessage3Line, RiRobot2Line } from 'react-icons/ri';
import { MdOutlineQrCodeScanner } from 'react-icons/md';
import { CiViewList } from 'react-icons/ci';
import { TbMessageChatbot } from 'react-icons/tb';
import Link from 'next/link';
import SideBarLink from './SideBarLink';
import { IoWalletOutline } from 'react-icons/io5';

// import SideBarToggle from "./SideBarToggle";
// import SideBarUpgradePlan from "./SideBarUpgradePlan";
// import { doSignOut } from "@/actions/auth";
// import LogOutComponent from "./LogOut";
import SideBarUpgradePlan from './SideBarUpgradePlan';
import { doSignOut } from '@/actions/auth';
import { IoLogOutOutline } from 'react-icons/io5';
import useLoggedInUserStore from '@/zustandStore/SetLogedInUserSession';
// import isUserAuthenticate from "@/util/isUserAuthenticate";
// import useLoggedInUserStore from "@/zustandStore/SetLogedInUserSession";

const SideBar = ({ toggle, onToggle }: any) => {
  const [isShow, setIsShow] = useState(true);

  const sidebarArray = [
    {
      id: 101,
      icon: <RxDashboard />,
      title: 'Dashboard',
      href: '/',
    },
    {
      id: 102,
      icon: <RiBarChartLine />,
      title: 'Smartsites',
      href: '/smartsites',
    },
    {
      id: 103,
      icon: <MdOutlineQrCodeScanner />,
      title: 'QR Code',
      href: '/qr-code',
    },
    {
      id: 104,
      icon: <IoWalletOutline size={18} />,
      title: 'Wallet',
      href: '/wallet',
    },
    {
      id: 105,
      icon: <RiBarChartLine />,
      title: 'Analytics',
      href: '/analytics',
    },
    {
      id: 106,
      icon: <RiMessage3Line size={18} />,
      title: 'Messages',
      href: '/messages',
    },
    {
      id: 107,
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='19'
          height='19'
          viewBox='0 0 22 22'
          fill='none'
        >
          <path
            d='M8.2474 10.9998C8.73363 10.9998 9.19994 10.8067 9.54376 10.4629C9.88757 10.119 10.0807 9.65273 10.0807 9.1665C10.0807 8.68027 9.88757 8.21396 9.54376 7.87014C9.19994 7.52632 8.73363 7.33317 8.2474 7.33317C7.76117 7.33317 7.29485 7.52632 6.95103 7.87014C6.60722 8.21396 6.41406 8.68027 6.41406 9.1665C6.41406 9.65273 6.60722 10.119 6.95103 10.4629C7.29485 10.8067 7.76117 10.9998 8.2474 10.9998ZM19.7057 5.95817L10.9974 0.916504L2.28906 5.95817V16.0415L10.9974 21.0832L19.7057 16.0415V5.95817ZM10.9974 3.03492L17.8724 7.01509V13.3218L13.6906 10.8138L6.38381 16.2936L4.1224 14.9846V7.01509L10.9974 3.03492ZM10.9974 18.9648L8.10806 17.2918L13.8042 13.0202L17.4691 15.2183L10.9974 18.9648Z'
            fill='#424651'
          />
        </svg>
      ),
      title: 'Mint',
      href: '/mint',
    },
    {
      id: 108,
      icon: <CiViewList size={18} />,
      title: 'Blink',
      href: '/blink',
    },
    {
      id: 109,
      icon: <CiViewList size={18} />,
      title: 'Orders',
      href: '/orders',
    },
    {
      id: 110,
      icon: <RiRobot2Line size={18} />,
      title: 'Automations',
      href: '/automations',
    },
    {
      id: 111,
      icon: <TbMessageChatbot size={20} />,
      title: 'Support Center',
      href: '/support-center',
    },
  ];

  const handleLogOut = async (e: any) => {
    e.preventDefault();
    await doSignOut();
  };

  const loggedInUserInfo = useLoggedInUserStore(
    (state: any) => state.state.user,
  );

  return (
    <div className={`sticky top-0  ${toggle && 'pl-1.5'}`}>
      <div
        className={`h-[6.8rem] ${
          !toggle ? 'pl-4 justify-between gap-4' : 'px-2'
        } flex items-center`}
      >
        {!toggle && (
          <Link href={'/'} className='flex-shrink'>
            <Image src={swopLogo} alt='swop logo' width={140} />
          </Link>
        )}
        {/* <button onClick={onClickToggle} className="">
          <FaBars className="text-gray-600" size={18} />
        </button> */}
        {/* <SideBarToggle toggle={toggle} onToggle={onToggle} /> */}
      </div>
      <div>
        <ul className={`flex flex-col gap-y-4`}>
          {sidebarArray.map((data) => (
            <SideBarLink key={data.id} data={data} toggle={toggle} />
          ))}
        </ul>

        {/* divider */}
        <hr className={`${!toggle ? 'my-10' : 'my-6'}`} />

        {/* upgrade plan  */}
        {/* {loggedInUserInfo && !loggedInUserInfo?.isPremiumUser && ( */}

        {!loggedInUserInfo?.isPremiumUser && isShow && (
          <SideBarUpgradePlan
            toggle={toggle}
            isShow={isShow}
            setIsShow={setIsShow}
          />
        )}

        <button
          type='button'
          onClick={handleLogOut}
          className={`flex items-center justify-center gap-1 mt-6 pb-6 pl-4 font-medium text-[#424651]`}
        >
          <IoLogOutOutline size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
