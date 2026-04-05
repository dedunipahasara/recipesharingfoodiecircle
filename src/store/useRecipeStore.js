import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRecipeStore = create(
  persist(
    (set) => ({
      recipes: [],

      setRecipes: (recipes) => set({ recipes }),

      addRecipe: (recipe) =>
        set((state) => ({
          recipes: [recipe, ...state.recipes],
        })),

      deleteRecipe: (id) =>
        set((state) => ({
          recipes: state.recipes.filter((r) => String(r.id) !== String(id)),
        })),

      updateRecipe: (id, data) =>
        set((state) => ({
          recipes: state.recipes.map((r) =>
            r.id === id ? { ...r, ...data } : r
          ),
        })),

      updateLikeCount: (id, isAdding) =>
        set((state) => ({
          recipes: state.recipes.map((r) =>
            r.id === id
              ? {
                  ...r,
                  likesCount: isAdding
                    ? (r.likesCount || 0) + 1
                    : Math.max((r.likesCount || 0) - 1, 0),
                }
              : r
          ),
        })),
    }),
    { name: "recipes-storage" }
  )
);

export default useRecipeStore;