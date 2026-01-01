import React, { useContext, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import AuthContext from "../../context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import SubmitButton from "../../components/authFields/SubmitButton";
import authTheme from "../../themes/authTheme";
import PageDescription from "../../components/authFields/PageDescription";
import AuthCard from "../../components/authFields/AuthCard";
import Email from "../../components/authFields/Email";
import Login from "../../components/authFields/CallToActionText/Login";
import SignUp from "../../components/authFields/CallToActionText/SignUp";

const PasswordResetRequest = () => {
  const { user, passwordResetRequest, setVerifiedUserEmail } = useContext(AuthContext);
  const [email, setEmail] = useState(user ? user.email : "");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await passwordResetRequest(email);
    setVerifiedUserEmail(email);
  };

  return (
    <AuthCard>
      <PageDescription pageDescriptionString={"Request a Password Change"} />
      <ThemeProvider theme={authTheme}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Email value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton text="Request Password Change" />
          </Grid>
        </form>
        <Login />
        <SignUp />
      </ThemeProvider>
    </AuthCard>
  );
};

export default PasswordResetRequest;
