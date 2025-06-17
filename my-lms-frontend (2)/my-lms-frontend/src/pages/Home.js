import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const featuredCourses = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      description: 'Learn full-stack web development from scratch',
      instructor: 'John Doe',
      rating: 4.8,
      students: 1234,
      price: '₹2,999',
      thumbnail: 'https://via.placeholder.com/300x200',
      category: 'Web Development',
      level: 'Beginner',
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      description: 'Master data analysis and machine learning',
      instructor: 'Jane Smith',
      rating: 4.7,
      students: 856,
      price: '₹3,499',
      thumbnail: 'https://via.placeholder.com/300x200',
      category: 'Data Science',
      level: 'Intermediate',
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Build iOS and Android apps with React Native',
      instructor: 'Alex Johnson',
      rating: 4.9,
      students: 567,
      price: '₹2,499',
      thumbnail: 'https://via.placeholder.com/300x200',
      category: 'Mobile Development',
      level: 'Advanced',
    },
  ];

  const categories = [
    { name: 'Web Development', icon: '🌐', count: 45 },
    { name: 'Data Science', icon: '📊', count: 32 },
    { name: 'Mobile Development', icon: '📱', count: 28 },
    { name: 'Design', icon: '🎨', count: 24 },
    { name: 'Business', icon: '💼', count: 36 },
    { name: 'Marketing', icon: '📈', count: 19 },
  ];

  const handleCourseClick = (courseId) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/courses/${courseId}`);
    }
  };

  return (
    <div className="space-y-16 text-primary-text">
      {/* Hero Section */}
      <div className="relative bg-primary-background">
        <div className="absolute inset-0">
          {/* Optional: Add a background image or pattern if needed */}
          {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}></div> */}
          {/* Removed gradient for white background */}
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 z-10">
          <h1 className="text-4xl font-['Playfair_Display'] font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
            Transform Your Learning Experience
          </h1>
          <p className="mt-6 text-xl max-w-3xl font-['Open_Sans'] leading-relaxed text-gray-700">
            Create engaging assessments, track progress, and motivate students with our comprehensive assessment platform.
          </p>
          <div className="mt-10 flex space-x-4">
            <Link
              to="/register"
              className="btn-primary inline-block text-lg font-medium"
            >
              Get Started
            </Link>
             <a
              href="#featured-courses"
              className="btn-secondary inline-block text-lg font-medium"
            >
              Explore Courses
            </a>
          </div>
        </div>
         {/* Use a darker illustration for white background */}
         <div className="absolute inset-y-0 right-0 w-full max-w-xl lg:max-w-lg xl:max-w-xl hidden md:block opacity-80">
          <img
            className="w-full h-full object-contain object-right-bottom"
            src="/path/to/your/illustration-dark.png"
            alt="Assessment Platform Illustration"
          />
        </div>
      </div>

      {/* Featured Courses Section */}
      <div id="featured-courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-secondary-background rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-primary-text sm:text-4xl">
            Featured Courses
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-700 font-['Open_Sans'] sm:mt-4">
            Discover our most popular courses chosen by thousands of learners
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              className="card cursor-pointer"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-sm font-medium text-secondary-text bg-secondary-background rounded-full">
                    {course.category}
                  </span>
                  <span className="px-3 py-1 text-sm font-medium text-primary-text bg-[#CFD8DC] rounded-full"> {/* Adjusted level tag color */}
                    {course.level}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-['Playfair_Display'] font-semibold text-primary-text">
                  {course.title}
                </h3>
                <p className="mt-2 text-gray-700 font-['Open_Sans']">{course.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-secondary-text">★</span> {/* Star color adjustment */}
                    <span className="ml-1 text-primary-text">{course.rating}</span>
                    <span className="mx-2 text-primary-text/50">|</span>
                    <span className="text-primary-text">{course.students} students</span>
                  </div>
                  <span className="text-xl font-bold text-primary-text">{course.price}</span> {/* Price color adjustment */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-secondary-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-primary-text sm:text-4xl">
              Explore Categories
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-700 font-['Open_Sans'] sm:mt-4">
              Find the perfect course for your career goals
            </p>
          </div>

          <div className="mt-12 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-primary-background rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border border-border-light"
              >
                <div className="text-4xl mb-4 text-secondary-text">{category.icon}</div> {/* Icon color adjustment */}
                <h3 className="text-lg font-['Playfair_Display'] font-medium text-primary-text">{category.name}</h3>
                <p className="mt-2 text-gray-700 font-['Open_Sans']">{category.count} Courses</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-secondary-background rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-primary-text sm:text-4xl">
            Why Choose The Catalystz?
          </h2>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card">
            <div className="text-4xl mb-4 text-secondary-text">🎓</div> {/* Icon color adjustment */}
            <h3 className="text-xl font-['Playfair_Display'] font-semibold text-primary-text">Expert Instructors</h3>
            <p className="mt-2 text-gray-700 font-['Open_Sans']">
              Learn from industry experts who understand the Indian job market
            </p>
          </div>

          <div className="card">
            <div className="text-4xl mb-4 text-secondary-text">💳</div> {/* Icon color adjustment */}
            <h3 className="text-xl font-['Playfair_Display'] font-semibold text-primary-text">Affordable Pricing</h3>
            <p className="mt-2 text-gray-700 font-['Open_Sans']">
              Courses designed for Indian students with flexible payment options
            </p>
          </div>

          <div className="card">
            <div className="text-4xl mb-4 text-secondary-text">🏆</div> {/* Icon color adjustment */}
            <h3 className="text-xl font-['Playfair_Display'] font-semibold text-primary-text">Industry Recognition</h3>
            <p className="mt-2 text-gray-700 font-['Open_Sans']">
              Certificates recognized by top Indian companies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 