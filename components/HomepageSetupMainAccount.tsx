import React from "react";
import SetupMainAccount from "./SetupMainAccount";

const HomepageSetupMainAccount = async ({ homepageDataPromise }: any) => {
  const data = await homepageDataPromise;
  return <SetupMainAccount data={data} />;
};

export default HomepageSetupMainAccount;
