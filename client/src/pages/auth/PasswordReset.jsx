import React, { useContext, useState } from "react";
import { Grid } from "@mui/material";
import AuthContext from "../../context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import SubmitButton from "../../components/authFields/SubmitButton";
import authTheme from "../../themes/authTheme";
import PageDescription from "../../components/authFields/PageDescription";
import AuthCard from "../../components/authFields/AuthCard";
import Password from "../../components/authFields/Password";
import Login from "../../components/authFields/CallToActionText/Login";
import SignUp from "../../components/authFields/CallToActionText/SignUp";

const PasswordReset = () => {
  const { passwordReset } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    passwordReset(password, password2);
  };

  return (
    <AuthCard>
      <PageDescription pageDescriptionString={"Reset Password"} />
      <ThemeProvider theme={authTheme}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Password
              value={password}
              autoComplete="new-password"
              label="New Password"
              onChange={(e) => setPassword(e.target.value)}
              error={password && password.length < 8}
              helperText={
                password && password.length < 8 ? "Password must be at least 8 characters." : ""
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Password
              value={password2}
              autoComplete="new-password"
              label="Confirm New Password"
              onChange={(e) => setPassword2(e.target.value)}
              error={password2 && (password2.length < 8 || password !== password2)}
              helperText={
                password2 && password2.length < 8
                  ? "Password must be at least 8 characters."
                  : password2 && password !== password2
                    ? "Passwords do not match."
                    : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton text="Reset Password" />
          </Grid>
        </form>
        <Login />
        <SignUp />
      </ThemeProvider>
    </AuthCard>
  );
};

export default PasswordReset;
