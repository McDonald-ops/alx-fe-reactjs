// src/components/DeleteRecipeButton.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useRecipeStore from '../stores/recipeStore'

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe)
  const navigate = useNavigate()  

  const handleClick = () => {
    deleteRecipe(recipeId)
    navigate('/')      // ← navigate home after deletion
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
