
/**
 * Utility for managing API keys in the application
 */

// Get the Google API key from localStorage or environment
export const getGoogleApiKey = (): string => {
  return localStorage.getItem('googleApiKey') || '';
};

// Get the SerpAPI key from localStorage or environment
export const getSerpApiKey = (): string => {
  return localStorage.getItem('serpApiKey') || '';
};

// Check if the Google API key is configured
export const isGoogleApiConfigured = (): boolean => {
  return !!getGoogleApiKey();
};

// Check if the SerpAPI key is configured
export const isSerpApiConfigured = (): boolean => {
  return !!getSerpApiKey();
};
