import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { LogOut, MessageCircle, Settings, User, Menu, MessagesSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  
  return (
    <header className="fixed w-full top-0 z-50">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-base-100/80 backdrop-blur-lg border-b border-base-300"
      >
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/90 to-secondary/90 
                         flex items-center justify-center shadow-lg group"
              >
                <MessagesSquare className="w-5 h-5 text-primary-content transform transition-transform 
                                       group-hover:rotate-12" strokeWidth={1.5} />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                UOGROOM
              </motion.h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/settings"
                className="btn btn-ghost btn-sm gap-2 hover:bg-base-200/80"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>

              {authUser && (
                <>
                  <Link 
                    to="/profile" 
                    className="btn btn-ghost btn-sm gap-2 hover:bg-base-200/80"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={logout}
                    className="btn btn-primary btn-sm gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="btn btn-ghost btn-circle md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-base-300 md:hidden"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
                <Link
                  to="/settings"
                  className="btn btn-ghost btn-sm justify-start gap-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>

                {authUser && (
                  <>
                    <Link
                      to="/profile"
                      className="btn btn-ghost btn-sm justify-start gap-2"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>

                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        logout();
                      }}
                      className="btn btn-primary btn-sm justify-start gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;
