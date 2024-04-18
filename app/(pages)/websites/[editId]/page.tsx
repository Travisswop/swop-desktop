"use client";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import EditMicrositeBtn from "@/components/Button/EditMicrositeBtn";
import AddIcon from "@/components/EditMicrosite/AddIcon";
import IconMaker from "@/components/EditMicrosite/IconMaker";
import { Switch } from "@nextui-org/react";
import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { LiaFileMedicalSolid } from "react-icons/lia";

const MicrositeEditPage = () => {
  const [toggleIcon, setToggleIcon] = useState<any>([]);
  const handleAddIcon = (title: { title: string }) => {
    console.log("title", title);

    setToggleIcon([...toggleIcon, title]);
  };
  const handleRemoveIcon = (title: { title: string }) => {
    console.log("title", title);
    const filteredIcon = toggleIcon.filter((data: any) => data != title);
    console.log("filteredIcon", filteredIcon);

    setToggleIcon(filteredIcon);
  };
  console.log(toggleIcon);

  return (
    <main className="main-container overflow-hidden">
      <div className="flex gap-6 items-start">
        <div className="w-[62%] border-r border-gray-300 pr-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h5 className="heading-3">Microsite Builder</h5>
            <EditMicrositeBtn>
              <BsSend /> Share
            </EditMicrositeBtn>
          </div>
          <IconMaker
            handleAddIcon={handleAddIcon}
            handleRemoveIcon={handleRemoveIcon}
            toggleIcon={toggleIcon}
          />
          <div className="flex items-center justify-center gap-2">
            <EditMicrositeBtn>
              <LiaFileMedicalSolid size={20} />
              Customize QR
            </EditMicrositeBtn>
            <EditMicrositeBtn>
              <LiaFileMedicalSolid size={20} />
              Edit Background
            </EditMicrositeBtn>
            <EditMicrositeBtn>
              <LiaFileMedicalSolid size={20} />
              Microsite Settings
            </EditMicrositeBtn>
          </div>
          <DynamicPrimaryBtn className="w-full !rounded-full mt-2">
            <LiaFileMedicalSolid size={20} /> Publish
          </DynamicPrimaryBtn>
          <div className="flex items-center gap-8 border border-gray-300 rounded-xl pl-4 pr-3 py-2 text-lg font-medium text-gray-600 w-max">
            <p>Lead Capture</p>
            <Switch
              color="default"
              size="sm"
              defaultSelected
              aria-label="Lead Captures"
            />
          </div>
          {toggleIcon.map((data: any, index: number) => (
            <AddIcon key={index} data={data} />
          ))}
        </div>
        <div className="bg-green-200 w-[38%]">Live preview</div>
      </div>
    </main>
  );
};

export default MicrositeEditPage;
