import React, { useState } from 'react'
import { useRecipeStore } from './recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    addRecipe({ title, description })
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Recipe title"
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Recipe description"
          className="w-full p-2 border rounded h-24"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Recipe
      </button>
    </form>
  )
}

export default AddRecipeForm
