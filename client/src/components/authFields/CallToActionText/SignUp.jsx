import React from "react";
import { Link, Typography } from "@mui/material";

const SignUp = () => {
  return (
    <Typography variant="body2" align="center" sx={{ marginTop: "15px" }}>
      Create new account?{" "}
      <Link href="/register" underline="hover">
        Sign Up
      </Link>
    </Typography>
  );
};

export default SignUp;
