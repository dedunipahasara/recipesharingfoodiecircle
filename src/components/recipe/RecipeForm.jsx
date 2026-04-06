import React, { useState, useEffect } from "react";
import { HiOutlineCamera } from "react-icons/hi";
import EmojiPicker from "../../components/comment/EmojiPicker";

const RecipeForm = ({ onSubmit, initialData, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    mediaType: "image",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "",
        description: initialData.description || "",
        image: initialData.image || "",
        mediaType: initialData.mediaType || "image",
      });
    }
  }, [initialData]);

  const handleEmojiSelect = (emoji) => {
    setFormData((prev) => ({
      ...prev,
      description: prev.description + emoji,
    }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
        mediaType: file.type.startsWith("video") ? "video" : "image",
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="h-full flex flex-col"
    >
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-1">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* IMAGE (⬆️ bigger height) */}
          <label className="block w-full h-56 md:h-64 rounded-3xl border-2 border-dashed border-base-content/10 bg-base-200/30 overflow-hidden cursor-pointer hover:border-primary/40 transition-all">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full opacity-40">
                <HiOutlineCamera size={32} />
                <span className="text-[10px] uppercase font-bold tracking-widest mt-2">
                  Upload Image
                </span>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              onChange={handleFile}
              accept="image/*,video/*"
            />
          </label>

          {/* TITLE */}
          <div>
            <label className="text-[9px] uppercase font-bold opacity-40 ml-1">
              Recipe Title
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Garlic Pasta"
              className="w-full bg-transparent border-b border-base-content/10 py-3 px-1 focus:border-primary outline-none text-sm"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-[9px] uppercase font-bold opacity-40 ml-1">
              Category
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Vegan"
              className="w-full bg-transparent border-b border-base-content/10 py-3 px-1 focus:border-primary outline-none text-sm"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex flex-col">

          <label className="text-[9px] uppercase font-bold opacity-40 ml-1 mb-3">
            Description & Story
          </label>

          <div className="relative flex-1">

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write your cooking story..."
              className="w-full h-full min-h-[420px] bg-transparent border border-base-content/10 rounded-3xl p-6 pr-12 focus:border-primary outline-none text-sm leading-relaxed resize-none"
            />

            {/* EMOJI */}
            <div className="absolute bottom-5 right-5">
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </div>

          </div>
        </div>
      </div>

      {/* SUBMIT */}
      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-primary text-primary-content py-3 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all"
        >
          {isEditing ? "Update Masterpiece" : "Publish Recipe"}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;