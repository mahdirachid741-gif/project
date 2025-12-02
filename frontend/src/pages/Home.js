import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import BooksImage from "../images/images.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-right-content">
          <h1 className="hero-title">Discover Your Next Favourite Book</h1>

          <p className="hero-subtitle">
            Browse thousands of titles from all genres and find your perfect
            story.
          </p>

          <button className="hero-btn" onClick={() => navigate("/shop")}>
            Go to Shop
          </button>
        </div>

        <div className="hero-left-image">
          <img src={BooksImage} alt="Books" className="hero-image" />
        </div>
      </section>

      {/* GENRES SECTION */}
      <section className="genres-section">
        <h2 className="genres-title">Browse by Genre</h2>

        <div className="genres-scroll-wrapper">
          <div className="genres-scroll">
            <div className="genre-big-card">Fantasy</div>
            <div className="genre-big-card">Romance</div>
            <div className="genre-big-card">Horror</div>
            <div className="genre-big-card">Mystery</div>
            <div className="genre-big-card">Adventure</div>
            <div className="genre-big-card">Sci-Fi</div>

            {/* Duplicate for infinite scrolling */}
            <div className="genre-big-card">Fantasy</div>
            <div className="genre-big-card">Romance</div>
            <div className="genre-big-card">Horror</div>
            <div className="genre-big-card">Mystery</div>
            <div className="genre-big-card">Adventure</div>
            <div className="genre-big-card">Sci-Fi</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
