import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import MyAccount from "./pages/MyAccount";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // global search state

  return (
    <Router>
      <ScrollToTop />
      <div className="main-app">
        {/* Pass setSearchQuery to Navbar */}
        <Navbar setSearchQuery={setSearchQuery} />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* Pass searchQuery to Shop */}
          <Route path="/shop" element={<Shop searchQuery={searchQuery} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/search" element={<h1>Search Page</h1>} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<h1>Cart Page</h1>} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
