import React, { useContext, useState } from "react";
import { Grid } from "@mui/material";
import AuthContext from "../../context/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import authTheme from "../../themes/authTheme";
import Name from "../../components/authFields/Name";
import Email from "../../components/authFields/Email";
import ClassStanding from "../../components/authFields/ClassStanding";
import Major from "../../components/authFields/Major";
import Password from "../../components/authFields/Password";
import SubmitButton from "../../components/authFields/SubmitButton";
import PageDescription from "../../components/authFields/PageDescription";
import AuthCard from "../../components/authFields/AuthCard";
import Login from "../../components/authFields/CallToActionText/Login";
import ResetPassword from "../../components/authFields/CallToActionText/ResetPassword";

const RegisterPage = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [class_standing, setClassStanding] = useState("");
  const [major, setMajor] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      registerUser(
        first_name,
        last_name,
        major,
        class_standing,
        email,
        password,
        password2,
      );
    }
  };

  return (
    <AuthCard>
      <PageDescription pageDescriptionString={"Sign Up"} />

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
            <Name
              nameType="firstName"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <Name
              nameType="lastName"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />

            <Grid item xs={12}>
              <Email value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <ClassStanding
                inputValue={class_standing}
                onInputChange={(e, v) => setClassStanding(v)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Major inputValue={major} onInputChange={(e, v) => setMajor(v)} />
            </Grid>

            <Grid item xs={12}>
              <Password
                value={password}
                autoComplete="new-password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                error={password && password.length < 8}
                helperText={
                  password && password.length < 8
                    ? "Password must be at least 8 characters."
                    : ""
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Password
                value={password2}
                autoComplete="new-password"
                label="Confirm Password"
                onChange={(e) => setPassword2(e.target.value)}
                error={
                  password2 && (password2.length < 8 || password !== password2)
                }
                helperText={
                  password2 && password2.length < 8
                    ? "Password must be at least 8 characters."
                    : password2 && password !== password2
                      ? "Passwords do not match."
                      : ""
                }
              />
            </Grid>
          </Grid>

          <SubmitButton text="Sign Up" />

          <Login />
          <ResetPassword />
        </form>
      </ThemeProvider>
    </AuthCard>
  );
};

export default RegisterPage;
