/**
 * Zustand store for managing global state related to tasks.
 * This store centralizes task data, loading states, and error handling,
 * providing a single source of truth for all task-related operations.
 */
import { create } from 'zustand';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

const useTaskStore = create((set) => ({
  // The array of tasks fetched from the API.
  tasks: [],
  // A boolean to indicate when an API call is in progress.
  loading: false,
  // Holds any error messages from API calls.
  error: null,
  
  /**
   * Fetches all tasks from the API and updates the state.
   */
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await getTasks();
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  /**
   * Creates a new task, adds it to the local state, and calls the API.
   * @param {object} taskData - The data for the new task.
   */
  addTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      const newTask = await createTask(taskData);
      // Add the new task to the beginning of the tasks array for immediate UI update.
      set((state) => ({
        tasks: [newTask, ...state.tasks],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error; // Re-throw to allow components to handle the error.
    }
  },

  /**
   * Updates an existing task in the state and on the server.
   * @param {number|string} taskId - The ID of the task to update.
   * @param {object} taskData - The new data for the task.
   */
  updateTask: async (taskId, taskData) => {
    set({ loading: true, error: null });
    try {
      const updatedTask = await updateTask(taskId, taskData);
      // Replace the old task with the updated one in the state.
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? updatedTask : task
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Deletes a task from the state and the server.
   * @param {number|string} taskId - The ID of the task to delete.
   */
  deleteTask: async (taskId) => {
    set({ loading: true, error: null });
    try {
      await deleteTask(taskId);
      // Filter out the deleted task from the state.
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));

export default useTaskStore; 