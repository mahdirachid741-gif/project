import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import BooksImage from "../images/images.png";

function Home() {
  const navigate = useNavigate();

  // Helper to navigate to shop with a category
  const goToGenre = (genre) => {
    navigate(`/shop?category=${genre.toLowerCase()}`);
  };

  const genres = [
    "Fantasy",
    "Romance",
    "Horror",
    "Mystery",
    "Adventure",
    "Sci-Fi",
  ];

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
            {genres.concat(genres).map((genre, index) => (
              <div
                key={index}
                className="genre-big-card"
                onClick={() => goToGenre(genre)}
              >
                {genre}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
