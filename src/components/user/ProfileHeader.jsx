import React from "react";
import useAuthStore from "../../store/useAuthStore";
import { HiUserAdd, HiCheck } from "react-icons/hi";
import { HiOutlineSparkles } from "react-icons/hi2";

const ProfileHeader = ({ profileUser, isOwner }) => {
  const { toggleFollow, isFollowing, isAuthenticated } = useAuthStore();
  const following = isFollowing(profileUser.id);

  return (
    <div className="bg-white p-8 md:p-10 rounded-[3.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10 md:gap-14 animate-fadeIn">
      
      {/* PROFILE IMAGE - Added a soft decorative glow */}
      <div className="relative shrink-0">
        <div className="absolute -inset-3 bg-primary/5 rounded-full blur-2xl"></div>
        <img
          src={
            profileUser.profilePhoto ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileUser.username}`
          }
          className="relative w-40 h-40 rounded-full object-cover ring-[12px] ring-[#FAFAFA] shadow-sm"
          alt={profileUser.username}
        />
      </div>

      {/* USER INFO & STATS */}
      <div className="flex-1 text-center md:text-left">
        {/* Subtle Label */}
        <div className="flex items-center justify-center md:justify-start gap-2 text-primary text-[9px] font-black uppercase tracking-[0.4em] mb-3">
          <HiOutlineSparkles size={12} className="animate-pulse" />
          {isOwner ? "Studio Owner" : "Culinary Creator"}
        </div>

        {/* Username with Serif Italic flair */}
        <h1 className="text-4xl md:text-5xl font-serif italic text-gray-900 leading-tight lowercase mb-6">
          {profileUser.username}
        </h1>

        {/* STATS BAR - Clean dividers and high-end tracking */}
        <div className="flex justify-center md:justify-start gap-8 md:gap-12 mb-8">

          {/* RECIPES COUNT */}
          <div className="text-center pr-8 md:pr-12 border-r border-gray-100">
            <p className="text-2xl font-black text-gray-800 leading-none mb-1">
              {profileUser.recipesCount || 0}
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] font-black opacity-30">
              Recipes
            </p>
          </div>

          {/* FOLLOWERS */}
          <div className="text-center pr-8 md:pr-12 border-r border-gray-100">
            <p className="text-2xl font-black text-gray-800 leading-none mb-1">
              {profileUser.followersCount || 0}
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] font-black opacity-30">
              Followers
            </p>
          </div>

          {/* FOLLOWING */}
          <div className="text-center">
            <p className="text-2xl font-black text-gray-800 leading-none mb-1">
              {profileUser.followingCount || 0}
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] font-black opacity-30">
              Following
            </p>
          </div>

        </div>

        {/* ACTIONS - Styled as a premium button */}
        {!isOwner && isAuthenticated && (
          <button
            onClick={() => toggleFollow(profileUser.id)}
            className={`px-10 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
              following
                ? "bg-gray-50 text-gray-400 border border-gray-200"
                : "bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
            }`}
          >
            {following ? (
              <span className="flex items-center gap-2">
                <HiCheck size={16} /> Following
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <HiUserAdd size={16} /> Follow Chef
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;