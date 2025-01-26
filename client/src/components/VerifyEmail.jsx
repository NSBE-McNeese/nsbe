import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const VerifyEmail = () => {
  const { verifyEmail, setVerifiedUserEmail } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (token) {
      verifyEmail(token, setVerifiedUserEmail, navigate);
    } else {
      console.error("No token provided for verification.");
    }
  }, [location.search, setVerifiedUserEmail, navigate]);
  return null;
};

export default VerifyEmail;
