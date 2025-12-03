import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // <-- Added
import BookCard from "../components/Bookcard";
import "../styles/Shop.css";

function Shop({ searchQuery }) {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  const location = useLocation(); // <-- Get query params

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

        // Check query param from URL
        const params = new URLSearchParams(location.search);
        const category = params.get("category");
        if (category) {
          const found = fixedGenres.find(
            (g) => g.name.toLowerCase() === category.toLowerCase()
          );
          if (found) setSelectedGenre(found.id);
        }
      })
      .catch((err) => console.log(err));
  }, [location.search]);

  // Fetch all books once
  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Reset page to 1 whenever search or genre changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre]);

  // Filter + sort + search
  const filteredBooks = books
    .filter(
      (book) =>
        (!selectedGenre || Number(book.genre_id) === Number(selectedGenre)) &&
        (!searchQuery ||
          book.title.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

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
                  Number(selectedGenre) === Number(genre.id)
                    ? "active-genre"
                    : ""
                }`}
                onClick={() =>
                  setSelectedGenre(
                    Number(selectedGenre) === Number(genre.id) ? null : genre.id
                  )
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
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <div key={book.Id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <BookCard book={book} />
                </div>
              ))
            ) : (
              <p className="text-muted">No books found.</p>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4 shop-pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                &lt;
              </button>
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
