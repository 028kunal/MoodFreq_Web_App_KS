import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ size = 'default' }) => {
  // Define size classes based on the size prop
  const sizeClasses = {
    default: 'w-80 h-80', // Increased default size
    navbar: 'w-8 h-8', // Smaller size for navbar
  };

  // Define blur classes based on size
  const blurClasses = {
    default: 'blur-xl', // Increased default blur
    navbar: 'blur-sm', // Smaller blur for navbar
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.default;
  const currentBlurClass = blurClasses[size] || blurClasses.default;

  return (
    <div className={`relative flex items-center justify-center ${currentSizeClass}`}>
      {/* Outer circle (pulsing) - Increased opacity */}
      <motion.div 
        className={`absolute inset-0 rounded-full border border-green-500/50 animate-pulse-slow`}
        animate={{ opacity: [0.7, 1, 0.7] }} // Increased opacity range
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      {/* Middle circle (reverse spin) */}
      <motion.div 
        className="absolute w-3/4 h-3/4 rounded-full border border-green-500/70 animate-reverse-spin" // Increased border opacity
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner circle (pulsing) - Increased opacity */}
      <motion.div 
        className="absolute w-1/2 h-1/2 rounded-full bg-green-500/30 animate-pulse" // Increased background opacity
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      {/* Center dot (pinging) - Increased blur */}
      <motion.div 
        className={`absolute w-4 h-4 rounded-full bg-green-500 ${currentBlurClass}`}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default AnimatedLogo; 