import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for assessments
const assessments = [
  {
    id: 1,
    title: 'Web Development Quiz',
    course: 'Introduction to Web Development',
    type: 'Quiz',
    dueDate: '2024-03-20',
    status: 'pending',
    duration: '30 minutes',
    totalQuestions: 20,
  },
  {
    id: 2,
    title: 'JavaScript Project',
    course: 'Advanced JavaScript',
    type: 'Project',
    dueDate: '2024-03-25',
    status: 'completed',
    score: 85,
    feedback: 'Good work! Consider improving error handling.',
  },
  {
    id: 3,
    title: 'React Fundamentals Test',
    course: 'React Fundamentals',
    type: 'Exam',
    dueDate: '2024-03-28',
    status: 'pending',
    duration: '1 hour',
    totalQuestions: 40,
  },
];

const Assessments = () => {
  return (
    <div className="space-y-4 md:space-y-8 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Assessments</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <select className="input-field w-full sm:w-auto">
            <option value="">All Types</option>
            <option value="quiz">Quiz</option>
            <option value="exam">Exam</option>
            <option value="project">Project</option>
          </select>
          <select className="input-field w-full sm:w-auto">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <ul className="divide-y divide-gray-200">
          {assessments.map((assessment) => (
            <li key={assessment.id}>
              <div className="px-3 py-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {assessment.title}
                    </p>
                    <div className="flex-shrink-0">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {assessment.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-sm text-gray-500">
                      Due: {assessment.dueDate}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex flex-col sm:flex-row sm:justify-between gap-2">
                  <div>
                    <p className="text-sm text-gray-500">
                      {assessment.course}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    {assessment.status === 'completed' ? (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-green-600 font-medium">
                          Score: {assessment.score}%
                        </span>
                        <Link
                          to={`/assessments/${assessment.id}/result`}
                          className="text-blue-600 hover:text-blue-500"
                        >
                          View Results
                        </Link>
                      </div>
                    ) : (
                      <Link
                        to={`/assessments/${assessment.id}`}
                        className="text-blue-600 hover:text-blue-500"
                      >
                        Start Assessment
                      </Link>
                    )}
                  </div>
                </div>
                {assessment.status === 'pending' && (
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Duration: {assessment.duration}</p>
                    <p>Total Questions: {assessment.totalQuestions}</p>
                  </div>
                )}
                {assessment.status === 'completed' && assessment.feedback && (
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Feedback: {assessment.feedback}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Assessments; 