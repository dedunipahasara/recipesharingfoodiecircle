import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft, HiOutlineUserGroup } from 'react-icons/hi';
import UserCard from '../../components/user/UserCard';

const Following = () => {
  const navigate = useNavigate();
  
  // Simulation: In a real app, you'd filter users based on an array of IDs 
  // stored in the current user's "following" field.
  const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
  
  return (
    <div className="max-w-3xl mx-auto py-10">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-10 px-4 md:px-0">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-ghost btn-circle hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <HiOutlineArrowNarrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-black flex items-center gap-2">
            Following <HiOutlineUserGroup className="text-secondary" />
          </h1>
          <p className="text-sm opacity-60 font-medium">Chefs you are learning from</p>
        </div>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 gap-4 px-4 md:px-0">
        {allUsers.length > 1 ? (
          // We filter out the current user or show a slice for the simulation
          allUsers.slice(0, 5).map(user => (
            <UserCard key={user.id} userData={user} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
            <div className="text-5xl mb-4 opacity-30">🧑‍🍳</div>
            <p className="text-lg font-bold opacity-40">Your circle is empty</p>
            <p className="text-sm opacity-30 italic mb-6">Explore recipes to find chefs to follow!</p>
            <button 
              onClick={() => navigate('/explore')} 
              className="btn btn-primary btn-sm rounded-full"
            >
              Explore Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Following;