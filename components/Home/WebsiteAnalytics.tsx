import Image from "next/image";
import React from "react";
import square from "@/public/images/homepage/square.svg";

interface WebsiteAnalyticsProps {
  title: string;
  value: any;
  days: any;
  percentage: number;
}

const WebsiteAnalytics: React.FC<WebsiteAnalyticsProps> = ({
  title,
  value,
  days,
  percentage,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg">
      <div className="border-b border-gray-300 flex items-center justify-between py-4">
        <p className="text-xl font-medium ml-4">{title}</p>
        <Image alt="square icon" src={square} className="mr-4" />
      </div>
      <div className="mx-4 my-4 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-600 mb-1">{value}</h3>
          <p className="text-xl font-medium text-gray-500">{days} days</p>
        </div>
        <div
          className={`${
            percentage > 0
              ? "bg-[#7AE38B33] text-[#00E725]"
              : "bg-[#DF350F33] text-[#DF350F]"
          }  font-semibold text-lg py-2 px-4 rounded-xl`}
        >
          {percentage > 0 ? (
            <span>+{percentage}%</span>
          ) : (
            <span>{percentage}%</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteAnalytics;
