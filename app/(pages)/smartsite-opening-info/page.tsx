import React from "react";
import SmartsideOpeningInfo from "./mainContent";
import { auth } from "@/auth";

const SmartsideOpeningInfoPage = async () => {
  const session: any = await auth();
  // console.log("session form open", session);

  return (
    <main>
      {" "}
      <SmartsideOpeningInfo
        userSessionName={session?.user?.name as string}
        userSessionEmail={session?.user?.email as string}
        token={session?.user?.accessToken}
      />
    </main>
  );
};

export default SmartsideOpeningInfoPage;
