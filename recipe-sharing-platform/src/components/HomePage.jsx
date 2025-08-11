import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import recipesJson from '../data.json';

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  // Load mock data on mount
  useEffect(() => {
    setRecipes(recipesJson);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#075056]">
            Recipe Sharing Platform
          </h1>
          <p className="mt-2 text-[#233038]">
            Discover recipes from the community — click any card to view details.
          </p>
        </header>

        {/* Responsive grid: 1 col mobile, 2 cols md, 3 cols lg */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <div
              key={recipe.id}
              className="hover:shadow-lg rounded shadow transition-transform hover:-translate-y-1"
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </section>

        {/* Optional: show message if no recipes */}
        {recipes.length === 0 && (
          <p className="mt-8 text-center text-gray-600 dark:text-gray-300">
            No recipes found.
          </p>
        )}
      </div>
    </main>
  );
}

export default HomePage;
