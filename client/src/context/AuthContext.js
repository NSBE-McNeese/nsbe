import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../api";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null,
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null,
  );

  const [verifiedEmail, setVerifiedEmail] = useState("");
  const setVerifiedUserEmail = (email) => {
    setVerifiedEmail(email);
  };

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleAuthTokens = (data) => {
    setAuthTokens(data);
    setUser(jwtDecode(data.access));
    localStorage.setItem("authTokens", JSON.stringify(data));
  };

  const loginUser = async (email, password) => {
    try {
      const { data, status } = await api.post(`auth/token/`, {
        email,
        password,
      });

      if (status === 200) {
        handleAuthTokens(data);
        toast.success("Logged in successfully!");
        setTimeout(() => navigate("/"), 3000);
      } else {
        toast.error("Invalid username and/or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  const registerUser = async (
    first_name,
    last_name,
    major,
    class_standing,
    email,
    password,
    password2,
  ) => {
    try {
      const { status } = await api.post(`auth/register/`, {
        first_name,
        last_name,
        major,
        class_standing,
        email,
        password,
        password2,
      });

      if (status === 201) {
        toast.success("Confirmation request sent to your email.");
        navigate("/");
      } else {
        toast.error("An error occurred during registration.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("System error. Please try again later.");
    }
  };

  const verifyEmail = async (token, setVerifiedUserEmail) => {
    try {
      const { data, status } = await api.post(`auth/token/verify/`, {
        token,
      });

      if (status === 200) {
        console.log(data);
        // Set the verified user's email
        setVerifiedUserEmail(data.user.email);

        if (data.action === "register") {
          navigate("/login");
        } else if (data.action === "password_reset") {
          navigate("/password-reset");
        }
      } else {
        console.error("Email verification failed.");
      }
    } catch (error) {
      console.error("Email verification error:", error);
    }
  };
  const passwordResetRequest = async (email) => {
    try {
      const response = await api.post(`auth/password-reset-request/`, {
        email,
      });
      toast.success("Password reset email sent. Check your inbox!");
      return response.data;
    } catch (error) {
      toast.error("Failed to send password reset email. Please try again.");
      console.error(error);
    }
  };

  const passwordReset = async (password, password2) => {
    try {
      const email = verifiedEmail || (user ? user.email : "");
      const { status } = await api.put(`auth/password-reset/`, {
        email,
        password,
        password2,
      });

      if (status === 200) {
        toast.success("Password changed successfully!");
        navigate("/login");
        return { message: "Password changed successfully! You can log in." };
      } else {
        toast.error("Password change failed");
        return { message: "Password change failed. Try again!" };
      }
    } catch (error) {
      toast.error("Password change failed ", error);
      console.error("Password change error:", error);
      return { message: "An error occurred. Try again!" };
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const contextData = {
    user,
    authTokens,
    registerUser,
    loginUser,
    logoutUser,
    verifyEmail,
    passwordReset,
    passwordResetRequest,
    verifiedEmail,
    setVerifiedUserEmail,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
