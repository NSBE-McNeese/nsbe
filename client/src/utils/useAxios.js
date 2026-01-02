import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext, useMemo } from "react";
import AuthContext from "../context/AuthContext";

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

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logoutUser } = useContext(AuthContext);
  const baseURL = getBaseURL();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL,
    });

    instance.interceptors.request.use(async (req) => {
      if (!authTokens?.access) return req;

      const user = jwtDecode(authTokens.access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      // Always set the Authorization header when we have a token
      req.headers.Authorization = `Bearer ${authTokens.access}`;

      if (!isExpired) return req;

      try {
        const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
          refresh: authTokens.refresh,
        });

        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));

        req.headers.Authorization = `Bearer ${response.data.access}`;
      } catch (error) {
        // If refresh fails, the session is dead - force logout
        console.error("Session expired, logging out.");
        logoutUser();
      }

      return req;
    });

    return instance;
  }, [authTokens, baseURL, setUser, setAuthTokens, logoutUser]);

  return axiosInstance;
};

export default useAxios;
