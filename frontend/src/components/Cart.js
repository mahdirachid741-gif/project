import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

export default function Cart({ isOpen, onClose }) {
  const cartRef = useRef();
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount and whenever cartChanged fires
  useEffect(() => {
    const loadCart = () => {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(stored);
    };

    loadCart();
    window.addEventListener("cartChanged", loadCart);

    return () => window.removeEventListener("cartChanged", loadCart);
  }, []);

  // Close cart if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const removeFromCart = (id) => {
    const updated = cart.filter((b) => b.Id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    // Notify BookCard to untoggle icon
    window.dispatchEvent(new Event("cartChanged"));
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, book) => sum + parseFloat(book.price),
    0
  );

  return (
    <div className={`cart-overlay ${isOpen ? "open" : ""}`}>
      <div className="cart-panel" ref={cartRef}>
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty 🛒</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((book) => (
                <li key={book.Id} className="cart-item">
                  <img
                    src={`http://localhost:3001/uploads/${book.img}`}
                    alt={book.title}
                    className="cart-img"
                  />
                  <div className="cart-info">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <p className="current-price">${book.price}</p>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(book.Id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total Price + Checkout */}
            <div className="cart-total">
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
