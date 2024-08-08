import React from "react";
import { isENSAvailable } from "@/actions/message";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import IndividualMessage from "@/components/xmtp/Message";

const IndividualChat = async ({ params }: any) => {
  const session: any = await isUserAuthenticate();
  const response = await isENSAvailable(params.ens, session.accessToken);
  // console.log("response from indivi", response);

  return (
    <div>
      <IndividualMessage data={response} />
    </div>
  );
};

export default IndividualChat;
