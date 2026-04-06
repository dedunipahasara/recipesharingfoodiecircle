import React, { useState } from "react";
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineEye,
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

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    const willAdd = !liked;
    toggleFavorite(recipe.id);
    updateLikeCount(recipe.id, willAdd);
  };

  const handleFollow = (e) => {
    e.stopPropagation();
    toggleFollow(recipe.userId);
  };

  return (
    <>
      {/* CARD */}
      <div className="group w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-sm border border-white/30 hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white/90 via-orange-50/50 to-pink-50/50 backdrop-blur-md">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 pt-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${recipe.username}`);
            }}
          >
            <img
              src={recipe.userPhoto || "https://api.dicebear.com/7.x/avataaars/svg?seed=user"}
              className="w-8 h-8 rounded-full object-cover border border-white"
              alt=""
            />
            <div>
              <p className="text-xs font-bold text-gray-900">
                @{recipe.username}
              </p>
              <p className="text-[10px] text-gray-400">Chef</p>
            </div>
          </div>

          {!isOwner && isAuthenticated && (
            <button
              onClick={handleFollow}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition ${
                following
                  ? "bg-gray-100 text-gray-400 border-gray-200"
                  : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
              }`}
            >
              {following ? "Following" : "Follow"}
            </button>
          )}
        </div>

        {/* IMAGE */}
        <div
          onClick={() => navigate(`/recipe/${recipe.id}`)}
          className="relative w-full h-44 md:h-48 mt-3 overflow-hidden cursor-pointer"
        >
          <img
            src={recipe.image}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            alt={recipe.name}
          />

          {/* CATEGORY */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase border border-white/40">
              {recipe.category || "Food"}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-5 py-3">
          <h3
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            className="font-serif italic text-lg text-gray-900 line-clamp-2 cursor-pointer hover:text-primary transition"
          >
            {recipe.name}
          </h3>

          {/* ACTIONS */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/40">

            {/* LEFT ACTIONS */}
            <div className="flex items-center gap-5">

              {/* LIKE */}
              <button onClick={handleLike} className="flex items-center gap-1">
                {liked ? (
                  <HiHeart className="text-red-500 text-lg" />
                ) : (
                  <HiOutlineHeart className="text-gray-500 text-lg" />
                )}
                <span className={`text-xs font-bold ${liked ? "text-red-500" : "text-gray-500"}`}>
                  {recipe.likesCount || 0}
                </span>
              </button>

              {/* COMMENTS */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenComments(true);
                }}
                className="flex items-center gap-1 text-gray-500 hover:text-primary transition"
              >
                <HiOutlineChatBubbleOvalLeft size={18} />
                <span className="text-xs font-bold">
                  {recipe.comments?.length || 0}
                </span>
              </button>
            </div>

            {/* QUICK VIEW */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenDetails(true);
              }}
              className="p-2 rounded-full bg-white/70 hover:bg-black hover:text-white transition border border-white/40"
            >
              <HiOutlineEye size={16} />
            </button>
          </div>
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