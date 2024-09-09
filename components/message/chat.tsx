'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  content: string;
  sent: Date;
  senderAddress: string;
}

interface ChatProps {
  client: {
    address: string;
  };
  conversation: {
    send: (message: string) => Promise<void>;
  };
  messageHistory: Message[];
}

export default function Chat({
  client,
  conversation,
  messageHistory,
}: ChatProps) {
  const [inputMessage, setInputMessage] = useState('');
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageHistory]);

  const onSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      await conversation.send(inputMessage);
      setInputMessage('');
    }
  };

  const MessageList = ({ messages }: { messages: Message[] }) => {
    const uniqueMessages = messages.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );

    return (
      <div className="px-4 md:px-8 h-full">
        {uniqueMessages.map((message, index) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.senderAddress === client.address
                ? 'text-right'
                : 'text-left'
            }`}
            ref={
              index === uniqueMessages.length - 1
                ? lastMessageRef
                : null
            }
          >
            <div
              className={`inline-block px-3 py-2 rounded-lg ${
                message.senderAddress === client.address
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {message.content}
            </div>
            <div className="text-xs mt-1 text-muted-foreground">
              {message.sent.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pt-4 w-full overflow-x-hidden h-full">
      <MessageList messages={messageHistory} />
      <div className="absolute bottom-0 bg-white py-4 w-full">
        <form onSubmit={onSendMessage} className="">
          <div className="w-full px-4 md:px-8">
            <div className="flex justify-center items-center gap-2">
              <textarea
                className="flex flex-1 outline-none border border-gray-300 focus:border-gray-400 text-gray-700 text-md resize-none rounded-md px-3 pt-2"
                value={inputMessage}
                placeholder="Type a message..."
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <div className="flex">
                <button type="submit">
                  <svg
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.1"
                    x="0px"
                    y="0px"
                    enable-background="new 0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
