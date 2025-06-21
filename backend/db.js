/**
 * This file configures and exports the PostgreSQL database connection pool.
 * Using a connection pool is efficient for managing multiple concurrent database connections.
 */

const { Pool } = require('pg');
require('dotenv').config();

// Create a new connection pool with database credentials.
// These credentials should ideally be stored in environment variables for security.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Export the pool to be used in other parts of the application
module.exports = pool;
