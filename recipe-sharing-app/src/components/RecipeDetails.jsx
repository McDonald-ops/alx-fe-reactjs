import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'
import DeleteRecipeButton from './DeleteRecipeButton'

const RecipeDetails = () => {
  const { id } = useParams()
  const recipe = useRecipeStore((s) =>
    s.recipes.find((r) => r.id === id)
  )
  const navigate = useNavigate()

  if (!recipe) return <p>Recipe not found.</p>

  return (
    <div className="p-4">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div className="flex space-x-2">
        <Link
          to={`/edit/${id}`}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Edit
        </Link>
        <DeleteRecipeButton
          recipeId={id}
          onDeleted={() => navigate('/')}
        />
      </div>
    </div>
  )
}

export default RecipeDetails
