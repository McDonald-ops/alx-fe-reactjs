import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import AddRecipeForm   from './components/AddRecipeForm'
import RecipeList      from './components/RecipeList'
import RecipeDetails   from './components/RecipeDetails'
import EditRecipeForm  from './components/EditRecipeForm'
import DeleteRecipeButton from './components/DeleteRecipeButton'
import SearchBar from './components/SearchBar'
import RecommendationsList from './components/RecommendationsList'
import FavoritesList from './components/FavoritesList'

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Recipe Sharing App</h1>
        </header>

        {/* Navigation */}
        <nav className="mb-6 flex space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Home: add & list */}
          <Route
            path="/"
            element={
              <>
                <AddRecipeForm />
                <RecipeList />
                <RecipeDetails />
                <EditRecipeForm />
                <DeleteRecipeButton />
                <SearchBar />
                <RecommendationsList />
                <FavoritesList />
              </>
            }
          />

          {/* View details */}
          <Route
            path="/recipe/:id"
            element={<RecipeDetails />}
          />

          {/* Edit form */}
          <Route
            path="/edit/:id"
            element={<EditRecipeForm />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
