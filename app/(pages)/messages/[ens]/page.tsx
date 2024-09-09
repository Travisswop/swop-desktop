import Messages from "@/components/message/Messages";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import React from "react";

const individualMessagePage = async () => {
  const userDetails: any = await isUserAuthenticate();
  return (
    <div>
      <Messages userDetails={userDetails} />
    </div>
  );
};

export default individualMessagePage;
