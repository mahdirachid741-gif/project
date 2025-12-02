import React, { useState, useEffect } from "react";
import "../styles/Wishlist.css";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((b) => b.Id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="wishlist-container">
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty. ❤️</p>
      ) : (
        <ul className="wishlist-items">
          {wishlist.map((book) => (
            <li key={book.Id} className="wishlist-item">
              <img
                src={`http://localhost:3001/uploads/${book.img}`}
                alt={book.title}
                className="wishlist-img"
              />
              <div className="wishlist-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p className="current-price">${book.price}</p>
                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(book.Id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
