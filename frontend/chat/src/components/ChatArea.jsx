
import React from "react";

export function ChatArea({ chat }) {


  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-screen bg-gray-100">
        <span>
        <img src="/icons8-chat.gif" alt="Hamburger menu" className="w-20 h-20" />
        </span>
        <p className="text-gray-400 text-lg">Select a chat to start messaging</p>
      </div>
    );
  }


}
