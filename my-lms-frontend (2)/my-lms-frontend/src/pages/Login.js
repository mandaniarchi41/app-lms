import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex bg-primary-background text-primary-text">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-secondary-background p-8 rounded-lg shadow-lg text-secondary-text">
            <div>
              <h2 className="mt-6 text-center text-3xl font-['Playfair_Display'] font-bold">
                Welcome Back!
              </h2>
              <p className="mt-2 text-center text-sm font-['Open_Sans']">
                Or{' '}
                <Link
                  to="/register"
                  className="font-medium text-primary-text hover:text-[#5C6BC0] transition-colors duration-200"
                >
                  create a new account
                </Link>
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email-address" className="block text-sm font-medium font-['Montserrat'] text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-border-light placeholder-gray-500 text-secondary-text rounded-md focus:outline-none focus:ring-primary-text focus:border-primary-text focus:z-10 sm:text-sm bg-primary-background"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium font-['Montserrat'] text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-border-light placeholder-gray-500 text-secondary-text rounded-md focus:outline-none focus:ring-primary-text focus:border-primary-text focus:z-10 sm:text-sm bg-primary-background"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-text focus:ring-primary-text border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-['Open_Sans']">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-text hover:text-[#5C6BC0] transition-colors duration-200">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-background bg-primary-text hover:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-text transition-colors duration-200"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Image/Info */}
        <div className="hidden lg:block relative w-0 flex-1 bg-secondary-background text-secondary-text">
          <div className="absolute inset-0 flex flex-col justify-center px-12">
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-primary-text mb-4 leading-tight">
              Start Your Learning Journey Today
            </h2>
            <p className="text-xl text-gray-700 font-['Open_Sans'] leading-relaxed">
              Access thousands of courses from expert instructors and advance your career.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#B0BEC5] text-primary-text"> {/* Adjusted icon background */}
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-800 font-['Montserrat']">Expert Instructors</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#B0BEC5] text-primary-text"> {/* Adjusted icon background */}
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-800 font-['Montserrat']">Flexible Learning</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#B0BEC5] text-primary-text"> {/* Adjusted icon background */}
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-800 font-['Montserrat']">Certification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login; 