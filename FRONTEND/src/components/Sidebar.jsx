import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => showOnlineOnly ? onlineUsers.includes(user._id) : true)
    .filter((user) => 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isExpanded ? "288px" : "80px" }}
      className="h-full border-r border-base-300 flex flex-col bg-base-200/50 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-medium"
                >
                  Contacts
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-ghost btn-sm btn-circle"
          >
            {isExpanded ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-3"
            >
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-base-300/50 rounded-xl text-sm placeholder:text-base-content/40
                           focus:outline-none focus:ring-2 ring-primary/20"
                />
              </div>

              {/* Online filter */}
              <div className="flex items-center justify-between">
                <label className="cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showOnlineOnly}
                    onChange={(e) => setShowOnlineOnly(e.target.checked)}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="text-sm">Show online only</span>
                </label>
                <span className="text-xs text-base-content/60">
                  {onlineUsers.length - 1} online
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User List */}
      <div className="overflow-y-auto flex-1 py-2">
        <AnimatePresence>
          {filteredUsers.map((user) => (
            <motion.button
              key={user._id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 flex items-center gap-3 relative group
                hover:bg-base-300/50 transition-all duration-200
                ${selectedUser?._id === user._id ? "bg-base-300/50" : ""}
              `}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-xl object-cover transition-transform duration-200
                           group-hover:scale-105"
                />
                {onlineUsers.includes(user._id) && (
                  <motion.span
                    layoutId={`online-${user._id}`}
                    className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full 
                             ring-2 ring-base-100"
                  />
                )}
              </div>

              <AnimatePresence mode="wait">
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex-1 text-left min-w-0"
                  >
                    <div className="font-medium truncate">{user.fullName}</div>
                    <div className="text-sm text-base-content/60">
                      {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </AnimatePresence>

        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-base-content/60 py-8"
          >
            No contacts found
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-base-300 p-4">
        <button className="btn btn-ghost btn-sm w-full gap-2">
          <Settings className="w-4 h-4" />
          {isExpanded && <span>Settings</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;