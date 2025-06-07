import React from 'react';
import { motion } from 'framer-motion';
import CursorEffect from '../components/effects/CursorEffect';
import AnimatedLogo from '../components/AnimatedLogo';

const FrequencyTester = () => {
  const [frequency, setFrequency] = React.useState(440);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);
  const [waveform, setWaveform] = React.useState('sine');
  const audioContextRef = React.useRef(null);
  const oscillatorRef = React.useRef(null);
  const gainNodeRef = React.useRef(null);

  React.useEffect(() => {
    // Initialize AudioContext
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.connect(audioContextRef.current.destination);
    
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
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

  return (
    <div className="min-h-screen bg-dark-primary text-dark-text-primary py-16 relative overflow-hidden">
      {/* Interactive background with green tint */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-br from-green-900/10 via-dark-primary to-dark-primary" />
      </div>

      {/* Add the CursorEffect component - Increased z-index */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <CursorEffect />
      </div>

      {/* Animated Logo in the center background */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <AnimatedLogo size="default" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-white">Frequency </span>
            <span className="text-green-400">Tester</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light mt-6">
            Experiment with different frequencies and waveforms to understand their effect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-green-900/30 p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Control Panel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frequency Control */}
            <div>
              <label htmlFor="frequency" className="block text-lg font-medium text-white mb-2">Frequency: {frequency.toFixed(2)} Hz</label>
              <input
                id="frequency"
                type="range"
                min="0.5"
                max="100"
                step="0.1"
                value={frequency}
                onChange={handleFrequencyChange}
                className="w-full h-2 bg-green-500/30 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>

            {/* Volume Control */}
            <div>
              <label htmlFor="volume" className="block text-lg font-medium text-white mb-2">Volume: {(volume * 100).toFixed(0)}%</label>
              <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-green-500/30 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>

            {/* Waveform Selector */}
            <div className="md:col-span-2">
              <label htmlFor="waveform" className="block text-lg font-medium text-white mb-2">Waveform:</label>
              <select
                id="waveform"
                value={waveform}
                onChange={(e) => setWaveform(e.target.value)}
                className="w-full px-4 py-2 bg-dark-tertiary border border-green-900/30 rounded-md text-white focus:outline-none focus:border-green-500/50 transition-colors"
              >
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="sawtooth">Sawtooth</option>
                <option value="triangle">Triangle</option>
              </select>
            </div>

            {/* Play/Pause Button */}
            <div className="md:col-span-2 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className={`px-8 py-3 rounded-full font-medium transition-colors ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-black shadow-lg ${isPlaying ? 'shadow-red-500/20' : 'shadow-green-500/20'}`}
              >
                {isPlaying ? 'Stop' : 'Play'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Placeholder for other content if needed */}

      </div>
    </div>
  );
};

export default FrequencyTester;