import storageService from './storageService';

const USERS_KEY = 'foodie_users';

export const userService = {
  getProfile: (username) => {
    const users = storageService.get(USERS_KEY) || [];
    return users.find(u => u.username === username);
  },

  toggleFollow: (currentUserId, targetUserId) => {
    const users = storageService.get(USERS_KEY) || [];
    // Here you would add logic to update followers/following lists
    // and save back to storageService.
    console.log(`User ${currentUserId} toggled follow on ${targetUserId}`);
  }
};