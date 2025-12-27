/**
 * API Configuration
 * Centralized API endpoints for the application
 */

// Cloudflare Worker API base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://pr-verse.imprasannarajendran.workers.dev";

// Gallery API endpoints
export const GALLERY_API = {
  albums: `${API_BASE_URL}/api/gallery/albums`,
  albumStats: (slug: string) => `${API_BASE_URL}/api/gallery/albums/${slug}`,
  toggleLike: (slug: string) => `${API_BASE_URL}/api/gallery/albums/${slug}/like`,
  comments: (slug: string) => `${API_BASE_URL}/api/gallery/albums/${slug}/comments`,
  deleteComment: (commentId: string) => `${API_BASE_URL}/api/gallery/comments/${commentId}`,
};

// Chatbot API endpoint
export const CHATBOT_API = `${API_BASE_URL}`;
