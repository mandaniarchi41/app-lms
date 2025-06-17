import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useAuth } from '../context/AuthContext';

// Placeholder Video Player Component
const VideoPlayer = ({ videoUrl, onEnded }) => {
  return (
    <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
      <ReactPlayer
        url={videoUrl}
        controls={true}
        width='100%'
        height='100%'
        onEnded={onEnded}
        // Disable download functionality if possible (react-player doesn't offer a direct prop, relies on browser/source)
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload'
            }
          }
        }}
      />
    </div>
  );
};

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState({});
  const [isCoursePurchased, setIsCoursePurchased] = useState(false);

  const { user, isAuthenticated } = useAuth(); // Get user and isAuthenticated from auth context

  useEffect(() => {
    // In a real app, this would fetch course details from the server
    // Mock data for demonstration with sample lessons and video URLs
    const mockCourseData = [
      {
        id: 1,
        title: 'Web Development Bootcamp',
        description: 'Learn full-stack web development from scratch',
        instructor: 'John Smith',
        duration: '12 weeks',
        level: 'Beginner',
        isPaid: false, // This course is free
        price: 'Free',
        modules: [
          {
            id: 1,
            title: 'Introduction to HTML',
            duration: '2 hours',
            lessons: [
              { id: 101, title: 'What is HTML?', duration: '30 mins', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, // Placeholder URL
              { id: 102, title: 'HTML Structure', duration: '1 hour', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, // Placeholder URL
            ]
          },
          {
            id: 2,
            title: 'CSS Fundamentals',
            duration: '3 hours',
             lessons: [
              { id: 201, title: 'CSS Selectors', duration: '45 mins', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, // Placeholder URL
              { id: 202, title: 'CSS Box Model', duration: '1.5 hours', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, // Placeholder URL
            ]
          },
          {
            id: 3,
            title: 'JavaScript Basics',
            duration: '4 hours',
             lessons: [
              { id: 301, title: 'JS Variables', duration: '1 hour', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, // Placeholder URL
              { id: 302, title: 'JS Data Types', duration: '1 hour', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, // Placeholder URL
              { id: 303, title: 'JS Functions', duration: '2 hours', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, // Placeholder URL
            ]
          },
        ],
        thumbnail: 'https://via.placeholder.com/800x400',
      },
      {
        id: 2,
        title: 'Data Science Fundamentals',
        description: 'Master data analysis and machine learning',
        instructor: 'Jane Smith',
        duration: '10 weeks',
        level: 'Intermediate',
        isPaid: true, // This course is paid
        price: '₹3,499',
        modules: [
          {
            id: 4,
            title: 'Introduction to Data Science',
            duration: '3 hours',
             lessons: [
              { id: 401, title: 'What is Data Science?', duration: '1 hour', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, // Placeholder URL
              { id: 402, title: 'Data Analysis Tools', duration: '2 hours', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, // Placeholder URL
            ]
          },
        ],
        thumbnail: 'https://via.placeholder.com/800x400',
      },
      // Add more mock courses as needed
    ];

    const foundCourse = mockCourseData.find(course => course.id === parseInt(id));
    setCourse(foundCourse);

    // Load completed lessons from localStorage for the specific user and course
    if (user) {
        const storedCompletedLessons = localStorage.getItem(`completedLessons_${user.id}_${id}`);
        if (storedCompletedLessons) {
          setCompletedLessons(JSON.parse(storedCompletedLessons));
        }
         // Check if course is purchased for the user
        const purchasedCourses = JSON.parse(localStorage.getItem(`purchasedCourses_${user.id}`) || '[]');
        setIsCoursePurchased(purchasedCourses.includes(parseInt(id)));
    }

    setLoading(false);
  }, [id, user]); // Add user as dependency to re-run when user logs in/out

  // Save completed lessons to localStorage whenever it changes (per user and course)
  useEffect(() => {
    if (user && Object.keys(completedLessons).length > 0) {
       localStorage.setItem(`completedLessons_${user.id}_${id}`, JSON.stringify(completedLessons));
    }
  }, [completedLessons, id, user]);

  const handleLessonComplete = (lessonId) => {
     if (!user) return; // Prevent completing lessons if not logged in
    setCompletedLessons(prev => ({ ...prev, [lessonId]: true }));
  };

  const handleNextLesson = () => {
    if (!course || !user) return; // Prevent if course not loaded or not logged in
     // ... (rest of handleNextLesson logic remains the same)
     const allLessons = course?.modules.flatMap(module => module.lessons) || [];
      const currentLessonIndexOverall = allLessons.findIndex(lesson => lesson.id === currentLesson?.id);
      const nextLesson = allLessons[currentLessonIndexOverall + 1];
   
      if(nextLesson) {
        setCurrentLessonIndex(nextLesson.id);
      }
  };

  const isLessonCompleted = (lessonId) => completedLessons[lessonId];

  const isLessonAccessible = (moduleIndex, lessonIndex) => {
       if (!course || !user) return false; // Not accessible if course not loaded or not logged in
       if (!isCoursePurchased && course.isPaid) return false; // Not accessible if paid and not purchased

      if (moduleIndex === 0 && lessonIndex === 0) return true; // First lesson is always accessible if purchased/free
   
      // Check if the previous lesson is completed
      const previousLesson = course.modules[moduleIndex]?.lessons[lessonIndex - 1];
      if (previousLesson && !isLessonCompleted(previousLesson.id)) {
        return false;
      }
   
      // Check if all lessons in previous modules are completed
      for (let i = 0; i < moduleIndex; i++) {
        const previousModule = course.modules[i];
        if (previousModule && previousModule.lessons) {
          for (const lesson of previousModule.lessons) {
            if (!isLessonCompleted(lesson.id)) {
              return false;
            }
          }
        }
      }
   
      return true;
    };

    // Calculate overall course progress
    const totalLessons = course?.modules.reduce((count, module) => count + (module.lessons?.length || 0), 0) || 0;
    const completedCount = Object.keys(completedLessons).length;
    const courseProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    const handleBuyCourse = () => {
        if (!user) {
            // Redirect to login or show a message prompting login
            alert('Please log in to purchase this course.');
            return;
        }
        // Simulate purchase
        const purchasedCourses = JSON.parse(localStorage.getItem(`purchasedCourses_${user.id}`) || '[]');
        if (!purchasedCourses.includes(parseInt(id))) {
            purchasedCourses.push(parseInt(id));
            localStorage.setItem(`purchasedCourses_${user.id}`, JSON.stringify(purchasedCourses));
            setIsCoursePurchased(true);
            alert('Course purchased successfully!'); // Or use a toast notification
             // Optionally set current lesson to the first lesson after purchase
             setCurrentLessonIndex(course.modules[0]?.lessons[0]?.id || 0);
        }
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-primary-text">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-text"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12 text-primary-text">
        <h2 className="text-2xl font-bold text-primary-text">Course not found</h2>
        <p className="mt-2 text-gray-700">The course you're looking for doesn't exist.</p>
      </div>
    );
  }

  const currentLesson = course.modules.flatMap(module => module.lessons).find(lesson => lesson.id === currentLessonIndex) || course.modules[0]?.lessons[0];

  // Calculate next lesson for navigation
  const allLessons = course?.modules.flatMap(module => module.lessons) || [];
  const currentLessonIndexOverall = allLessons.findIndex(lesson => lesson.id === currentLesson?.id);
  const nextLesson = allLessons[currentLessonIndexOverall + 1];

  return (
    <div className="space-y-8 text-primary-text">
      {/* Course Header */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="relative h-64">
          {/* <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          /> */}
          {/* Using a placeholder div instead of image */}
          <div className="w-full h-full bg-secondary-background flex items-center justify-center">
             <h1 className="text-4xl font-bold text-primary-text">{course.title}</h1>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 text-sm font-medium text-secondary-text bg-secondary-background rounded-full">
                {course.level}
              </span>
              <span className="text-gray-700">{course.duration}</span>
            </div>
            {/* Display price or Buy button */}
            {course.isPaid ? (
               isCoursePurchased ? (
                 <span className="text-green-600 font-semibold">Purchased</span>
               ) : (
                 <button onClick={handleBuyCourse} className="btn-primary">Buy Course ({course.price})</button>
               )
            ) : (
               <span className="text-green-600 font-semibold">Free</span>
            )}
          </div>
          <p className="text-gray-700 mb-6">{course.description}</p>
          <div className="flex items-center text-gray-700">
            <svg
              className="h-5 w-5 mr-2 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>Instructor: {course.instructor}</span>
          </div>
        </div>
      </div>

      {/* Video Player Section */}
       {currentLesson && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
           <div className="px-6 py-4 border-b border-border-light">
            <h2 className="text-xl font-semibold text-primary-text">Lesson: {currentLesson.title}</h2>
          </div>
          <div className="p-6">
            <VideoPlayer videoUrl={currentLesson.videoUrl} onEnded={() => handleLessonComplete(currentLesson.id)} />
             {/* Lesson navigation and completion */}
             <div className="mt-4 flex justify-between items-center">
                <div>
                  {isLessonCompleted(currentLesson.id) ? (
                    <span className="text-green-600 font-medium">Completed!</span>
                  ) : (
                     <button
                       onClick={() => handleLessonComplete(currentLesson.id)}
                       className="btn-primary text-sm"
                     >
                       Mark as Complete
                     </button>
                  )}
                </div>
                {nextLesson && isLessonAccessible(
                   course.modules.findIndex(module => module.lessons.some(lesson => lesson.id === nextLesson.id)),
                   course.modules.find(module => module.lessons.some(lesson => lesson.id === nextLesson.id)).lessons.findIndex(lesson => lesson.id === nextLesson.id)
                ) && (
                  <button
                    onClick={() => setCurrentLessonIndex(nextLesson.id)}
                    className="btn-secondary text-sm"
                  >
                    Next Lesson
                  </button>
                )}
             </div>
          </div>
        </div>
      )}

       {/* Course Progress Bar */}
       {course && (isCoursePurchased || !course.isPaid) && (
         <div className="bg-white shadow rounded-lg p-6">
           <h2 className="text-xl font-semibold text-primary-text mb-4">Course Progress</h2>
           <div className="w-full bg-secondary-background rounded-full h-4">
             <div
               className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-in-out"
               style={{ width: `${courseProgress}%` }}
             ></div>
           </div>
           <p className="mt-2 text-sm text-gray-700 text-right">{courseProgress}% Complete</p>
         </div>
       )}


      {/* Course Modules (Lesson List) */}
      {course && (isCoursePurchased || !course.isPaid) && (
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-border-light">
          <h2 className="text-xl font-semibold text-primary-text">Course Modules</h2>
        </div>
        <div className="divide-y divide-border-light">
          {course.modules.map((module, moduleIndex) => (
            <div key={module.id}>
              <div className="px-6 py-4 bg-secondary-background font-medium text-primary-text">{module.title}</div>
              <div className="divide-y divide-border-light">
                 {module.lessons.map((lesson, lessonIndex) => {
                   const accessible = isLessonAccessible(moduleIndex, lessonIndex);
                   const completed = isLessonCompleted(lesson.id);
                   return (
                     <div
                       key={lesson.id}
                       className={`p-6 flex items-center justify-between ${!accessible ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                       onClick={() => accessible && setCurrentLessonIndex(lesson.id)}
                     >
                       <div>
                         <h3 className={`text-lg font-medium ${accessible ? 'text-primary-text' : 'text-gray-500'}`}>
                           {lesson.title}
                         </h3>
                         <p className="mt-1 text-sm text-gray-700">
                           Duration: {lesson.duration}
                         </p>
                       </div>
                       {
                         completed ? (
                           <span className="text-green-600 font-medium">Completed</span>
                         ) : (
                           !accessible && (
                             <span className="text-yellow-600 font-medium"><i className="fas fa-lock mr-1"></i> Locked</span>
                           )
                         )
                       }
                     </div>
                   );
                 })}
              </div>
            </div>
          ))}
        </div>
      </div>
       )}

      {/* Course Requirements */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-border-light">
          <h2 className="text-xl font-semibold text-primary-text">Requirements</h2>
        </div>
        <div className="p-6">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Basic computer skills</li>
            <li>No prior programming experience required</li>
            <li>Dedication to learn and practice</li>
            <li>Computer with internet connection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails; 