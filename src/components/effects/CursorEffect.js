import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Glowing orb effect */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full bg-green-500/5 blur-[100px]"
        animate={{
          x: [0, 100, 50, 200, 0],
          y: [0, 200, 100, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Mouse follower effect */}
      <motion.div 
        className="absolute w-64 h-64 rounded-full bg-green-500/10 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: "spring",
          damping: 20, // Reduced damping for more responsive movement
          stiffness: 300, // Increased stiffness for faster response
          mass: 2 // Reduced mass for quicker movement
        }}
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
    </div>
  );
};

export default CursorEffect; 