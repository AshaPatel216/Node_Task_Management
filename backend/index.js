const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db'); // database connection
const authRoutes = require('./routes/auth'); // authentication routes

app.use(express.json()); // to parse the request body
app.use(cors()); // to allow requests from different origins

app.use('/api', authRoutes); // authentication routes

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


// Server is running on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
