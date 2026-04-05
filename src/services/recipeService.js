import storageService from './storageService';

const RECIPES_KEY = 'foodie_recipes';

export const recipeService = {
  getAll: () => storageService.get(RECIPES_KEY) || [],

  save: (recipe) => {
    const recipes = storageService.get(RECIPES_KEY) || [];
    recipes.unshift(recipe); // Add new recipes to the top
    storageService.set(RECIPES_KEY, recipes);
    return recipe;
  },

  delete: (id) => {
    const recipes = storageService.get(RECIPES_KEY) || [];
    const filtered = recipes.filter(r => r.id !== id);
    storageService.set(RECIPES_KEY, filtered);
  },

  addComment: (recipeId, comment) => {
    const recipes = storageService.get(RECIPES_KEY) || [];
    const index = recipes.findIndex(r => r.id === recipeId);
    if (index !== -1) {
      recipes[index].comments = [...(recipes[index].comments || []), comment];
      storageService.set(RECIPES_KEY, recipes);
    }
  }
};