import React from "react";
import { Link, Typography } from "@mui/material";

const Login = () => {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        marginTop: "15px",
      }}
    >
      Already have an account?{" "}
      <Link
        href="/login"
        underline="hover"
        sx={{
          color: "#00529b",
        }}
      >
        Login
      </Link>
    </Typography>
  );
};

export default Login;
