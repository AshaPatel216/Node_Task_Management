/**
 * The main layout component for the authenticated part of the application.
 * It arranges the Sidebar, Header, and the main content area (via <Outlet>).
 * It also manages the state for the mobile sidebar visibility.
 */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  // State to control the visibility of the sidebar on mobile devices
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggles the sidebar's open/closed state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Component */}
        <Header onMenuClick={toggleSidebar} />
        
        {/* Main Content Area */}
        {/* The <Outlet> component renders the matched nested route's component */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout; 