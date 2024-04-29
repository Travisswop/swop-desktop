"use client";
import Image from "next/image";
import React from "react";
import couponMint4 from "@/public/images/mint/couponMint4.png";
import travis from "@/public/images/travis.png";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import EditMicrositeBtn from "@/components/Button/EditMicrositeBtn";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { LuBarChartHorizontalBig } from "react-icons/lu";

const MintDetails = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["1"]));
  return (
    <div className="main-container">
      <div className="bg-white py-20 flex justify-center">
        <div className="w-[50%] flex flex-col gap-8">
          <div className="flex items-center justify-center gap-10">
            <div className="flex-shrink-0">
              <Image alt="coupon image" src={couponMint4} width={260} />
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-2xl font-bold">The creator network</h4>
              <div className="flex items-center gap-2">
                <Image
                  alt="travis image"
                  src={travis}
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-sm">Travis.Swop.ID</p>
              </div>
              <div className="py-10 px-8 w-max border border-gray-300 rounded-xl text-center flex flex-col gap-2">
                <p className="font-medium">price</p>
                <h4 className="text-xl font-bold">100 USDC</h4>
                <p className="text-gray-600">.25 ETH</p>
              </div>
              <DynamicPrimaryBtn className="!rounded-lg">
                Connect Wallet
              </DynamicPrimaryBtn>
              <EditMicrositeBtn className="!rounded-lg !text-gray-600 !border-gray-400 flex justify-center">
                Click To Claim
              </EditMicrositeBtn>
            </div>
          </div>
          <Accordion
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys as any}
            selectionMode="multiple"
          >
            <AccordionItem
              key="1"
              aria-label="Chung Miller"
              startContent={<HiOutlineBars3BottomLeft size={26} />}
              //   subtitle="4 unread messages"
              title="Description"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              quibusdam quia voluptates impedit quas ea nemo facilis corrupti
              laudantium dolor ipsam deleniti, possimus blanditiis, incidunt
              doloremque eaque, asperiores nam dignissimos!
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Chung Miller"
              startContent={<LuBarChartHorizontalBig size={26} />}
              //   subtitle="4 unread messages"
              title="Details"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              quibusdam quia voluptates impedit quas ea nemo facilis corrupti
              laudantium dolor ipsam deleniti, possimus blanditiis, incidunt
              doloremque eaque, asperiores nam dignissimos!
            </AccordionItem>
            {/* <AccordionItem
              key="2"
              aria-label="Janelle Lenard"
              startContent={
                <Avatar
                  isBordered
                  color="success"
                  radius="lg"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              }
              subtitle="3 incompleted steps"
              title="Janelle Lenard"
            >
              hola text content 2
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Zoey Lang"
              startContent={
                <Avatar
                  isBordered
                  color="warning"
                  radius="lg"
                  src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                />
              }
              subtitle={
                <p className="flex">
                  2 issues to<span className="text-primary ml-1">fix now</span>
                </p>
              }
              title="Zoey Lang"
            >
              hola text content 3
            </AccordionItem> */}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default MintDetails;
