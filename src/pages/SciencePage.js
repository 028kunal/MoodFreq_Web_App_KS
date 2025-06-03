import React from 'react';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">The Science Behind MindTones</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how different sound frequencies can influence your brain waves and mental states.
            Our scientifically-backed approach uses binaural beats and isochronic tones to help you achieve your desired mental state.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {frequencies.map((freq, index) => (
            <motion.div
              key={freq.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{freq.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{freq.name}</h2>
                  <p className="text-purple-600 font-medium">{freq.range}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{freq.description}</p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Benefits:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {freq.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 mb-4">
            MindTones uses a combination of binaural beats and isochronic tones to help your brain achieve specific frequencies.
            When you listen to these sounds, your brain naturally synchronizes with the frequency, a process known as brainwave entrainment.
          </p>
          <p className="text-gray-600">
            This technology is backed by scientific research and has been shown to be effective in helping people achieve various mental states,
            from deep focus to relaxation and better sleep.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SciencePage;