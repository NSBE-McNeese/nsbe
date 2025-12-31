import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./MainLayout.css";

const MainLayout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const toggleMenu = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="main-layout">
      <div className={`navbar-container ${isNavbarOpen ? "open" : "closed"}`}>
        <Navbar />
      </div>

      {/* Main content */}
      <div className={`main-content ${isNavbarOpen ? "" : "noNavbar"}`}>
        <Box sx={{ mb: 2 }}> 
          <IconButton onClick={toggleMenu} aria-label="menu">
            {isNavbarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;