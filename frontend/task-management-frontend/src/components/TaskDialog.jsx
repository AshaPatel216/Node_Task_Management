/**
 * A reusable dialog (modal) component for creating and editing tasks.
 * It contains a form with fields for task details and handles its own
 * state for form data and validation errors.
 */
import React, { useState, useEffect } from 'react';

const TaskDialog = ({ isOpen, onClose, onSave, task, loading }) => {
  // State for form input values
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
    status: 'pending',
  });
  // State for form validation errors
  const [errors, setErrors] = useState({});

  // Effect to populate or reset the form when the dialog is opened or the task changes.
  useEffect(() => {
    if (task) {
      // If a task is being edited, populate the form with its data.
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        due_date: task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : '',
        status: task.status || 'pending',
      });
    } else {
      // If creating a new task, reset the form to its initial state.
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
        status: 'pending',
      });
    }
    // Clear any previous validation errors when the dialog opens.
    setErrors({});
  }, [task, isOpen]);

  // Generic handler to update form data state on input changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Client-side validation logic.
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.due_date) newErrors.due_date = 'Due date is required';
    setErrors(newErrors);
    // Return true if there are no errors.
    return Object.keys(newErrors).length === 0;
  };

  // Handles form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Only call the onSave prop if validation passes.
    if (validate()) {
      onSave(formData);
    }
  };

  // Do not render the component if it's not open.
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{task ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              rows="3"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Priority Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority <span className="text-red-500">*</span>
              </label>
              <select 
                name="priority" 
                value={formData.priority} 
                onChange={handleChange} 
                className={`w-full px-3 py-2 border rounded-md ${errors.priority ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority}</p>}
            </div>
            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange} 
                className={`w-full px-3 py-2 border rounded-md ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
            </div>
          </div>
          {/* Due Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.due_date ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.due_date && <p className="text-red-500 text-xs mt-1">{errors.due_date}</p>}
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDialog; 