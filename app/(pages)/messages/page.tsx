import MessagesLists from "@/components/message/MessageLists";
import isUserAuthenticate from "@/util/isUserAuthenticate";
import React from "react";

const MessagePage = async () => {
  const session: any = await isUserAuthenticate();
  return (
    <div>
      <MessagesLists session={session} />
    </div>
  );
};

export default MessagePage;
