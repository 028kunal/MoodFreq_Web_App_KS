import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'focus',
    title: 'Focus',
    description: 'Enhance concentration with Beta wave frequencies',
    path: '/category/focus',
    icon: '🎧'
  },
  {
    id: 'sleep',
    title: 'Sleep',
    description: 'Improve sleep quality with Delta waves',
    path: '/category/sleep',
    icon: '🌌'
  },
  {
    id: 'meditation',
    title: 'Meditation',
    description: 'Calm your mind with Alpha and Theta waves',
    path: '/category/meditation',
    icon: '🧘'
  },
  {
    id: 'nature',
    title: 'Nature',
    description: 'Relax with soothing natural ambient sounds',
    path: '/category/nature',
    icon: '🌿'
  }
];

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const orbRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-dark-primary text-dark-text-primary py-16 relative overflow-hidden">
      {/* Interactive background with green tint */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-br from-green-900/10 via-dark-primary to-dark-primary" />
        
        {/* Glowing orb effect */}
        <motion.div 
          ref={orbRef}
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
            damping: 30,
            stiffness: 200,
            mass: 3
          }}
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Revolutionize</span> <span className="text-green-400">the Way</span> <span className="text-white">You</span><br/>
            <span className="text-white">Interact with</span> <span className="text-green-400">Sound</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light mt-6">
            Experience frequency-based sound therapy designed to enhance your mind
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 bg-green-500 hover:bg-green-400 text-black px-8 py-3 rounded-full font-medium transition-colors shadow-lg shadow-green-500/20"
          >
            Get Started
          </motion.button>
        </motion.div>
        
        {/* 3D Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative w-64 h-64 mx-auto mb-24"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-green-500/30 animate-pulse-slow"></div>
            <div className="absolute w-32 h-32 rounded-full border border-green-500/50 animate-reverse-spin"></div>
            <div className="absolute w-16 h-16 rounded-full bg-green-500/20 animate-pulse"></div>
            <div className="absolute w-4 h-4 rounded-full bg-green-500 animate-ping"></div>
          </div>
        </motion.div>
        
        {/* Features section */}
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Why <span className="text-green-400">MindTones</span> is Your Ultimate Sound Companion
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-dark-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-green-900/30 group hover:border-green-500/30 transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium">Effortless Tone Management</h3>
                </div>
                <p className="text-gray-400 mb-6">Our advanced algorithms automatically adjust frequencies to match your needs, creating the perfect sound environment.</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map(item => (
                    <div key={item} className="flex items-center">
                      <div className="w-6 h-6 rounded-full border border-green-500/50 flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-400">Feature {item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-dark-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-green-900/30 group hover:border-green-500/30 transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium">Instant Response</h3>
                </div>
                <p className="text-gray-400 mb-6">Experience immediate changes in your mental state with our scientifically calibrated frequency patterns.</p>
                
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-lg bg-dark-tertiary flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-green-500/20"></div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-dark-tertiary flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-green-500/20"></div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-dark-tertiary flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-green-500/20"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Categories section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Choose Your <span className="text-green-400">Experience</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredCard(category.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group"
              >
                <Link to={category.path} className="block h-full">
                  <div className="bg-dark-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-green-900/30 group-hover:border-green-500/30 transition-all duration-300 h-full relative">
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    <div className="p-8 relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors duration-300">
                          <span className="text-2xl">{category.icon}</span>
                        </div>
                        <h3 className="text-2xl font-medium">{category.title}</h3>
                      </div>
                      <p className="text-gray-400 mb-8">{category.description}</p>
                      <div className="flex justify-end">
                        <span className="text-sm text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                          Explore <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Pricing section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">Affordable <span className="text-green-400">Plans</span></h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Choose the perfect plan that fits your needs and budget</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Basic Plan', price: '$9.99', features: ['Access to basic frequencies', 'Standard quality audio', '5 presets', 'Email support'] },
              { name: 'Pro Plan', price: '$20.99', features: ['Access to all frequencies', 'High quality audio', 'Unlimited presets', 'Priority support', 'Custom frequency creator'], highlight: true },
              { name: 'Premium Plan', price: '$30.99', features: ['Everything in Pro', 'Ultra HD audio', 'Advanced analytics', 'Personal consultation', 'API access'] }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                className={`bg-dark-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border ${plan.highlight ? 'border-green-500/30' : 'border-green-900/30'} h-full`}
              >
                <div className="p-8">
                  <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-6">{plan.price}</div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-full font-medium ${plan.highlight ? 'bg-green-500 hover:bg-green-400 text-black' : 'bg-dark-tertiary hover:bg-dark-tertiary/80 text-white'} transition-colors`}>
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-12 text-center">What Our <span className="text-green-400">Users</span> Are Saying</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Alex Johnson', role: 'Meditation Instructor', quote: 'The frequency patterns have transformed my meditation practice. My clients love the results.' },
              { name: 'Sarah Williams', role: 'Software Developer', quote: 'I use the Focus frequencies daily. My productivity has increased by at least 30%.' },
              { name: 'Michael Chen', role: 'Insomnia Patient', quote: 'After years of sleep issues, the Delta waves have finally helped me get consistent rest.' }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                className="bg-dark-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-green-900/30 p-6"
              >
                <div className="text-green-400 text-4xl mb-4">
                  ""  
                </div>
                <p className="text-gray-300 mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <span className="text-green-400 font-medium">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;