import React, { useState } from "react";
import useRecipeStore from "../../store/useRecipeStore";
import useAuthStore from "../../store/useAuthStore";
import { HiOutlineX, HiPaperAirplane, HiDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import EmojiPicker from "./EmojiPicker";

const CommentModal = ({ recipe, onClose }) => {
  const { updateRecipe } = useRecipeStore();
  const { user, isAuthenticated } = useAuthStore();
  const [text, setText] = useState("");
  
  // State for editing
  const [editingId, setEditingId] = useState(null);

  const handleSend = () => {
    if (!text.trim() || !isAuthenticated) return;

    let updatedComments;

    if (editingId) {
      // --- EDIT LOGIC ---
      updatedComments = recipe.comments.map((c) =>
        c.id === editingId ? { ...c, text: text.trim(), isEdited: true } : c
      );
      setEditingId(null);
    } else {
      // --- NEW COMMENT LOGIC ---
      const newComment = {
        id: Date.now(),
        text: text.trim(),
        userId: user.id,
        username: user.username,
        userPhoto: user.profilePhoto || "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
        createdAt: new Date().toISOString()
      };
      updatedComments = [newComment, ...(recipe.comments || [])];
    }

    updateRecipe(recipe.id, { comments: updatedComments });
    setText("");
  };

  const handleDelete = (commentId) => {
    const updatedComments = recipe.comments.filter((c) => c.id !== commentId);
    updateRecipe(recipe.id, { comments: updatedComments });
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setText(comment.text);
  };

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[999] p-4">
      <div className="bg-white w-full max-w-5xl h-[80vh] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row relative animate-fadeIn">
        
        {/* CLOSE BUTTON */}
        <button onClick={onClose} className="absolute top-6 right-6 z-[100] btn btn-circle btn-ghost">
          <HiOutlineX size={24} className="text-gray-800" />
        </button>

        {/* LEFT SECTION (Recipe Image) */}
        <div className="md:w-1/2 h-48 md:h-full relative shrink-0">
          <img src={recipe.image} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 p-10 flex flex-col justify-end">
            <h2 className="text-white text-3xl font-serif italic mb-2">{recipe.name}</h2>
            <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">By @{recipe.username}</span>
          </div>
        </div>

        {/* RIGHT SECTION (Discussion) */}
        <div className="md:w-1/2 flex flex-col bg-[#fcfcfc]">
          <div className="p-8 border-b bg-white">
            <h3 className="font-bold text-xl">Conversation</h3>
          </div>

          {/* COMMENTS LIST */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {(recipe.comments || []).length > 0 ? (
              recipe.comments.map((c) => (
                <div key={c.id} className="flex gap-4 group/comment">
                  <img src={c.userPhoto} className="w-10 h-10 rounded-full border shrink-0" alt="" />
                  
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm flex-1 border border-gray-50 relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[11px] font-black uppercase text-primary">@{c.username}</p>
                        <p className="text-sm text-gray-600 mt-1 font-light">{c.text}</p>
                        {c.isEdited && <span className="text-[8px] opacity-30 italic"> (edited)</span>}
                      </div>

                      {/* ACTIONS MENU (Only if I am the owner of the comment) */}
                      {user?.id === c.userId && (
                        <div className="dropdown dropdown-left dropdown-end">
                          <label tabIndex={0} className="p-1 cursor-pointer opacity-0 group-hover/comment:opacity-100 transition-opacity">
                            <HiDotsVertical size={16} className="text-gray-400" />
                          </label>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 text-xs">
                            <li>
                              <button onClick={() => startEdit(c)} className="flex items-center gap-2">
                                <HiPencil className="text-blue-500" /> Edit
                              </button>
                            </li>
                            <li>
                              <button onClick={() => handleDelete(c.id)} className="flex items-center gap-2 text-red-500">
                                <HiTrash /> Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center opacity-20 italic">No comments yet...</div>
            )}
          </div>

          {/* INPUT AREA */}
          <div className="p-6 bg-white border-t">
            {editingId && (
              <div className="flex justify-between items-center mb-2 px-4 py-1 bg-blue-50 rounded-lg text-[10px] text-blue-600 font-bold uppercase">
                <span>Editing comment...</span>
                <button onClick={() => { setEditingId(null); setText(""); }}>Cancel</button>
              </div>
            )}
            
            <div className="flex items-center gap-3 bg-gray-50 rounded-[1.5rem] px-5 py-2 border">
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={editingId ? "Update your comment..." : "Share a thought..."}
                className="bg-transparent border-none outline-none w-full text-sm py-2"
              />
              <button 
                onClick={handleSend} 
                disabled={!text.trim()}
                className={`p-3 rounded-full transition-all ${text.trim() ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}
              >
                <HiPaperAirplane className="rotate-90" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;