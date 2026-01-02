import axios from "axios";

const apiUrl =
  window.API_URL || process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
