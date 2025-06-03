import React, { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const sounds = {
    focus: {
      beta: {
        title: 'Beta Waves (14-30 Hz)',
        description: 'Enhance focus and concentration',
        frequency: '14-30 Hz',
        sound: 18
      }
    },
    meditation: {
      alpha: {
        title: 'Alpha Waves (8-13 Hz)',
        description: 'Promote relaxation and reduce anxiety',
        frequency: '8-13 Hz',
        sound: 10
      },
      theta: {
        title: 'Theta Waves (4-7 Hz)',
        description: 'Deep meditation and creativity',
        frequency: '4-7 Hz',
        sound: 6
      }
    },
    sleep: {
      delta: {
        title: 'Delta Waves (0.5-4 Hz)',
        description: 'Deep sleep and healing',
        frequency: '0.5-4 Hz',
        sound: 2
      }
    },
    nature: {
      rain: {
        title: 'Rainfall',
        description: 'Soothing rain sounds for relaxation',
        sound: '/sounds/rain.mp3'
      },
      ocean: {
        title: 'Ocean Waves',
        description: 'Calming ocean waves',
        sound: '/sounds/ocean.mp3'
      },
      forest: {
        title: 'Forest Ambience',
        description: 'Peaceful forest sounds',
        sound: '/sounds/forest.mp3'
      }
    }
  };

  const value = {
    currentSound,
    setCurrentSound,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    sounds
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}; 