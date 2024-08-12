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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent the default new line behavior
      handleFormSubmit(event as any); // Trigger form submit
    }
  };

  // const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // const adjustTextareaHeight = () => {
  //   const textarea = textareaRef.current;
  //   if (textarea) {
  //     textarea.style.height = "auto"; // Reset height
  //     textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
  //   }
  // };

  // useEffect(() => {
  //   adjustTextareaHeight(); // Adjust the height initially
  // }, []);

  return (
    <div className="sticky bottom-0 w-auto bg-white py-4">
      <form onSubmit={handleFormSubmit} className="">
        <div className="w-full px-4 md:px-8">
          <div className="flex justify-center items-center gap-2">
            <textarea
              className="flex flex-1 outline-none border border-gray-300 focus:border-gray-400 text-gray-700 text-md resize-none rounded-md px-3 pt-2"
              // ref={textareaRef}
              value={message}
              placeholder="Type a message..."
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              // style={{ overflow: "hidden" }} // Hide scrollbar
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
  );
};

export default MessageInput;
