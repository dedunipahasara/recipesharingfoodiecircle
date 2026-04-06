import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineSparkles } from "react-icons/hi";
import { toast } from "react-toastify";
import RecipeForm from "../../components/recipe/RecipeForm";
import useRecipeStore from "../../store/useRecipeStore";
import useAuthStore from "../../store/useAuthStore";

const AddRecipe = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipeStore();
  const { user } = useAuthStore();

  const handlePublish = (formData) => {
    if (!user) {
      toast.error("Access denied. Please login.");
      return;
    }

    const newRecipe = {
      ...formData,
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      userPhoto:
        user.profilePhoto ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      comments: [],
    };

    addRecipe(newRecipe);
    toast.success("Published ✨");
    navigate("/mylist");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center py-0">

      <div className="w-full max-w-4xl px-6 -mt-12">

        {/* HEADER (VERY TIGHT) */}
        <header className="mb-2 text-center">
          <div className="flex items-center justify-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
            <HiOutlineSparkles /> Studio Mode
          </div>

          <h1 className="text-3xl font-serif italic leading-tight">
            Create <span className="font-bold not-italic">New Recipe</span>
          </h1>

          <p className="text-xs opacity-40 mt-1">
            Share your culinary creation
          </p>
        </header>

        {/* BACK BUTTON */}
        <div className="flex justify-start mb-1">
          <button
            onClick={() => navigate(-1)}
            className="text-[10px] uppercase font-bold tracking-widest opacity-30 hover:opacity-100 flex items-center gap-2"
          >
            <HiOutlineArrowLeft /> Back
          </button>
        </div>

        {/* FORM CARD (FLOATING / LIFTED) */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-6 shadow-md max-h-[70vh] overflow-hidden -mt-2">

          <div className="h-full overflow-y-auto pr-2 custom-scroll">
            <RecipeForm onSubmit={handlePublish} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default AddRecipe;