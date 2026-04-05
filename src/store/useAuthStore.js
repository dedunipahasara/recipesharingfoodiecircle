import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // =====================
      // 👤 STATE
      // =====================
      user: null,
      isAuthenticated: false,

      // =====================
      // LOGIN / LOGOUT
      // =====================
      login: (userData) => {
        set({
          user: {
            ...userData,
            favorites: userData.favorites || [],
            following: userData.following || [],
            followers: userData.followers || [],
          },
          isAuthenticated: true,
        });
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      // =====================
      // ❤️ FAVORITES
      // =====================
      toggleFavorite: (recipeId) => {
        const { user } = get();
        if (!user) return;

        const fav = user.favorites || [];
        const exists = fav.includes(recipeId);

        const updated = exists
          ? fav.filter((id) => id !== recipeId)
          : [...fav, recipeId];

        set({
          user: { ...user, favorites: updated },
        });
      },

      isFavorite: (id) =>
        get().user?.favorites?.includes(id) || false,

      // =====================
      // 👥 FOLLOW SYSTEM (FIXED)
      // =====================
      toggleFollow: (targetUserId) => {
        const { user, isAuthenticated } = get();
        if (!isAuthenticated || !user || user.id === targetUserId) return;

        const allUsers = JSON.parse(localStorage.getItem("all_users") || "[]");

        const currentUser = allUsers.find((u) => u.id === user.id);
        const targetUser = allUsers.find((u) => u.id === targetUserId);

        if (!currentUser || !targetUser) return;

        const isFollowing = currentUser.following?.includes(targetUserId);

        // =====================
        // UPDATE CURRENT USER
        // =====================
        const updatedFollowing = isFollowing
          ? currentUser.following.filter((id) => id !== targetUserId)
          : [...(currentUser.following || []), targetUserId];

        const updatedCurrentUser = {
          ...currentUser,
          following: updatedFollowing,
        };

        // =====================
        // UPDATE TARGET USER
        // =====================
        const updatedFollowers = isFollowing
          ? (targetUser.followers || []).filter((id) => id !== user.id)
          : [...(targetUser.followers || []), user.id];

        const updatedTargetUser = {
          ...targetUser,
          followers: updatedFollowers,
        };

        // =====================
        // SAVE BACK TO LOCALSTORAGE
        // =====================
        const updatedAllUsers = allUsers.map((u) => {
          if (u.id === user.id) return updatedCurrentUser;
          if (u.id === targetUserId) return updatedTargetUser;
          return u;
        });

        localStorage.setItem(
          "all_users",
          JSON.stringify(updatedAllUsers)
        );

        // update zustand state
        set({ user: updatedCurrentUser });
      },

      isFollowing: (id) =>
        get().user?.following?.includes(id) || false,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;