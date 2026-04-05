import React from 'react';
import { useNavigate } from 'react-router-dom';
import FollowButton from './FollowButton';

const UserCard = ({ userData }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/profile/${userData.username}`)}
      className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4 flex-row items-center gap-4"
    >
      <div className="avatar">
        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={userData.profilePhoto} alt={userData.username} />
        </div>
      </div>
      
      <div className="flex-1">
        <h3 className="font-bold text-lg leading-none">{userData.fullName}</h3>
        <p className="text-sm opacity-60">@{userData.username}</p>
        <div className="text-xs mt-1 font-medium">
          <span className="text-primary">{userData.recipeCount || 0}</span> Recipes
        </div>
      </div>

      <FollowButton targetUserId={userData.id} />
    </div>
  );
};

export default UserCard;