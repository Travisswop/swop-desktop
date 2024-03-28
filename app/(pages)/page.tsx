import Image from "next/image";
import travisImage from "../../public/travis-image.svg";
import { FaEdit } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import Connections from "@/components/Connections";
import Chart from "@/components/Chart";
import Microsite from "@/components/Microsite";

export default function HomePage() {
  return (
    <main className="main-container my-8">
      <div className="flex gap-4 items-start">
        <div className="flex-[1.5]">
          <div className="bg-white py-5 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={travisImage}
                alt="user image"
                width={50}
                height={50}
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">Travis Herron</h3>
                <p className="text-sm text-gray-500 font-medium">
                  Travis.Swopple.ID
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  Charlotte, NC
                </p>
              </div>
            </div>
            <button className="px-10 flex gap-1 items-center  border-1.5 rounded-lg py-1 text-gray-500 border-gray-400">
              <BiSolidEdit />
              Edit
            </button>
          </div>
          <Chart />
        </div>

        {/* connections */}
        <Connections />
      </div>
      <div className=" my-4">
        <div className="w-[50%] bg-white">Website Analytics</div>

        <div className="w-[50%] bg-white overflow-hidden">
          <Microsite />
        </div>
      </div>
    </main>
  );
}
