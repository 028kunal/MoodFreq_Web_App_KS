import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedLogo from '../AnimatedLogo';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.header className="sticky top-0 z-50 flex justify-center px-4 py-8">
      {/* Rounded background container - Increased max width */}
      <div className="w-full max-w-7xl bg-dark-secondary/50 backdrop-blur-md rounded-full px-8 py-4 flex items-center justify-between border border-green-900/20">
        {/* Animated Logo and MindTones text - Increased text size */}
        <div className="flex items-center">
          <AnimatedLogo size="navbar" />
          <div className="ml-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 animate-fast-gradient-text" style={{ backgroundSize: '200% auto' }}>
            MindTones
          </div>
        </div>

        {/* Navigation Links - Increased text size and spacing */}
        <div className="flex space-x-8">
          <Link
            to="/home"
            className={`text-xl font-medium transition-all duration-300 ${
              isActive('/home')
                ? 'text-green-400'
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            Home
          </Link>
          <Link
            to="/science"
            className={`text-xl font-medium transition-all duration-300 ${
              isActive('/science')
                ? 'text-green-400'
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            Science
          </Link>
          {/* The Frequency Tester link will become the 'Contact Us' button in design */}
          {/* We'll keep the link path the same but restyle it as a button */}
        </div>

        {/* Contact Us Button - Increased text size */}
        <Link
          to="/frequency-tester"
          className="bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-8 rounded-full text-xl transition-colors duration-300"
        >
          Frequency Tester
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;