import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipesJson from '../data.json';
import { FaChevronLeft } from 'react-icons/fa';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // data.json contains an array of recipes; id from route is a string
    const found = recipesJson.find(r => String(r.id) === String(id));
    setRecipe(found || null);
  }, [id]);

  if (!recipe) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            Recipe not found.
          </p>
          <Link to="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <FaChevronLeft className="mr-2" /> Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-[#e5e3da] dark:bg-slate-800 rounded-lg shadow-recipe overflow-hidden">
        {/* Header image */}
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-6 md:p-10">
          {/* Title & summary */}
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-[#075056]">
              {recipe.title}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {recipe.summary}
            </p>
          </div>

          {/* Ingredients & Instructions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Ingredients</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            </section>

            {/* Instructions */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Instructions</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-200">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </section>
          </div>

          {/* Footer actions */}
          <div className="mt-8 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center px-4 py-2 bg-[#e5e3da] dark:bg-slate-700 text-gray-800 dark:text-gray-100 rounded hover:opacity-95">
              <FaChevronLeft className="mr-2" /> Back
            </Link>

            <div className="text-sm text-gray-600 dark:text-gray-300">
              {/* Placeholder: could show metadata, prep time, servings etc. */}
              <span className="mr-4">Serves: 4</span>
              <span>Prep: ~15 mins</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RecipeDetail;