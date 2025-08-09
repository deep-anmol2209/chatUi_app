import { create } from 'zustand';

const apiUrl = import.meta.env.VITE_API_URL
export const useChatStore = create((set, get) => ({
  conversations: [],
  messages: [],
  selectedChat: null,


  fetchConversations: async () => {
    const res = await fetch(`${apiUrl}/api/conversations`);
    const data = await res.json();
    set({ conversations: data });
  },


  selectChat: async (chat) => {
    set({ selectedChat: chat });
    const res = await fetch(`${apiUrl}/api/chat/${chat.wa_id}/messages`);
    const data = await res.json();
    set({ messages: data.messages });
  },


  sendMessage: async (from, wa_id, text) => {
    const tempMsg = {
      _id: `temp-${Date.now()}`,
      from: from,
      wa_id,
      to: wa_id,
      message: text,
      type: 'text',
      status: 'sent',
      timestamp: new Date().toISOString()
    };
    console.log("helo");


    set({ messages: [...get().messages, tempMsg] });


    set({
      conversations: get().conversations.map(convo =>
        convo.wa_id === wa_id
          ? { ...convo, last_message: text, last_status: 'sent', last_timestamp: tempMsg.timestamp }
          : convo
      )
    });


    try {
      const res =
        console.log(from);

      console.log(tempMsg);

      await fetch(`${apiUrl}/api/chat/send`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, wa_id, message: text })
      });
      console.log("hello", res);
      const savedMsg = await res.json();


      set({
        messages: get().messages.map(msg =>
          msg._id === tempMsg._id ? savedMsg : msg
        )
      });

    } catch (err) {
      console.error('Failed to send message:', err);

    }
  }
}));