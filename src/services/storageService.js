const storageService = {
  get: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  // Helper to update an item in an array within storage
  updateInArray: (key, id, updatedItem) => {
    const items = storageService.get(key) || [];
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem };
      storageService.set(key, items);
    }
  }
};

export default storageService;