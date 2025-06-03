import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">MindTones</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Scientifically proven sound frequencies to enhance your mental state
          </p>
          <div className="mb-12">
            <Link 
              to="/home" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="bg-purple-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">📚 Focus</h3>
              <p>Enhance concentration with Beta wave frequencies</p>
            </div>
            <div className="bg-purple-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">🧘 Meditation</h3>
              <p>Calm your mind with Alpha and Theta waves</p>
            </div>
            <div className="bg-purple-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">🌙 Sleep</h3>
              <p>Improve sleep quality with Delta waves</p>
            </div>
            <div className="bg-purple-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">🌿 Nature</h3>
              <p>Relax with soothing natural ambient sounds</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;