import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., check localStorage or session)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Predefined mock users for specific roles
      const mockUsers = [
        {
          id: 1,
          email: 'student@example.com',
          password: 'password123',
          name: 'John Student',
          role: 'student',
        },
        {
          id: 2,
          email: 'admin@example.com',
          password: 'password123',
          name: 'Admin User',
          role: 'admin',
        },
      ];

      // Check if the entered credentials match a mock user
      let user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      // If not a mock user, check if email exists in localStorage (for previously created students)
      if (!user) {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        user = existingUsers.find(u => u.email === email);

        // If email doesn't exist, create a new student user
        if (!user) {
          user = {
            id: Date.now(),
            email,
            name: email.split('@')[0], // Use part of email as name
            role: 'student', // Default role for new users
          };
          existingUsers.push(user);
          localStorage.setItem('users', JSON.stringify(existingUsers));
        }
      }

      // If user is found (either mock or existing/new student)
      if (user) {
        // For mock users, remove password before storing
        const userToStore = user.password ? { ...user, password: undefined } : user;
        setUser(userToStore);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userToStore));
        toast.success('Login successful!');
        return userToStore;
      } else {
        // This case should ideally not be reached with the new user creation logic,
        // but kept as a fallback for clarity.
         throw new Error('Invalid credentials');
      }

    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      // In a real app, this would be an API call
      // Mock registration for demonstration
      const newUser = {
        id: Date.now(),
        name,
        email,
        role: 'student', // Default role for new registrations
      };

      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Registration successful!');
      return newUser;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Profile updated successfully!');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 