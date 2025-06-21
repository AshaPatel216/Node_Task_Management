/**
 * Sidebar component for navigation.
 * It includes a list of navigation links and a logout button.
 * It is responsive and can be toggled on mobile devices.
 */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // Clears user data from localStorage and redirects to the login page.
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Defines the menu items for navigation.
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Tasks', path: '/tasks', icon: '📋' },
    { name: 'Projects', path: '/projects', icon: '📁' },
    { name: 'Calendar', path: '/calendar', icon: '📅' },
    { name: 'Settings', path: '/settings', icon: '⚙️' }
  ];

  return (
    <>
      {/* Overlay for mobile view, which closes the sidebar when clicked. */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* The main sidebar container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo section */}
        <div className="flex items-center justify-center h-16 bg-blue-600 text-white">
          <h1 className="text-xl font-bold">Task Manager</h1>
        </div>
        
        {/* Navigation menu */}
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                // Applies active styles to the link based on the current route.
                className={({ isActive }) => `
                  flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
                    : 'hover:bg-gray-100'
                  }
                `}
                // Closes sidebar on mobile after a link is clicked.
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </nav>
        
        {/* Logout button at the bottom of the sidebar */}
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
          >
            <span className="mr-3 text-lg">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 