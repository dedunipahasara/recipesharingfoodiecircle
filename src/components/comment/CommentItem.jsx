import React from 'react';

const CommentItem = ({ comment }) => {
  return (
    <div className="flex gap-3 py-3 animate-fadeIn">
      <div className="avatar">
        <div className="w-10 h-10 rounded-full">
          <img src={comment.userPhoto || "https://api.dicebear.com/7.x/avataaars/svg?seed=Foodie"} alt={comment.username} />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="bg-base-200 p-3 rounded-2xl rounded-tl-none">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-sm">@{comment.username}</span>
            <span className="text-[10px] opacity-50 uppercase font-semibold">2m ago</span>
          </div>
          <p className="text-sm text-base-content/80">{comment.text}</p>
        </div>
        <div className="flex gap-4 mt-1 px-2">
          <button className="text-xs hover:text-primary font-medium">Like</button>
          <button className="text-xs hover:text-primary font-medium">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;