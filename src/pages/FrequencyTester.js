import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FrequencyTester = () => {
  const [frequency, setFrequency] = useState(440);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [waveform, setWaveform] = useState('sine');
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
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

  const handleWaveformChange = (e) => {
    const newWaveform = e.target.value;
    setWaveform(newWaveform);
    if (oscillatorRef.current) {
      oscillatorRef.current.type = newWaveform;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-secondary rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-dark-accent/20"
      >
        <h1 className="text-3xl font-bold mb-6 text-dark-text-primary">Frequency Tester</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-dark-text-secondary mb-2">Frequency (Hz)</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="20"
                max="20000"
                value={frequency}
                onChange={handleFrequencyChange}
                className="w-full accent-gray-glow"
              />
              <span className="text-dark-text-primary min-w-[80px]">{Math.round(frequency)} Hz</span>
            </div>
          </div>

          <div>
            <label className="block text-dark-text-secondary mb-2">Waveform</label>
            <select
              value={waveform}
              onChange={handleWaveformChange}
              className="w-full bg-dark-tertiary text-dark-text-primary p-2 rounded-lg border border-dark-accent/20"
            >
              <option value="sine">Sine</option>
              <option value="square">Square</option>
              <option value="sawtooth">Sawtooth</option>
              <option value="triangle">Triangle</option>
            </select>
          </div>

          <div>
            <label className="block text-dark-text-secondary mb-2">Volume</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-gray-glow"
              />
              <span className="text-dark-text-primary min-w-[60px]">{Math.round(volume * 100)}%</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-full bg-dark-accent hover:bg-dark-accent-hover text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-gray-glow/20"
          >
            {isPlaying ? 'Stop' : 'Play'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FrequencyTester; 