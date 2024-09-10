import React from "react";
import CreateSmartSite from "./_components/mainContent";
import isUserAuthenticate from "@/util/isUserAuthenticate";

const CreateSmartSitePage = async () => {
  const session: any = await isUserAuthenticate();
  return (
    <div>
      <CreateSmartSite token={session.accessToken} session={session} />
    </div>
  );
};

export default CreateSmartSitePage;
