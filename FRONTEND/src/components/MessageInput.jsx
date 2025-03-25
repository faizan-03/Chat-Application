import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Smile, PaperclipIcon, Send, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!message.trim() && !selectedImage) || isLoading) return;

    const formData = new FormData();
    if (message.trim()) formData.append("message", message);
    if (selectedImage) formData.append("image", selectedImage);

    await sendMessage(formData);
    setMessage("");
    setSelectedImage(null);
    setImagePreview("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setMessage(message + emoji);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Image Preview */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-full left-0 mb-2 p-2 bg-base-200 rounded-lg"
          >
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-20 w-20 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview("");
                }}
                className="absolute -top-2 -right-2 bg-error text-error-content rounded-full p-1 
                         opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji Picker */}
      <AnimatePresence>
        {showEmoji && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-full right-0 mb-2"
          >
            <Picker
              data={data}
              onEmojiSelect={addEmoji}
              theme="dark"
              set="native"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 bg-base-200/50 backdrop-blur-sm rounded-xl p-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-ghost btn-circle btn-sm"
        >
          <PaperclipIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          className="btn btn-ghost btn-circle btn-sm"
        >
          <Smile className="w-5 h-5" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent border-none focus:outline-none 
                   placeholder:text-base-content/40"
        />
        <button
          type="submit"
          disabled={!message.trim() && !selectedImage}
          className="btn btn-primary btn-circle btn-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;