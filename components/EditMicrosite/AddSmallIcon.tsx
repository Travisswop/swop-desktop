import Image from "next/image";
import React, { useEffect, useState } from "react";
import appIconImg from "@/public/images/websites/edit-microsite/add-icon/app-icon.svg";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Switch,
} from "@nextui-org/react";
import { BsTwitterX } from "react-icons/bs";
import { AiFillInstagram, AiOutlineDownCircle } from "react-icons/ai";
import { MdDeleteOutline, MdOutlineFacebook } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";
import { RiBarChartLine } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { PiUploadBold } from "react-icons/pi";
import { LiaFileMedicalSolid } from "react-icons/lia";
import EditMicrositeBtn from "../Button/EditMicrositeBtn";
import { icon, newIcons } from "@/util/data/smartsiteIconData";
import { BiChevronDownCircle } from "react-icons/bi";
import { isEmptyObject } from "@/util/checkIsEmptyObject";

const AddSmallIcon = () => {
  const [selectedIconType, setSelectedIconType] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<any>("");
  const [selectedIconData, setSelectedIconData] = useState<any>({});
  // console.log("selected icon name", selectedIcon);
  console.log("selected icon data", selectedIconData);
  console.log("selected icon", selectedIcon);

  const iconData: any = newIcons[0];
  console.log("iconData", iconData);

  useEffect(() => {
    if (selectedIconType) {
      const data = iconData.icons.find(
        (item: any) => item.category === selectedIconType
      );
      setSelectedIconData(data);
    }
  }, [selectedIconType]);

  const tintStyle = {
    filter: "brightness(0) invert(0)",
  };

  const handleSelectIconType = (category: string) => {
    setSelectedIconType(category);
    setSelectedIcon("");
  };

  return (
    <div className="bg-white rounded-xl shadow-small p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-700">Small Icon Type</h3>
          {!selectedIconType && (
            <Image alt="app-icon" src={appIconImg} className="w-8 h-auto" />
          )}
          {selectedIconType === "Social Media" && (
            <Image
              alt="app-icon"
              src={icon.SocialIconType}
              className="w-5 h-auto"
            />
          )}
          {selectedIconType === "Chat Links" && (
            <Image
              alt="app-icon"
              src={icon.ChatlinkType}
              className="w-5 h-auto"
            />
          )}
          {selectedIconType === "Commands" && (
            <Image
              alt="app-icon"
              src={icon.CommandType}
              className="w-5 h-auto"
            />
          )}

          <Dropdown className="ml-44 w-max">
            <DropdownTrigger>
              <button>
                <AiOutlineDownCircle size={20} color="gray" />
              </button>
            </DropdownTrigger>
            <DropdownMenu
              disabledKeys={["title"]}
              aria-label="Static Actions"
              className="p-2"
            >
              <DropdownItem
                key={"title"}
                className=" hover:!bg-white opacity-100 cursor-text disabled dropDownTitle"
              >
                <p>Choose Icon Type</p>
              </DropdownItem>
              {iconData.icons.map((data: any, index: number) => (
                <DropdownItem
                  key={index}
                  onClick={() => handleSelectIconType(data.category)}
                  className="border-b rounded-none hover:rounded-md"
                >
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Image
                      src={data.categoryIcon}
                      alt={data.category}
                      className="w-5 h-auto"
                    />{" "}
                    {data.category}
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
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-gray-700">Select Icon</h3>
        {!selectedIconType && (
          <Image alt="app-icon" src={appIconImg} className="w-8 h-auto" />
        )}

        {selectedIcon && selectedIcon?.icon ? (
          <Image
            alt="app-icon"
            src={selectedIcon?.icon}
            className="w-5 h-auto"
            style={tintStyle}
          />
        ) : (
          <>
            {selectedIconType === "Social Media" && (
              <Image
                alt="app-icon"
                src={icon.SocialIconType}
                className="w-5 h-auto"
              />
            )}
            {selectedIconType === "Chat Links" && (
              <Image
                alt="app-icon"
                src={icon.ChatlinkType}
                className="w-5 h-auto"
              />
            )}
            {selectedIconType === "Commands" && (
              <Image
                alt="app-icon"
                src={icon.CommandType}
                className="w-5 h-auto"
              />
            )}
          </>
        )}

        <Dropdown className="ml-44 w-max">
          <DropdownTrigger>
            <div
              className={`flex items-center ${
                isEmptyObject(selectedIconData) && "relative group"
              }`}
            >
              <button
                disabled={isEmptyObject(selectedIconData)}
                className={`${
                  isEmptyObject(selectedIconData) && "cursor-not-allowed"
                } `}
              >
                <AiOutlineDownCircle size={20} color="gray" />
              </button>
              {isEmptyObject(selectedIconData) && (
                <div className="hidden text-xs text-gray-600 px-2 w-28 py-1.5 bg-slate-200 shadow-medium z-50 absolute left-6 top-0 group-hover:flex justify-center">
                  <p>select icon type</p>
                </div>
              )}
            </div>
          </DropdownTrigger>
          {selectedIconData && selectedIconData?.icons?.length > 0 && (
            <DropdownMenu
              disabledKeys={["title"]}
              aria-label="Static Actions"
              className="p-2"
            >
              <DropdownItem
                key={"title"}
                className=" hover:!bg-white opacity-100 cursor-text disabled dropDownTitle"
              >
                <p>Choose Icon</p>
              </DropdownItem>
              {selectedIconData.icons.map((data: any) => (
                <DropdownItem
                  key={data._id}
                  onClick={() =>
                    setSelectedIcon({
                      name: data.name,
                      icon: data.icon,
                    })
                  }
                  className="border-b rounded-none hover:rounded-md"
                >
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Image
                      src={data.icon}
                      alt={data.inputText}
                      className="w-4 h-auto"
                      quality={100}
                      style={tintStyle}
                    />
                    {data.name}
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </Dropdown>
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
