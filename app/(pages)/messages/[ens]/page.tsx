import React from "react";
import ChatComponent from "./MainContent";
import { isENSAvailable } from "@/actions/message";
import isUserAuthenticate from "@/util/isUserAuthenticate";

const IndividualChat = async ({ params }: any) => {
  const session: any = await isUserAuthenticate();
  const response = await isENSAvailable(params.ens, session.accessToken);
  console.log("response from indivi", response);

  return (
    <div>
      <ChatComponent data={response} />
    </div>
  );
};

export default IndividualChat;
