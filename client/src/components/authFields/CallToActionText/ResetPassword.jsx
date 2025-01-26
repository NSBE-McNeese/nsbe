import React from "react";
import { Link, Typography } from "@mui/material";

const ResetPassword = () => {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        marginTop: "15px",
      }}
    >
      Forgot Password?{" "}
      <Link
        href="/password-reset-request"
        underline="hover"
        sx={{
          color: "#00529b",
        }}
      >
        Reset Password
      </Link>
    </Typography>
  );
};

export default ResetPassword;
