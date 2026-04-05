import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuthStore from '../store/useAuthStore';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout: storeLogout } = useAuthStore();

  const logout = () => {
    storeLogout();
    toast.info("Signed out. See you soon! 👋", { theme: "dark" });
    navigate('/');
  };

  const isOwner = (userId) => {
    return isAuthenticated && String(user?.id) === String(userId);
  };

  return { user, isAuthenticated, logout, isOwner };
};