import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h2>BOOKIES</h2>
          <p>
            The best online bookshop
            <br />
            based in Lebanon since 2025
          </p>
          <div className="footer-socials">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-pinterest"></i>
          </div>
        </div>

        <div className="footer-section">
          <h4>Need Help?</h4>
          <p>info@bookies.com</p>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/account" className="footer-link">
                Sign In / Join
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>
              <Link to="/shop?category=romance" className="footer-link">
                Romance
              </Link>
            </li>
            <li>
              <Link to="/shop?category=novels" className="footer-link">
                Novels
              </Link>
            </li>
            <li>
              <Link to="/shop?category=history" className="footer-link">
                History
              </Link>
            </li>
            <li>
              <Link to="/shop?category=fiction" className="footer-link">
                Fiction
              </Link>
            </li>
            <li>
              <Link to="/shop?category=self-help" className="footer-link">
                Self Help
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        Copyright © 2025 Bookies — Made by Incodling
      </div>
    </footer>
  );
};

export default Footer;
