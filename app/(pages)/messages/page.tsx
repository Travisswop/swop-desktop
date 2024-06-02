import { auth } from "@/auth";
import { Checkbox } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const MessagesPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect(`/signin`);
  }
  return (
    <div className="main-container">
      <div className="flex items-start justify-between">
        <p className="text-gray-700 font-semibold text-lg mb-10">Messages</p>
      </div>
      <table className="w-full">
        <thead className="mb-4">
          <tr>
            <th className="flex items-center gap-4 w-[100%] mb-8">
              <Checkbox className="bg-white py-2 px-4 rounded-full" size="sm">
                <span className="text-gray-600">Select All</span>
              </Checkbox>
            </th>
            <th className="text-gray-500 w-[15%] text-start -translate-y-2">
              Connected
            </th>
            <th className="text-gray-500 w-[15%] text-start -translate-y-2">
              Smartsite
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-[100%] bg-white mb-6 border-b">
            <td className="flex items-center gap-4 w-[100%] py-2 pl-4">
              <Checkbox size="sm"></Checkbox>
              <Image
                alt="qrcode"
                src={"/images/websites/travis-image.png"}
                width={50}
                height={50}
              />
              <div>
                <p>Travis Herron</p>
                <p className="text-xs text-gray-500">Founder at swop</p>
              </div>
            </td>
            <td className="w-[15%] text-gray-400 font-semibold">
              June 23, 2023
            </td>
            <td className="w-[15%]">
              <Link className="w-full h-full" href={`/messages/123`}>
                <div className="bg-gray-200 px-4 py-2 w-max rounded-lg text-sm font-semibold">
                  view
                </div>
              </Link>
            </td>
          </tr>
          <tr className="w-[100%] bg-white mb-6 border-b">
            <td className="flex items-center gap-4 w-[100%] py-2 pl-4">
              <Checkbox size="sm"></Checkbox>
              <Image
                alt="qrcode"
                src={"/images/websites/travis-image.png"}
                width={50}
                height={50}
              />
              <div>
                <p>Travis Herron</p>
                <p className="text-xs text-gray-500">Founder at swop</p>
              </div>
            </td>
            <td className="w-[15%] text-gray-400 font-semibold">
              June 23, 2023
            </td>
            <td className="w-[15%]">
              <Link className="w-full h-full" href={`/messages/12ss3`}>
                <div className="bg-gray-200 px-4 py-2 w-max rounded-lg text-sm font-semibold">
                  view
                </div>
              </Link>
            </td>
          </tr>
          <tr className="w-[100%] bg-white mb-6 border-b">
            <td className="flex items-center gap-4 w-[100%] py-2 pl-4">
              <Checkbox size="sm"></Checkbox>
              <Image
                alt="qrcode"
                src={"/images/websites/travis-image.png"}
                width={50}
                height={50}
              />
              <div>
                <p>Travis Herron</p>
                <p className="text-xs text-gray-500">Founder at swop</p>
              </div>
            </td>
            <td className="w-[15%] text-gray-400 font-semibold">
              June 23, 2023
            </td>
            <td className="w-[15%]">
              <Link className="w-full h-full" href={`/messages/12dsd3`}>
                <div className="bg-gray-200 px-4 py-2 w-max rounded-lg text-sm font-semibold">
                  view
                </div>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MessagesPage;
