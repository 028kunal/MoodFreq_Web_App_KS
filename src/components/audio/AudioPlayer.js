import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../utils/AudioContext';
// import chimeSound from '../../assets/chime.mp3';

const AudioPlayer = ({ sound, title, description, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const [carrier, setCarrier] = useState(200); // Default carrier frequency for binaural beats

  // Context for global playback control
  const { currentSound, setCurrentSound } = useAudio();
  // Generate a unique key for this player (based on title + sound)
  const playerKey = `${title}-${sound}`;

  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);
  // For binaural beats
  const leftOscRef = useRef(null);
  const rightOscRef = useRef(null);
  const mergerRef = useRef(null);

  // Detect if sound is a frequency (number) or a file URL (string)
  const isFrequency = typeof sound === 'number';

  // Stop audio if another player starts
  useEffect(() => {
    if (currentSound !== playerKey && isPlaying) {
      stopAudio();
    }
    // eslint-disable-next-line
  }, [currentSound]);

  const stopAudio = useCallback(() => {
    if (isFrequency) {
      if (leftOscRef.current) {
        leftOscRef.current.stop();
        leftOscRef.current.disconnect();
        leftOscRef.current = null;
      }
      if (rightOscRef.current) {
        rightOscRef.current.stop();
        rightOscRef.current.disconnect();
        rightOscRef.current = null;
      }
      if (mergerRef.current) {
        mergerRef.current.disconnect();
        mergerRef.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
      }
    } else {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
      }
    }
    setIsPlaying(false);
  }, [isFrequency]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopAudio();
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== 'closed'
      ) {
        audioContextRef.current.close();
      }
    };
  }, [stopAudio]);

  useEffect(() => {
    if (!isFrequency && sound) {
      // Only load audio file if not a frequency
      setIsLoading(true);
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      fetch(sound)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContextRef.current.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          audioBufferRef.current = audioBuffer;
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [sound]);

  const playAudio = async () => {
    setCurrentSound(playerKey); // Set this as the current playing sound
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    if (isFrequency) {
      // Binaural beats mode
      // Carrier frequency (audible, e.g., 200 Hz)
      // Binaural beat frequency (the brainwave frequency, e.g., 14 Hz for beta)
      // Left: carrier Hz, Right: carrier + beat Hz
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      gainNodeRef.current.connect(audioContextRef.current.destination);
      mergerRef.current = audioContextRef.current.createChannelMerger(2);
      mergerRef.current.connect(gainNodeRef.current);
      leftOscRef.current = audioContextRef.current.createOscillator();
      rightOscRef.current = audioContextRef.current.createOscillator();
      leftOscRef.current.type = 'sine';
      rightOscRef.current.type = 'sine';
      leftOscRef.current.frequency.setValueAtTime(carrier, audioContextRef.current.currentTime);
      rightOscRef.current.frequency.setValueAtTime(carrier + sound, audioContextRef.current.currentTime);
      leftOscRef.current.connect(mergerRef.current, 0, 0); // left channel
      rightOscRef.current.connect(mergerRef.current, 0, 1); // right channel
      leftOscRef.current.start();
      rightOscRef.current.start();
      setIsPlaying(true);
    } else {
      // File mode
      if (!audioBufferRef.current) {
        setIsPlaying(false);
        return;
      }
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      gainNodeRef.current.connect(audioContextRef.current.destination);
      sourceNodeRef.current = audioContextRef.current.createBufferSource();
      sourceNodeRef.current.buffer = audioBufferRef.current;
      sourceNodeRef.current.connect(gainNodeRef.current);
      sourceNodeRef.current.loop = true;
      sourceNodeRef.current.start(0);
      setIsPlaying(true);
    }
  };

  const togglePlay = async () => {
    if (isPlaying) {
      stopAudio();
      setCurrentSound(null); // Clear current sound in context
    } else {
      await playAudio();
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVolume, audioContextRef.current.currentTime);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-dark-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 ease-in-out p-6 flex flex-col h-full
        ${isActive
          ? 'border-green-500 shadow-lg shadow-green-500/30'
          : 'border-dark-tertiary hover:border-green-900'
        }
      `}
    >
      {/* Removing animated background gradient/particles for a cleaner look as per image */}
      {/* <div className="absolute inset-0 z-0 pointer-events-none"> */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-800/5 via-indigo-700/5 to-transparent animate-gradient-slow" /> */}
      {/* <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-blue-800/5 via-purple-700/5 to-transparent animate-gradient-slow delay-500" /> */}
      {/* </div> */}
      <div className="flex flex-col items-center z-10 relative flex-grow">
        {/* Removing Pulsing/vibrating glowing circle */}
        {/* {isFrequency && ( */}
        {/* <motion.div */}
        {/* animate={isPlaying ? { */}
        {/* scale: [1, 1.01, 1], */}
        {/* boxShadow: [ */}
        {/* '0 0 0 0 rgba(167,139,250,0.05)', */}
        {/* '0 0 6px 3px rgba(167,139,250,0.1)', */}
        {/* '0 0 0 0 rgba(167,139,250,0.05)' */}
        {/* ], */}
        {/* opacity: [0.5, 0.7, 0.5], */}
        {/* } : { scale: 1, boxShadow: '0 0 0 0 rgba(167,139,250,0.05)', opacity: 0.5 }} */}
        {/* transition={{ */}
        {/* duration: 6, */}
        {/* repeat: Infinity, */}
        {/* ease: 'easeInOut', */}
        {/* }} */}
        {/* className="w-24 h-24 mb-3 rounded-full bg-gradient-radial from-purple-400/15 via-purple-200/5 to-transparent shadow-sm" */}
        {/* style={{ filter: 'blur(0.1px)' }} */}
        {/* /> */}
        {/* )} */}
        <h2 className="text-lg font-extrabold mb-1 text-white tracking-wide drop-shadow text-center">{title}</h2>
        {/* Carrier frequency control for binaural beats */}
        {isFrequency && (
          <div className="mb-3 w-full">
            <label className="block text-gray-400 mb-1 font-semibold text-xs text-center">Carrier Frequency (Hz)</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="100"
                max="600"
                step="1"
                value={carrier}
                onChange={e => setCarrier(Number(e.target.value))}
                className="w-full accent-purple-500"
                disabled={isPlaying}
              />
              <span className="text-white font-bold text-sm">{carrier} Hz</span>
            </div>
          </div>
        )}
        {/* Volume Control */}
        <div className="mb-3 w-full">
          <label className="block text-gray-400 mb-1 font-semibold text-xs text-center">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-purple-500"
          />
        </div>
        {/* Play/Stop Button */}
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 0 8px 2px rgba(167,139,250,0.5)' }}
          whileTap={{ scale: 0.98 }}
          animate={isPlaying ? { boxShadow: '0 0 10px 3px rgba(167,139,250,0.7)' } : { boxShadow: 'none' }}
          onClick={togglePlay}
          disabled={isLoading}
          className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 px-6 rounded-full transition-all duration-300 shadow-lg mt-auto text-sm tracking-wide ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <span className="flex items-center text-xs">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : isPlaying ? (
            <span className="flex items-center text-sm">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pause
            </span>
          ) : (
            <span className="flex items-center text-sm">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3-2.132a1 1 0 000-1.664z" />
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Play
            </span>
          )}
        </motion.button>
        {/* Quote line - Using description and styling smaller */}
        {description && (
          <div className="mt-4 text-center text-xs italic text-gray-400 font-semibold">{description}</div>
        )}
        {/* Removed Quick Timer Presets */}
        {/* Removed Active Timer Display */}
      </div>
    </motion.div>
  );
};

export default AudioPlayer;






// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import { useAudio } from '../../utils/AudioContext';
// import { Play, Pause, Volume } from 'lucide-react';

// const AudioPlayer = ({ sound, title, description }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume] = useState(0.5);
//   const [timer, setTimer] = useState(0);
//   const [timerActive, setTimerActive] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Context for global playback control
//   const { currentSound, setCurrentSound } = useAudio();
//   const playerKey = `${title}-${sound}`;

//   const audioContextRef = useRef(null);
//   const audioBufferRef = useRef(null);
//   const sourceNodeRef = useRef(null);
//   const gainNodeRef = useRef(null);
//   const leftOscRef = useRef(null);
//   const rightOscRef = useRef(null);
//   const mergerRef = useRef(null);

//   const isFrequency = typeof sound === 'number';

//   // Stop audio if another player starts
//   useEffect(() => {
//     if (currentSound !== playerKey && isPlaying) {
//       stopAudio();
//     }
//     // eslint-disable-next-line
//   }, [currentSound]);

//   const stopAudio = useCallback(() => {
//     if (isFrequency) {
//       if (leftOscRef.current) {
//         leftOscRef.current.stop();
//         leftOscRef.current.disconnect();
//         leftOscRef.current = null;
//       }
//       if (rightOscRef.current) {
//         rightOscRef.current.stop();
//         rightOscRef.current.disconnect();
//         rightOscRef.current = null;
//       }
//       if (mergerRef.current) {
//         mergerRef.current.disconnect();
//         mergerRef.current = null;
//       }
//       if (gainNodeRef.current) {
//         gainNodeRef.current.disconnect();
//         gainNodeRef.current = null;
//       }
//     } else {
//       if (sourceNodeRef.current) {
//         sourceNodeRef.current.stop();
//         sourceNodeRef.current.disconnect();
//         sourceNodeRef.current = null;
//       }
//       if (gainNodeRef.current) {
//         gainNodeRef.current.disconnect();
//         gainNodeRef.current = null;
//       }
//     }
//     setIsPlaying(false);
//     setTimerActive(false);
//   }, [isFrequency]);

//   useEffect(() => {
//     return () => {
//       stopAudio();
//       if (
//         audioContextRef.current &&
//         audioContextRef.current.state !== 'closed'
//       ) {
//         audioContextRef.current.close();
//       }
//     };
//   }, [stopAudio]);

//   useEffect(() => {
//     if (!isFrequency && sound) {
//       setIsLoading(true);
//       if (!audioContextRef.current) {
//         audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//       }
//       fetch(sound)
//         .then(response => response.arrayBuffer())
//         .then(arrayBuffer => audioContextRef.current.decodeAudioData(arrayBuffer))
//         .then(audioBuffer => {
//           audioBufferRef.current = audioBuffer;
//           setIsLoading(false);
//         })
//         .catch(error => {
//           setIsLoading(false);
//         });
//     }
//     // eslint-disable-next-line
//   }, [sound]);

//   useEffect(() => {
//     let interval;
//     if (timerActive && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => {
//           if (prev <= 1) {
//             setTimerActive(false);
//             stopAudio();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [timerActive, timer, stopAudio]);

//   const playAudio = async () => {
//     setCurrentSound(playerKey);
//     if (!audioContextRef.current) {
//       audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//     }
//     if (audioContextRef.current.state === 'suspended') {
//       await audioContextRef.current.resume();
//     }
//     if (isFrequency) {
//       gainNodeRef.current = audioContextRef.current.createGain();
//       gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
//       gainNodeRef.current.connect(audioContextRef.current.destination);
//       mergerRef.current = audioContextRef.current.createChannelMerger(2);
//       mergerRef.current.connect(gainNodeRef.current);
//       leftOscRef.current = audioContextRef.current.createOscillator();
//       rightOscRef.current = audioContextRef.current.createOscillator();
//       leftOscRef.current.type = 'sine';
//       rightOscRef.current.type = 'sine';
//       const carrierFrequency = 200; // Default audible carrier frequency (e.g., 200 Hz)
//       leftOscRef.current.frequency.setValueAtTime(carrierFrequency, audioContextRef.current.currentTime);
//       rightOscRef.current.frequency.setValueAtTime(carrierFrequency + sound, audioContextRef.current.currentTime); // sound is the beat frequency
//       leftOscRef.current.connect(mergerRef.current, 0, 0);
//       rightOscRef.current.connect(mergerRef.current, 0, 1);
//       leftOscRef.current.start();
//       rightOscRef.current.start();
//       setIsPlaying(true);
//     } else {
//       if (!audioBufferRef.current) {
//         setIsPlaying(false);
//         return;
//       }
//       gainNodeRef.current = audioContextRef.current.createGain();
//       gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
//       gainNodeRef.current.connect(audioContextRef.current.destination);
//       sourceNodeRef.current = audioContextRef.current.createBufferSource();
//       sourceNodeRef.current.buffer = audioBufferRef.current;
//       sourceNodeRef.current.connect(gainNodeRef.current);
//       sourceNodeRef.current.loop = true;
//       sourceNodeRef.current.start(0);
//       setIsPlaying(true);
//     }
//   };

//   const togglePlay = async () => {
//     if (isPlaying) {
//       stopAudio();
//       setCurrentSound(null);
//     } else {
//       await playAudio();
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
//       className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 backdrop-blur-sm transition-colors duration-200 group cursor-pointer"
//     >
//       {/* Album Art / Frequency Indicator */}
//       <div className="relative flex-shrink-0">
//         <div className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center overflow-hidden">
//           {isFrequency ? (
//             <motion.div
//               animate={isPlaying ? { scale: [1, 1.05, 1] } : { scale: 1 }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//               className="w-4 h-4 bg-white/50 rounded-full"
//             />
//           ) : (
//             <Volume className="w-5 h-5 text-white" />
//           )}
//         </div>
//         {isPlaying && (
//           <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
//         )}
//       </div>

//       {/* Track Info */}
//       <div className="flex-1 min-w-0">
//         <h4 className="font-semibold text-white text-sm truncate">{title}</h4>
//         <p className="text-xs text-gray-300 truncate">{description}</p>
        
//         {/* Timer Display */}
//         {timer > 0 && (
//           <p className="text-xs text-purple-300 mt-0.5">{formatTime(timer)} remaining</p>
//         )}
//       </div>

//       {/* Controls (Simplified for list view) */}
//       <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//         {/* Play/Pause Button */}
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={(e) => {
//             e.stopPropagation();
//             togglePlay();
//           }}
//           disabled={isLoading}
//           className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
//             isPlaying 
//               ? 'bg-green-500 hover:bg-green-400' 
//               : 'bg-white/10 hover:bg-white/20'
//           } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           {isLoading ? (
//             <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//           ) : isPlaying ? (
//             <Pause className="w-3 h-3 text-white" />
//           ) : (
//             <Play className="w-3 h-3 text-white ml-0.5" />
//           )}
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

// export default AudioPlayer;