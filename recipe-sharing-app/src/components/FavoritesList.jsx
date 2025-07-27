import React from 'react'
import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

const FavoritesList = () => {
  const recipes       = useRecipeStore((s) => s.recipes)
  const favoritesIds  = useRecipeStore((s) => s.favorites)
  const addFavorite   = useRecipeStore((s) => s.addFavorite)
  const removeFavorite= useRecipeStore((s) => s.removeFavorite)

  const favoriteRecipes = recipes.filter((r) =>
    favoritesIds.includes(r.id)
  )

  if (favoriteRecipes.length === 0) {
    return <p>You have no favorite recipes yet.</p>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">My Favorites</h2>
      {favoriteRecipes.map((r) => (
        <div key={r.id} className="mb-4 p-4 border rounded">
          <Link to={`/recipe/${r.id}`}>
            <h3 className="text-xl font-semibold">{r.title}</h3>
          </Link>
          <button
            onClick={() => removeFavorite(r.id)}
            className="mt-2 px-2 py-1 text-sm bg-red-500 text-white rounded"
          >
            Remove Favorite
          </button>
        </div>
      ))}
    </div>
  )
}

export default FavoritesList
