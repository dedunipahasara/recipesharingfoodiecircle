import React, { useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import EmojiPicker from './EmojiPicker';
import { HiPaperAirplane } from 'react-icons/hi';

const CommentInput = ({ onSend }) => {
  const { isAuthenticated, user } = useAuthStore();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const addEmoji = (emoji) => setText((prev) => prev + emoji);

  if (!isAuthenticated) {
    return (
      <div className="bg-base-200 p-4 rounded-lg text-center text-sm font-medium">
        Please <span className="text-primary cursor-pointer underline">Login</span> to join the conversation.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-base-100 p-3 border rounded-xl shadow-sm">
      <div className="flex gap-3 items-start">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src={user?.profilePhoto} alt="me" />
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="textarea textarea-ghost focus:bg-transparent w-full resize-none min-h-[40px] p-1"
        />
      </div>
      <div className="flex justify-between items-center border-t pt-2">
        <EmojiPicker onEmojiClick={addEmoji} />
        <button type="submit" className="btn btn-primary btn-sm gap-2">
          Post <HiPaperAirplane />
        </button>
      </div>
    </form>
  );
};

export default CommentInput;