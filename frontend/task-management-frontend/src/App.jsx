/**
 * The main application component.
 * It sets up the routing for the entire application, distinguishing
 * between public routes (Login, Register) and protected routes.
 */
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';

/**
 * A component to protect routes that require authentication.
 * It checks for a 'token' in localStorage. If the token exists,
 * it renders the child components; otherwise, it redirects to the login page.
 * @param {{ children: React.ReactNode }} props
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Public routes accessible without authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes that require authentication, wrapped in the main Layout */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Nested routes that will be rendered inside the Layout's <Outlet> */}
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="projects" element={<div className="p-6"><h1 className="text-2xl font-bold">Projects</h1><p>Projects page coming soon...</p></div>} />
        <Route path="calendar" element={<div className="p-6"><h1 className="text-2xl font-bold">Calendar</h1><p>Calendar page coming soon...</p></div>} />
        <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Settings page coming soon...</p></div>} />
      </Route>
      
      {/* Fallback route to redirect any unknown paths to the login page */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
