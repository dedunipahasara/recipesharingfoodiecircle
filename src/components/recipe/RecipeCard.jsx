import React, { useState } from "react";
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineEye,
  HiUserPlus,
  HiUserMinus,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import useRecipeStore from "../../store/useRecipeStore";
import useAuthStore from "../../store/useAuthStore";

import CommentModal from "../comment/CommentModal";
import RecipeDetails from "../../pages/recipe/RecipeDetails";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const [openComments, setOpenComments] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const { updateLikeCount } = useRecipeStore();

  const {
    toggleFavorite,
    isFavorite,
    isAuthenticated,
    toggleFollow,
    isFollowing,
    user,
  } = useAuthStore();

  const liked = isFavorite(recipe.id);
  const following = isFollowing(recipe.userId);
  const isOwner = user?.id === recipe.userId;

  // ❤️ Like
  const handleLike = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    const willAdd = !liked;
    toggleFavorite(recipe.id);
    updateLikeCount(recipe.id, willAdd);
  };

  // ➕ Follow
  const handleFollow = (e) => {
    e.stopPropagation();
    toggleFollow(recipe.userId);
  };

  // 👁 Quick View
  const handleOpenQuickView = (e) => {
    e.stopPropagation();
    setOpenDetails(true);
  };

  return (
    <>
      {/* CARD */}
      <div className="group bg-white rounded-[2.5rem] p-5 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full w-full max-w-lg mx-auto">

        {/* USER TOP */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div
            className="flex items-center gap-3 cursor-pointer group/user"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${recipe.username}`);
            }}
          >
            <img
              src={recipe.userPhoto || "https://api.dicebear.com/7.x/avataaars/svg?seed=user"}
              className="w-8 h-8 rounded-full object-cover"
              alt=""
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-black text-gray-800">
                @{recipe.username}
              </span>
              <span className="text-[9px] text-gray-400">Chef</span>
            </div>
          </div>

          {!isOwner && isAuthenticated && (
            <button
              onClick={handleFollow}
              className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider border transition-all ${
                following
                  ? "bg-gray-50 text-gray-400 border-gray-100"
                  : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
              }`}
            >
              {following ? "Following" : "Follow"}
            </button>
          )}
        </div>

        {/* IMAGE (HEIGHT REDUCED HERE) */}
        <div
          className="relative h-60 w-full overflow-hidden rounded-[2rem] mb-4 cursor-pointer shadow-inner"
          onClick={() => navigate(`/recipe/${recipe.id}`)}
        >
          <img
            src={recipe.image}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt={recipe.name}
          />

          <div className="absolute bottom-3 left-3">
            <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-xl text-[9px] font-black uppercase text-primary">
              {recipe.category || "Food"}
            </span>
          </div>
        </div>

        {/* TITLE */}
        <h3
          onClick={() => navigate(`/recipe/${recipe.id}`)}
          className="font-serif italic text-xl text-gray-800 mb-5 cursor-pointer hover:text-primary transition-colors line-clamp-2"
        >
          {recipe.name}
        </h3>

        {/* ACTIONS */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">

          {/* LEFT */}
          <div className="flex items-center gap-6">

            {/* LIKE */}
            <button onClick={handleLike} className="flex items-center gap-2">
              {liked ? (
                <HiHeart className="text-red-500 text-xl" />
              ) : (
                <HiOutlineHeart className="text-gray-400 text-xl" />
              )}
              <span className={`text-xs font-black ${liked ? "text-red-500" : "text-gray-300"}`}>
                {recipe.likesCount || 0}
              </span>
            </button>

            {/* COMMENTS */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenComments(true);
              }}
              className="flex items-center gap-2 text-gray-300 hover:text-primary"
            >
              <HiOutlineChatBubbleOvalLeft size={20} />
              <span className="text-xs font-black">
                {recipe.comments?.length || 0}
              </span>
            </button>
          </div>

          {/* QUICK VIEW */}
          <button
            onClick={handleOpenQuickView}
            className="p-2 bg-gray-50 rounded-full hover:bg-black hover:text-white transition"
          >
            <HiOutlineEye size={18} />
          </button>
        </div>
      </div>

      {/* MODALS */}
      {openComments && (
        <CommentModal
          recipe={recipe}
          onClose={() => setOpenComments(false)}
        />
      )}

      {openDetails && (
        <RecipeDetails
          recipeOverride={recipe}
          onClose={() => setOpenDetails(false)}
        />
      )}
    </>
  );
};

export default RecipeCard;