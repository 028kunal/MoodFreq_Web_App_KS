import React from 'react';
import { motion } from 'framer-motion';
import AnimatedLogo from '../components/AnimatedLogo';
import CursorEffect from '../components/effects/CursorEffect';

const SciencePage = () => {
  const frequencies = [
    {
      name: 'Beta Waves',
      range: '14-30 Hz',
      description: 'Beta waves are associated with normal waking consciousness and alertness. They are present when we are actively thinking, problem-solving, or engaged in focused mental activity.',
      benefits: [
        'Enhanced focus and concentration',
        'Improved analytical thinking',
        'Better problem-solving abilities',
        'Increased alertness and awareness'
      ],
      icon: '🎯'
    },
    {
      name: 'Alpha Waves',
      range: '8-13 Hz',
      description: 'Alpha waves are present during relaxed, calm states of mind. They occur when we are awake but relaxed, such as during meditation or when closing our eyes.',
      benefits: [
        'Reduced stress and anxiety',
        'Enhanced creativity',
        'Improved learning ability',
        'Better emotional stability'
      ],
      icon: '🧘'
    },
    {
      name: 'Theta Waves',
      range: '4-7 Hz',
      description: 'Theta waves are associated with deep meditation, creativity, and the subconscious mind. They are present during deep relaxation and light sleep.',
      benefits: [
        'Deep meditation states',
        'Enhanced creativity and intuition',
        'Improved memory and learning',
        'Deep emotional healing'
      ],
      icon: '💭'
    },
    {
      name: 'Delta Waves',
      range: '0.5-4 Hz',
      description: 'Delta waves are the slowest brain waves and are associated with deep, dreamless sleep and healing. They are crucial for physical and mental restoration.',
      benefits: [
        'Deep, restorative sleep',
        'Physical healing and regeneration',
        'Immune system enhancement',
        'Pain relief'
      ],
      icon: '🌙'
    }
  ];

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

      {/* Content - Applying the HomePage container style */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">The Science Behind </span>
            <span className="text-green-400">MindTones</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light mt-6">
            Discover how different sound frequencies can influence your brain waves and mental states.
            Our scientifically-backed approach uses binaural beats and isochronic tones to help you achieve your desired mental state.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {frequencies.map((freq, index) => (
            <motion.div
              key={freq.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-dark-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-green-900/30 group hover:border-green-500/30 transition-all duration-300 p-6"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors duration-300">
                  <span className="text-2xl">{freq.icon}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-medium text-white">{freq.name}</h2>
                  <p className="text-green-400 font-medium">{freq.range}</p>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6">{freq.description}</p>
              
              <h3 className="text-lg font-semibold text-white mb-3">Benefits:</h3>
              <ul className="space-y-2">
                {freq.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-400">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-green-900/30 p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
          <div className="space-y-4">
            <p className="text-gray-400">
              MindTones uses a combination of binaural beats and isochronic tones to help your brain achieve specific frequencies.
              When you listen to these sounds, your brain naturally synchronizes with the frequency, a process known as brainwave entrainment.
            </p>
            <p className="text-gray-400">
              This technology is backed by scientific research and has been shown to be effective in helping people achieve various mental states,
              from deep focus to relaxation and better sleep.
            </p>
          </div>
          
          {/* Visual representation of brainwave entrainment */}
          <div className="mt-8 flex justify-center">
            <div className="relative w-full max-w-md h-24">
              <motion.div 
                className="absolute top-1/2 left-0 w-full h-0.5 bg-green-500/50"
                animate={{ 
                  scaleY: [1, 2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              
              {[...Array(8)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute top-1/2 w-1 h-1 rounded-full bg-green-400"
                  style={{ left: `${i * 12.5}%` }}
                  animate={{ 
                    y: [0, -20, 0, 20, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SciencePage;