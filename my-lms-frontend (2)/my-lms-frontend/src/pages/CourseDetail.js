import React from 'react';
import { useParams } from 'react-router-dom';

// Mock data for course details
const courseDetails = {
  id: 1,
  title: 'Introduction to Web Development',
  description: 'Learn the basics of web development including HTML, CSS, and JavaScript.',
  instructor: 'John Smith',
  duration: '8 weeks',
  level: 'Beginner',
  thumbnail: 'https://via.placeholder.com/1200x400',
  modules: [
    {
      id: 1,
      title: 'HTML Basics',
      description: 'Learn the fundamentals of HTML markup language.',
      duration: '2 hours',
      completed: true,
    },
    {
      id: 2,
      title: 'CSS Styling',
      description: 'Master CSS styling and layout techniques.',
      duration: '3 hours',
      completed: false,
    },
    {
      id: 3,
      title: 'JavaScript Fundamentals',
      description: 'Introduction to JavaScript programming.',
      duration: '4 hours',
      completed: false,
    },
  ],
};

const CourseDetail = () => {
  const { id } = useParams();
  const course = courseDetails; // In a real app, fetch course by id

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="mt-2 text-lg">{course.description}</p>
          </div>
        </div>
      </div>

      {/* Course Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900">Course Overview</h2>
            <p className="mt-2 text-gray-600">{course.description}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900">Course Modules</h2>
            <div className="mt-4 space-y-4">
              {course.modules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-500">{module.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Duration: {module.duration}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {module.completed ? (
                      <span className="text-green-600">Completed</span>
                    ) : (
                      <button className="btn-primary">Start Module</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900">Course Details</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Instructor</p>
                <p className="font-medium text-gray-900">{course.instructor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium text-gray-900">{course.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="font-medium text-gray-900">{course.level}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <button className="w-full btn-primary">Enroll Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 