import React from 'react';
import { HiOutlineHashtag, HiOutlineSparkles } from 'react-icons/hi';

const CategoryFilter = ({ recipes = [], activeCategory, onCategoryChange }) => {
  // 1. Extract all categories from existing recipes
  // 2. Filter out empty strings and use Set to get unique values
  // 3. Sort them alphabetically for a clean UI
  const uniqueCategories = [
    ...new Set(recipes.map((r) => r.category?.trim()).filter(Boolean))
  ].sort();

  // Always include 'All' as the starting option
  const filterList = ['All', ...uniqueCategories];

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest opacity-60">
          Explore Categories
        </h3>
        <span className="badge badge-ghost badge-sm italic">
          {uniqueCategories.length} unique tags
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
        {filterList.map((cat) => {
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-300 whitespace-nowrap font-medium text-sm
                ${isActive 
                  ? "bg-primary border-primary text-white shadow-lg scale-105" 
                  : "bg-base-100 border-base-300 hover:border-primary hover:text-primary text-base-content"
                }`}
            >
              {cat === 'All' ? (
                <HiOutlineSparkles className={isActive ? "text-white" : "text-primary"} />
              ) : (
                <HiOutlineHashtag className={isActive ? "text-white" : "text-primary"} />
              )}
              {cat}
            </button>
          );
        })}
      </div>
      
      {/* Visual Indicator if no categories exist yet */}
      {uniqueCategories.length === 0 && (
        <p className="text-xs italic opacity-50 text-center">
          No categories found. Start by adding a recipe!
        </p>
      )}
    </div>
  );
};

export default CategoryFilter;