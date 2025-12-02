import React from "react";
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
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="main-app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/search" element={<h1>Search Page</h1>} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<h1>Cart Page</h1>} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
