import { motion } from "framer-motion";
import { MessageCircle, Users, Heart, Sparkles, Star, Zap } from "lucide-react";

const FloatingIcon = ({ icon: Icon, className, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: [0, 1, 0.5, 1],
      y: [20, -20],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
    }}
    className={`absolute ${className}`}
  >
    <Icon className="w-6 h-6 text-primary-content/70" />
  </motion.div>
);

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-primary to-secondary">
      {/* Floating Icons */}
      <FloatingIcon icon={MessageCircle} className="top-1/4 left-1/4" delay={0} />
      <FloatingIcon icon={Users} className="top-1/3 right-1/4" delay={0.5} />
      <FloatingIcon icon={Heart} className="bottom-1/3 left-1/3" delay={1} />
      <FloatingIcon icon={Sparkles} className="top-1/2 right-1/3" delay={1.5} />
      <FloatingIcon icon={Star} className="bottom-1/4 right-1/3" delay={2} />
      <FloatingIcon icon={Zap} className="top-2/3 left-1/4" delay={2.5} />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{ 
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 grid grid-cols-8 gap-4 p-8 transform"
        >
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{
                duration: 1,
                delay: i * 0.02,
              }}
              className="aspect-square rounded-xl bg-primary-content"
            />
          ))}
        </motion.div>
      </div>

      {/* Glass Effect Card */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-md backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl space-y-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="w-20 h-20 rounded-2xl bg-primary-content/10 flex items-center justify-center mx-auto mb-6"
          >
            <MessageCircle className="w-10 h-10 text-primary-content" />
          </motion.div>
          <h2 className="text-4xl font-bold text-primary-content text-center">{title}</h2>
          <p className="text-primary-content/80 text-lg text-center leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
