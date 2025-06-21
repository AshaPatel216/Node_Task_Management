/**
 * Main application entry file for the backend server.
 * This file sets up the Express server, configures middleware,
 * and defines the API routes.
 */

const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db'); // database connection
const authRoutes = require('./routes/auth'); // authentication routes
const taskRoutes = require('./routes/tasks'); // Import task routes

// Middleware setup
app.use(express.json()); // Parses incoming JSON requests
app.use(cors());         // Enables Cross-Origin Resource Sharing

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Task Management API is running!' });
});

// API routes
app.use('/api', authRoutes);     // Mounts authentication routes (e.g., /api/login, /api/register)
app.use('/api/tasks', taskRoutes); // Mounts task-related routes (e.g., /api/tasks)

// Routes
// Test DB route
app.get("/api/test-db", async (req, res) => {
    try {
      const result = await pool.query("SELECT NOW()");
      res.json({ time: result.rows[0].now });
    } catch (err) {
      res.status(500).json({ error: "Database error" });
    }
  });

// Server initialization
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
