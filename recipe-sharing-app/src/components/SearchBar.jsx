import React, { useEffect } from 'react'
import useRecipeStore from './recipeStore'

const SearchBar = () => {
  const searchTerm     = useRecipeStore((s) => s.searchTerm)
  const setSearchTerm  = useRecipeStore((s) => s.setSearchTerm)
  const filterRecipes  = useRecipeStore((s) => s.filterRecipes)

  // re-run filter whenever searchTerm changes
  useEffect(() => {
    filterRecipes()
  }, [searchTerm, filterRecipes])

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search recipes by title or description…"
      className="w-full p-2 mb-4 border rounded"
    />
  )
}

export default SearchBar
