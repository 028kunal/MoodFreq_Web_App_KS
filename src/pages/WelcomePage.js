import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from '../components/AnimatedLogo';
import CursorEffect from '../components/effects/CursorEffect';

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
    <div className="min-h-screen bg-dark-primary text-dark-text-primary py-16 relative overflow-hidden">
      {/* Interactive background with green tint */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-br from-green-900/10 via-dark-primary to-dark-primary" />
      </div>

      {/* Animated Logo in the center background */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <AnimatedLogo size="default" />
      </div>

      {/* Add the CursorEffect component - Increased z-index */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <CursorEffect />
      </div>

      {/* Content - Centering the existing title within the new container */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl flex items-center justify-center min-h-screen-minus-padding">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500 drop-shadow-lg leading-tight text-center"
          style={{ backgroundSize: '200% auto' }}
        >
          MindTones
        </motion.h1>
      </div>
    </div>
  );
};

export default WelcomePage; 