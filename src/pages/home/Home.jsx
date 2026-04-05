import React, { useState, useMemo } from "react";
import useRecipeStore from "../../store/useRecipeStore";
import RecipeGrid from "../../components/recipe/RecipeGrid";
import RecipeModal from "../../components/recipe/RecipeModal";
import Loader from "../../components/common/Loader";
import SearchBar from "../../components/search/SearchBar";
import { HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi2";

const Home = () => {
  const { recipes, isLoading } = useRecipeStore();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState("");

  if (isLoading) return <Loader fullPage />;

  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [recipes, search]);

  return (
    <div className="xl:ml-72 px-6 md:px-10 py-6 space-y-10 min-h-screen bg-[#FAFAFA]">

      {/* COMPACT ELEGANT HERO SECTION */}
      <section className="relative h-[380px] rounded-[2.5rem] overflow-hidden shadow-xl bg-black flex items-center px-8 md:px-16 group">
        
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img 
            src="https://i.pinimg.com/1200x/0c/ed/38/0ced38bcbd4b70db144a58959abf4e73.jpg" 
            className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
            alt="Luxury Kitchen"
          />
          {/* Overlay layers */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/10 to-transparent z-0" />
        </div>

        {/* HERO CONTENT */}
        <div className="z-10 max-w-xl text-white">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            <HiOutlineSparkles size={14} className="animate-pulse" />
            The FoodieCircle
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif italic leading-tight mb-4 drop-shadow-md">
            Master the Art of <span className="not-italic font-bold block text-white">Fine Dining</span>
          </h1>
          
          <p className="text-sm text-white/70 font-light max-w-sm leading-relaxed mb-8 drop-shadow-sm">
            Explore world-class recipes, documented with precision and passion.
          </p>

          {/* COMPACT SEARCH BAR */}
          <div className="relative max-w-xs group/search">
            {/* Subtle Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-orange-400/50 rounded-xl blur opacity-20 group-hover/search:opacity-40 transition duration-700"></div>
            <div className="relative">
              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find a recipe..."
                className="!bg-white/10 !backdrop-blur-md !border-white/20 !text-white !rounded-xl !py-3 !text-xs !placeholder-white/40 shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* DECORATIVE BADGE */}
        <div className="absolute top-8 right-8 hidden lg:flex flex-col items-center z-10">
            <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center text-[7px] uppercase font-black tracking-widest text-white/40 text-center p-3 leading-tight border-dashed animate-spin-slow">
              Authentic • Taste • Since 2026 •
            </div>
        </div>
      </section>

      {/* RECIPES SECTION */}
      <section className="animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-1 block">
              Selection
            </span>
            <h2 className="text-3xl font-serif italic text-gray-800">
              Recent <span className="not-italic font-black">Creations</span>
            </h2>
          </div>
          
          <button className="group flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-all duration-300">
            View Archives 
            <HiOutlineArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* GRID CONTAINER */}
        <div className="pb-10">
          <RecipeGrid
            recipes={filteredRecipes}
            onOpenRecipe={(recipe) => setSelectedRecipe(recipe)}
          />
        </div>
      </section>

      {/* MODAL */}
      <RecipeModal
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        recipe={selectedRecipe}
      />
    </div>
  );
};

export default Home;