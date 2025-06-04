import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FrequencyTester = () => {
  const [frequency, setFrequency] = useState(440);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [waveform, setWaveform] = useState('sine');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    // Initialize AudioContext
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.connect(audioContextRef.current.destination);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      oscillatorRef.current.stop();
      setIsPlaying(false);
    } else {
      oscillatorRef.current = audioContextRef.current.createOscillator();
      oscillatorRef.current.type = waveform;
      oscillatorRef.current.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
      oscillatorRef.current.connect(gainNodeRef.current);
      oscillatorRef.current.start();
      setIsPlaying(true);
    }
  };

  const handleFrequencyChange = (e) => {
    const newFrequency = parseFloat(e.target.value);
    setFrequency(newFrequency);
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(newFrequency, audioContextRef.current.currentTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVolume, audioContextRef.current.currentTime);
    }
  };

  const handleWaveformChange = (e) => {
    const newWaveform = e.target.value;
    setWaveform(newWaveform);
    if (oscillatorRef.current) {
      oscillatorRef.current.type = newWaveform;
    }
  };

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
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            <span className="text-white">Frequency </span>
            <span className="text-green-400">Tester</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Experiment with different sound frequencies and waveforms to find what works best for you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-green-900/30 hover:border-green-500/30 transition-all duration-300 p-8 max-w-2xl mx-auto shadow-lg shadow-green-900/10"
        >
          <div className="space-y-8">
            <div>
              <label className="block text-gray-400 mb-3 text-lg">Frequency (Hz)</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="20"
                  max="20000"
                  value={frequency}
                  onChange={handleFrequencyChange}
                  className="w-full h-2 bg-dark-tertiary rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="text-green-400 font-medium text-xl min-w-[100px] text-center">
                  {Math.round(frequency)} <span className="text-sm">Hz</span>
                </div>
              </div>
              
              {/* Frequency visualization */}
              <div className="mt-4 h-12 w-full bg-dark-tertiary/50 rounded-lg overflow-hidden relative">
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ opacity: isPlaying ? 1 : 0.3 }}
                >
                  <svg width="100%" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                      d={`M 0,20 Q 12.5,${waveform === 'sine' ? '5' : waveform === 'square' ? '5' : waveform === 'sawtooth' ? '5' : '5'} 25,20 Q 37.5,${waveform === 'sine' ? '35' : waveform === 'square' ? '35' : waveform === 'sawtooth' ? '35' : '35'} 50,20 Q 62.5,${waveform === 'sine' ? '5' : waveform === 'square' ? '5' : waveform === 'sawtooth' ? '5' : '5'} 75,20 Q 87.5,${waveform === 'sine' ? '35' : waveform === 'square' ? '35' : waveform === 'sawtooth' ? '35' : '35'} 100,20 Q 112.5,${waveform === 'sine' ? '5' : waveform === 'square' ? '5' : waveform === 'sawtooth' ? '5' : '5'} 125,20 Q 137.5,${waveform === 'sine' ? '35' : waveform === 'square' ? '35' : waveform === 'sawtooth' ? '35' : '35'} 150,20 Q 162.5,${waveform === 'sine' ? '5' : waveform === 'square' ? '5' : waveform === 'sawtooth' ? '5' : '5'} 175,20 Q 187.5,${waveform === 'sine' ? '35' : waveform === 'square' ? '35' : waveform === 'sawtooth' ? '35' : '35'} 200,20`}
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{
                        d: waveform === 'sine' 
                          ? `M 0,20 Q 12.5,5 25,20 Q 37.5,35 50,20 Q 62.5,5 75,20 Q 87.5,35 100,20 Q 112.5,5 125,20 Q 137.5,35 150,20 Q 162.5,5 175,20 Q 187.5,35 200,20` 
                          : waveform === 'square' 
                          ? `M 0,20 L 0,5 L 25,5 L 25,35 L 75,35 L 75,5 L 125,5 L 125,35 L 175,35 L 175,5 L 200,5` 
                          : waveform === 'sawtooth' 
                          ? `M 0,20 L 0,5 L 50,35 L 50,5 L 100,35 L 100,5 L 150,35 L 150,5 L 200,35` 
                          : `M 0,20 L 0,5 L 25,35 L 50,5 L 75,35 L 100,5 L 125,35 L 150,5 L 175,35 L 200,5`
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                </motion.div>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-3 text-lg">Waveform</label>
              <div className="grid grid-cols-4 gap-3">
                {['sine', 'square', 'sawtooth', 'triangle'].map((type) => (
                  <motion.button
                    key={type}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setWaveform(type)}
                    className={`py-3 px-4 rounded-lg capitalize ${waveform === type ? 'bg-green-500/20 border-green-500/50' : 'bg-dark-tertiary/50 border-dark-tertiary'} border transition-colors text-white`}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-3 text-lg">Volume</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-dark-tertiary rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="text-green-400 font-medium text-xl min-w-[60px] text-center">
                  {Math.round(volume * 100)}%
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className={`w-full py-4 px-8 rounded-full font-medium text-lg transition-all duration-300 shadow-lg ${isPlaying ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-green-500 hover:bg-green-400 shadow-green-500/20'} text-black`}
            >
              {isPlaying ? 'Stop' : 'Play'}
            </motion.button>
            
            {/* Frequency information */}
            <div className="mt-6 p-4 bg-dark-tertiary/30 rounded-lg border border-green-900/20">
              <h3 className="text-white font-medium mb-2">Current Frequency: {Math.round(frequency)} Hz</h3>
              <p className="text-gray-400 text-sm">
                {frequency < 20 ? 'Infrasound: Below human hearing range' :
                 frequency < 100 ? 'Very low frequency: Felt more than heard' :
                 frequency < 250 ? 'Bass range: Provides foundation in music' :
                 frequency < 500 ? 'Low-mid range: Adds warmth to sounds' :
                 frequency < 2000 ? 'Mid range: Where most vocal frequencies reside' :
                 frequency < 4000 ? 'Upper-mid range: Adds presence and clarity' :
                 frequency < 10000 ? 'High range: Adds brilliance and air' :
                 frequency < 20000 ? 'Very high range: Adds sparkle and atmosphere' :
                 'Ultrasound: Above human hearing range'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FrequencyTester;