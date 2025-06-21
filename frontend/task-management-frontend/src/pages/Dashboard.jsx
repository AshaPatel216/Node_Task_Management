/**
 * Dashboard page component.
 * This component serves as the main landing page after a user logs in,
 * displaying a welcome message, key statistics, and quick actions.
 */
import React from 'react';

const Dashboard = () => {
  // Static data for demonstration purposes.
  // In a real application, this data would be fetched from an API.
  const stats = [
    { title: 'Total Tasks', value: '12', change: '+2', changeType: 'positive' },
    { title: 'Completed', value: '8', change: '+1', changeType: 'positive' },
    { title: 'In Progress', value: '3', change: '0', changeType: 'neutral' },
    { title: 'Pending', value: '1', change: '+1', changeType: 'negative' }
  ];

  const recentTasks = [
    { title: 'Complete project proposal', status: 'pending', priority: 'high' },
    { title: 'Review code changes', status: 'in-progress', priority: 'medium' },
    { title: 'Update documentation', status: 'completed', priority: 'low' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-blue-100">Here's what's happening with your tasks today.</p>
      </div>

      {/* Grid of key statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 
                stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* List of recent tasks */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Tasks</h3>
          <div className="space-y-3">
            {recentTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="font-medium text-gray-900">{task.title}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-medium text-gray-900">Create New Task</h4>
              <p className="text-sm text-gray-600">Add a new task to your list</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="text-2xl mb-2">📁</div>
              <h4 className="font-medium text-gray-900">New Project</h4>
              <p className="text-sm text-gray-600">Start a new project</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-medium text-gray-900">View Reports</h4>
              <p className="text-sm text-gray-600">Check your progress</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 