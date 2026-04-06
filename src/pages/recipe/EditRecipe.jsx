import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { toast } from "react-toastify";
import RecipeForm from "../../components/recipe/RecipeForm";
import useRecipeStore from "../../store/useRecipeStore";
import Loader from "../../components/common/Loader";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, updateRecipe } = useRecipeStore();

  const recipe = useMemo(
    () => recipes.find((r) => String(r.id) === String(id)),
    [recipes, id]
  );

  const handleUpdate = (updatedData) => {
    updateRecipe(id, updatedData);
    toast.success("Recipe updated ✨");
    navigate("/mylist");
  };

  if (!recipe) return <Loader fullPage />;

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center py-6">
      <div className="w-full max-w-4xl px-6">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="text-[10px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 flex items-center gap-2 mb-6"
        >
          <HiOutlineArrowLeft /> Cancel
        </button>

        {/* HEADER */}
        <header className="mb-6">
          <h1 className="text-3xl font-serif italic">
            Edit <span className="font-bold not-italic">Recipe</span>
          </h1>
          <p className="text-xs opacity-50 mt-1">
            Modify your creation
          </p>
        </header>

        {/* FORM BOX */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm max-h-[75vh] overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 custom-scroll">
            <RecipeForm
              onSubmit={handleUpdate}
              initialData={recipe}
              isEditing={true}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditRecipe;