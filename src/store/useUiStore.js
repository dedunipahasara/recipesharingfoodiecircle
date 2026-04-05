import { create } from 'zustand';

const useUIStore = create((set) => ({
  isSidebarOpen: false,
  darkMode: false,
  
  toggleSidebar: () => set((state) => ({ 
    isSidebarOpen: !state.isSidebarOpen 
  })),
  
  toggleTheme: () => set((state) => ({ 
    darkMode: !state.darkMode 
  })),
  
  closeSidebar: () => set({ isSidebarOpen: false }),
}));

export default useUIStore;