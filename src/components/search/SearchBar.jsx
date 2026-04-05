import React, { useState } from 'react';
import { HiOutlineSearch, HiX } from 'react-icons/hi';

const SearchBar = ({ onSearch, placeholder = "Search recipes or chefs..." }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-md">

      {/* SEARCH ICON */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <HiOutlineSearch className="text-gray-400 h-5 w-5" />
      </div>

      {/* INPUT */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full
          pl-11 pr-10 py-3
          rounded-full

          bg-white/70 backdrop-blur-xl
          border border-gray-200

          text-gray-700 font-medium

          shadow-sm

          focus:outline-none
          focus:ring-2 focus:ring-primary/40
          focus:border-primary/40

          transition-all duration-300
          focus:scale-[1.02]
          focus:bg-white
        "
      />

      {/* CLEAR BUTTON */}
      {query && (
        <button
          onClick={clearSearch}
          className="
            absolute inset-y-0 right-0 pr-4 flex items-center
            text-gray-400 hover:text-red-500
            transition
          "
        >
          <HiX className="h-5 w-5 hover:scale-110 transition" />
        </button>
      )}

    </div>
  );
};

export default SearchBar;