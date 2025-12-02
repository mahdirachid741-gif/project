const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express(); // ✅ app must be created first
app.use("/uploads", express.static("uploads")); // ✅ now this works

const PORT = 3001;

app.use(cors());
app.use(express.json());

// ----- MySQL Connection -----
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "books",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// ----- Test route -----
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ----- Genres route -----
app.get("/genres", (req, res) => {
  db.query("SELECT * FROM genres", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ----- Books route -----
app.get("/books", (req, res) => {
  db.query("SELECT * FROM book", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ----- Books by genre -----
app.get("/books/genre/:id", (req, res) => {
  const genreId = req.params.id;

  db.query(
    "SELECT * FROM book WHERE genre_id = ?",
    [genreId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

// ----- Start server -----
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
