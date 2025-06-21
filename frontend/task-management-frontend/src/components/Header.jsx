/**
 * Header component displayed at the top of the main layout.
 * It includes a menu button to toggle the sidebar on mobile
 * and displays a welcome message with the user's name.
 */
import React from 'react';

const Header = ({ onMenuClick }) => {
  // Retrieve user information from localStorage to display their name.
  // A default empty object handles cases where the user is not found.
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side: Menu button (mobile) and page title */}
        <div className="flex items-center">
          {/* This button is only visible on smaller (lg) screens */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <h1 className="ml-4 lg:ml-0 text-xl font-semibold text-gray-900">
            Task Management
          </h1>
        </div>
        
        {/* Right side: User information and avatar */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <div className="text-sm text-gray-700">
              Welcome, <span className="font-medium">{user.name || 'User'}</span>
            </div>
          </div>
          
          {/* User avatar with the first initial of their name */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 