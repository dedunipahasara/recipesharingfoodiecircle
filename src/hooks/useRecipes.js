import { useMemo } from 'react';
import { toast } from 'react-toastify';
import useRecipeStore from '../store/useRecipeStore';

export const useRecipes = () => {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipeStore();

  // Get a single recipe by ID (memoized for performance)
  const getRecipeById = (id) => {
    return useMemo(() => 
      recipes.find((r) => String(r.id) === String(id)), 
    [recipes, id]);
  };

  const createRecipe = (data) => {
    try {
      addRecipe(data);
      toast.success("Recipe published! 🍳");
    } catch (err) {
      toast.error("Failed to save recipe.");
    }
  };

  const removeRecipe = (id) => {
    deleteRecipe(id);
    toast.info("Recipe removed from your collection.");
  };

  return { 
    recipes, 
    getRecipeById, 
    createRecipe, 
    removeRecipe, 
    updateRecipe 
  };
};