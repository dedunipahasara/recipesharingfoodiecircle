import React, { useState } from 'react';
import useRecipeStore from '../../store/useRecipeStore';
import useAuthStore from '../../store/useAuthStore';
import RecipeGrid from '../../components/recipe/RecipeGrid';
import CommentModal from '../../components/comment/CommentModal'; // Using the detailed modal
import { HiOutlineHeart, HiOutlineBookOpen } from 'react-icons/hi';

const Favorites = () => {
  const { recipes } = useRecipeStore();
  const { user } = useAuthStore();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Filter recipes based on the ID array stored in the user's profile
  const favoriteRecipes = recipes.filter(r => user?.favorites?.includes(r.id));

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 min-h-screen">
      {/* HEADER SECTION */}
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="p-5 bg-red-50 rounded-[2rem] text-red-500 shadow-sm border border-red-100">
            <HiOutlineHeart size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-serif italic text-gray-800">
              Saved <span className="font-bold border-b-4 border-red-100 not-italic tracking-tight">Masterpieces</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 mt-2 font-black">
              {favoriteRecipes.length} Recipes in your private collection
            </p>
          </div>
        </div>

        {/* Quick Stats or Filter could go here */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
          <HiOutlineBookOpen className="text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Ready to cook</span>
        </div>
      </header>

      {/* RECIPE GRID */}
      {favoriteRecipes.length > 0 ? (
        <div className="animate-fadeIn">
          <RecipeGrid 
            recipes={favoriteRecipes} 
            // This triggers the detailed view with ingredients & prep
            onOpenRecipe={(recipe) => setSelectedRecipe(recipe)} 
          />
        </div>
      ) : (
        <div className="text-center py-40 bg-white rounded-[4rem] border-2 border-dashed border-gray-100 flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <HiOutlineHeart className="text-gray-200" size={40} />
          </div>
          <p className="font-serif italic text-2xl text-gray-400">Your collection is empty.</p>
          <p className="text-[10px] uppercase tracking-widest opacity-40 mt-2">Start exploring and heart your favorite dishes!</p>
        </div>
      )}

      {/* DETAILED VIEW MODAL */}
      {/* Using CommentModal because it contains the Ingredients and Preparation layout */}
      {selectedRecipe && (
        <CommentModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}
    </div>
  );
};

export default Favorites;