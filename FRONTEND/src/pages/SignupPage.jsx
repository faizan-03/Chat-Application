import {
  Mail,
  MessageCircle,
  User,
  Eye,
  Lock,
  EyeOff,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@([^\s@]+\.)?edu\.pk$/.test(formData.email)) return toast.error("Invalid Email");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters long");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid === true) {
      signup(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-base-100 to-base-200 pt-20">
      {/* Left Side - Form */}
      <div className="relative flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-48 h-48 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/30 rounded-full blur-3xl" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 relative z-10"
        >
          {/* Logo */}
          <div className="text-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative inline-flex">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/90 to-secondary/90 
                           flex items-center justify-center shadow-lg group relative overflow-hidden"
                >
                  <MessageCircle 
                    className="w-8 h-8 sm:w-10 sm:h-10 text-primary-content transform transition-all duration-300
                             group-hover:rotate-12 group-hover:scale-110" 
                    strokeWidth={1.5}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-base-100/80 
                           backdrop-blur-sm flex items-center justify-center shadow-md"
                >
                  <Sparkles 
                    className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary" 
                    strokeWidth={1.5}
                  />
                </motion.div>
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary 
                             text-transparent bg-clip-text"
                >
                  Create Account
                </h1>
                <p className="text-sm sm:text-base text-base-content/60">
                  Get started with your free account
                </p>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-base-content/80 inline-block pl-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <User 
                    className="w-[18px] h-[18px] text-base-content/40 group-hover:text-primary transition-colors" 
                    strokeWidth={1.5}
                  />
                </div>
                <input
                  type="text"
                  className="input w-full pl-10 pr-4 h-11 bg-base-100/50 backdrop-blur-sm 
                           text-base-content placeholder:text-base-content/30 border-base-content/10 
                           focus:border-primary hover:border-base-content/20 transition-all duration-300"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-base-content/80 inline-block pl-1">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Mail 
                    className="w-[18px] h-[18px] text-base-content/40 group-hover:text-primary transition-colors" 
                    strokeWidth={1.5}
                  />
                </div>
                <input
                  type="email"
                  className="input w-full pl-10 pr-4 h-11 bg-base-100/50 backdrop-blur-sm 
                           text-base-content placeholder:text-base-content/30 border-base-content/10 
                           focus:border-primary hover:border-base-content/20 transition-all duration-300"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-base-content/80 inline-block pl-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Lock 
                    className="w-[18px] h-[18px] text-base-content/40 group-hover:text-primary transition-colors" 
                    strokeWidth={1.5}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input w-full pl-10 pr-12 h-11 bg-base-100/50 backdrop-blur-sm 
                           text-base-content placeholder:text-base-content/30 border-base-content/10 
                           focus:border-primary hover:border-base-content/20 transition-all duration-300"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 transition-opacity 
                           hover:opacity-70 focus:outline-none focus:ring-0"
                >
                  {showPassword ? (
                    <EyeOff 
                      className="w-[18px] h-[18px] text-base-content/50" 
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Eye 
                      className="w-[18px] h-[18px] text-base-content/50" 
                      strokeWidth={1.5}
                    />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              type="submit" 
              className="btn w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 
                       hover:to-secondary/90 text-primary-content border-0 shadow-lg hover:shadow-xl 
                       transform hover:scale-[1.02] transition-all duration-300" 
              disabled={isSigningUp}
            >
              <div className="flex items-center justify-center gap-2">
                {isSigningUp ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </div>
            </motion.button>
          </form>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm sm:text-base text-base-content/60"
          >
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="font-medium text-primary hover:text-secondary transition-colors 
                       underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </div>

      {/* Right Side - Image Pattern */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignupPage;
