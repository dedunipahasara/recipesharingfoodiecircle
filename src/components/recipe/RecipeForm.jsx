import React, { useState, useEffect } from "react";
import { HiOutlineCamera } from "react-icons/hi";

const RecipeForm = ({ onSubmit, initialData, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    mediaType: "image",
  });

  // sync edit data
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

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
        mediaType: file.type.startsWith("video")
          ? "video"
          : "image",
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
      className="space-y-8"
    >
      {/* IMAGE UPLOAD */}
      <div className="relative group">
        <label className="block w-full h-48 md:h-64 rounded-3xl border-2 border-dashed border-base-content/10 bg-base-200/30 overflow-hidden cursor-pointer hover:border-primary/40 transition-all">
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
                Upload Visual
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
      </div>

      {/* TITLE + CATEGORY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* TITLE */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">
            Recipe Title
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Garlic Infused Pasta"
            className="w-full bg-transparent border-b border-base-content/10 py-3 px-1 focus:border-primary outline-none transition-all text-sm"
          />
        </div>

        {/* CATEGORY (TEXT INPUT NOW) */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">
            Category
          </label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Breakfast, Vegan, Spicy, Italian"
            className="w-full bg-transparent border-b border-base-content/10 py-3 px-1 focus:border-primary outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-widest opacity-40 ml-1">
          Instructions & Story
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          placeholder="Share your culinary process..."
          className="w-full bg-transparent border border-base-content/10 rounded-2xl p-4 focus:border-primary outline-none transition-all text-sm leading-relaxed"
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full bg-primary text-primary-content py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
      >
        {isEditing ? "Update Masterpiece" : "Publish to Circle"}
      </button>
    </form>
  );
};

export default RecipeForm;