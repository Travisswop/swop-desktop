import React from "react";
import SmartsideOpeningInfo from "./mainContent";
import isUserAuthenticate from "@/util/isUserAuthenticate";

const SmartsideOpeningInfoPage = async () => {
  const session: any = await isUserAuthenticate();
  console.log("session form open", session);

  return (
    <main>
      {" "}
      <SmartsideOpeningInfo
        userSessionName={session?.name as string}
        userSessionEmail={session?.email as string}
        token={session?.accessToken}
      />
    </main>
  );
};

export default SmartsideOpeningInfoPage;
