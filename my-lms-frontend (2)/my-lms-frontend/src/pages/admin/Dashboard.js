import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Mock data for dashboard stats
  const stats = [
    {
      id: 1,
      name: 'Total Users',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
    },
    {
      id: 2,
      name: 'Active Courses',
      value: '45',
      change: '+5%',
      changeType: 'increase',
    },
    {
      id: 3,
      name: 'Total Assessments',
      value: '89',
      change: '-2%',
      changeType: 'decrease',
    },
    {
      id: 4,
      name: 'Average Score',
      value: '78%',
      change: '+4%',
      changeType: 'increase',
    },
  ];

  return (
    <div className="space-y-8 text-primary-text">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-['Playfair_Display'] font-bold">Admin Panel</h1>
        <div className="flex space-x-4">
          {/* These buttons might need specific styling based on usage in other admin pages */}
          {/* <Link to="/admin/upload-course" className="btn-primary">
            Upload Course
          </Link>
          <Link to="/admin/upload-assessment" className="btn-primary">
            Upload Assessment
          </Link> */}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-secondary-background overflow-hidden shadow rounded-lg text-secondary-text"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="text-sm font-medium truncate">
                    {stat.name}
                  </div>
                  <div className="mt-1 text-3xl font-semibold">
                    {stat.value}
                  </div>
                </div>
                <div
                  className={`flex-shrink-0 ${
                    stat.changeType === 'increase'
                      ? 'text-green-600' // Keep green for increase
                      : 'text-red-600' // Keep red for decrease
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-secondary-background shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-['Playfair_Display'] font-medium leading-6 text-secondary-text">
            Quick Actions
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/admin/users"
              className="relative rounded-lg border border-gray-300 bg-secondary-background px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary-dark-blue transition-colors duration-200 text-secondary-text"
            >
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-500" // Adjust icon color if needed
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium">Manage Users</p>
                <p className="mt-1 text-sm text-gray-600">View and manage user accounts</p> {/* Adjust text color */}
              </div>
            </Link>

            <Link
              to="/admin/analytics"
              className="relative rounded-lg border border-gray-300 bg-secondary-background px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary-dark-blue transition-colors duration-200 text-secondary-text"
            >
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-500" // Adjust icon color if needed
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium">View Analytics</p>
                <p className="mt-1 text-sm text-gray-600">Track platform performance</p> {/* Adjust text color */}
              </div>
            </Link>

            <Link
              to="/admin/upload-course"
              className="relative rounded-lg border border-gray-300 bg-secondary-background px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary-dark-blue transition-colors duration-200 text-secondary-text"
            >
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-500" // Adjust icon color if needed
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium">Add New Course</p>
                <p className="mt-1 text-sm text-gray-600">Create and upload course content</p> {/* Adjust text color */}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Example of an assessment list item - assuming similar styling for other lists/tables */}
      {/* You would likely map through actual assessment data here */}
      <div className="bg-secondary-background shadow rounded-lg p-6 text-secondary-text">
        <h3 className="text-xl font-['Playfair_Display'] font-semibold">JavaScript Fundamentals</h3>
        <p className="mt-2 text-gray-600">Test your knowledge of JavaScript basics including variables, functions, and control flow.</p> {/* Adjust text color */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500"> {/* Adjust text color */}
          <span>Free</span>
          <div className="flex items-center space-x-4">
            <i className="fas fa-lock"></i> {/* Example icon - replace with actual data/icons */}
            <i className="fas fa-edit"></i>
            <i className="fas fa-trash-alt"></i>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard; 