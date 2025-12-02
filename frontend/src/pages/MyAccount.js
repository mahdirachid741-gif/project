import React, { useState } from "react";
import "../styles/MyAccount.css";

export default function MyAccount() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loginInput, setLoginInput] = useState({
    usernameOrEmail: "",
    password: "",
  });

  // Track which dashboard menu item is selected
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setUsername(loginInput.usernameOrEmail);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setLoginInput({
      usernameOrEmail: "",
      password: "",
    });
    setActiveMenu("Dashboard");
  };

  // Dashboard content for each menu item
  const renderDashboardContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return (
          <>
            <p>
              Hello <strong>{username}</strong> (not <strong>{username}</strong>
              ?{" "}
              <button className="link-button" onClick={handleLogout}>
                Log out
              </button>
              )
            </p>
            <p>
              From your account dashboard you can view your recent orders,
              manage your shipping and billing addresses, and edit your password
              and account details.
            </p>
          </>
        );
      case "Orders":
        return <p>You have no orders yet.</p>; // Replace with real order data if available
      case "Downloads":
        return <p>You have no downloads available.</p>;
      case "Addresses":
        return <p>You have not set up any addresses yet.</p>;
      case "Account details":
        return <p>Update your account details here.</p>;
      case "Wishlist":
        return <p>Your wishlist is empty.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="account-container">
      {!isLoggedIn ? (
        <>
          <h1 className="account-title">My Account</h1>

          <div className="forms-wrapper">
            {/* LOGIN FORM */}
            <form className="form-box" onSubmit={handleLogin}>
              <h2 className="form-title">Login</h2>

              <label className="input-label">Username or email address *</label>
              <input
                type="text"
                name="usernameOrEmail"
                value={loginInput.usernameOrEmail}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your username or email address..."
                required
              />

              <label className="input-label">Password *</label>
              <input
                type="password"
                name="password"
                value={loginInput.password}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your password..."
                required
              />

              <div className="login-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="/forgot-password" className="lost-password-link">
                  Lost your password?
                </a>
              </div>

              <button type="submit" className="form-btn">
                Log in
              </button>
            </form>

            {/* REGISTER FORM */}
            <form className="form-box">
              <h2 className="form-title">Register</h2>

              <label className="input-label">Email address *</label>
              <input
                type="email"
                className="input-field"
                placeholder="Enter your email..."
                required
              />

              <label className="input-label">Password *</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter your password..."
                required
              />

              <p className="register-note">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <a href="/privacy-policy">privacy policy</a>.
              </p>

              <button type="submit" className="form-btn">
                Register
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="dashboard-container">
          <nav className="dashboard-menu">
            <ul>
              {[
                { label: "Dashboard", icon: "🏠" },
                { label: "Orders", icon: "🛒" },
                { label: "Downloads", icon: "📄" },
                { label: "Addresses", icon: "🏠" },
                { label: "Account details", icon: "👤" },
                { label: "Wishlist", icon: "⭐" },
              ].map(({ label, icon }) => (
                <li
                  key={label}
                  className={activeMenu === label ? "active" : ""}
                  onClick={() => setActiveMenu(label)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="menu-icon">{icon}</span> {label}
                </li>
              ))}

              <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                <span className="menu-icon">🚪</span> Log out
              </li>
            </ul>
          </nav>

          <section className="dashboard-content">
            {renderDashboardContent()}
          </section>
        </div>
      )}
    </div>
  );
}
