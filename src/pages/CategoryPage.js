import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAudio } from '../utils/AudioContext';
import AudioPlayer from '../components/audio/AudioPlayer';
import AnimatedLogo from '../components/AnimatedLogo';

// Import React Slick and its CSS
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CursorEffect from '../components/effects/CursorEffect';

const CategoryPage = () => {
  const { category } = useParams();
  const { sounds } = useAudio();
  
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

  // Invent some placeholder testimonial data - Added even more testimonials
  const testimonials = [
    {
      id: 1,
      quote: "MindTones has truly revolutionized my approach to focus. The Beta waves are a game-changer!",
      author: "Alex Johnson",
      role: "Entrepreneur"
    },
    {
      id: 2,
      quote: "I've struggled with sleep for years, but the Delta waves from MindTones have helped me find restful nights again.",
      author: "Sarah Williams",
      role: "Graphic Designer"
    },
    {
      id: 3,
      quote: "The meditation frequencies provide such a calming experience. It's an essential part of my daily routine now.",
      author: "Michael Chen",
      role: "Yoga Instructor"
    },
     {
      id: 4,
      quote: "I love the nature sounds for focusing during work. It creates a peaceful and productive environment.",
      author: "Emily Roberts",
      role: "Writer"
    },
     {
      id: 5,
      quote: "The ability to adjust frequencies and volume is fantastic. It allows for a truly personalized experience.",
      author: "David Lee",
      role: "Music Producer"
    },
    {
      id: 6,
      quote: "The sound quality is exceptional, and the variety of frequencies is impressive.",
      author: "Jessica Brown",
      role: "Sound Engineer"
    },
    {
      id: 7,
      quote: "MindTones has become my go-to tool for relaxation and stress relief after a long day.",
      author: "Chris Green",
      role: "Teacher"
    },
    {
      id: 8,
      quote: "I was skeptical at first, but the focus frequencies really do help me stay on task.",
      author: "Anna White",
      role: "Student"
    },
    {
      id: 9,
      quote: "The user interface is clean and easy to navigate. A great experience overall.",
      author: "Mark Black",
      role: "Software Developer"
    },
    {
      id: 10,
      quote: "A unique and effective approach to using sound for mental well-being.",
      author: "Sophia Blue",
      role: "Therapist"
    },
    {
      id: 11,
      quote: "I appreciate the science-backed approach and the calming effects of the frequencies.",
      author: "Ethan Adams",
      role: "Researcher"
    },
    {
      id: 12,
      quote: "The app is easy to use and the sound quality is top-notch.",
      author: "Olivia Wilson",
      role: "Student"
    },
    {
      id: 13,
      quote: "A fantastic tool for anyone looking to improve their focus or relax.",
      author: "Liam Taylor",
      role: "Consultant"
    },
    {
      id: 14,
      quote: "I love the variety of categories available. Something for every mood!",
      author: "Ava Martinez",
      role: "Artist"
    },
    {
      id: 15,
      quote: "Highly recommend MindTones for anyone interested in exploring sound therapy.",
      author: "Noah Brown",
      role: "Therapist"
    },
    {
      id: 16,
      quote: "The seamless looping of sounds is perfect for extended listening sessions.",
      author: "Isabella Garcia",
      role: "Music Therapist"
    },
    {
      id: 17,
      quote: "I use the sleep frequencies nightly and have seen a significant improvement in my rest.",
      author: "James Rodriguez",
      role: "Doctor"
    },
    {
      id: 18,
      quote: "The simple design and powerful functionality make this app a winner.",
      author: "Sofia Hernandez",
      role: "UX Designer"
    },
    {
      id: 19,
      quote: "Finding specific frequencies for different needs is incredibly easy and effective.",
      author: "Logan Lopez",
      role: "Acoustic Consultant"
    },
    {
      id: 20,
      quote: "MindTones is a valuable addition to my wellness routine.",
      author: "Mia Perez",
      role: "Yoga Practitioner"
    }
  ];

  // State to manage which card is currently playing for the enlarge/shrink effect
  const [playingCardId, setPlayingCardId] = React.useState(null);
  // Ref for the frequency cards container for potential scrolling into view
  const freqCardsRef = React.useRef(null);

  // Function to handle card click and set the playing card
  const handleCardClick = (cardId) => {
    setPlayingCardId(cardId);
    // TODO: Add logic here to actually play the audio for the selected card
    // This will likely involve finding the sound data by cardId and interacting with the useAudio context

    // Optional: Scroll the clicked card into view
    const playingCardElement = freqCardsRef.current?.querySelector(`[data-sound-id="${cardId}"]`);
    if (playingCardElement) {
      playingCardElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'center'
      });
    }
  };

  // Effect to set the first card as playing initially (optional)
  React.useEffect(() => {
    if (soundsToDisplay.length > 0 && playingCardId === null) {
      setPlayingCardId(soundsToDisplay[0].sound);
    }
  }, [soundsToDisplay, playingCardId]);

  // Settings for React Slick carousel for testimonials
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000, // Adjust speed for the animation
    slidesToShow: 4.5, // Increased slidesToShow to show more cards with reduced gap
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Autoplay continuously
    cssEase: "linear",
    arrows: false,
    pauseOnHover: true, // Pause animation on hover
    // Add responsive settings if needed - Adjusted slidesToShow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5, // Adjusted slidesToShow
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5, // Adjusted slidesToShow
          slidesToScroll: 1,
        }
      }
    ]
  };

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

      {/* Content - Applying the HomePage container style and adjusting layout for responsiveness */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl py-8">

        {/* Header Section (Title and Subtitle) - Centered at the top */}
            <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
          className="text-center mb-12"
            >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">{categoryTitle}</span>
              </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
                {categorySubtitle}
              </p>
            </motion.div>

        {/* Frequency Cards Section - Horizontal display with enlarge/shrink effect */}
        {/* Using a flex container with horizontal scrolling */}
        {/* Added ref and data attribute for scrolling into view */}
        <div className="flex space-x-6 overflow-x-auto pb-6 no-scrollbar" ref={freqCardsRef}>
          {soundsToDisplay.map((sound) => (
                <motion.div
              key={sound.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              // Apply scale transformation based on whether this card is playing
              className={`flex-shrink-0 w-64 ${playingCardId === sound.sound ? 'scale-105' : 'scale-95 opacity-70'} transition-transform duration-300 ease-in-out cursor-pointer frequency-card-3d-container frequency-card-3d`}
              onClick={() => handleCardClick(sound.sound)} // Add click handler
              data-sound-id={sound.sound} // Add data attribute for easy selection
                >
                  <AudioPlayer
                    sound={sound.sound}
                    title={sound.title}
                    description={sound.description}
                isActive={playingCardId === sound.sound} // Pass isActive prop based on state
                  />
                </motion.div>
               ))}
            </div>

        {/* End of Frequency Cards Section */}

      </div>
      {/* End of Main Content Container */}

      {/* Testimonials Section - Horizontally scrolling reviews using React Slick */}
      {/* Added margin top for spacing from the cards above and adjusted heading styling */}
      {/* Moved outside the main container to be full width */}
      <div className="mt-16">
         <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl font-bold text-center mb-8"
        >
          What Our <span className="text-green-400">Users</span> Are Saying
        </motion.h2>

        {/* React Slick Slider for testimonials */}
        {/* Removed manual horizontal scrolling classes */}
        <div className="w-full">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              // Reduced horizontal padding to decrease gap between cards
              <div key={testimonial.id} className="px-1">
                <motion.div
                  // Removed animation for continuous horizontal movement for each card
                  // animate={{
                  //   x: [0, 1000, 0]
                  // }}
                  // transition={{
                  //   x: { repeat: Infinity, duration: 20, ease: "linear" }
                  // }}
                  
                  // Styling for testimonial cards - Increased height and reduced width
                  className="bg-dark-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-green-900/30 shadow-lg h-[250px] w-[280px] flex flex-col justify-between"
                >
                  <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    {/* Placeholder for author image/avatar */}
                    <div className="w-10 h-10 bg-green-500/20 rounded-full mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.author}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
          </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* End of Testimonials Section */}

      {/* Placeholder for the bottom section (e.g., acceptance curve) */}
      {/* You can add a new div here for the bottom section if needed */}

    </div>
  );
};

export default CategoryPage;