import React, { useContext, useState } from "react";
import { Grid } from "@mui/material";
import AuthContext from "../../context/AuthContext";
import Email from "../../components/authFields/Email";
import Password from "../../components/authFields/Password";
import SubmitButton from "../../components/authFields/SubmitButton";
import { ThemeProvider } from "@mui/material/styles";
import authTheme from "../../themes/authTheme";
import PageDescription from "../../components/authFields/PageDescription";
import AuthCard from "../../components/authFields/AuthCard";
import SignUp from "../../components/authFields/CallToActionText/SignUp";
import ResetPassword from "../../components/authFields/CallToActionText/ResetPassword";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      loginUser(email, password);
    }
  };

  return (
    <AuthCard>
      <PageDescription pageDescriptionString={"Login"} />
      <ThemeProvider theme={authTheme}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Email value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Password
                value={password}
                autoComplete="current-password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton text="Login" />
            </Grid>
          </Grid>
        </form>
        <SignUp />
        <ResetPassword />
      </ThemeProvider>
    </AuthCard>
  );
};

export default LoginPage;
