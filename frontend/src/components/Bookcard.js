import React, { useState, useEffect } from "react";
import "../styles/BookCard.css";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaCartPlus, FaEye } from "react-icons/fa";

function BookCard({ book }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate();

  // Check if book is in wishlist/cart
  useEffect(() => {
    const checkStatus = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      setIsInWishlist(wishlist.some((b) => b.Id === book.Id));
      setIsInCart(cart.some((b) => b.Id === book.Id));
    };

    checkStatus();

    // Listen for global changes from wishlist/cart
    window.addEventListener("wishlistChanged", checkStatus);
    window.addEventListener("cartChanged", checkStatus);

    return () => {
      window.removeEventListener("wishlistChanged", checkStatus);
      window.removeEventListener("cartChanged", checkStatus);
    };
  }, [book.Id]);

  // Toggle wishlist
  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isInWishlist) {
      wishlist = wishlist.filter((b) => b.Id !== book.Id);
    } else {
      wishlist.push(book);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsInWishlist(!isInWishlist);
    window.dispatchEvent(new Event("wishlistChanged"));
  };

  // Toggle cart
  const handleCartToggle = (e) => {
    e.stopPropagation();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (isInCart) {
      cart = cart.filter((b) => b.Id !== book.Id);
    } else {
      cart.push(book);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setIsInCart(!isInCart);
    window.dispatchEvent(new Event("cartChanged"));
  };

  // Navigate to Product page on eye icon click
  const handleViewProduct = (e) => {
    e.stopPropagation();
    navigate(`/product/${book.Id}`);
  };

  return (
    <div className="book-card">
      <div className="book-image-container">
        <img
          className="book-image"
          src={`http://localhost:3001/uploads/${book.img}`}
          alt={book.title}
        />

        <div className="book-icons">
          <button
            className={`icon-btn ${isInWishlist ? "active-wishlist" : ""}`}
            onClick={handleWishlistToggle}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FaHeart />
          </button>

          <button
            className={`icon-btn ${isInCart ? "active-cart" : ""}`}
            onClick={handleCartToggle}
            title={isInCart ? "Remove from cart" : "Add to cart"}
          >
            <FaCartPlus />
          </button>

          <button
            className="icon-btn"
            onClick={handleViewProduct}
            title="View Product"
          >
            <FaEye />
          </button>
        </div>
      </div>

      <h5 className="book-title mt-2">{book.title}</h5>

      <div className="book-price">
        <span className="current-price">${book.price}</span>
        {book.old_price && <span className="old-price">${book.old_price}</span>}
      </div>
    </div>
  );
}

export default BookCard;
