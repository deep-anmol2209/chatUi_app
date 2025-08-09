import React, { useState } from "react";
import "./App.css";
import ChatList from "./components/ChatList";
import { ChatArea } from "./components/ChatArea";
import ChatWindow from "./components/ChatWindow";
import { useChatStore } from "./store/chatStore";

function App() {
  const { selectedChat } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen flex">

      {/* <button
        className="absolute top-1 left-4 z-50 p-2  sm:hidden"
        aria-label="Open chat list"
        onClick={() => setIsSidebarOpen(true)}
      >
        
        <div className="space-y-1 ">
          <span className="block w-6 h-0.5 bg-gray-600"></span>
          <span className="block w-6 h-0.5 bg-gray-600"></span>
          <span className="block w-6 h-0.5 bg-gray-600"></span>
        </div>
      </button> */}

      <span  onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="inline-block absolute top-100 left-[-40px] sm:hidden z-50">
        <img src="/icons8-sidebar-32.png" alt="Hamburger menu" className="w-20 h-20" />
        </span>


      <div className={`${isSidebarOpen ? "" : "hidden"} fixed inset-0 z-30 bg-white bg-opacity-20 sm:hidden`} onClick={() => setIsSidebarOpen(false)} />
      <div
        className={` 
          fixed top-0 left-0 z-40 h-full w-67 bg-white shadow-md transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0 sm:static sm:flex
        `}
      >

        <div className="sm:hidden flex justify-end p-2">
          <button onClick={() => setIsSidebarOpen(false)}>
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <ChatList closeSidebar={() => setIsSidebarOpen(false)} />
      </div>


      <div className="flex-1">
        {selectedChat ? <ChatWindow /> : <ChatArea />}
      </div>
    </div>
  );
}

export default App;
