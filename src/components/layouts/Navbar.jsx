import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePlusSm, HiMenu, HiX } from "react-icons/hi";
import useAuthStore from "../../store/useAuthStore";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setProfileOpen(false);
    setMobileOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">

      <div className="flex items-center px-5 md:px-10 py-3">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-gray-900 hover:scale-105 transition"
        >
          🍳 Foodie<span className="text-primary font-black">Circle</span>
        </Link>

        {/* CENTER LINKS (DESKTOP) */}
        <div className="flex-1 flex justify-end mr-6">
          <div className="hidden md:flex gap-2">
            <Link to="/" className="px-4 py-2 rounded-full text-sm font-bold text-gray-800 hover:bg-primary/10 hover:text-primary transition">
              Home
            </Link>
            <Link to="/explore" className="px-4 py-2 rounded-full text-sm font-bold text-gray-800 hover:bg-primary/10 hover:text-primary transition">
              Explore
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* POST BUTTON */}
          {isAuthenticated && (
            <Link
              to="/add-recipe"
              className="hidden sm:flex items-center gap-2 bg-primary text-white font-bold px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition"
            >
              <HiOutlinePlusSm className="text-xl" />
              Post Recipe
            </Link>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-3xl text-gray-800"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>

          {/* PROFILE DROPDOWN (CLICK BASED) */}
          {isAuthenticated && (
            <div className="relative hidden md:block">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 rounded-full border border-primary/30"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={
                      user?.profilePhoto ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`
                    }
                    alt="profile"
                  />
                </div>
              </button>

              {/* DROPDOWN */}
              {profileOpen && (
                <ul className="absolute right-0 mt-3 p-3 w-56 bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl z-50">

                  <li className="text-xs font-bold text-gray-500 px-3 py-1">
                    @{user?.username}
                  </li>

                  <div className="divider my-1"></div>

                  <li>
                    <Link onClick={() => setProfileOpen(false)} to={`/profile/${user?.username}`} className="font-semibold hover:text-primary">
                      My Profile
                    </Link>
                  </li>

                  <li>
                    <Link onClick={() => setProfileOpen(false)} to="/mylist" className="font-semibold hover:text-primary">
                      Manage Recipes
                    </Link>
                  </li>

                  <li>
                    <Link onClick={() => setProfileOpen(false)} to="/favorites" className="font-semibold hover:text-primary">
                      Saved
                    </Link>
                  </li>

                  <li>
                    <Link onClick={() => setProfileOpen(false)} to="/settings" className="font-semibold hover:text-primary">
                      Settings
                    </Link>
                  </li>

                  <div className="divider my-1"></div>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 font-bold w-full text-left hover:text-red-700"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}

          {!isAuthenticated && (
            <Link
              className="bg-primary text-white font-bold px-6 py-2 rounded-full hover:scale-105 transition"
              to="/login"
            >
              Login
            </Link>
          )}

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">

          <Link onClick={() => setMobileOpen(false)} to="/" className="block font-semibold text-gray-700">
            Home
          </Link>

          <Link onClick={() => setMobileOpen(false)} to="/explore" className="block font-semibold text-gray-700">
            Explore
          </Link>

          {isAuthenticated && (
            <>
              <Link onClick={() => setMobileOpen(false)} to={`/profile/${user?.username}`} className="block font-semibold text-gray-700">
                My Profile
              </Link>

              <Link onClick={() => setMobileOpen(false)} to="/mylist" className="block font-semibold text-gray-700">
                Manage Recipes
              </Link>

              <Link onClick={() => setMobileOpen(false)} to="/favorites" className="block font-semibold text-gray-700">
                Saved
              </Link>

              <Link onClick={() => setMobileOpen(false)} to="/add-recipe" className="block font-semibold text-primary">
                + Post Recipe
              </Link>

              <button onClick={handleLogout} className="block text-red-500 font-bold text-left">
                Logout
              </button>
            </>
          )}

        </div>
      )}

    </div>
  );
};

export default Navbar;