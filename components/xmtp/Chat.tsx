import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import Image from "next/image";

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
  // const onSendMessage = async (value: string) => {
  //   return conversation.send(value);
  // };

  // MessageList component to render the list of messages
  interface MessageListProps {
    messages: {
      id: string;
      content: string;
      sent: Date;
      senderAddress: string;
    }[];
  }

  // Reference to the last message
  const lastMessageRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    // Scroll into view when the messageHistory updates (new message sent/received)
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageHistory]);

  const MessageList = ({ messages }: MessageListProps) => {
    // Filter messages by unique id
    messages = messages.filter(
      (v: any, i: any, a: any) => a.findIndex((t: any) => t.id === v.id) === i
    );
    // console.log("messages", messages);

    return (
      <div className="px-4 md:px-8 h-full overflow-y-auto">
        <ul className="pb-5">
          {messages.map((message, index) => (
            <li
              key={message.id}
              className="messageItem text-base text-gray-600 font-medium"
              title="Click to log this message to the console"
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              {message.senderAddress === client.address ? (
                <div className="flex flex-col items-end mb-5">
                  <div className="bg-[#d5d5f0] px-3 py-2 rounded-l-lg rounded-tr-lg max-w-[200px]">
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
                  <div className=" bg-gray-200 px-3 py-2 rounded-r-lg rounded-t-lg max-w-[200px]">
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
      </div>
    );
  };

  return (
    <div className="pt-4 w-full overflow-x-hidden overflow-y-visible">
      <div>
        <MessageList messages={messageHistory} />
      </div>
      {/* <div className="sticky bottom-4">
        <MessageInput onSendMessage={onSendMessage} />
      </div> */}
    </div>
  );
};

export default Chat;
