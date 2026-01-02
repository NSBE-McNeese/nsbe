import axios from "axios";

const getBaseURL = () => {
  // Try window.API_URL first (set by nginx config.js)
  if (typeof window !== "undefined" && window.API_URL) {
    return window.API_URL;
  }
  // Fall back to environment variable
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Default to relative path to current host
  return "/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
});

export default api;
