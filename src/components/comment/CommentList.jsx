import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="py-8 text-center text-sm opacity-50 italic">
        Be the first to tell them what you think! 👨‍🍳
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      <h3 className="font-bold text-lg mb-4">Comments ({comments.length})</h3>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;