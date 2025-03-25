import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { motion } from "framer-motion";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="flex items-center justify-center pt-20 px-4 pb-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-base-100/50 backdrop-blur-sm rounded-2xl shadow-xl border border-base-content/5 
                   w-full max-w-7xl h-[calc(100vh-6rem)]"
        >
          <div className="flex h-full rounded-2xl overflow-hidden">
            <Sidebar />
            <div className="flex-1 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
              </div>
              
              {/* Content */}
              <div className="relative h-full">
                {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;