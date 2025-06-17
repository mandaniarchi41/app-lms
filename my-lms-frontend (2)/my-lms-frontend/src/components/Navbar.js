import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from './logo.jpg';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary-background shadow-lg font-['Montserrat']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between h-auto sm:h-20 py-4 sm:py-0">
          {/* Logo Section */}
          <div className="flex items-center justify-between sm:justify-start mb-4 sm:mb-0">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 sm:h-10 w-auto"
                src={logo}
                alt="The Catalystz"
              />
            </Link>
            
            {/* Mobile Menu Button - Add this if you want a hamburger menu */}
            <button className="sm:hidden text-primary-text hover:text-[#5C6BC0]">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Courses Link (visible to all) */}
            <Link
              to="/courses"
              className="text-primary-text hover:text-[#5C6BC0] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center w-full sm:w-auto justify-center sm:justify-start"
            >
              <i className="fas fa-book-open mr-1"></i> All Courses
            </Link>

            {/* Self-Assessments Link */}
            <Link
              to="/self-assessments"
              className="text-primary-text hover:text-[#5C6BC0] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center w-full sm:w-auto justify-center sm:justify-start"
            >
              <i className="fas fa-tasks mr-1"></i> Self-Assessments
            </Link>

            {isAuthenticated ? (
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
                <Link
                  to="/student/dashboard"
                  className="text-primary-text hover:text-[#5C6BC0] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center w-full sm:w-auto justify-center sm:justify-start"
                >
                  <i className="fas fa-tachometer-alt mr-1"></i> Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-primary-text hover:text-[#5C6BC0] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center w-full sm:w-auto justify-center sm:justify-start"
                >
                  <i className="fas fa-user mr-1"></i> Profile
                </Link>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-text text-primary-background font-bold text-lg">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'D'}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-primary-text hover:text-[#5C6BC0] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center w-full sm:w-auto justify-center sm:justify-start"
                >
                  <i className="fas fa-sign-out-alt mr-1"></i> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <Link
                  to="/login"
                  className="text-primary-text hover:text-[#5C6BC0] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 w-full sm:w-auto text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm font-medium w-full sm:w-auto text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 