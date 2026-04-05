import storageService from './storageService';

const USERS_KEY = 'foodie_users';
const CURRENT_USER_KEY = 'foodie_current_user';

export const authService = {
  signup: (userData) => {
    const users = storageService.get(USERS_KEY) || [];
    if (users.find(u => u.username === userData.username)) {
      throw new Error("Username already exists");
    }
    users.push(userData);
    storageService.set(USERS_KEY, users);
    return userData;
  },

  login: (username, password) => {
    const users = storageService.get(USERS_KEY) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    
    storageService.set(CURRENT_USER_KEY, user);
    return user;
  },

  logout: () => {
    storageService.remove(CURRENT_USER_KEY);
  }
};