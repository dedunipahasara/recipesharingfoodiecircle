import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { toast } from 'react-toastify';
import RecipeForm from '../../components/recipe/RecipeForm';
import useRecipeStore from '../../store/useRecipeStore';
import useAuthStore from '../../store/useAuthStore';
import Loader from '../../components/common/Loader';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, updateRecipe } = useRecipeStore();
  const { user } = useAuthStore();

  const recipe = useMemo(() => recipes.find((r) => String(r.id) === String(id)), [recipes, id]);

  const handleUpdate = (updatedData) => {
    updateRecipe(id, updatedData);
    toast.success("Recipe updated! 🖋️");
    navigate('/mylist');
  };

  if (!recipe) return <Loader fullPage />;

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20 pt-8">
      <div className="max-w-2xl mx-auto px-6">
        <button onClick={() => navigate(-1)} className="text-[10px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 flex items-center gap-2 mb-12">
          <HiOutlineArrowLeft /> Cancel
        </button>

        <header className="mb-12">
          <h1 className="text-3xl font-serif italic mb-2">Edit <span className="not-italic font-bold">Recipe</span></h1>
          <p className="text-xs opacity-50">Modify your shared secrets.</p>
        </header>

        <div className="bg-white border border-base-content/5 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          <RecipeForm onSubmit={handleUpdate} initialData={recipe} isEditing={true} />
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;