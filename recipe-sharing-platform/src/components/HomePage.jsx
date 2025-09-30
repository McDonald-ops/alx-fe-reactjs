import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';
import RecipeCard from './RecipeCard';
import AddRecipeForm from './AddRecipeForm';
import recipesJson from '../data.json';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load mock data on mount
  useEffect(() => {
    // Simulate API loading time for better UX
    const timer = setTimeout(() => {
      setRecipes(Array.isArray(recipesJson) ? [...recipesJson] : []);
      setFilteredRecipes(Array.isArray(recipesJson) ? [...recipesJson] : []);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter recipes based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes(recipes);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredRecipes(
        recipes.filter(recipe => 
          recipe.title.toLowerCase().includes(query) || 
          recipe.summary.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, recipes]);

  // Handler to add a new recipe 
  const handleAddRecipe = (newRecipe) => {
    setRecipes(prev => [newRecipe, ...prev]);
  };

  // Skeleton loader for recipes
  const RecipeSkeleton = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
      <div className="aspect-[4/3] bg-gray-200"></div>
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Discover & Share <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Amazing Recipes</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Explore delicious dishes from around the world, or share your own culinary creations with the community.
          </p>
          
          {/* Search and Filter Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-full shadow-md p-1 flex items-center">
            <div className="flex-grow flex items-center px-4">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full focus:outline-none text-gray-700"
              />
            </div>
            <button className="px-4 py-2 text-gray-600 hover:text-amber-500 transition-colors">
              <FaFilter className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Add Recipe Section */}
        <section className="mb-12">
          <AddRecipeForm onAdd={handleAddRecipe} />
        </section>

        {/* Recipes Grid */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {searchQuery ? `Results for "${searchQuery}"` : "Popular Recipes"}
            </h2>
            <div className="text-gray-500 text-sm">
              {filteredRecipes.length} recipes found
            </div>
          </div>

          {/* Responsive grid with better spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Show skeleton loaders while loading
              Array.from({ length: 6 }).map((_, index) => (
                <div key={`skeleton-${index}`}>
                  <RecipeSkeleton />
                </div>
              ))
            ) : filteredRecipes.length > 0 ? (
              // Show filtered recipes
              filteredRecipes.map(recipe => (
                <div key={recipe.id} className="animate-fade-in">
                  <RecipeCard recipe={recipe} />
                </div>
              ))
            ) : (
              // Show empty state when no recipes match the search
              <div className="col-span-full text-center py-16">
                <div className="bg-white rounded-full p-6 inline-flex items-center justify-center mb-4">
                  <FaSearch className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No recipes found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We couldn't find any recipes matching your search. Try a different keyword or browse all recipes.
                </p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                >
                  View All Recipes
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
