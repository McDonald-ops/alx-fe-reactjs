import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

const EditRecipeForm = () => {
  const { id } = useParams()
  const recipe = useRecipeStore((s) =>
    s.recipes.find((r) => r.id === id)
  )
  const updateRecipe = useRecipeStore((s) => s.updateRecipe)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title)
      setDescription(recipe.description)
    }
  }, [recipe])

  if (!recipe) return <p>Recipe not found.</p>

  const handleSubmit = (e) => {
    e.preventDefault()
    updateRecipe({ id, title, description })
    navigate(`/recipe/${id}`)
  }

  return (
    <form onSubmit={handleSubmit}> 
      <div>
        <label>Title</label>
        <input
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Save Changes
      </button>
    </form>
  )
}

export default EditRecipeForm
