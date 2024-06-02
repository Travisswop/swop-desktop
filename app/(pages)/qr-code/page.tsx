// "use client";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import { Checkbox, Switch } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoQrCodeSharp } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";

const QrCodePage = async () => {
  // const { toggle } = useSideBarToggleStore();
  // console.log("toggle form qr code ", toggle);

  await isUserAuthenticate(); // check is user exist

  return (
    <div className="main-container">
      <div className="flex items-start justify-between">
        <p className="text-gray-700 font-semibold text-lg">QR Codes</p>
        <div className="flex gap-3 items-center justify-between">
          <div className="relative flex-1">
            <CiSearch
              className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
              size={18}
            />
            <input
              type="text"
              placeholder={`Search Connections`}
              className="w-full border border-gray-300 focus:border-gray-400 rounded-full focus:outline-none pl-10 py-2 text-gray-700 bg-gray-100"
            />
          </div>
          <div className="relative flex-1">
            <p className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600">
              All Time
            </p>
            <input
              type="date"
              placeholder={`Search Connections`}
              className="w-full border border-gray-300 focus:border-gray-400 rounded-full focus:outline-none pl-24 py-2 text-gray-700 bg-gray-100 pr-4"
            />
          </div>
          <DynamicPrimaryBtn className="!rounded-full">
            Export
          </DynamicPrimaryBtn>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="flex items-center gap-4 w-[100%] mb-3">
              <Checkbox className="bg-white py-2 px-4 rounded-full" size="sm">
                <span className="text-gray-600">Select All</span>
              </Checkbox>
              <div className="flex items-center gap-4 rounded-full bg-white pl-4 pr-3 py-1.5 font-medium text-gray-600 w-max">
                <p className="text-sm">Map</p>
                <Switch
                  color="default"
                  size="sm"
                  defaultSelected
                  aria-label="Map"
                />
              </div>
            </th>
            <th className="text-gray-500 w-[15%] text-start">Scans</th>
            <th className="text-gray-500 w-[15%] text-start">Type</th>
            <th className="text-gray-500 w-[15%] text-start">Created</th>
            <th className="text-gray-500 w-[15%] text-start">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-[100%] bg-white mb-6 border-b">
            <td className="flex items-center gap-1 w-[100%] py-2 pl-4">
              <Checkbox size="sm"></Checkbox>
              <Image
                alt="qrcode"
                src={"/images/qrcode.png"}
                width={50}
                height={50}
              />
              <div>
                <p>TV Commercial QR</p>
                <p className="text-xs text-gray-500">www.SwopMe.co</p>
              </div>
            </td>
            <td className="w-[15%]">#1,224</td>
            <td className="w-[15%] text-gray-700 font-semibold">Dynamic</td>
            <td className="w-[15%] text-gray-400 font-semibold">
              June 23, 2023
            </td>
            <td className="w-[15%]">
              <Link className="w-full h-full" href={`/qr-code/12344`}>
                <div className="bg-gray-200 px-4 py-2 w-max rounded-lg">
                  <TbEdit color="gray" />
                </div>
              </Link>
            </td>
          </tr>
          <tr className="w-[100%] bg-white border-b">
            <td className="flex items-center gap-1 w-[100%] py-2 pl-4">
              <Checkbox size="sm"></Checkbox>
              <Image
                alt="qrcode"
                src={"/images/qrcode.png"}
                width={50}
                height={50}
              />
              <div>
                <p>TV Commercial QR</p>
                <p className="text-xs text-gray-500">www.SwopMe.co</p>
              </div>
            </td>
            <td className="w-[15%]">#1,224</td>
            <td className="w-[15%] text-gray-700 font-semibold">Static</td>
            <td className="w-[15%] text-gray-400 font-semibold">
              June 23, 2023
            </td>
            <td className="w-[15%]">
              <Link className="w-full h-full" href={`/qr-code/12344`}>
                <div className="bg-gray-200 px-4 py-2 w-max rounded-lg">
                  <TbEdit color="gray" />
                </div>
              </Link>
            </td>
          </tr>
          <tr className="w-[100%] bg-white border-b">
            <td className="flex items-center gap-1 w-[100%] py-2 pl-4">
              <Checkbox size="sm"></Checkbox>
              <Image
                alt="qrcode"
                src={"/images/qrcode.png"}
                width={50}
                height={50}
              />
              <div>
                <p>TV Commercial QR</p>
                <p className="text-xs text-gray-500">www.SwopMe.co</p>
              </div>
            </td>
            <td className="w-[15%]">#1,224</td>
            <td className="w-[15%] text-gray-700 font-semibold">Dynamic</td>
            <td className="w-[15%] text-gray-400 font-semibold">
              June 23, 2023
            </td>
            <td className="w-[15%]">
              <Link className="w-full h-full" href={`/qr-code/12344`}>
                <div className="bg-gray-200 px-4 py-2 w-max rounded-lg">
                  <TbEdit color="gray" />
                </div>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      <DynamicPrimaryBtn className="!px-10 mx-auto mt-10">
        <IoQrCodeSharp />
        Create
      </DynamicPrimaryBtn>
    </div>
  );
};

export default QrCodePage;
