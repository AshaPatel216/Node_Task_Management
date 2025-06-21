/**
 * This file contains functions for making API calls related to user authentication.
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Handles the user login API call.
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>} - The response data including token and user info.
 */
export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }
  
  // On successful login, store the token and user data in localStorage.
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  return data;
};

/**
 * Handles the user registration API call.
 * @param {object} userData - { name, email, password }
 * @returns {Promise<object>} - The response data.
 */
export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Registration failed');
  }
  
  // If the registration response includes a token, store it to log the user in.
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
}; 