import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page after 8 seconds
    const timer = setTimeout(() => {
      navigate('/home', { replace: true });
    }, 8000); // 8000 milliseconds = 8 seconds

    // Cleanup the timer if the component unmounts before redirection
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-full h-full bg-gradient-to-br from-purple-800/20 via-indigo-800/20 to-transparent animate-gradient-slow" />
        <div className="absolute w-full h-full bg-gradient-to-tl from-blue-800/20 via-teal-800/20 to-transparent animate-gradient-slow delay-700" />
        {/* Additional animated background elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ scale: [0.8, 1.8, 0.8] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-screen opacity-5"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ scale: [1, 2, 1]}}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 3 }}
          className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen opacity-5"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ scale: [0.6, 1.5, 0.6]}}
          transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 1.5 }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-teal-500 rounded-full mix-blend-screen opacity-5 transform -translate-x-1/2 -translate-y-1/2"
        />
        {/* You can add more background elements or particle effects here if desired */}
      </div>

      {/* Centered Content */}
      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 drop-shadow-lg leading-tight animate-fast-gradient-text"
          style={{ backgroundSize: '200% auto' }}
        >
          MindTones
        </motion.h1>
        {/* Optional: Add a subtitle or logo animation below */}
      </div>
    </div>
  );
};

export default WelcomePage; 