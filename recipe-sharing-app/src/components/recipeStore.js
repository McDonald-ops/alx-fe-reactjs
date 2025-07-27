import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),
  setRecipes: (recipes) => set({ recipes }),

  // update: merge in updated fields
  updateRecipe: (updated) =>
    set((s) => ({
      recipes: s.recipes.map((r) =>
        r.id === updated.id ? { ...r, ...updated } : r
      )
    })),

  // delete
  deleteRecipe: (id) =>
    set((s) => ({
      recipes: s.recipes.filter((r) => r.id !== id)
    }))
}));