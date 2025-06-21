/**
 * A reusable dialog component to confirm a delete action.
 * It displays a confirmation message and provides options to either
 * confirm or cancel the action.
 */
import React from 'react';

const DeleteDialog = ({ isOpen, onClose, onConfirm, loading }) => {
  // Do not render the component if it's not open.
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Cancel
          </button>
          {/* Confirm Deletion Button */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog; 