import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      allUsers: [], // List of all registered users
      
      setUsers: (users) => set({ allUsers: users }),
      
      updateUserStats: (userId, statsUpdate) => set((state) => ({
        allUsers: state.allUsers.map(u => 
          u.id === userId ? { ...u, ...statsUpdate } : u
        )
      })),
    }),
    { name: 'foodie-community-storage' }
  )
);

export default useUserStore;