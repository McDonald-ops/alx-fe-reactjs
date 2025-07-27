import React from 'react'
import { useRecipeStore } from './recipeStore'

const DeleteRecipeButton = ({ recipeId, onDeleted }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe)

  const handleClick = () => {
    deleteRecipe(recipeId)
    if (onDeleted) onDeleted()
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-red-600 text-white rounded"
    >
      Delete
    </button>
  )
}

export default DeleteRecipeButton
