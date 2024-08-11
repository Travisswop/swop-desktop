import MessageInput from "./MessageInput";

interface ChatProps {
  client: any;
  conversation: any;
  messageHistory: any[];
}

const Chat: React.FC<ChatProps> = ({
  client,
  messageHistory,
  conversation,
}) => {
  // Function to handle sending a text message
  const onSendMessage = async (value: string) => {
    return conversation.send(value);
  };

  // MessageList component to render the list of messages
  interface MessageListProps {
    messages: {
      id: string;
      content: string;
      sent: Date;
      senderAddress: string;
    }[];
  }

  const MessageList = ({ messages }: MessageListProps) => {
    // Filter messages by unique id
    messages = messages.filter(
      (v: any, i: any, a: any) => a.findIndex((t: any) => t.id === v.id) === i
    );
    return (
      <ul className="px-4 md:px-8">
        {messages.map((message, index) => (
          <li
            key={message.id}
            className="messageItem"
            title="Click to log this message to the console"
          >
            {message.senderAddress === client.address ? (
              <div className="flex flex-col items-end mb-5">
                <div className=" bg-green-600 px-3 py-2 rounded-l-lg rounded-tr-lg max-w-[200px]">
                  {message.content}
                </div>
                <div className=" text-xs mt-1">
                  {message.sent.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col mb-5">
                <div className=" bg-gray-500 px-3 py-2 rounded-r-lg rounded-t-lg max-w-[200px]">
                  {message.content}
                </div>
                <div className="text-xs mt-1">
                  {message.sent.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div>
        <MessageList messages={messageHistory} />
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
