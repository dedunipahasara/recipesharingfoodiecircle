import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineSparkles } from 'react-icons/hi';
import { toast } from 'react-toastify';
import RecipeForm from '../../components/recipe/RecipeForm';
import useRecipeStore from '../../store/useRecipeStore';
import useAuthStore from '../../store/useAuthStore';

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
      // Ensure key name matches ProfileHeader expectations
      userPhoto: user.profilePhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
      createdAt: new Date().toISOString(),
      likesCount: 0, // Match store key
      comments: [],
    };

    addRecipe(newRecipe);
    toast.success("Published to the collection! ✨");
    navigate('/mylist');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20 pt-8">
      <div className="max-w-2xl mx-auto px-6">
        <button onClick={() => navigate(-1)} className="text-[10px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 flex items-center gap-2 mb-12">
          <HiOutlineArrowLeft /> Back
        </button>

        <header className="mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            <HiOutlineSparkles /> Studio Mode
          </div>
          <h1 className="text-3xl font-serif italic mb-2">Create <span className="not-italic font-bold">New Entry</span></h1>
          <p className="text-xs opacity-50">Document your culinary craft with precision.</p>
        </header>

        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          <RecipeForm onSubmit={handlePublish} />
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;