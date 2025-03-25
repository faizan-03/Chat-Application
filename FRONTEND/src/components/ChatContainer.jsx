import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import MessageInput from "./MessageInput";
import { MessageSquare, Phone, Video, MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const lastMessageRef = useRef();

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-content/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={selectedUser?.profilePic}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
              />
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-base-100
                ${selectedUser?.isOnline ? "bg-success" : "bg-error"}`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-base-content">
                {selectedUser?.fullName}
              </h3>
              <p className="text-sm text-base-content/60">
                {selectedUser?.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn btn-ghost btn-circle">
              <Phone className="w-5 h-5" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <Video className="w-5 h-5" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                ref={messageEndRef}
              >
                <div className=" chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser._id
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-base-content/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser?.profilePic}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
            />
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-base-100
              ${selectedUser?.isOnline ? "bg-success" : "bg-error"}`}
            />
          </div>
          <div>
            <h3 className="font-semibold text-base-content">
              {selectedUser?.fullName}
            </h3>
            <p className="text-sm text-base-content/60">
              {selectedUser?.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn btn-ghost btn-circle">
            <Phone className="w-5 h-5" />
          </button>
          <button className="btn btn-ghost btn-circle">
            <Video className="w-5 h-5" />
          </button>
          <button className="btn btn-ghost btn-circle">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <AnimatePresence>
          {messages.map((message, idx) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              ref={idx === messages.length - 1 ? lastMessageRef : null}
              className={`flex ${
                message.senderId === selectedUser?._id ? "justify-start" : "justify-end"
              } mb-4`}
            >
              <div
                className={`max-w-[75%] ${
                  message.senderId === selectedUser?._id
                    ? "bg-base-200"
                    : "bg-primary text-primary-content"
                } rounded-2xl px-4 py-2 shadow-sm`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
                <div
                  className={`text-xs mt-1 ${
                    message.senderId === selectedUser?._id
                      ? "text-base-content/60"
                      : "text-primary-content/60"
                  }`}
                >
                  {format(new Date(message.createdAt), "p")}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-base-content/10">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;