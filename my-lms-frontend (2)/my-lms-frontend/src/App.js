import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/student/Dashboard';
import StudentCourses from './pages/student/Courses';
import CourseDetails from './pages/CourseDetails';
import StudentProfile from './pages/student/Profile';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import UploadCourse from './pages/admin/UploadCourse';
import Users from './pages/admin/Users';
import Analytics from './pages/admin/Analytics';
import CoursesPage from './pages/Courses';
import SelfAssessmentPage from './assessment/pages/SelfAssessmentPage';

// Add global styles
import './styles/globals.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#E5E5E5',
              border: '1px solid #FFD700',
            },
          }}
        />
        <div className="min-h-screen">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<CoursesPage />} />

              {/* Student Routes */}
              <Route path="/student/dashboard" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/student/courses" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentCourses />
                </ProtectedRoute>
              } />
              <Route path="/courses/:id" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <CourseDetails />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute allowedRoles={['student', 'admin']}>
                  <StudentProfile />
                </ProtectedRoute>
              } />
              <Route path="/self-assessments" element={
                <ProtectedRoute allowedRoles={['student', 'admin']}>
                  <SelfAssessmentPage />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/upload-course" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UploadCourse />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Users />
                </ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Analytics />
                </ProtectedRoute>
              } />

              {/* Redirect to home if no route matches */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App; 