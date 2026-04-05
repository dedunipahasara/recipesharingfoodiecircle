import React from 'react';
import { HiHeart, HiOutlineHeart, HiBookmark, HiOutlineBookmark, HiStar } from 'react-icons/hi';
import useAuthStore from '../../store/useAuthStore';
import { notify } from '../../utils/helpers';

const RecipeActions = ({ recipeId }) => {
  const { isAuthenticated } = useAuthStore();

  const handleAction = (actionName) => {
    if (!isAuthenticated) {
      notify.info(`Please login to ${actionName} this recipe!`);
      return;
    }
    // Logic for liking/saving will go here (Zustand)
    notify.success(`${actionName} successful!`);
  };

  return (
    <div className="flex items-center gap-4">
      <button onClick={() => handleAction('like')} className="hover:text-primary transition-colors flex items-center gap-1">
        <HiOutlineHeart size={22} /> <span className="text-xs">12</span>
      </button>
      <button onClick={() => handleAction('save')} className="hover:text-secondary transition-colors">
        <HiOutlineBookmark size={22} />
      </button>
      <div className="flex items-center text-yellow-500 gap-1 ml-2">
        <HiStar size={18} /> <span className="text-xs font-bold text-base-content">4.5</span>
      </div>
    </div>
  );
};

export default RecipeActions;