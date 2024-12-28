import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Navbar({ user, setUser }) {
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user"); // Clear invalid data
      }
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Set user state to null to log out
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  return (
    <nav className="bg-blue-600 shadow-md align-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center h-16">
        <ul className="flex space-x-6 text-white items-center">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-gray-300"
            >
              <HomeIcon />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="flex items-center space-x-2 text-white hover:text-gray-300"
            >
              <InfoIcon />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="flex items-center space-x-2 text-white hover:text-gray-300"
            >
              <ContactMailIcon />
              <span>Contact</span>
            </Link>
          </li>

          {/* Display profile and logout for logged-in user */}
          {user && (
            <>
              <li>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-white hover:text-gray-300"
                >
                  <AccountCircleIcon />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <button
                  className="flex items-center space-x-2 text-white hover:text-gray-300 focus:outline-none"
                  onClick={handleLogout}
                >
                  <ExitToAppIcon />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
