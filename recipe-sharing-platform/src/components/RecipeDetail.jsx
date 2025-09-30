import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Clock, Utensils, Heart, Share2, Printer, CheckSquare, Square } from 'lucide-react';
import recipesJson from '../data.json';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      const found = recipesJson.find(r => String(r.id) === String(id));
      setRecipe(found || null);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [id]);

  // Toggle ingredient checkbox
  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!recipe) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-full p-8 inline-flex items-center justify-center mb-6 shadow-md">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe not found</h2>
          <p className="text-gray-600 mb-8">
            We couldn't find the recipe you're looking for. It might have been removed or the link is incorrect.
          </p>
          <Link to="/" className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
            <ChevronLeft className="mr-2" /> Back to Recipes
          </Link>
        </div>
      </main>
    );
  }

  // Mock data for recipe metadata
  const prepTime = Math.floor(Math.random() * 30) + 15;
  const cookTime = Math.floor(Math.random() * 45) + 15;
  const totalTime = prepTime + cookTime;
  const servings = Math.floor(Math.random() * 4) + 2;
  const difficulty = ['Easy', 'Medium', 'Medium', 'Hard'][Math.floor(Math.random() * 4)];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto mb-6">
        <nav className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700 font-medium truncate max-w-xs">{recipe.title}</span>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Recipe Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Recipe Image */}
          <div className="relative w-full h-80 md:h-96 overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
              loading="lazy"
            />
            <div className="absolute top-4 right-4 space-y-2">
              <button 
                onClick={() => setSaved(!saved)} 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${saved ? 'bg-red-500 text-white shadow-md' : 'bg-white/80 text-gray-600 hover:bg-white shadow-sm'}
              `}
                aria-label={saved ? "Remove from saved" : "Save recipe"}
              >
                <Heart className={`w-5 h-5 ${saved ? 'fill-white' : ''}`} />
              </button>
              <button 
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-600 flex items-center justify-center shadow-sm transition-all duration-300"
                aria-label="Share recipe"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-600 flex items-center justify-center shadow-sm transition-all duration-300"
                aria-label="Print recipe"
              >
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Title, Summary & Metadata */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                {recipe.title}
              </h1>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {recipe.summary}
              </p>
              
              {/* Recipe Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-amber-500 mb-1">
                    <Clock className="w-5 h-5 mr-1" />
                    <span className="font-medium">Total</span>
                  </div>
                  <span className="font-bold text-gray-800">{totalTime} min</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-amber-500 mb-1">
                    <Clock className="w-5 h-5 mr-1" />
                    <span className="font-medium">Prep</span>
                  </div>
                  <span className="font-bold text-gray-800">{prepTime} min</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-amber-500 mb-1">
                    <Utensils className="w-5 h-5 mr-1" />
                    <span className="font-medium">Serves</span>
                  </div>
                  <span className="font-bold text-gray-800">{servings}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-amber-500 mb-1">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <span className="font-medium">Difficulty</span>
                  </div>
                  <span className="font-bold text-gray-800">{difficulty}</span>
                </div>
              </div>
            </div>

            {/* Ingredients & Instructions grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ingredients */}
              <section className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                  Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start">
                      <button
                        onClick={() => toggleIngredient(idx)}
                        className="flex-shrink-0 w-5 h-5 rounded border border-gray-300 mr-3 mt-0.5 focus:outline-none"
                        aria-label={checkedIngredients[idx] ? "Uncheck ingredient" : "Check ingredient"}
                      >
                        {checkedIngredients[idx] ? (
                          <CheckSquare className="w-4 h-4 text-amber-500" />
                        ) : (
                          <Square className="w-4 h-4 text-transparent" />
                        )}
                      </button>
                      <span className={`text-gray-700 ${checkedIngredients[idx] ? 'line-through text-gray-400' : ''}`}>
                        {ing}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Instructions */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Instructions
                </h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((step, idx) => (
                    <li key={idx} className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold mr-4">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            {/* Footer actions */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link 
                to="/" 
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-all w-full sm:w-auto justify-center"
              >
                <ChevronLeft className="mr-2" /> Back to Recipes
              </Link>
              
              <div className="flex space-x-3">
                <button className="px-4 py-2 text-gray-600 hover:text-amber-500 transition-colors flex items-center">
                  <Share2 className="w-4 h-4 mr-1" /> Share
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-amber-500 transition-colors flex items-center">
                  <Printer className="w-4 h-4 mr-1" /> Print
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Recipes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recipesJson.slice(0, 3).filter(r => String(r.id) !== String(id)).map(rec => (
              <Link
                key={rec.id}
                to={`/recipe/${rec.id}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 group-hover:text-amber-500 transition-colors line-clamp-1">
                    {rec.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default RecipeDetail;