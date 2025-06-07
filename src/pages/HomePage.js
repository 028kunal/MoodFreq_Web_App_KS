import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedLogo from '../components/AnimatedLogo';
import CursorEffect from '../components/effects/CursorEffect';

const categories = [
  {
    id: 'focus',
    name: 'Focus & Concentration',
    description: 'Enhance your focus and concentration with scientifically proven frequencies.',
    icon: '📚',
  },
  {
    id: 'meditation',
    name: 'Meditation & Relaxation',
    description: 'Find your inner peace with frequencies designed for meditation and relaxation.',
    icon: '🧘',
  },
  {
    id: 'sleep',
    name: 'Sleep & Rest',
    description: 'Improve your sleep quality with frequencies that promote deep, restful sleep.',
    icon: '🌙',
  },
  {
    id: 'nature',
    name: 'Nature for Focus',
    description: 'Immerse yourself in the calming sounds of nature designed for focus.',
    icon: '🌿',
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-dark-primary text-dark-text-primary py-16 relative overflow-hidden">
      {/* Interactive background with green tint */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-br from-green-900/10 via-dark-primary to-dark-primary" />
      </div>

      {/* Add the CursorEffect component - Increased z-index to appear above content */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <CursorEffect />
      </div>

      {/* Content - Added flex and items-center to vertically center content within the viewport */}
      {/* Added pt-20 to create space below the sticky navbar */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl flex flex-col items-center justify-center min-h-screen-minus-navbar pt-20">
        {/* Adjusted margin-bottom on the first section for spacing from the section below */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-48 relative"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Revolutionize</span> <span className="text-green-400">the Way</span> <span className="text-white">You</span><br/>
            <span className="text-white">Interact with</span> <span className="text-green-400">Sound</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light mt-6">
            Experience frequency-based sound therapy designed to enhance your mind
          </p>
          
          {/* Animated Logo positioned behind the Get Started button */}
          {/* Position absolutely, centered horizontally, adjusted vertically */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
             <AnimatedLogo size="default" /> {/* Use the AnimatedLogo component with default size */}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 bg-green-500 hover:bg-green-400 text-black px-8 py-3 rounded-full font-medium transition-colors shadow-lg shadow-green-500/20 relative z-10"
          >
            Get Started
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24 mt-64"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Choose Your <span className="text-green-400">Experience</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group flex justify-center"
              >
                <div class="card">
                  <div class="content">
                    <div class="back">
                      <div class="back-content">
                        {/* Category Icon */}
                        <span className="text-4xl mb-2">{category.icon}</span>
                        {/* Category Description */}
                        <p className="text-gray-400 text-center mb-4 px-2">{category.description}</p>
                        {/* Uiverse Button */}
                        <Link to={`/category/${category.id}`}>
                          <button className="uiverse">
                            <div className="wrapper">
                              <span>Explore</span>
                              <div className="circle circle-12"></div>
                              <div className="circle circle-11"></div>
                              <div className="circle circle-10"></div>
                              <div className="circle circle-9"></div>
                              <div className="circle circle-8"></div>
                              <div className="circle circle-7"></div>
                              <div className="circle circle-6"></div>
                              <div className="circle circle-5"></div>
                              <div className="circle circle-4"></div>
                              <div className="circle circle-3"></div>
                              <div className="circle circle-2"></div>
                              <div className="circle circle-1"></div>
                            </div>
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div class="front">
                      {/* Front content */}
                      <div class="front-content flex flex-col items-center justify-center text-center">
                         {/* Category Icon */}
                         <span className="text-5xl mb-4">{category.icon}</span>
                        {/* Category Name */}
                        <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                        {/* Hover Me Indicator */}
                        <p className="text-gray-500 text-sm italic">Hover Me</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Add a section for testimonials later if needed */}

      </div>
    </div>
  );
};

export default HomePage;