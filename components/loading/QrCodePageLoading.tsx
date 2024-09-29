import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const QrCodePageLoading = () => {
  return (
    <Card className="h-screen shadow-none rounded-none m-8 p-8 overflow-hidden bg-transparent">
      <div className="w-full">
        <Skeleton className="rounded-lg h-[40px] w-[200px] mb-4 !bg-white" />

        <Skeleton className="h-[70px] w-full border-b !bg-white" />
        <Skeleton className="h-[70px] w-full border-b !bg-white" />
        <Skeleton className="h-[70px] w-full border-b !bg-white" />
        <Skeleton className="h-[70px] w-full border-b !bg-white" />
        <Skeleton className="h-[70px] w-full border-b !bg-white" />

        <Skeleton className="h-[70px] w-full border-b mb-8 !bg-white" />

        <div className="flex items-center justify-center">
          <Skeleton className="rounded-lg h-[50px] w-[200px] !bg-white" />
        </div>
      </div>
    </Card>
  );
};

export default QrCodePageLoading;
