import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [upcomingAssessments, setUpcomingAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data from the server
    // Mock data for demonstration
    setEnrolledCourses([
      {
        id: 1,
        title: 'Web Development Bootcamp',
        progress: 65,
        lastAccessed: '2024-03-15',
        thumbnail: 'https://via.placeholder.com/300x200',
      },
      {
        id: 2,
        title: 'Data Science Fundamentals',
        progress: 30,
        lastAccessed: '2024-03-14',
        thumbnail: 'https://via.placeholder.com/300x200',
      },
    ]);

    setUpcomingAssessments([
      {
        id: 1,
        title: 'HTML & CSS Quiz',
        course: 'Web Development Bootcamp',
        dueDate: '2024-03-20',
        duration: 30,
      },
      {
        id: 2,
        title: 'JavaScript Basics Test',
        course: 'Web Development Bootcamp',
        dueDate: '2024-03-25',
        duration: 45,
      },
    ]);

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-primary-text">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-background"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-primary-text bg-secondary-background p-4 rounded-lg">
      {/* Welcome Section */}
      <div className="card">
        <h1 className="text-2xl font-['Playfair_Display'] font-bold">Welcome back!</h1>
        <p className="mt-2 text-gray-700 font-['Open_Sans']">
          Continue your learning journey from where you left off.
        </p>
      </div>

      {/* Enrolled Courses */}
      <div className="card">
        <div className="px-6 py-4 border-b border-border-light">
          <h2 className="text-xl font-['Playfair_Display'] font-semibold">Your Courses</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-primary-background border border-border-light rounded-lg overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-['Playfair_Display'] font-medium text-primary-text">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-700 font-['Open_Sans']">Instructor: {course.instructor}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="mt-1 w-full bg-secondary-background rounded-full h-2">
                      <div
                        className="bg-primary-text h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-['Open_Sans']">
                      Last accessed: {course.lastAccessed}
                    </span>
                    <Link
                      to={`/courses/${course.id}`}
                      className="btn-primary text-sm"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700 font-['Montserrat'] truncate">
                  Courses Enrolled
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-800">
                  {enrolledCourses.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700 font-['Montserrat'] truncate">
                  Average Progress
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-800">
                  {Math.round(
                    enrolledCourses.reduce((acc, course) => acc + course.progress, 0) /
                      enrolledCourses.length
                  )}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700 font-['Montserrat'] truncate">
                  Certificates Earned
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-800">2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 