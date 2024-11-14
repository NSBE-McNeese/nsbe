import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/privateRoutes";
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from './context/EventContext';

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from './pages/LoginPage';
import Profile from './pages/ProfilePage';
import VerifyEmail from "./components/VerifyEmail";
import PasswordReset from "./pages/PasswordReset";
import PasswordResetRequest from "./pages/PasswordResetRequest";

import EventsPage from './pages/EventsPage';
import EventDetail from './pages/EventDetail';
import PointsPage from './pages/PointsPage';
import AboutPage from './pages/AboutPage';

import MainLayout from './layouts/MainLayout';
import AuthLayout from "./layouts/AuthLayout";

import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        {/* Wrap EventProvider around the Routes but outside of the Routes component */}
        <EventProvider>
          <Routes>
            {/* Public routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify" element={<VerifyEmail />} />
              <Route path="/password-reset-request" element={<PasswordResetRequest />} />
              <Route path="/password-reset" element={<PasswordReset />} />
            </Route>

            {/* Private routes */}
            <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:event_slug" element={<EventDetail />} />
              <Route path="/points" element={<PointsPage />} />
            </Route>
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </EventProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
