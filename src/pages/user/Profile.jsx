import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import useRecipeStore from "../../store/useRecipeStore";
import useAuthStore from "../../store/useAuthStore";

import ProfileHeader from "../../components/user/ProfileHeader";
import RecipeGrid from "../../components/recipe/RecipeGrid";
import CommentModal from "../../components/comment/CommentModal";
import Loader from "../../components/common/Loader";

const Profile = () => {
  const { username } = useParams();

  const { recipes } = useRecipeStore();
  const { user: currentUser } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // 🔥 FILTER USER RECIPES (REAL TIME)
  const userRecipes = useMemo(() => {
    return recipes.filter(
      (r) =>
        r.username?.toLowerCase() === username?.toLowerCase()
    );
  }, [recipes, username]);

  // 🔥 PROFILE USER + STATS
  const profileUser = useMemo(() => {
    try {
      const allUsers = JSON.parse(
        localStorage.getItem("all_users") || "[]"
      );

      let foundUser = allUsers.find(
        (u) =>
          u.username?.toLowerCase() === username?.toLowerCase()
      );

      // fallback to logged-in user
      if (
        !foundUser &&
        currentUser?.username?.toLowerCase() ===
          username?.toLowerCase()
      ) {
        foundUser = currentUser;
      }

      if (!foundUser) return null;

      // followers count (who follows this user)
      const followersCount = allUsers.filter((u) =>
        u.following?.includes(foundUser.id)
      ).length;

      return {
        ...foundUser,
        recipesCount: userRecipes.length,
        followersCount,
        followingCount: foundUser.following?.length || 0,
      };
    } catch (err) {
      console.error("Profile error:", err);
      return null;
    }
  }, [username, userRecipes, currentUser]);

  // 🔥 LOADING CONTROL
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [username]);

  if (loading) return <Loader fullPage />;

  if (!profileUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-6xl text-gray-200 mb-4">?</div>
        <h2 className="text-xl font-bold text-gray-300">
          Chef @{username} not found
        </h2>
      </div>
    );
  }

  const isMe = currentUser?.id === profileUser.id;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 animate-fadeIn">

      {/* PROFILE HEADER */}
      <ProfileHeader
        profileUser={profileUser}
        isOwner={isMe}
      />

      {/* SECTION TITLE */}
      <div className="mt-16 flex items-center gap-6 mb-10">
        <h2 className="text-2xl font-serif italic text-gray-800">
          Culinary{" "}
          <span className="not-italic font-black uppercase text-sm tracking-widest ml-2 opacity-30">
            Collection
          </span>
        </h2>

        <div className="flex-1 h-[1px] bg-gradient-to-r from-gray-100 to-transparent" />
      </div>

      {/* RECIPES */}
      {userRecipes.length > 0 ? (
        <RecipeGrid
          recipes={userRecipes}
          onOpenRecipe={(recipe) =>
            setSelectedRecipe(recipe)
          }
        />
      ) : (
        <div className="bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-[3rem] py-24 text-center">
          <p className="text-gray-400 italic">
            This chef hasn't shared any recipes yet.
          </p>

          {isMe && (
            <button
              onClick={() =>
                (window.location.href = "/add-recipe")
              }
              className="mt-4 text-primary font-bold text-xs uppercase tracking-widest hover:underline"
            >
              + Create your first recipe
            </button>
          )}
        </div>
      )}

      {/* COMMENT MODAL */}
      {selectedRecipe && (
        <CommentModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
};

export default Profile;