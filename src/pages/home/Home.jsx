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
    <div className="xl:ml-72 px-6 md:px-10 py-4 space-y-6 min-h-screen bg-[#FAFAFA]">

      {/* HERO SECTION (REDUCED HEIGHT) */}
      <section className="relative h-[240px] md:h-[270px] rounded-[2.5rem] overflow-hidden shadow-xl bg-black flex items-center px-8 md:px-14 group">

        <div className="absolute inset-0">
          <img
            src="https://i.pinimg.com/1200x/0c/ed/38/0ced38bcbd4b70db144a58959abf4e73.jpg"
            className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
            alt="Luxury Kitchen"
          />

          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/10 to-transparent" />
        </div>

        <div className="z-10 max-w-xl text-white">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-3">
            <HiOutlineSparkles size={14} className="animate-pulse" />
            The FoodieCircle
          </div>

          <h1 className="text-3xl md:text-4xl font-serif italic leading-tight mb-3">
            Master the Art of{" "}
            <span className="font-bold block not-italic">Fine Dining</span>
          </h1>

          <p className="text-xs text-white/70 mb-4">
            Explore world-class recipes and discover amazing food ideas.
          </p>

          <div className="max-w-xs">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes..."
              className="!bg-white/10 !backdrop-blur-md !border-white/20 !text-white !rounded-xl !py-2 !text-xs"
            />
          </div>
        </div>
      </section>

      {/* TITLE (REDUCED GAP) */}
      <section className="flex justify-between items-end -mt-2">
        <div>
          <h2 className="text-2xl font-serif italic text-gray-800">
            Recent <span className="font-black not-italic">Creations</span>
          </h2>
          <p className="text-[11px] text-gray-400 mt-1">
            Discover the latest recipes from our chefs
          </p>
        </div>

        <button className="flex items-center gap-2 text-[11px] font-bold uppercase text-gray-400 hover:text-primary transition">
          View All <HiOutlineArrowRight />
        </button>
      </section>

      {/* GRID */}
      <section className="max-h-[720px] overflow-y-auto pr-2 custom-scroll">
        <RecipeGrid
          recipes={filteredRecipes}
          onOpenRecipe={(recipe) => setSelectedRecipe(recipe)}
        />
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