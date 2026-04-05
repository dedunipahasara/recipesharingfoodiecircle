import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HiHome,
  HiHashtag,
  HiHeart,
  HiViewList,
  HiPlusCircle
} from 'react-icons/hi';

const Sidebar = () => {
  const links = [
    { name: 'Home', path: '/', icon: <HiHome size={22} /> },
    { name: 'Explore', path: '/explore', icon: <HiHashtag size={22} /> },
    { name: 'Favorites', path: '/favorites', icon: <HiHeart size={22} /> },
    { name: 'My List', path: '/mylist', icon: <HiViewList size={22} /> },
    { name: 'Add Recipe', path: '/add-recipe', icon: <HiPlusCircle size={22} /> },
  ];

  return (
    <aside className="
      hidden xl:flex flex-col
      fixed
      top-24 bottom-10 left-6
      w-64

      bg-white/70 backdrop-blur-xl
      border border-white/20
      rounded-3xl shadow-2xl
      z-50
      overflow-hidden
    ">

      <div className="flex flex-col h-full px-4 py-5">

        {/* LOGO */}
        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-tight">
            🍳 Foodie<span className="text-primary">Circle</span>
          </h1>
          <p className="text-xs opacity-50">Share your recipes</p>
        </div>

        {/* LINKS */}
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group
                    ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "hover:bg-base-200 hover:scale-[1.02]"
                    }`
                  }
                >
                  <span className="group-hover:scale-110 transition">
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* FOOTER */}
        <div className="mt-6 p-3 rounded-2xl bg-base-200 text-xs opacity-60 text-center">
          © 2026 FoodieCircle
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;