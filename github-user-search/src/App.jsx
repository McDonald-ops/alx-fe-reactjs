import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Github, Moon, Sun } from 'lucide-react';
import Home from './components/Home';
import About from './components/About';
import Search from './components/Search';
import IconTest from './components/IconTest';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Always apply dark mode regardless of preferences
  useEffect(() => {
    setIsDarkMode(true);
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  // Keep toggle function but always maintain dark mode
  const toggleDarkMode = () => {
    // Just toggle the icon without changing the actual theme
    setIsDarkMode(prev => !prev);
    // Immediately set back to true to maintain dark mode
    setTimeout(() => setIsDarkMode(true), 0);
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
        {/* Header/Navigation */}
        <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                  <Github size={28} className="text-gray-800 dark:text-white" />
                  <span className="text-xl font-bold light-text-primary dark:text-white">GitHub User Search</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Navigation Links */}
                  <nav className="hidden md:flex space-x-8">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400 font-medium" : "light-text-secondary dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400 font-medium" : "light-text-secondary dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"}>About</NavLink>
                    <NavLink to="/search" className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400 font-medium" : "light-text-secondary dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"}>Search</NavLink>
                  </nav>
                
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? (
                    <Sun size={20} />
                  ) : (
                    <Moon size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/icon-test" element={<IconTest />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                  <Github size={24} className="text-gray-800 dark:text-white" />
                  <span className="text-lg font-bold light-text-primary dark:text-white">GitHub User Search</span>
                </div>
                <p className="text-sm light-text-secondary dark:text-gray-400">
                  A powerful tool to discover and connect with GitHub developers worldwide
                </p>
                <div className="mt-4 text-sm light-text-muted dark:text-gray-500">
                  © {new Date().getFullYear()} GitHub User Search. All rights reserved.
                </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;