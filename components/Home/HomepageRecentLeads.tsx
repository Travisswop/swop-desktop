import React from "react";
import RecentLeads from "./RecentLeads";

const HomepageRecentLeads = async ({ homepageDataPromise }: any) => {
  const data = await homepageDataPromise;
  return (
    <div>
      {data.state === "success" &&
        (data?.data?.subscriber.length !== 0 ? (
          <RecentLeads subscribers={data?.data?.subscriber} />
        ) : (
          <p className="font-medium text-center border border-gray-300 rounded-lg py-8">
            No Leads Available!
          </p>
        ))}
    </div>
  );
};

export default HomepageRecentLeads;
