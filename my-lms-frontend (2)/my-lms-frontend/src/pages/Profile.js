import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the user's profile
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Profile Information
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 input-field"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 input-field"
              />
            </div>

            {isEditing && (
              <>
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="mt-1 input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="mt-1 input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 input-field"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Account Settings
          </h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Email Notifications
                </p>
                <p className="text-sm text-gray-500">
                  Receive email updates about your courses and progress
                </p>
              </div>
              <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span className="sr-only">Enable email notifications</span>
                <span
                  className="translate-x-0 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                >
                  <span
                    className="opacity-100 duration-200 ease-in absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-3 w-3 text-gray-400"
                      fill="none"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <button className="btn-secondary">Enable</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 