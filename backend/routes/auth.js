/**
 * This file defines the routes for user authentication,
 * including user registration and login.
 */
const express = require("express");
const pool = require("../db");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Route: POST /api/register
 * Description: Registers a new user.
 * Body: { name, email, password }
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if a user with the same email already exists to prevent duplicates.
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password for security before storing it in the database.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database.
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    // Create a JWT token to automatically log the user in after registration.
    const token = jwt.sign({ id: newUser.rows[0].id }, "mysecretkey", { expiresIn: "1h" });

    // Respond with success message, token, and user info (excluding password).
    res.status(201).json({ 
      message: "User registered successfully", 
      token,
      user: {
        id: newUser.rows[0].id,
        name: newUser.rows[0].name,
        email: newUser.rows[0].email,
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * Route: POST /api/login
 * Description: Logs in an existing user.
 * Body: { email, password }
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by their email address.
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "User not found with this email" });
    }

    const user = userResult.rows[0];

    // Compare the provided password with the stored hashed password.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Create a JWT token for the authenticated user.
    const token = jwt.sign({ id: user.id }, "mysecretkey", { expiresIn: "1h" });

    // Respond with success message, token, and user info (excluding password).
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
