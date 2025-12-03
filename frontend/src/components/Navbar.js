import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart"; // Cart slide panel component
import "../styles/Navbar.css";

function Navbar({ setSearchQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchQuery(value); // update global search
    navigate("/shop"); // automatically navigate to Shop
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(query);
      navigate("/shop");
    }
  };

  return (
    <nav className="navbar-container">
      <div className="nav-content">
        {/* LOGO */}
        <a href="/" className="nav-logo">
          Bookies
        </a>

        {/* MOBILE HAMBURGER */}
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={menuOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
        </button>

        {/* NAV LINKS */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <a href="/shop">Shop</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
          <li>
            <a href="/account">My Account</a>
          </li>
        </ul>

        {/* RIGHT SECTION */}
        <div className="nav-right">
          {/* SEARCH BAR */}
          {searchOpen && (
            <div className="search-inline">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={query}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
              />
              <i
                className="bi bi-x-lg close-search"
                onClick={() => setSearchOpen(false)}
              ></i>
            </div>
          )}

          {/* ICONS */}
          {!searchOpen && (
            <div className="nav-icons">
              <i
                className="bi bi-search"
                onClick={() => setSearchOpen(true)}
              ></i>
              <i
                className="bi bi-heart"
                onClick={() => navigate("/wishlist")}
              ></i>
              <i className="bi bi-cart" onClick={() => setCartOpen(true)}></i>
            </div>
          )}
        </div>
      </div>

      {/* CART SLIDE PANEL */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}

export default Navbar;
