import Image from "next/image";
import React, { useState } from "react";
import appIconImg from "@/public/images/websites/edit-microsite/add-icon/app-icon.svg";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Switch,
} from "@nextui-org/react";
import { BsTwitterX } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { MdDeleteOutline, MdOutlineFacebook } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";
import { RiBarChartLine } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { PiUploadBold } from "react-icons/pi";
import { LiaFileMedicalSolid } from "react-icons/lia";
import EditMicrositeBtn from "../Button/EditMicrositeBtn";

const AddSmallIcon = () => {
  const [selectedIcon, setSelectedIcon] = useState("");
  console.log("selectedIcon", selectedIcon);
  const selectArry: any = [
    {
      _id: 123,
      icon: <BsTwitterX size={18} className="ml-1" />,
      title: "twitter",
    },
    {
      _id: 133,
      icon: <AiFillInstagram color="red" size={20} />,
      title: "instagram",
    },
    {
      _id: 143,
      icon: <MdOutlineFacebook color="blue" size={20} />,
      title: "facebook",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-small p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-700">Small Icon</h3>
          <Image alt="app-icon" src={appIconImg} width={30} />
          <Dropdown className="ml-44 w-max">
            <DropdownTrigger>
              <button>
                <FaAngleDown />
              </button>
            </DropdownTrigger>
            <DropdownMenu disabledKeys={["title"]} aria-label="Static Actions">
              <DropdownItem
                key={"title"}
                className=" hover:!bg-white opacity-100 cursor-text disabled dropDownTitle"
              >
                <p>Choose Small Icon</p>
              </DropdownItem>
              {selectArry.map((data: any) => (
                <DropdownItem
                  key={data._id}
                  onClick={() => setSelectedIcon(data.title)}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    {data.icon} {data.title}
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex items-center gap-2 font-medium text-gray-600">
          <p>Redirect</p>
          <Switch
            color="success"
            size="sm"
            defaultSelected
            aria-label="Lead Captures"
          />
        </div>
      </div>
      <p className="font-medium">URL</p>
      <form>
        <div className="relative">
          <IoLinkOutline
            className="absolute left-4 top-1/2 -translate-y-[50%] font-bold text-gray-600"
            size={20}
          />
          <input
            type="text"
            className="w-full border border-[#ede8e8] focus:border-[#e5e0e0] rounded-xl focus:outline-none pl-11 py-3 text-gray-700 bg-gray-100"
          />
        </div>
      </form>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button>
            <RiBarChartLine size={20} />
          </button>
          <button>
            <CiImageOn size={20} />
          </button>
          <button>
            <PiUploadBold size={20} />
          </button>
          <button>
            <MdDeleteOutline size={20} />
          </button>
        </div>
        <EditMicrositeBtn className="!gap-1 border-gray-400">
          <LiaFileMedicalSolid size={20} />
          Save Changes
        </EditMicrositeBtn>
      </div>
    </div>
  );
};

export default AddSmallIcon;
