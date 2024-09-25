import React from "react";
import Microsite from "./Microsite";

const HomepageSmartsite = async ({ homepageDataPromise }: any) => {
  const data = await homepageDataPromise;
  return <Microsite microsites={data?.data?.microsites} />;
};

export default HomepageSmartsite;
