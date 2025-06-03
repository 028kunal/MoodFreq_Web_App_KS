import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AudioProvider } from './utils/AudioContext';
import './App.css';

// Import components
import Header from './components/layout/Header';

// Import pages
import HomePage from './pages/HomePage';
import SciencePage from './pages/SciencePage';
import CategoryPage from './pages/CategoryPage';
import FrequencyTester from './pages/FrequencyTester';
import WelcomePage from './pages/WelcomePage';

function App() {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/';

  return (
    <AudioProvider>
      <div className="App min-h-screen bg-dark-primary text-dark-text-primary">
        {!isWelcomePage && <Header />}
        <main className="relative">
          <div className="fixed inset-0 bg-gradient-radial from-gray-glow/5 to-transparent pointer-events-none" />
          <div className="fixed inset-0 bg-noise opacity-5 pointer-events-none" />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/science" element={<SciencePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/frequency-tester" element={<FrequencyTester />} />
          </Routes>
        </main>
      </div>
    </AudioProvider>
  );
}

export default App;
