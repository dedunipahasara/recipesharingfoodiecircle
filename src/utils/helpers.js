import { toast } from 'react-toastify';

/**
 * Global Notification Helper
 * Usage: notify.success("Message"), notify.error("Error"), etc.
 */
export const notify = {
  success: (message) => {
    toast.success(message, {
      icon: "🍳", // Custom foodie icon
      style: { borderRadius: '15px' }
    });
  },
  error: (message) => {
    toast.error(message, {
      icon: "⚠️",
      style: { borderRadius: '15px' }
    });
  },
  info: (message) => {
    toast.info(message, {
      icon: "ℹ️",
      style: { borderRadius: '15px' }
    });
  },
  warn: (message) => {
    toast.warn(message, {
      icon: "🔥",
      style: { borderRadius: '15px' }
    });
  }
};

/**
 * Formats a Date string into a readable format
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Truncates text with ellipses
 */
export const truncateText = (text, limit = 100) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + "...";
};