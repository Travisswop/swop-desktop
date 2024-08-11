import React, { useState } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}
// max-h-8 min-h-8 outline-none border-none focus:ring-0 resize-none mx-2 p-1 w-full max-md:text-[16px] md:text-md text-gray-900 border-b-8 border-gray-50 m-0 bg-transparent
const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="w-full bg-red-400">
        <div
          className="flex justify-center w-10/12 items-center m-auto
        p-2"
        >
          <textarea
            className="flex flex-[.95] border-none outline-none border-b-8 border-gray-50 focus:ring-0 bg-slate-300 text-gray-900 text-md resize-none rounded-md p-1"
            value={message}
            placeholder="Type a message..."
            onChange={handleTextChange}
          />

          <div className="flex flex-[.05] ml-2">
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
  );
};

export default MessageInput;
