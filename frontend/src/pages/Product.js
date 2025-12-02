import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Product.css";
import { useParams } from "react-router-dom";
import { FaHeart, FaCartPlus } from "react-icons/fa";

function Product() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/books") // get all books
      .then((res) => {
        const foundBook = res.data.find((b) => String(b.Id) === String(id));
        setBook(foundBook || null);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (!book) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    setIsInWishlist(wishlist.some((b) => b.Id === book.Id));
    setIsInCart(cart.some((b) => b.Id === book.Id));
  }, [book]);

  const handleWishlistToggle = () => {
    if (!book) return;
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

  const handleCartToggle = () => {
    if (!book) return;
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

  if (!book) return <div className="loading">Book not found...</div>;

  return (
    <div className="container product-page mt-5">
      <div className="row">
        <div className="col-lg-5 col-md-6 col-sm-12 d-flex justify-content-center">
          <img
            src={`http://localhost:3001/uploads/${book.img}`}
            alt={book.title}
            className="product-image"
          />
        </div>

        <div className="col-lg-7 col-md-6 col-sm-12 product-details">
          <h2 className="product-title">{book.title}</h2>
          {book.author && <p className="product-author">By {book.author}</p>}

          <div className="product-price-box">
            <span className="product-price">${book.price}</span>
            {book.old_price && (
              <span className="product-old-price">${book.old_price}</span>
            )}
          </div>

          <p className="product-description">{book.description}</p>

          <div className="product-actions mt-4">
            <button
              className="btn btn-primary add-cart-btn"
              onClick={handleCartToggle}
            >
              <FaCartPlus className="me-2" />
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>

            <button
              className="btn btn-outline-secondary wishlist-btn"
              onClick={handleWishlistToggle}
            >
              <FaHeart className="me-2" />
              {isInWishlist ? "Remove from Wishlist" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
