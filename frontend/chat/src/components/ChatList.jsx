import React, { useEffect, useState } from "react";
import { SearchBar } from "./Searchbar";
import { useChatStore } from "../store/chatStore";

export default function ChatList({closeSidebar}) {

  const { conversations, fetchConversations, selectChat } = useChatStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

 const filteredConversations = conversations.filter(({ name, last_message }) =>
  name.toLowerCase().includes(search.toLowerCase()) ||
  last_message.toLowerCase().includes(search.toLowerCase())
);
  return (
    <>

  
   

    <div className={`flex flex-col h-screen border-r border-gray-200 `}>
      <div className="flex justify-between  w-full">
      <header className="p-4 font-bold text-xl border-b border-gray-300 text-green-500">Chats</header>
     
      </div>
      
      <SearchBar value={search} onChange={setSearch} />
      <div className="flex-1 overflow-y-auto  bg-white">
        {[...filteredConversations].sort((a, b) => new Date(b.last_timestamp) - new Date(a.last_timestamp)).map(({ wa_id, name, last_message, last_status, last_timestamp }) => (
          <div
            key={wa_id}
            

            onClick={() => {
              selectChat({ wa_id, name });
              if (typeof closeSidebar === "function") closeSidebar();
            }}
            className="flex items-center gap-4 px-4 py-3 hover:bg-green-100 cursor-pointer border-b border-gray-100"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold truncate">{name}</h2>
                <span className="text-xs text-gray-500">{formatTime(last_timestamp)}</span>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600 truncate">
                {last_status === "read" && (
                  // Blue double tick
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
                )}

                {last_status === "delivered" && (
                  // Gray double tick
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
                )}

                {last_status === "sent" && (
                  <svg viewBox="0 0 16 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" className="text-gray-500" fill="none">
                    <title>msg-check</title>
                    <path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832Z" fill="currentColor"></path>
                  </svg>)

                }
                <span className="flex-1 truncate">{last_message}</span>
              </div>
            </div>
          </div>
        ))}

        {conversations.length === 0 && (
          <div className="p-4 text-center text-gray-500">No conversations found.</div>
        )}
      </div>
    </div>
  
  

    </>
    
  );
}





