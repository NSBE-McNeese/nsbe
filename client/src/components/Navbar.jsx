import React, { useContext, useState } from 'react';
import { FaHome, FaBars, FaFolder, FaRibbon, FaCalendarAlt, FaUser, FaSignOutAlt, FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';
import { CgLogIn } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';  
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  let user_id = null;
  if (token) {
    const decoded = jwtDecode(token);
    user_id = decoded.user_id;
  }

  return (
  <div>
    <div className="wrapper">
      <div className="sidebar">
        <div className="header">
          <span>
            <img src={require("../logo/nsbe5g.png")} alt="mcneese_icon" style={{ width: '150px' }} />
          </span>
        </div>

        <ul className="list">
          <li>
            <div>
              <span><FaHome /></span>
              <Link className="nav-link" to="/">Home</Link>
            </div>
          </li>
          <li>
            <div>
              <span><FaFolder /></span>
              <Link className="nav-link" to="/directory">Directory</Link>
            </div>
          </li>
          <li>
            <div>
              <span><FaRibbon /></span>
              <Link className="nav-link" to="/points">Points</Link>
            </div>
          </li>
          <li>
            <div>
              <span><FaCalendarAlt /></span>
              <Link className="nav-link" to="/events">Events</Link>
            </div>
          </li>
          {token === null && (
            <>
              <li>
                <div>
                  <span><CgLogIn /></span>
                  <Link className="nav-link" to="/login">Log In</Link>
                </div>
              </li>
              <li>
                <div>
                  <span><FaUser /></span>
                  <Link className="nav-link" to="/register">Sign Up</Link>
                </div>
              </li>
            </>
          )}
          {token !== null && (
            <>
              <li>
                <div>
                  <span><FaUser /></span>
                  <Link className="nav-link" to="/profile">Profile</Link>
                </div>
              </li>
              <li>
                <div>
                  <span><FaSignOutAlt /></span>
                  <button className="nav-link" onClick={logoutUser}>Log Out</button>
                </div>
              </li>
            </>
          )}
        </ul>

        <ul className="bottom_list">
          <li>
            <div>
              <span><FaQuestionCircle /></span>
              <Link className="nav-link" to="/help">Help</Link>
            </div>
          </li>
          <li>
            <div>
              <span><FaInfoCircle /></span>
              <Link className="nav-link" to="/about">About</Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
}

export default Navbar;
