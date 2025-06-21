/**
 * Authentication middleware to protect routes.
 * It verifies the JWT token from the Authorization header.
 * If the token is valid, it attaches the user's ID to the request object.
 */
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  // Extract token from "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token and decode its payload
    const decoded = jwt.verify(token, 'mysecretkey');
    // Attach user ID to the request object for use in subsequent routes
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    // If token is invalid or expired
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
