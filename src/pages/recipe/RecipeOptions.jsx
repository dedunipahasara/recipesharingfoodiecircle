import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineShare } from 'react-icons/hi';
import Swal from 'sweetalert2'; // Import SweetAlert2
import useRecipeStore from '../../store/useRecipeStore';
import useAuthStore from '../../store/useAuthStore';
import { notify } from '../../utils/helpers';

const RecipeActions = ({ recipeId }) => {
  const navigate = useNavigate();
  const { recipes, deleteRecipe } = useRecipeStore();
  const { user } = useAuthStore();
  
  const recipe = recipes.find(r => String(r.id) === String(recipeId));
  const isOwner = String(user?.id) === String(recipe?.userId);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    notify.success("Link copied! 📋");
  };

  const handleDelete = () => {
    // Custom Styled Confirmation Modal
    Swal.fire({
      title: 'Delete Recipe?',
      text: "This masterpiece will be gone forever!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // text-error color
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#1d232a', // matches dark mode if using DaisyUI
      color: '#ffffff'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecipe(recipeId);
        notify.info("Recipe removed from the circle.");
        navigate('/mylist');
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleCopyLink} className="btn btn-ghost btn-circle btn-sm" title="Share">
        <HiOutlineShare size={20} />
      </button>

      {isOwner && (
        <>
          <button 
            onClick={() => navigate(`/edit-recipe/${recipeId}`)}
            className="btn btn-ghost btn-circle btn-sm text-info"
            title="Edit"
          >
            <HiOutlinePencilAlt size={20} />
          </button>
          
          <button 
            onClick={handleDelete}
            className="btn btn-ghost btn-circle btn-sm text-error"
            title="Delete"
          >
            <HiOutlineTrash size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default RecipeActions;