import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'focus',
    title: '🎧 Focus',
    description: 'Enhance concentration with Beta wave frequencies',
    color: 'from-blue-600 to-blue-800',
    path: '/category/focus'
  },
  {
    id: 'sleep',
    title: '🌌 Sleep',
    description: 'Improve sleep quality with Delta waves',
    color: 'from-indigo-600 to-indigo-800',
    path: '/category/sleep'
  },
  {
    id: 'meditation',
    title: '🧘 Meditation',
    description: 'Calm your mind with Alpha and Theta waves',
    color: 'from-purple-600 to-purple-800',
    path: '/category/meditation'
  },
  {
    id: 'nature',
    title: '🌿 Nature',
    description: 'Relax with soothing natural ambient sounds',
    color: 'from-green-600 to-green-800',
    path: '/category/nature'
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-dark-primary text-dark-text-primary py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-full h-full bg-gradient-to-br from-purple-900/10 via-indigo-900/10 to-transparent animate-gradient-slow" />
        <div className="absolute w-full h-full bg-gradient-to-tl from-blue-900/10 via-teal-900/10 to-transparent animate-gradient-slow delay-500" />
        {/* You can add more background elements here */}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-center mb-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-700 drop-shadow-lg animate-gradient-text"
        >
          Choose Your Experience
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, rotate: 1, boxShadow: '0 15px 30px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="rounded-2xl overflow-hidden transform perspective-1000 transition-all duration-300 ease-in-out"
            >
              <Link to={category.path} className="block h-full">
                <div className={`bg-gradient-to-br ${category.color} rounded-2xl shadow-2xl p-8 h-full text-white flex flex-col justify-between border border-white/10 backdrop-blur-sm`}>
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                      className="text-4xl font-extrabold mb-3 tracking-wide"
                    >
                      {category.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                      className="text-base text-gray-200 leading-relaxed font-medium"
                    >
                      {category.description}
                    </motion.p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;