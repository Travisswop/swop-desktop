import MessageList from "@/components/message/MessageList";
import isUserAuthenticate from "@/util/isUserAuthenticate";
const MessagePage = async () => {
  const userDetails: any = await isUserAuthenticate();

  return (
    <div className="overflow-y-hidden">
      <MessageList userDetails={userDetails} />
    </div>
  );
};

export default MessagePage;
