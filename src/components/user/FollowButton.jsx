import React, { useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { notify } from '../../utils/helpers';
import { HiUserAdd, HiUserRemove } from 'react-icons/hi';

const FollowButton = ({ targetUserId, isInitiallyFollowing = false }) => {
  const { isAuthenticated, user } = useAuthStore();
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);

  const handleFollow = (e) => {
    e.stopPropagation(); // Prevent navigating to profile if inside a card
    
    if (!isAuthenticated) {
      return notify.info("Please login to follow foodies!");
    }

    if (user?.id === targetUserId) {
      return notify.error("You can't follow yourself!");
    }

    // Toggle logic (In a real app, this would hit an API)
    setIsFollowing(!isFollowing);
    notify.success(isFollowing ? "Unfollowed" : "Following!");
  };

  return (
    <button 
      onClick={handleFollow}
      className={`btn btn-sm gap-2 rounded-full transition-all ${
        isFollowing 
        ? "btn-outline btn-error" 
        : "btn-primary text-white px-6"
      }`}
    >
      {isFollowing ? (
        <> <HiUserRemove size={18} /> Unfollow </>
      ) : (
        <> <HiUserAdd size={18} /> Follow </>
      )}
    </button>
  );
};

export default FollowButton;