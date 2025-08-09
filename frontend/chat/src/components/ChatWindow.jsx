import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/chatStore";

const StatusIcon = ({ status }) => {
    console.log(status);
    
  switch (status) {
    
    case "sent":
        return(
        <svg viewBox="0 0 16 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" className="text-gray-500" fill="none">
        <title>msg-check</title>
        <path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832Z" fill="currentColor"></path>
      </svg>
        )
    case "delivered":
      return (
        <svg
        viewBox="0 0 16 11"
        height="11"
        width="16"
        preserveAspectRatio="xMidYMid meet"
        className="text-gray-500"
        fill="none"
      >
        <title>msg-dblcheck</title>
        <path
          d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z"
          fill="currentColor"
        ></path>
      </svg>
      );
    case "read":
      return (
        <svg
        viewBox="0 0 16 11"
        height="11"
        width="16"
        preserveAspectRatio="xMidYMid meet"
        className="text-blue-500"
        fill="none"
      >
        <title>msg-dblcheck</title>
        <path
          d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z"
          fill="currentColor"
        ></path>
      </svg>
      );
    default:
      return null;
  }
};

function formatTime(ts) {
  if (!ts) return "";
  let date = new Date(ts);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWindow() {
  const {
    selectedChat,
    messages,
    setMessages,
    sendMessage,
  } = useChatStore();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(import.meta.env.VITE_WA_ID, selectedChat.wa_id, input.trim());
    setInput("");
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100">
        <p className="text-gray-400 text-lg">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-chat bg-cover relative overflow-hidden">
      
   
      <div className="sticky top-0 z-20 flex items-center gap-4 px-5 py-4 mt-15 sm:mt-0 border-b bg-white bg-opacity-90 backdrop-blur-sm">
        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold">
          {selectedChat.name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{selectedChat.name}</span>
          <span className="text-[12px]">{selectedChat.wa_id}</span>
        </div>
      </div>


      <div
        className="overflow-y-auto px-4 py-6 space-y-2 flex-1"
        style={{ height: "calc(100vh - 64px - 72px)" }} 
      >
        {messages.length > 0 ? (
          messages.map((msg) => {
            const fromMe = msg.from === import.meta.env.VITE_WA_ID;
            return (
              <div
                key={msg._id}
                className={`flex ${fromMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    rounded-lg px-4 py-2 max-w-[70%] shadow
                    ${fromMe
                      ? "bg-green-50 text-right rounded-tr-none"
                      : "bg-white text-left rounded-tl-none"}
                  `}
                >
                  <div>{msg.message}</div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <span>{formatTime(msg.timestamp)}</span>
                    {fromMe && <StatusIcon status={msg.status} />}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-400 text-center mt-10">
            No messages yet.
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="px-5 py-4 border-t bg-white flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 rounded-full px-4 py-2 bg-gray-100 outline-none text-sm"
          placeholder="Type a message"
        />
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" width="20">
            <path d="M2.93 17.067a2 2 0 002.516.247l13-9a2 2 0 00.007-3.316l-13-9A2 2 0 002.93 2.933L15.124 10 2.93 17.067z" />
          </svg>
        </button>
      </div>
      
    </div>
  );
}
