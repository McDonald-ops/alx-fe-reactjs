import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecipeStore } from '../stores/recipeStore'

const RecommendationsList = () => {
  const recipes           = useRecipeStore((s) => s.recipes)
  const recommendations   = useRecipeStore((s) => s.recommendations)
  const generateRecs      = useRecipeStore((s) => s.generateRecommendations)

  // regenerate when recipes or favorites change
  useEffect(() => {
    generateRecs()
  }, [recipes, generateRecs])

  if (recommendations.length === 0) {
    return <p>No recommendations at the moment. Favorite some recipes to get suggestions!</p>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recommended For You</h2>
      {recommendations.map((r) => (
        <div key={r.id} className="mb-4 p-4 border rounded">
          <Link to={`/recipe/${r.id}`}>
            <h3 className="text-xl font-semibold">{r.title}</h3>
          </Link>
          <p className="text-gray-700 mt-1">{r.description.slice(0, 80)}…</p>
        </div>
      ))}
    </div>
  )
}

export default RecommendationsList
