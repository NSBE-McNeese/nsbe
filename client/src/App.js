import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/privateRoutes";
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import Profile from "./pages/ProfilePage";
import VerifyEmail from "./components/VerifyEmail";
import PasswordReset from "./pages/auth/PasswordReset";
import PasswordResetRequest from "./pages/auth/PasswordResetRequest";

import EventsPage from "./pages/EventsPage";
import EventDetail from "./pages/EventDetail";
import PointsPage from "./pages/PointsPage";
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/HelpPage";
import DirectoryPage from "./pages/DirectoryPage";
import AdminScanner from "./pages/AdminScanner";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer position="top-right" autoClose={3000} />
        <AuthProvider>
          <EventProvider>
            <Routes>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify" element={<VerifyEmail />} />
                <Route path="/password-reset-request" element={<PasswordResetRequest />} />
                <Route path="/password-reset" element={<PasswordReset />} />
              </Route>

              <Route
                element={
                  <PrivateRoute>
                    <MainLayout />
                  </PrivateRoute>
                }
              >
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/directory" element={<DirectoryPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:event_slug" element={<EventDetail />} />
                <Route path="/points" element={<PointsPage />} />
                <Route path="/scan" element={<AdminScanner />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/help" element={<HelpPage />} />
              </Route>
            </Routes>
          </EventProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
