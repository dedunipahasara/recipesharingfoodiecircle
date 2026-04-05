import React from 'react';
import Picker from 'emoji-picker-react';
import { HiOutlineEmojiHappy } from 'react-icons/hi';

const EmojiPicker = ({ onEmojiClick }) => {
  return (
    <div className="dropdown dropdown-top dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm text-primary">
        <HiOutlineEmojiHappy size={24} />
      </label>
      <div tabIndex={0} className="dropdown-content z-[100] p-2 shadow bg-base-100 rounded-box mb-2">
        <Picker 
          onEmojiClick={(emojiData) => onEmojiClick(emojiData.emoji)} 
          autoFocusSearch={false}
          theme="light"
          width={300}
          height={400}
        />
      </div>
    </div>
  );
};

export default EmojiPicker;