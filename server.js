// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",   // change if your MySQL username is different
  password: "Saha@2005",   // put your MySQL password
  database: "ticket_system"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database.");
});

// ------------------ ROUTES ------------------

// Register User
app.post("/register", (req, res) => {
  const { username, email, phone, idProof, password } = req.body;

  // Check if user already exists
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Insert new user
    const sql = "INSERT INTO users (username, email, phone, idProof, password) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [username, email, phone, idProof, password], (err) => {
      if (err) return res.status(500).json({ error: "Failed to register user" });
      res.json({ message: "Registration successful!" });
    });
  });
});

// Login User
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result[0];
    if (user.password === password) {
      res.json({ message: "Login successful", user });
    } else {
      res.status(400).json({ error: "Incorrect password" });
    }
  });
});

// -------------------------------------------

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
//------------------------------------------
app.get("/places", (req, res) => {
  const sql = "SELECT * FROM city_data";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send("Database error");
    }
    res.json(results);
  });
});
