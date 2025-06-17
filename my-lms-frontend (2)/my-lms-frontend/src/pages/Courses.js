import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CoursesPage = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Mock data for all available courses (combine featured and available from Home/StudentCourses)
  const mockAllCourses = [
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
      { id: 2, title: 'Data Science Fundamentals', description: 'Master data analysis and machine learning', instructor: 'Jane Smith', rating: 4.7, students: 856, price: '₹3,499', thumbnail: 'https://via.placeholder.com/300x200', category: 'Data Science', level: 'Intermediate', },
      { id: 3, title: 'Mobile App Development', description: 'Build iOS and Android apps with React Native', instructor: 'Alex Johnson', rating: 4.9, students: 567, price: '₹2,499', thumbnail: 'https://via.placeholder.com/300x200', category: 'Mobile Development', level: 'Advanced', },
      { id: 4, title: 'Machine Learning Basics', description: 'Introduction to ML concepts', instructor: 'Alex Johnson', rating: 4.5, students: 300, price: '$49.99', thumbnail: 'https://via.placeholder.com/300x200', category: 'Data Science', level: 'Advanced', },
      { id: 5, title: 'UI/UX Design Principles', description: 'Design user-friendly interfaces', instructor: 'Emily White', rating: 4.6, students: 450, price: '$39.99', thumbnail: 'https://via.placeholder.com/300x200', category: 'Design', level: 'Beginner', },
      { id: 6, title: 'Digital Marketing Fundamentals', description: 'Learn online marketing strategies', instructor: 'David Green', rating: 4.4, students: 600, price: '$29.99', thumbnail: 'https://via.placeholder.com/300x200', category: 'Marketing', level: 'Intermediate', },
      // Add more mock courses here
    ];

   // Extract unique categories from mock data
   const categories = ['all', ...new Set(mockAllCourses.map(course => course.category))];

  useEffect(() => {
    // In a real app, fetch courses from API
    setAllCourses(mockAllCourses);
    setLoading(false);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-primary-text">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-text"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-primary-text">
      <h1 className="text-2xl font-['Playfair_Display'] font-bold mb-6">All Courses</h1>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 px-3 py-2 border border-border-light rounded-md shadow-sm focus:outline-none focus:ring-primary-text focus:border-primary-text sm:text-sm bg-primary-background text-primary-text"
        />
        <select
          value={filterCategory}
          onChange={handleFilterChange}
          className="px-3 py-2 border border-border-light rounded-md shadow-sm focus:outline-none focus:ring-primary-text focus:border-primary-text sm:text-sm bg-primary-background text-primary-text"
        >
           <option value="all">All Categories</option>
           {categories.map(category => (
             <option key={category} value={category}>{category}</option>
           ))}
        </select>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                 <span className="px-2 py-1 text-xs font-medium bg-secondary-background text-secondary-text rounded">
                  {course.category}
                </span>
                 <span className="px-2 py-1 text-xs font-medium bg-[#CFD8DC] text-primary-text rounded">
                  {course.level}
                </span>
              </div>
              <h3 className="text-lg font-['Playfair_Display'] font-medium text-primary-text">{course.title}</h3>
              <p className="text-sm text-gray-700 font-['Open_Sans']">Instructor: {course.instructor}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-primary-text">{course.price}</span>
                <Link
                  to={`/courses/${course.id}`}
                  className="btn-primary text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
       {filteredCourses.length === 0 && (
         <div className="text-center py-12 text-gray-700">
           No courses found matching your criteria.
         </div>
       )}
    </div>
  );
};

export default CoursesPage; 