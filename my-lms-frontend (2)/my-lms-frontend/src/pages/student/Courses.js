import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data from the server
    // Mock data for demonstration
    setEnrolledCourses([
      {
        id: 1,
        title: 'Web Development Bootcamp',
        instructor: 'John Doe',
        progress: 65,
        thumbnail: 'https://via.placeholder.com/300x200',
        category: 'Web Development',
        level: 'Beginner',
      },
      {
        id: 2,
        title: 'Data Science Fundamentals',
        instructor: 'Jane Smith',
        progress: 30,
        thumbnail: 'https://via.placeholder.com/300x200',
        category: 'Data Science',
        level: 'Intermediate',
      },
    ]);

    setAvailableCourses([
      {
        id: 3,
        title: 'Machine Learning Basics',
        instructor: 'Alex Johnson',
        thumbnail: 'https://via.placeholder.com/300x200',
        category: 'Data Science',
        level: 'Advanced',
        price: '$49.99',
      },
      {
        id: 4,
        title: 'Mobile App Development',
        instructor: 'Sarah Wilson',
        thumbnail: 'https://via.placeholder.com/300x200',
        category: 'Mobile Development',
        level: 'Intermediate',
        price: '$39.99',
      },
    ]);

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-primary-text">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-text"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-primary-text bg-secondary-background p-4 rounded-lg">
      {/* Enrolled Courses Section */}
      <div>
        <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-6">Your Enrolled Courses</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="card overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-['Playfair_Display'] font-medium text-primary-text">{course.title}</h3>
                <p className="text-sm text-gray-700 font-['Open_Sans']">Instructor: {course.instructor}</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm text-primary-text/80 font-['Open_Sans']">
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
                  <span className="text-sm text-primary-text/80 font-['Open_Sans']">{course.level}</span>
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

      {/* Available Courses Section */}
      <div>
        <h2 className="text-2xl font-['Playfair_Display'] font-bold mb-6">Available Courses</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {availableCourses.map((course) => (
            <div key={course.id} className="card overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-['Playfair_Display'] font-medium text-primary-text">{course.title}</h3>
                <p className="text-sm text-gray-700 font-['Open_Sans']">Instructor: {course.instructor}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="px-2 py-1 text-xs font-medium bg-secondary-background text-gray-700 rounded">
                    {course.category}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-[#CFD8DC] text-primary-text rounded">
                    {course.level}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-text">{course.price}</span>
                  <button className="btn-primary text-sm">Enroll Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses; 