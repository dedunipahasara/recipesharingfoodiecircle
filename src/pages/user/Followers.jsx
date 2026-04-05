import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft, HiUsers } from 'react-icons/hi';
import UserCard from '../../components/user/UserCard';

const Followers = () => {
  const navigate = useNavigate();
  
  // Simulation: Grab all users except the current one to show as "Followers"
  const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
  
  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-circle">
          <HiOutlineArrowNarrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-black flex items-center gap-2">
            Followers <HiUsers className="text-primary" />
          </h1>
          <p className="text-sm opacity-60">People following this chef</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {allUsers.length > 0 ? (
          allUsers.map(user => (
            <UserCard key={user.id} userData={user} />
          ))
        ) : (
          <div className="text-center py-20 bg-base-200 rounded-3xl opacity-50 italic">
            No followers yet. Keep sharing recipes to grow your circle!
          </div>
        )}
      </div>
    </div>
  );
};

export default Followers;