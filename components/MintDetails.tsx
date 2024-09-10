// app/components/MintDetails.tsx
"use client";

import Image from "next/image";
import React, { useState } from "react";
import DynamicPrimaryBtn from "@/components/Button/DynamicPrimaryBtn";
import EditMicrositeBtn from "@/components/Button/EditMicrositeBtn";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { LuBarChartHorizontalBig } from "react-icons/lu";
import Link from "next/link";

const MintDetails = ({ templateDetails }: { templateDetails: any }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));

  const { template, collection } = templateDetails;

  return (
    <div className="main-container">
      <div className="bg-white py-20 flex justify-center">
        <div className="w-[50%] flex flex-col gap-8">
          <div className="flex items-center justify-center gap-10">
            <div className="flex-shrink-0">
              <Image
                alt="Template image"
                src={template.metadata.image}
                width={260}
                height={260}
              />
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-2xl font-bold">{template.metadata.name}</h4>
              <div className="py-10 px-8 w-max border border-gray-300 rounded-xl text-center flex flex-col gap-2">
                <p className="font-medium">Price</p>
                <h4 className="text-xl font-bold">
                  {collection.payments.price} {collection.payments.currency.toUpperCase()}
                </h4>
                <p className="text-gray-600">{template.supply.limit} NFTs available</p>
              </div>
              <DynamicPrimaryBtn className="!rounded-lg">
                Connect Wallet
              </DynamicPrimaryBtn>
              <Link href={`https://swop-checkout.vercel.app/GetClient/${collection.id}/${template.templateId}`}>
                <EditMicrositeBtn className="!rounded-lg !text-gray-600 !border-gray-400 flex justify-center">
                  Click To Claim
                </EditMicrositeBtn>
              </Link>
            </div>
          </div>

          <Accordion
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys as any}
            selectionMode="multiple"
          >
            <AccordionItem
              key="1"
              aria-label="Description"
              startContent={<HiOutlineBars3BottomLeft size={26} />}
              title="Description"
            >
              {template.metadata.description}
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Details"
              startContent={<LuBarChartHorizontalBig size={26} />}
              title="Details"
            >
              <p>Collection Name: {collection.metadata.name}</p>
              <p>Blockchain: {collection.onChain.chain}</p>
              <p>Mint Address: {collection.onChain.mintAddress}</p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default MintDetails;
