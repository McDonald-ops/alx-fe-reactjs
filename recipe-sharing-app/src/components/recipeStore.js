import { create } from 'zustand'

export const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  setRecipes: (recipes) =>
    set({ recipes }),

  updateRecipe: (updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updated.id ? { ...r, ...updated } : r
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),

  // --- Search & filter ---
  setSearchTerm: (term) =>
    set({ searchTerm: term }),

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(
          state.searchTerm.toLowerCase()
        ) ||
        recipe.description.toLowerCase().includes(
          state.searchTerm.toLowerCase()
        )
      ),
    })),

    // — favorites —
  favorites: [],

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // — recommendations (simple mock) —
  recommendations: [],

  generateRecommendations: () =>
  set((state) => {
    const recommended = state.recipes
      .filter((r) => state.favorites.includes(r.id))
      .filter(() => Math.random() > 0.5);
    return { recommendations: recommended };
  }),
}))
