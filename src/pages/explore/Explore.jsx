import React, { useState, useMemo } from 'react';
import useRecipeStore from '../../store/useRecipeStore';
import CategoryFilter from '../../components/category/CategoryFilter';
import RecipeGrid from '../../components/recipe/RecipeGrid';
import RecipeModal from '../../components/recipe/RecipeModal';
import SearchBar from '../../components/search/SearchBar';
import { HiOutlineHashtag } from "react-icons/hi2";

const Explore = () => {
  const { recipes } = useRecipeStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory =
        activeCategory === 'All' || recipe.category === activeCategory;

      const matchesSearch =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.username.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [recipes, activeCategory, searchQuery]);

  return (
    <div className="xl:ml-72 min-h-screen bg-[#FAFAFA] px-6 md:px-10 py-8 animate-fadeIn">
      
      {/* CENTER CONTAINER */}
      <div className="max-w-6xl mx-auto space-y-8">

        {/* COMPACT HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-1 block">
              Discovery
            </span>
            <h1 className="text-3xl font-serif italic text-gray-900 leading-tight">
              Explore the <span className="not-italic font-black">Archive</span>
            </h1>
          </div>

          <div className="w-full md:w-72">
            <SearchBar 
              value={searchQuery} 
              onSearch={setSearchQuery} 
              placeholder="Find recipes..."
              className="!bg-white !border-gray-200 !rounded-xl !py-2 shadow-sm focus-within:shadow-md transition-all !text-sm"
            />
          </div>
        </header>

        {/* SLIMMER CATEGORY FILTER SECTION */}
        <section className="bg-white p-1 rounded-2xl shadow-sm border border-gray-50">
          <div className="flex items-center gap-2 px-4 pt-2 text-[8px] font-black uppercase tracking-widest text-gray-300">
            <HiOutlineHashtag size={12} className="text-primary" />
            Cuisine Selection
          </div>
          <div className="scale-95 origin-left">
            <CategoryFilter
              recipes={recipes}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </section>

        {/* RESULTS SECTION */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-serif italic text-gray-700">
                Curated <span className="not-italic font-black">Results</span>
              </h2>
              <span className="text-[9px] font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                {filteredRecipes.length}
              </span>
            </div>
            <div className="flex-1 h-[1px] ml-6 bg-gray-100/50"></div>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="pb-16">
              <RecipeGrid
                recipes={filteredRecipes}
                onOpenRecipe={(recipe) => setSelectedRecipe(recipe)}
              />
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-gray-200">
              <p className="text-gray-400 italic font-serif">
                No matches found in the archive.
              </p>
            </div>
          )}
        </section>

        {/* MODAL */}
        <RecipeModal
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          recipe={selectedRecipe}
        />
      </div>
    </div>
  );
};

export default Explore;