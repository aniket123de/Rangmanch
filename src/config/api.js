// API configuration based on environment
const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Fallback configuration for different environments
const API_CONFIG = {
  development: '/api', // Use proxy in development
  production: '/api'   // Use Vercel rewrites in production
};

export const apiConfig = {
  baseURL: API_CONFIG[import.meta.env.MODE] || API_BASE_URL,
  endpoints: {
    generateSuggestions: '/generate-suggestions',
    analyzeSentiment: '/analyze-sentiment'
  }
};

export const getApiUrl = (endpoint) => {
  return `${apiConfig.baseURL}${endpoint}`;
};

// Alternative direct URL function for emergencies
export const getDirectApiUrl = (endpoint) => {
  // Use your deployed backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://sentiment-api-iop3.onrender.com';
  return `${backendUrl}/api${endpoint}`;
};
