import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

// Page Imports
import Home from '../pages/home/Home';
import Explore from '../pages/explore/Explore';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/SignUp';
import AddRecipe from '../pages/recipe/AddRecipe';
import EditRecipe from '../pages/recipe/EditRecipe';
import RecipeDetails from '../pages/recipe/RecipeDetails';
import Profile from '../pages/user/Profile';
import Followers from '../pages/user/Followers';
import Following from '../pages/user/Following';
import MyList from '../pages/mylist/MyList';
import Favorites from '../pages/favorites/Favorites';
import Settings from '../pages/settings/Settings';
import NotFound from '../pages/notfound/NotFound';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/profile/:username" element={<Profile />} />

      {/* Private Routes */}
      <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
      <Route path="/edit-recipe/:id" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />
      <Route path="/mylist" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
      <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
      <Route path="/followers" element={<ProtectedRoute><Followers /></ProtectedRoute>} />
      <Route path="/following" element={<ProtectedRoute><Following /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;