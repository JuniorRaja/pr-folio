/**
 * API Configuration
 * Centralized API endpoints for the application
 */

// Cloudflare Worker API base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://pr-verse.imprasannarajendran.workers.dev";

// Contact Form API
export const CONTACT_API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_CONTACT_API_URL_DEV || 'http://localhost:3001/api/send-email'
  : import.meta.env.VITE_CONTACT_API_URL_PROD || '/api/send-email';

// GitHub Configuration
export const GITHUB_CONFIG = {
  apiUrl: import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com',
  repo: import.meta.env.VITE_GITHUB_REPO || 'JuniorRaja/static',
  userAgent: import.meta.env.VITE_GITHUB_USER_AGENT || 'Portfolio-Gallery',
};

// CDN Configuration
export const CDN_CONFIG = {
  baseUrl: import.meta.env.VITE_CDN_BASE_URL || 'https://cdn.jsdelivr.net/gh',
  getAssetUrl: (path: string) => `${CDN_CONFIG.baseUrl}/${GITHUB_CONFIG.repo}/${path}`,
  getManifestUrl: (albumSlug: string) => `${CDN_CONFIG.baseUrl}/${GITHUB_CONFIG.repo}/images/generated/${albumSlug}/manifest.json`,
  getImageUrl: (albumSlug: string, seq: string) => `${CDN_CONFIG.baseUrl}/${GITHUB_CONFIG.repo}/images/generated/${albumSlug}/${seq}/medium.webp`,
};

// SMTP Configuration (for server-side use)
export const SMTP_CONFIG = {
  host: import.meta.env.VITE_SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(import.meta.env.VITE_SMTP_PORT || '587'),
  secure: import.meta.env.VITE_SMTP_SECURE === 'true',
};

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
