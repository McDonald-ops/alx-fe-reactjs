import { Link } from 'react-router-dom';

/**
 * RecipeCard
 * Props:
 *  - recipe: { id, title, summary, image }
 */
function RecipeCard({ recipe }) {
  return (
    <article className="bg-[#e5e3da] dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition p-0">
      <Link to={`/recipe/${recipe.id}`} className="block">
        <div className="w-full h-48 md:h-40 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {recipe.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {recipe.summary}
          </p>

          <div className="mt-4">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-brand-100 text-[#ff5b04]">
              View recipe
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default RecipeCard;