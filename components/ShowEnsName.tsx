"use client";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { useAccount } from "wagmi";

const ShowEnsName = ({ data }: any) => {
  console.log("enssfsf", data);
  const [micrositeData, setMicrositeData] = useState<any>(null);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const datas = data.microsites.find((microsite: any) => microsite.primary);
    setMicrositeData(datas);
  }, [data.microsites]);

  return (
    <div className="bg-gray-200 px-2 py-1 rounded w-max relative">
      <p className="text-sm text-gray-600 font-medium">
        {micrositeData?.ens ? micrositeData?.ens : "n/a"}
      </p>
      <div className="absolute -top-1 -right-1.5">
        {address && isConnected ? (
          <GoDotFill color="green" />
        ) : (
          <GoDotFill color="red" />
        )}
      </div>
    </div>
  );
};

export default ShowEnsName;
