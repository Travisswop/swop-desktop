// "use client";
// import React, { useEffect, useState, useCallback } from "react";
// import io from "socket.io-client";
// // import { useSelector } from "react-redux";
// // import { playNotificationSound } from "../../constant/CommonFunctions";
// // import Sound from "../../assets/media/soundPlay.mp3";

// const socket = io("http://64.23.134.54/");

// const ChatScreen = ({ ens, wallet_addr2 }) => {
//   // const Colors = useSelector((state) => state.themeColor);
//   // const activeWalletData = useSelector((state) => state.userData?.activeWalletData);
//   // const senderWalletAddress = activeWalletData?.walletAddress;
//   // const senderPrivayeKey = activeWalletData?.privateKey;
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const connectToSocket = async () => {
//     await socket.on("connect", () => {
//       console.log("socket connected");
//     });
//     await socket.emit("register", senderWalletAddress);
//     await socket.emit("requestOldMessages", {
//       privateKey: senderPrivayeKey,
//       conversationAddress: wallet_addr2,
//     });
//     socket.on("oldMessages", (messages) => {
//       setMessages(messages.reverse());
//     });
//     socket.on("receive private message", (message) => {
//       if (message.user._id === wallet_addr2) {
//         playNotificationSound(Sound);
//         setMessages((prevMessages) => [...prevMessages, message]);
//       }
//     });
//     return socket.connected;
//   };

//   useEffect(() => {
//     if (senderPrivayeKey && senderWalletAddress) {
//       connectToSocket();
//     }
//     return () => {
//       socket.off("oldMessages");
//       socket.off("receive private message");
//     };
//   }, [senderPrivayeKey, senderWalletAddress]);

//   const handleSend = useCallback(() => {
//     if (input.trim()) {
//       const newMessage = {
//         _id: String(new Date().getTime()),
//         text: input,
//         createdAt: new Date(),
//         user: { _id: senderWalletAddress },
//       };
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       socket.emit("send private message", {
//         content: input,
//         to: wallet_addr2,
//         privateKey: senderPrivayeKey,
//       });
//       socket.emit("new message notice", wallet_addr2);
//       setInput("");
//     }
//   }, [input, senderWalletAddress, senderPrivayeKey, wallet_addr2]);

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//   };

//   const renderMessages = () => {
//     return messages.map((message) => (
//       <div
//         key={message._id}
//         className={`p-4 rounded-lg mb-2 ${
//           message.user._id === senderWalletAddress
//             ? "bg-blue-500 text-white self-end"
//             : "bg-gray-300 text-black self-start"
//         }`}
//       >
//         {message.text}
//       </div>
//     ));
//   };

//   return (
//     <div className="flex flex-col h-full p-4 bg-gray-100">
//       <div className="flex-1 overflow-y-auto">
//         <div className="flex flex-col space-y-2">{renderMessages()}</div>
//       </div>
//       <div className="flex items-center mt-4">
//         <input
//           type="text"
//           value={input}
//           onChange={handleInputChange}
//           className="flex-1 p-2 border border-gray-300 rounded-l-lg"
//         />
//         <button
//           onClick={handleSend}
//           className="p-2 bg-blue-500 text-white rounded-r-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatScreen;

import React from "react";

const MainContent = () => {
  return <div>chat here</div>;
};

export default MainContent;
