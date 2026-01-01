import React, { useContext } from "react";
import {
  FaHome,
  FaFolder,
  FaRibbon,
  FaCalendarAlt,
  FaUser,
  FaSignOutAlt,
  FaQuestionCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { CgLogIn } from "react-icons/cg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import NSBELogo from "../logo/nsbe5g.png";

const Navbar = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);

  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className="header">
          <img src={NSBELogo} alt="NSBE Logo" style={{ width: "150px" }} />
        </div>

        <ul className="list">
          <li>
            <div>
              <FaHome />
              <Link className="nav-link" to="/">
                Home
              </Link>
            </div>
          </li>
          <li>
            <div>
              <FaFolder />
              <Link className="nav-link" to="/directory">
                Directory
              </Link>
            </div>
          </li>
          <li>
            <div>
              <FaRibbon />
              <Link className="nav-link" to="/points">
                Points
              </Link>
            </div>
          </li>
          <li>
            <div>
              <FaCalendarAlt />
              <Link className="nav-link" to="/events">
                Events
              </Link>
            </div>
          </li>
          {!authTokens ? (
            <>
              <li>
                <div>
                  <CgLogIn />
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </div>
              </li>
              <li>
                <div>
                  <FaUser />
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <div>
                  <FaUser />
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </div>
              </li>
              <li>
                <div>
                  <FaSignOutAlt />
                  <button
                    className="nav-link btn-link"
                    onClick={logoutUser}
                    style={{ background: "none", border: "none", textAlign: "left" }}
                  >
                    Log Out
                  </button>
                </div>
              </li>
            </>
          )}
        </ul>

        <ul className="bottom_list">
          <li>
            <div>
              <FaQuestionCircle />
              <Link className="nav-link" to="/help">
                Help
              </Link>
            </div>
          </li>
          <li>
            <div>
              <FaInfoCircle />
              <Link className="nav-link" to="/about">
                About
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
