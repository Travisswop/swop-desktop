"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Progress } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const DeployingSmartSitePage = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);
    router.push("/");
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="h-screen m-8 overflow-hidden bg-white">
      <div
        className="flex flex-col items-center justify-center"
        style={{ height: "calc(100vh - 108px)" }}
      >
        <Image
          src={"/images/smart-site-loading.gif"}
          alt={"Loading"}
          width={500}
          height={500}
          className="w-[200px] h-[200px]"
        />

        <Progress
          aria-label="Downloading..."
          size="sm"
          value={value}
          color="default"
          showValueLabel={false}
          className="max-w-[180px] mt-8"
        />
        <h2 className="font-medium text-xl text-center mt-2">
          Deploying SmartSite...
        </h2>
      </div>
    </div>
  );
};

export default DeployingSmartSitePage;
