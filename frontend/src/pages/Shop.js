import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/Bookcard";
import "../styles/Shop.css";

function Shop() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sort, setSort] = useState("");

  // Fetch genres on load
  useEffect(() => {
    axios
      .get("http://localhost:3001/genres")
      .then((res) => {
        const fixedGenres = res.data.map((g) => ({
          id: g.Id,
          name: g.Type,
        }));
        setGenres(fixedGenres);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch all books once
  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Derived filtered + sorted books
  const displayedBooks = books
    .filter((book) => !selectedGenre || book.genre_id === selectedGenre)
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="container shop-layout mt-5">
      <div className="row">
        {/* SIDEBAR */}
        <div className="col-lg-3 col-md-4 col-sm-12 mb-4">
          {/* GENRES */}
          <div className="sidebar-box">
            <h5 className="sidebar-title">Genres</h5>

            {genres.map((genre) => (
              <div
                key={genre.id}
                className={`genre-item ${
                  selectedGenre === genre.id ? "active-genre" : ""
                }`}
                onClick={() =>
                  setSelectedGenre(selectedGenre === genre.id ? null : genre.id)
                }
              >
                {genre.name}
              </div>
            ))}
          </div>

          {/* SORTING */}
          <div className="sidebar-box mt-4">
            <h5 className="sidebar-title">Sort By</h5>

            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Default</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* BOOK GRID */}
        <div className="col-lg-9 col-md-8 col-sm-12">
          <div className="row">
            {displayedBooks.length > 0 ? (
              displayedBooks.map((book) => (
                <div key={book.Id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <BookCard book={book} />
                </div>
              ))
            ) : (
              <p className="text-muted">No books found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
