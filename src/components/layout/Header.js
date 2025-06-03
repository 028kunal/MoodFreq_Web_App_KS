import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.header className="bg-dark-secondary/50 backdrop-blur-md border-b border-dark-accent/20">
      <nav className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 animate-fast-gradient-text" style={{ backgroundSize: '200% auto' }}>
            MindTones
          </div>

          <div className="flex space-x-8">
            <Link
              to="/home"
              className={`text-2xl font-medium transition-all duration-300 ${
                isActive('/home')
                  ? 'text-gray-glow'
                  : 'text-dark-text-secondary hover:text-gray-glow'
              }`}
            >
              Home
            </Link>
            <Link
              to="/science"
              className={`text-2xl font-medium transition-all duration-300 ${
                isActive('/science')
                  ? 'text-gray-glow'
                  : 'text-dark-text-secondary hover:text-gray-glow'
              }`}
            >
              Science
            </Link>
            <Link
              to="/frequency-tester"
              className={`text-2xl font-medium transition-all duration-300 ${
                isActive('/frequency-tester')
                  ? 'text-gray-glow'
                  : 'text-dark-text-secondary hover:text-gray-glow'
              }`}
            >
              Frequency Tester
            </Link>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;