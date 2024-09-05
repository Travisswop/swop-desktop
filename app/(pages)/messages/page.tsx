import Messages from "@/components/message/Messages";
import isUserAuthenticate from "@/util/isUserAuthenticate";
const MessagePage = async () => {
  const userDetails: any = await isUserAuthenticate();

  return (
    <div>
      <Messages userDetails={userDetails} />
    </div>
  );
};

export default MessagePage;
