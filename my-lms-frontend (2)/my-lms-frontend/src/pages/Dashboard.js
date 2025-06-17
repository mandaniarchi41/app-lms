import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    progress: 75,
    lastAccessed: '2 days ago',
    instructor: 'John Smith',
    thumbnail: 'https://via.placeholder.com/300x200',
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    progress: 30,
    lastAccessed: '1 week ago',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://via.placeholder.com/300x200',
  },
  {
    id: 3,
    title: 'React Fundamentals',
    progress: 90,
    lastAccessed: '3 days ago',
    instructor: 'Mike Brown',
    thumbnail: 'https://via.placeholder.com/300x200',
  },
];

// Mock data for upcoming assessments
const upcomingAssessments = [
  {
    id: 1,
    title: 'Web Development Quiz',
    course: 'Introduction to Web Development',
    dueDate: '2024-03-20',
    type: 'Quiz',
  },
  {
    id: 2,
    title: 'JavaScript Project',
    course: 'Advanced JavaScript',
    dueDate: '2024-03-25',
    type: 'Project',
  },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-1 text-gray-500">
          Continue your learning journey from where you left off.
        </p>
      </div>

      {/* Enrolled Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Courses</h2>
          <Link
            to="/courses"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all courses
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Instructor: {course.instructor}
                </p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-900">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Last accessed: {course.lastAccessed}
                  </span>
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Assessments Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Upcoming Assessments
          </h2>
          <Link
            to="/assessments"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all assessments
          </Link>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {upcomingAssessments.map((assessment) => (
              <li key={assessment.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {assessment.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {assessment.type}
                        </p>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="text-sm text-gray-500">
                        Due: {assessment.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {assessment.course}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 