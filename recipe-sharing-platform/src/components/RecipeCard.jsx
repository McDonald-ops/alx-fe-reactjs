import { Link } from 'react-router-dom';
import { FaClock, FaUtensils, FaHeart } from 'react-icons/fa';

/**
 * RecipeCard
 * Props:
 *  - recipe: { id, title, summary, image }
 */
function RecipeCard({ recipe }) {
  // Mock data for card metadata
  const prepTime = Math.floor(Math.random() * 30) + 15;
  const servings = Math.floor(Math.random() * 4) + 2;

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        {/* Overlay with save button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <div>
            <span className="inline-flex items-center bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              <FaClock className="w-3 h-3 mr-1" /> {prepTime} min
            </span>
            <span className="inline-flex items-center bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ml-2">
              <FaUtensils className="w-3 h-3 mr-1" /> {servings} servings
            </span>
          </div>
          <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-300 backdrop-blur-sm">
            <FaHeart className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-amber-500 transition-colors duration-300 mb-2 line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {recipe.summary}
        </p>

        <Link
          to={`/recipe/${recipe.id}`}
          className="inline-flex items-center text-amber-500 font-medium text-sm hover:text-amber-600 transition-colors"
        >
          View Recipe
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;