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
      {/* MAIN CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {/* IMAGE UPLOAD */}
          <label className="group relative block w-full h-52 md:h-60 rounded-3xl overflow-hidden border border-gray-100 bg-gradient-to-br from-gray-50 to-white shadow-sm cursor-pointer hover:shadow-md transition-all">

            {formData.image ? (
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <HiOutlineCamera size={34} />
                <p className="text-[10px] uppercase tracking-widest mt-2 font-semibold">
                  Upload Image / Video
                </p>
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
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
              Recipe Title
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Creamy Garlic Pasta"
              className="w-full mt-2 bg-white border border-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
              Category
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Vegan, Dessert"
              className="w-full mt-2 bg-white border border-gray-100 rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col">

          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-3">
            Description & Story
          </label>

          <div className="relative flex-1">

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Share your cooking story..."
              className="w-full h-full min-h-[360px] bg-white border border-gray-100 rounded-3xl p-5 text-sm leading-relaxed outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition resize-none shadow-sm"
            />

            {/* EMOJI */}
            <div className="absolute bottom-4 right-4">
              <div className="bg-white rounded-full shadow-md p-1">
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-white font-bold uppercase tracking-widest text-[11px] shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all"
        >
          {isEditing ? "Update Recipe ✨" : "Publish Recipe 🚀"}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;