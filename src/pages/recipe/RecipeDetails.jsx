import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineChatAlt,
  HiOutlineChevronLeft,
  HiOutlineBookOpen,
} from "react-icons/hi";

import useRecipeStore from "../../store/useRecipeStore";
import useAuthStore from "../../store/useAuthStore";
import EmojiPicker from "../../components/comment/EmojiPicker";

const RecipeDetails = ({ recipeOverride, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { recipes, updateRecipe, updateLikeCount } = useRecipeStore();
  const { user, isAuthenticated, toggleFavorite, isFavorite } = useAuthStore();

  const [commentText, setCommentText] = useState("");

  const isModal = !!recipeOverride;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const recipe =
    recipeOverride ||
    recipes.find((r) => String(r.id) === String(id));

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold opacity-30">Recipe not found!</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-black text-white rounded-full"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const isFavorited = isFavorite(recipe.id);

  const handleLike = () => {
    if (!isAuthenticated) return;
    const willAdd = !isFavorited;
    toggleFavorite(recipe.id);
    updateLikeCount(recipe.id, willAdd);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated || !commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentText.trim(),
      userId: user.id,
      username: user.username,
      userPhoto:
        user.profilePhoto ||
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [newComment, ...(recipe.comments || [])];
    updateRecipe(recipe.id, { comments: updatedComments });
    setCommentText("");
  };

  return (
    <div
      className={
        isModal
          ? "fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          : "max-w-6xl mx-auto px-6 py-10"
      }
    >
      <div
        className={
          isModal
            ? "bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] relative p-6 md:p-10"
            : ""
        }
      >
        {/* CLOSE BUTTON */}
        {isModal && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-black text-2xl"
          >
            ✕
          </button>
        )}

        {/* BACK BUTTON */}
        {!isModal && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 text-gray-400 hover:text-black text-xs font-bold uppercase tracking-widest"
          >
            <HiOutlineChevronLeft /> Back
          </button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-7 space-y-6">

            {/* IMAGE (SMALL + CLEAN NO CROPPING) */}
            <div className="rounded-2xl overflow-hidden shadow-md bg-gray-100">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-[220px] md:h-[260px] object-contain bg-white"
              />
            </div>

            {/* INFO CARD */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">

              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                {recipe.category || "General"}
              </span>

              <h1 className="text-3xl md:text-4xl font-serif italic mt-3 mb-5">
                {recipe.name}
              </h1>

              {/* DESCRIPTION */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400 tracking-widest">
                  <HiOutlineBookOpen /> Story & Instructions
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line min-h-[140px]">
                  {recipe.description ||
                    "No description available for this recipe."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-5 space-y-6">

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-10">

              {/* USER */}
              <Link
                to={`/profile/${recipe.username}`}
                className="flex items-center gap-3 mb-6"
              >
                <img
                  src={
                    recipe.userPhoto ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                  }
                  className="w-12 h-12 rounded-xl object-cover"
                  alt=""
                />
                <div>
                  <p className="font-bold text-sm">@{recipe.username}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Chef
                  </p>
                </div>
              </Link>

              {/* STATS */}
              <div className="flex items-center gap-6 border-b pb-6 mb-6">
                <button onClick={handleLike} className="flex items-center gap-2">
                  {isFavorited ? (
                    <HiHeart className="text-red-500" size={24} />
                  ) : (
                    <HiOutlineHeart className="text-gray-300" size={24} />
                  )}
                  <span className="text-sm font-bold">
                    {recipe.likesCount || 0}
                  </span>
                </button>

                <div className="flex items-center gap-2 text-gray-300">
                  <HiOutlineChatAlt size={24} />
                  <span className="text-sm font-bold">
                    {recipe.comments?.length || 0}
                  </span>
                </div>
              </div>

              {/* COMMENTS INPUT */}
              <form onSubmit={handleCommentSubmit} className="space-y-3">

                <textarea
                  className="w-full p-4 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 ring-black/10 min-h-[90px]"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                />

                <div className="flex justify-between items-center">
                  <EmojiPicker
                    onEmojiClick={(emoji) =>
                      setCommentText((prev) => prev + emoji)
                    }
                  />

                  <button
                    type="submit"
                    className="px-5 py-2 bg-black text-white text-xs uppercase tracking-widest rounded-lg"
                  >
                    Post
                  </button>
                </div>
              </form>

              {/* COMMENTS LIST */}
              <div className="mt-6 space-y-3 max-h-[250px] overflow-y-auto">

                {recipe.comments?.map((c) => (
                  <div
                    key={c.id}
                    className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <img
                      src={c.userPhoto}
                      className="w-8 h-8 rounded-lg"
                      alt=""
                    />
                    <div>
                      <p className="text-[10px] font-bold text-primary">
                        @{c.username}
                      </p>
                      <p className="text-xs text-gray-600">{c.text}</p>
                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;