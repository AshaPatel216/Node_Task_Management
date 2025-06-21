/**
 * This file contains functions for making API calls related to tasks.
 * It centralizes all task-related API interactions.
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Creates and returns the authorization headers required for protected API calls.
 * @returns {object} - The headers object with the Authorization token.
 */
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

/**
 * Fetches all tasks for the authenticated user.
 * @returns {Promise<Array>} - A promise that resolves to an array of tasks.
 */
export const getTasks = async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
};

/**
 * Creates a new task.
 * @param {object} taskData - The data for the new task.
 * @returns {Promise<object>} - A promise that resolves to the newly created task object.
 */
export const createTask = async (taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData)
    });
    if (!response.ok) {
        throw new Error('Failed to create task');
    }
    return response.json();
};

/**
 * Updates an existing task.
 * @param {number|string} taskId - The ID of the task to update.
 * @param {object} taskData - The new data for the task.
 * @returns {Promise<object>} - A promise that resolves to the updated task object.
 */
export const updateTask = async (taskId, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData)
    });
    if (!response.ok) {
        throw new Error('Failed to update task');
    }
    return response.json();
};

/**
 * Deletes a task by its ID.
 * @param {number|string} taskId - The ID of the task to delete.
 * @returns {Promise<object>} - A promise that resolves to a success object.
 */
export const deleteTask = async (taskId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
    // A 204 No Content response does not have a JSON body, so we return a success indicator.
    return { success: true }; 
}; 