import { MessageSquare, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full flex flex-col items-center justify-center p-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 
                 flex items-center justify-center mb-6"
      >
        <MessageSquare className="w-12 h-12 text-primary" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold mb-2"
      >
        No Chat Selected
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-base-content/60 max-w-sm"
      >
        Select a contact from the sidebar to start chatting. Your conversations will appear here.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center gap-2 text-primary"
      >
        <ArrowLeft className="w-4 h-4 animate-pulse" />
        <span className="text-sm">Select a chat</span>
      </motion.div>
    </motion.div>
  );
};

export default NoChatSelected;
