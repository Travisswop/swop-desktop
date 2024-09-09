import { Avatar, Checkbox } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const MessageList = ({ userDetails }: any) => {
  return (
    <div className="main-container">
      <h1 className="text-lg font-semibold mb-5">Messages</h1>
      <div>
        <div className="flex items-center mb-5">
          <div className="w-[60%]">
            <button className="bg-white rounded-full px-4 py-1">
              <Checkbox size="sm" className="font-medium">
                Select all
              </Checkbox>
            </button>
          </div>
          <p className="text-gray-500 text-sm w-[20%] font-medium">Connected</p>
          <p className="text-gray-500 text-sm w-[20%] font-medium">Smartsite</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1 bg-white rounded-lg p-3">
            <div className="flex items-center gap-1 w-[60%]">
              <Checkbox size="sm" />
              <div className="flex items-center gap-3">
                <Avatar src={"/images/user-image/travis.png"} />
                <div>
                  <p className="font-semibold">Travis Herron</p>
                  <p className="text-gray-500 text-xs font-medium">
                    Founder at swop
                  </p>
                </div>
              </div>
            </div>
            <p className="w-[20%] text-gray-500 font-medium">June 23, 2024</p>
            <div className="w-[20%]">
              <Link
                href={"/messages/travis.swop.id"}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md font-medium text-sm"
              >
                View
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white rounded-lg p-3">
            <div className="flex items-center gap-1 w-[60%]">
              <Checkbox size="sm" />
              <div className="flex items-center gap-3">
                <Avatar src="/images/user-image/salman.png" />
                <div>
                  <p className="font-semibold">Salman H Saikote</p>
                  <p className="text-gray-500 text-xs font-medium">CTO</p>
                </div>
              </div>
            </div>
            <p className="w-[20%] text-gray-500 font-medium">June 23, 2024</p>
            <div className="w-[20%]">
              <Link
                href={"/messages/travis.swop.id"}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md font-medium text-sm"
              >
                View
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white rounded-lg p-3">
            <div className="flex items-center gap-1 w-[60%]">
              <Checkbox size="sm" />
              <div className="flex items-center gap-3">
                <Avatar src="/images/user-image/neel.png" />
                <div>
                  <p className="font-semibold">Arjo Neel</p>
                  <p className="text-gray-500 text-xs font-medium">COO</p>
                </div>
              </div>
            </div>
            <p className="w-[20%] text-gray-500 font-medium">June 23, 2024</p>
            <div className="w-[20%]">
              <Link
                href={"/messages/travis.swop.id"}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md font-medium text-sm"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
