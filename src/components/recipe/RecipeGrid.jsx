import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes, onOpenRecipe }) => {
  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-40">
        <p className="text-xl font-medium">No recipes found yet...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onOpen={onOpenRecipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;