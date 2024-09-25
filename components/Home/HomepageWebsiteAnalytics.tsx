import React from "react";
import WebsiteAnalytics from "./WebsiteAnalytics";

const HomepageWebsiteAnalytics = async ({ homepageDataPromise }: any) => {
  const data = await homepageDataPromise;
  const leads = () => {
    const count = data?.data?.subscriber?.length ?? 0;
    return count;
  };

  const websiteAnalyticsArr = [
    {
      _id: 12344,
      title: "Leads",
      value: await leads(),
      days: "30",
      percentage: 24,
    },
    {
      _id: 12344,
      title: "Message",
      value: 0,
      days: "30",
      percentage: 24,
    },
    // {
    //   _id: 123,
    //   title: "Taps",
    //   value: getLast30DaysTap(),
    //   days: 30,
    //   percentage: 24,
    // },
    {
      _id: 133,
      title: "Taps",
      value: data ? data?.data?.tap?.length : 0,
      days: "30",
      percentage: 24,
    },
    {
      _id: 1673,
      title: "Connections",
      value: data ? data?.data?.totalConnection : 0,
      days: "30",
      percentage: -24,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-x-10 gap-y-6">
      {websiteAnalyticsArr.map((data: any) => (
        <WebsiteAnalytics
          key={data._id}
          title={data.title}
          days={data.days as any}
          percentage={data.percentage}
          value={data.value}
        />
      ))}
    </div>
  );
};

export default HomepageWebsiteAnalytics;
