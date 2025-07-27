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
      {/* explicit reference to recipe.id */}
      <p className="text-sm text-gray-500">ID: {recipe.id}</p>

      <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
      <p className="mb-4">{recipe.description}</p>

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
