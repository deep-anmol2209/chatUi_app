import { create } from 'zustand';
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const useChatStore = create((set, get) => ({
  conversations: [],
  messages: [],
  selectedChat: null,

  fetchConversations: async () => {
    const res = await axios.get(`${apiUrl}/api/conversations`);
    set({ conversations: res.data });
  },

  selectChat: async (chat) => {
    set({ selectedChat: chat });
    const res = await axios.get(`${apiUrl}/api/chat/${chat.wa_id}/messages`);
    set({ messages: res.data.messages });
  },

  sendMessage: async (from, wa_id, text) => {
    const tempMsg = {
      _id: `temp-${Date.now()}`,
      from,
      wa_id,
      to: wa_id,
      message: text,
      type: 'text',
      status: 'sent',
      timestamp: new Date().toISOString()
    };

    set({ messages: [...get().messages, tempMsg] });

    set({
      conversations: get().conversations.map(convo =>
        convo.wa_id === wa_id
          ? { ...convo, last_message: text, last_status: 'sent', last_timestamp: tempMsg.timestamp }
          : convo
      )
    });

    try {
      const res = await axios.post(`${apiUrl}/api/chat/send`, {
        from,
        wa_id,
        message: text
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const savedMsg = res.data;

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
