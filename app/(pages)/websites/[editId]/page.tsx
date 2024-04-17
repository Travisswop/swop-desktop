import EditMicrositeBtn from "@/components/Button/EditMicrositeBtn";
import IconMaker from "@/components/EditMicrosite/IconMaker";
import React from "react";
import { BsSend } from "react-icons/bs";
import { LiaFileMedicalSolid } from "react-icons/lia";

const MicrositeEditPage = () => {
  return (
    <main className="main-container overflow-hidden">
      <div className="flex gap-6">
        <div className="w-[62%] border-r border-gray-300 pr-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h5 className="heading-3">Microsite Builder</h5>
            <EditMicrositeBtn>
              <BsSend /> Share
            </EditMicrositeBtn>
          </div>
          <IconMaker />
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
        </div>
        <div className="bg-green-200 w-[38%]">Live preview</div>
      </div>
    </main>
  );
};

export default MicrositeEditPage;
