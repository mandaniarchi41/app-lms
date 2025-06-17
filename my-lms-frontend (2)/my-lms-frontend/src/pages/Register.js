import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/student/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex bg-primary-background text-primary-text">
        {/* Left side - Register Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-secondary-background p-8 rounded-lg shadow-lg text-secondary-text">
            <div>
              <h2 className="mt-6 text-center text-3xl font-['Playfair_Display'] font-bold">
                Create Your Account
              </h2>
              <p className="mt-2 text-center text-sm font-['Open_Sans']">
                Or{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-text hover:text-[#5C6BC0] transition-colors duration-200"
                >
                  sign in to your existing account
                </Link>
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium font-['Montserrat'] text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-border-light placeholder-gray-500 text-secondary-text rounded-md focus:outline-none focus:ring-primary-text focus:border-primary-text focus:z-10 sm:text-sm bg-primary-background"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium font-['Montserrat'] text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-border-light placeholder-gray-500 text-secondary-text rounded-md focus:outline-none focus:ring-primary-text focus:border-primary-text focus:z-10 sm:text-sm bg-primary-background"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
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
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-border-light placeholder-gray-500 text-secondary-text rounded-md focus:outline-none focus:ring-primary-text focus:border-primary-text focus:z-10 sm:text-sm bg-primary-background"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium font-['Montserrat'] text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-border-light placeholder-gray-500 text-secondary-text rounded-md focus:outline-none focus:ring-primary-text focus:border-primary-text focus:z-10 sm:text-sm bg-primary-background"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-background bg-primary-text hover:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-text transition-colors duration-200"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Image/Info */}
        <div className="hidden lg:block relative w-0 flex-1 bg-secondary-background text-secondary-text">
          <div className="absolute inset-0 flex flex-col justify-center px-12">
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-primary-text mb-4 leading-tight">
              Join Our Learning Community
            </h2>
            <p className="text-xl text-gray-700 font-['Open_Sans'] leading-relaxed">
              Get access to premium courses and start your journey to success.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#B0BEC5] text-primary-text">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-800 font-['Montserrat']">Free Trial Available</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#B0BEC5] text-primary-text">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-800 font-['Montserrat']">Money-back Guarantee</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#B0BEC5] text-primary-text">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-800 font-['Montserrat']">Instant Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register; 