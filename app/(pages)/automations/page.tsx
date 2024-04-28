import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import EditMicrositeBtn from "@/components/Button/EditMicrositeBtn";
import Image from "next/image";
import React from "react";
import { GoDotFill } from "react-icons/go";

const AutomationPage = () => {
  return (
    <div className="main-container">
      <h6 className="heading-4">Automations</h6>
      <div className="flex gap-10 h-56">
        <div className="bg-white p-4 flex flex-col gap-2 h-full">
          <div className="h-[26%]">
            <Image
              alt="zoho"
              src={"/images/automation/zoho.png"}
              width={80}
              height={30}
            />
          </div>
          <p className="font-semibold">zoho</p>
          <p className="text-sm text-gray-500">
            Unify Marketing, Sales, service, commerce and IT
          </p>
          <p className="flex items-center gap-1 text-[#40C351] font-semibold">
            <GoDotFill size={24} /> Connected
          </p>
          <div className="flex items-center gap-2 justify-between">
            <DynamicPrimaryBtn className="!rounded-full !py-1">
              Export
            </DynamicPrimaryBtn>
            <EditMicrositeBtn>Configure</EditMicrositeBtn>
          </div>
        </div>
        <div className="bg-white p-4 flex flex-col gap-2">
          <div className="h-[26%]">
            <Image
              alt="zoho"
              src={"/images/automation/hubspot.png"}
              width={80}
              height={30}
            />
          </div>
          <p className="font-semibold text-gray-700">hubspot</p>
          <p className="text-sm text-gray-500">
            Unify Marketing, Sales, service, commerce and IT
          </p>
          <p className="flex items-center gap-1 text-[#40C351] font-semibold">
            <GoDotFill size={24} /> Connected
          </p>
          <div className="flex items-center gap-2 justify-between">
            <DynamicPrimaryBtn className="!rounded-full !py-1">
              Export
            </DynamicPrimaryBtn>
            <EditMicrositeBtn>Configure</EditMicrositeBtn>
          </div>
        </div>
        <div className="bg-white p-4 flex flex-col gap-2">
          <div className="h-[26%]">
            <Image
              alt="salesforce"
              src={"/images/automation/salesforce.png"}
              width={80}
              height={30}
            />
          </div>
          <p className="font-semibold">salesforce</p>
          <p className="text-sm text-gray-500">
            Unify Marketing, Sales, service, commerce and IT
          </p>
          <p className="flex items-center gap-1 text-[#40C351] font-semibold">
            <GoDotFill size={24} /> Connected
          </p>
          <div className="flex items-center gap-2 justify-between">
            <DynamicPrimaryBtn className="!rounded-full !py-1">
              Export
            </DynamicPrimaryBtn>
            <EditMicrositeBtn>Configure</EditMicrositeBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationPage;
