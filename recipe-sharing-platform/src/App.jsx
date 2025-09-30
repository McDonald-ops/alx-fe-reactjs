import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';
import HomePage from './components/HomePage';
import RecipeDetail from './components/RecipeDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* Modern Navigation Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaUtensils className="text-amber-500 w-8 h-8" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                RecipeShare
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-gray-700 hover:text-amber-500 transition-colors font-medium">
                Home
              </a>
              <a href="#featured" className="text-gray-700 hover:text-amber-500 transition-colors font-medium">
                Featured
              </a>
              <a href="#categories" className="text-gray-700 hover:text-amber-500 transition-colors font-medium">
                Categories
              </a>
              <a href="#about" className="text-gray-700 hover:text-amber-500 transition-colors font-medium">
                About
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button 
                className="hidden md:flex items-center px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
              <button className="md:hidden text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <FaUtensils className="text-amber-500 w-6 h-6" />
                <span className="text-lg font-bold text-gray-800">RecipeShare</span>
              </div>
              <div className="text-gray-600 text-sm">
                © {new Date().getFullYear()} RecipeShare. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
