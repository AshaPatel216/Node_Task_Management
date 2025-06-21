/**
 * This file defines the API routes for task management (CRUD operations).
 * All routes in this file are protected and require user authentication.
 */
const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply the authentication middleware to all routes in this file.
router.use(authMiddleware);

/**
 * Route: GET /api/tasks
 * Description: Retrieves all tasks for the currently authenticated user.
 */
router.get('/', async (req, res) => {
  try {
    const tasks = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(tasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Route: POST /api/tasks
 * Description: Creates a new task for the authenticated user.
 * Body: { title, description, priority, due_date, status }
 */
router.post('/', async (req, res) => {
  const { title, description, priority, due_date, status } = req.body;

  // Server-side validation to ensure all required fields are provided.
  if (!title || !description || !priority || !due_date || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newTask = await pool.query(
      'INSERT INTO tasks (user_id, title, description, priority, due_date, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [req.user.id, title, description, priority, due_date, status]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Route: PUT /api/tasks/:id
 * Description: Updates an existing task.
 * Params: id - The ID of the task to update.
 * Body: { title, description, priority, due_date, status }
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, due_date, status } = req.body;

  // Server-side validation.
  if (!title || !description || !priority || !due_date || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedTask = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, priority = $3, due_date = $4, status = $5 WHERE id = $6 AND user_id = $7 RETURNING *',
      [title, description, priority, due_date, status, id, req.user.id]
    );

    // Check if the task exists and belongs to the user.
    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found or user not authorized' });
    }
    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Route: DELETE /api/tasks/:id
 * Description: Deletes a task.
 * Params: id - The ID of the task to delete.
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTask = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    // Check if the task existed and belonged to the user.
    if (deleteTask.rowCount === 0) {
        return res.status(404).json({ error: 'Task not found or user not authorized' });
    }
    res.status(204).send(); // Success, no content to send back.
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 