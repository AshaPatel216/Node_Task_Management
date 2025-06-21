/**
 * Tasks page component.
 * This component is responsible for displaying, creating, updating, and deleting tasks.
 * It uses a Zustand store for state management and interacts with common dialog components.
 */
import React, { useState, useEffect } from 'react';
import useTaskStore from '../store/useTaskStore';
import TaskDialog from '../components/TaskDialog';
import DeleteDialog from '../components/DeleteDialog';

const Tasks = () => {
  // State from the Zustand store
  const { tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask } = useTaskStore();

  // Local state for managing dialog visibility and the currently selected task
  const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks from the API when the component first mounts.
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handlers for opening dialogs
  const handleOpenAddTaskDialog = () => {
    setSelectedTask(null); // Ensure no task is selected for "add" mode
    setTaskDialogOpen(true);
  };

  const handleOpenEditTaskDialog = (task) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
  };

  const handleOpenDeleteDialog = (task) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };
  
  // Closes all dialogs and resets the selected task
  const handleCloseDialogs = () => {
    setTaskDialogOpen(false);
    setDeleteDialogOpen(false);
    setSelectedTask(null);
  };

  // Handles both creating a new task and updating an existing one.
  const handleSaveTask = async (formData) => {
    try {
      if (selectedTask) {
        // If a task is selected, update it
        await updateTask(selectedTask.id, formData);
      } else {
        // Otherwise, create a new task
        await addTask(formData);
      }
      handleCloseDialogs(); // Close dialog on success
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };
  
  // Confirms and executes the delete operation.
  const handleDeleteConfirm = async () => {
    if (selectedTask) {
      try {
        await deleteTask(selectedTask.id);
        handleCloseDialogs();
      } catch (err) {
        console.error("Failed to delete task:", err);
      }
    }
  };

  // Helper functions to determine Tailwind CSS classes for styling
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Manage your tasks and track progress</p>
        </div>
        <button
          onClick={handleOpenAddTaskDialog}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Task
        </button>
      </div>

      {/* Conditional rendering based on loading and error state */}
      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">All Tasks</h3>
            {tasks.length > 0 ? (
              // If tasks exist, map over them and render the list
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                          <span className="text-gray-500 text-sm">
                            Due: {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {/* Action buttons for each task */}
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleOpenEditTaskDialog(task)} className="text-blue-600 hover:text-blue-800">Edit</button>
                        <button onClick={() => handleOpenDeleteDialog(task)} className="text-red-600 hover:text-red-800">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // If no tasks exist, show an informative message
              <div className="text-center py-10 border-t">
                <h3 className="text-lg font-medium text-gray-800">No Tasks Found</h3>
                <p className="text-gray-500 mt-2">
                  Click the "+ Add Task" button to create your first task.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reusable dialog components */}
      <TaskDialog 
        isOpen={isTaskDialogOpen}
        onClose={handleCloseDialogs}
        onSave={handleSaveTask}
        task={selectedTask}
        loading={loading}
      />
      <DeleteDialog 
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDialogs}
        onConfirm={handleDeleteConfirm}
        loading={loading}
      />
    </div>
  );
};

export default Tasks; 