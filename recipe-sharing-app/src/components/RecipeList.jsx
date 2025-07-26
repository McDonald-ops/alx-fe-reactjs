import React from 'react'
import { useRecipeStore } from './recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes)

  if (recipes.length === 0) {
    return <p>No recipes added yet.</p>
  }

  return (
    <div>
        <h2>Recipe List</h2>
      {recipes.map(recipe => (
        <div key={recipe.id} className="recipe">
          <h3 className="text-xl font-semibold">{recipe.title}</h3>
          <p className="mt-2 text-gray-700">{recipe.description}</p>
        </div>
      ))}
    </div>
  )
}

export default RecipeList