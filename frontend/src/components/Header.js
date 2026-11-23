import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";
import UserProfile from "./UserProfile";

// The Header functional component
const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect hook to run side effects
  useEffect(() => {
    setCartCount((JSON.parse(localStorage.getItem("cart")) || []).length);

    const handleStorageChange = () => {
      setCartCount((JSON.parse(localStorage.getItem("cart")) || []).length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  //UI
  return (
    // The main header container
    <header className="header-container">
      <div className="header-top">
        {/* Left section: back icon (hide on homepage) */}
        <div className="left-section">
          {location.pathname !== "/" && (
            <div className="back-icon" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left-circle-fill"></i>
            </div>
          )}
        </div>

        {/* Logo in center */}
        <div className="logo">
          <h1>Havenly</h1>
        </div>

        {/* Right section: cart and profile */}
        <div className="right-section">
          {/* Cart icon. Clicking it navigates to the cart page. */}
          <div className="cart-icon" onClick={() => navigate("/cart")}>
            <i className="bi bi-cart"></i>
            {/* Display the current number of items in the cart. */}
            <span className="cart-count">{cartCount}</span>
          </div>

          {/* User profile icon. Clicking it opens the UserProfile modal. */}
          <i
            className="bi bi-person-circle user-icon"
            onClick={() => setIsProfileOpen(true)}
          ></i>
          {/*UserProfile component*/}
          <UserProfile
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
