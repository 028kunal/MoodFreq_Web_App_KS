import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAudio } from '../utils/AudioContext';
import AudioPlayer from '../components/audio/AudioPlayer';
import { useState, useEffect } from 'react';

const CategoryPage = () => {
  const { category } = useParams();
  const { sounds } = useAudio();
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);
  
  const categoryTitle = {
    focus: 'Focus & Concentration',
    meditation: 'Meditation & Relaxation',
    sleep: 'Sleep & Rest',
    nature: 'Nature for Focus'
  }[category];

  const categorySubtitle = {
    focus: 'Enhance your focus and concentration with scientifically proven frequencies.',
    meditation: 'Find your inner peace with frequencies designed for meditation and relaxation.',
    sleep: 'Improve your sleep quality with frequencies that promote deep, restful sleep.',
    nature: 'Immerse yourself in the calming sounds of nature designed for focus.'
  }[category];

  // Define specific sounds to display for each category (exactly 3)
  const soundsToDisplay = (() => {
    switch (category) {
      case 'focus':
        // Assuming your sounds context has keys like 'beta', 'alpha', 'gamma' etc.
        // Replace with actual keys from your sounds object that represent focus frequencies
        return [
          sounds.focus?.beta || { sound: 14, title: 'Beta Waves (14-30 Hz)', description: 'Enhance focus and concentration' },
          sounds.focus?.alpha || { sound: 10, title: 'Alpha Waves (8-13 Hz)', description: 'Relaxation and creativity' },
          sounds.focus?.gamma || { sound: 40, title: 'Gamma Waves (30-100 Hz)', description: 'Cognitive enhancement' },
        ].filter(s => s !== undefined); // Filter out any undefined entries if keys don't exist
      case 'meditation':
        // Assuming your sounds context has keys like 'theta', 'delta', 'alpha' etc.
        // Replace with actual keys from your sounds object
        return [
          sounds.meditation?.theta || { sound: 6, title: 'Theta Waves (4-7 Hz)', description: 'Deep meditation and creativity' },
          sounds.meditation?.delta || { sound: 2, title: 'Delta Waves (0.5-4 Hz)', description: 'Deep sleep and healing' },
          sounds.meditation?.alpha || { sound: 10, title: 'Alpha Waves (8-13 Hz)', description: 'Relaxation and peace' },
        ].filter(s => s !== undefined);
      case 'sleep':
        // Assuming your sounds context has keys like 'delta', 'theta', 'isochronic-sleep-track' etc.
        // Replace with actual keys or file paths
        return [
          sounds.sleep?.delta || { sound: 2, title: 'Delta Waves (0.5-4 Hz)', description: 'Deep sleep induction' },
          sounds.sleep?.theta || { sound: 5, title: 'Theta Waves (4-7 Hz)', description: 'Relaxing sleep preparation' },
          sounds.sleep?.isochronicSleep || { sound: '/audio/isochronic-sleep.mp3', title: 'Isochronic Sleep Tone', description: 'Pure sleep frequency' },
        ].filter(s => s !== undefined);
      case 'nature':
        // Assuming your sounds context has keys for nature sounds
        // Replace with actual keys or file paths for 3 nature sounds
        return [
          sounds.nature?.rain || { sound: '/audio/rain.mp3', title: 'Rain Sounds', description: 'Calming rain for focus' },
          sounds.nature?.forest || { sound: '/audio/forest.mp3', title: 'Forest Ambiance', description: 'Tranquil forest sounds' },
          sounds.nature?.ocean || { sound: '/audio/ocean.mp3', title: 'Ocean Waves', description: 'Soothing ocean sounds' },
        ].filter(s => s !== undefined);
      default:
        return [];
    }
  })();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Calculate and apply extra padding-right to allow the last item to be centered
    const adjustPadding = () => {
      const containerWidth = container.offsetWidth;
      const lastCard = cardRefs.current[soundsToDisplay.length - 1];
      if (lastCard) {
        const lastCardWidth = lastCard.offsetWidth;
        // Calculate padding needed to scroll the last card to the center
        const requiredPaddingRight = containerWidth / 2 - lastCardWidth / 2;
        container.style.paddingRight = `${requiredPaddingRight}px`;
      }
    };

    // Initial adjustment and re-adjustment on resize/scroll
    adjustPadding();
    const resizeObserver = new ResizeObserver(adjustPadding);
    resizeObserver.observe(container);

    const updateActiveIndex = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(cardCenterX - containerCenterX);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });
      setActiveIndex(closestIndex);
    };

    container.addEventListener('scroll', updateActiveIndex);
    // Also run on mount to set initial active card
    updateActiveIndex();

    return () => {
      container.removeEventListener('scroll', updateActiveIndex);
      resizeObserver.disconnect();
    };
  }, [soundsToDisplay, cardRefs]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current && activeIndex > 0) {
      // Calculate scroll position to center the previous card
      const container = scrollContainerRef.current;
      const previousCard = cardRefs.current[activeIndex - 1];
      if (previousCard) {
        const containerWidth = container.offsetWidth;
        const cardWidth = previousCard.offsetWidth;
        const cardLeft = previousCard.offsetLeft;
        const scrollToLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
        container.scrollTo({ left: scrollToLeft, behavior: 'smooth' });
      }
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current && activeIndex < soundsToDisplay.length - 1) {
      // Calculate scroll position to center the next card
      const container = scrollContainerRef.current;
      const nextCard = cardRefs.current[activeIndex + 1];
      if (nextCard) {
        const containerWidth = container.offsetWidth;
        const cardWidth = nextCard.offsetWidth;
        const cardLeft = nextCard.offsetLeft;
        const scrollToLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
        container.scrollTo({ left: scrollToLeft, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden"
         style={{ 
           /* Outer background gradient/design based on new inspiration */
           backgroundImage: 'linear-gradient(to right, #8b5cf6, #3b82f6)', // Purple to Blue gradient
         }}>
      {/* White Bordered Container */}
      <div className="relative bg-[#0D0E1B] rounded-2xl border-2 border-white w-full h-full flex flex-col overflow-hidden"
           style={{ 
             /* Ensure content fits inside and scrollable parts work */
             minHeight: 'calc(100vh - 32px)', // Example: Adjust based on padding
             maxHeight: 'calc(100vh - 32px)' // Example: Adjust based on padding
           }}>

        {/* Header Navigation - Keeping only the menu icon and logo placeholder */}
        <div className="relative z-20 flex justify-between items-center px-8 md:px-12 py-6 border-b border-white/10">
          <div className="flex items-center space-x-8">
            {/* Menu Icon */}
            <button className="p-2 focus:outline-none text-white">
              <div className="w-6 h-0.5 bg-white mb-1.5"></div>
              <div className="w-6 h-0.5 bg-white mb-1.5"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>
            
            {/* Logo/Brand (Placeholder) */}
          </div>

          {/* Removed Navigation Links and Sign Up Button */}
        </div>

        {/* Main Content Area (Below Header) */}
        <div className="flex flex-grow overflow-hidden">
          {/* Left Section: Title and Description */}
          <div className="w-[65%] flex flex-col justify-center px-8 md:px-12 py-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }} // Animate from left
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-lg"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-white">
                {categoryTitle}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                {categorySubtitle}
              </p>

              {/* Decorative Elements from Inspiration */}
              <div className="mt-12 opacity-60 space-y-3">
                 <div className="w-40 h-0.5 bg-white"></div>
                 <div className="w-32 h-0.5 bg-white"></div>
                 <div className="w-48 h-0.5 bg-white"></div>
              </div>

            </motion.div>
          </div>

          {/* Right Section: Horizontally Scrollable Audio Players */}
          <div className="w-[27%] flex items-center overflow-hidden py-12 relative">

            {/* Scrollable Container for Audio Players */}
            <div id="audio-players-scroll-container" className="flex space-x-8 px-8 overflow-x-auto scrollbar-hide" /* Ensure tailwind-scrollbar-hide plugin is installed and configured */
                 ref={scrollContainerRef}
                 style={{
                   /* Mask gradient for blur effect on edges */
                   maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
                   WebkitMaskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
                   /* Ensure content starts near the left edge */
                   paddingLeft: '4rem', // Increase paddingLeft to match image alignment
                   paddingRight: '2rem' // Consistent padding at end (32px)
                  }}>
              {soundsToDisplay.map((sound, index) => (
                <motion.div
                  key={sound.title || index}
                  initial={{ opacity: 0, x: 50 }} // Animate from right
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex-shrink-0 w-72" // Rely on space-x-8 for spacing between cards
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                >
                  <AudioPlayer
                    sound={sound.sound}
                    title={sound.title}
                    description={sound.description}
                    isActive={index === activeIndex} // Pass isActive prop based on state
                  />
                </motion.div>
               ))}
            </div>

            {/* Scroll Navigation Buttons (Placeholders, positioned relative to this section) - Moved inside the scroll section div */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/10 rounded-full p-2 text-white/80 hover:text-white hover:bg-white/30 transition-colors z-20 opacity-70 ml-4"
              onClick={handleScrollLeft}
              aria-label="Scroll Left"
            >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 rounded-full p-2 text-white/80 hover:text-white hover:bg-white/30 transition-colors z-20 opacity-70 mr-4"
              onClick={handleScrollRight}
              aria-label="Scroll Right"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>

        {/* Optional: Add a footer or other elements inside the border */}

      </div>

    </div>
  );
};

export default CategoryPage;