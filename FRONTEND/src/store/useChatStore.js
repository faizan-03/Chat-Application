import {create} from 'zustand';
import toast from 'react-hot-toast';
import {axiosInstance} from '../lib/axious.js';
import { useAuthStore } from './useAuthStore.js';

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  lastMessageMap: {},

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      const sortedUsers = res.data.sort((a, b) => {
        const aLastMessage = get().lastMessageMap[a._id]?.createdAt || 0;
        const bLastMessage = get().lastMessageMap[b._id]?.createdAt || 0;
        return bLastMessage - aLastMessage;
      });
      set({ users: sortedUsers });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
      
      if (res.data.length > 0) {
        const lastMessage = res.data[res.data.length - 1];
        set(state => ({
          lastMessageMap: {
            ...state.lastMessageMap,
            [userId]: lastMessage
          }
        }));
        
        const sortedUsers = [...get().users].sort((a, b) => {
          const aLastMessage = get().lastMessageMap[a._id]?.createdAt || 0;
          const bLastMessage = get().lastMessageMap[b._id]?.createdAt || 0;
          return bLastMessage - aLastMessage;
        });
        set({ users: sortedUsers });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      const newMessage = res.data;
      
      set({ messages: [...messages, newMessage] });
      
      set(state => ({
        lastMessageMap: {
          ...state.lastMessageMap,
          [selectedUser._id]: newMessage
        }
      }));
      
      const sortedUsers = [...get().users].sort((a, b) => {
        const aLastMessage = get().lastMessageMap[a._id]?.createdAt || 0;
        const bLastMessage = get().lastMessageMap[b._id]?.createdAt || 0;
        return bLastMessage - aLastMessage;
      });
      set({ users: sortedUsers });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });

      set(state => {
        const updatedLastMessageMap = {
          ...state.lastMessageMap,
          [newMessage.senderId]: newMessage
        };
        
        const sortedUsers = [...state.users].sort((a, b) => {
          const aLastMessage = updatedLastMessageMap[a._id]?.createdAt || 0;
          const bLastMessage = updatedLastMessageMap[b._id]?.createdAt || 0;
          return bLastMessage - aLastMessage;
        });

        return {
          lastMessageMap: updatedLastMessageMap,
          users: sortedUsers
        };
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));