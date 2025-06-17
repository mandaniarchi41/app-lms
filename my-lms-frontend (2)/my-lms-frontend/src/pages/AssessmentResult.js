import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock data for assessment result
const assessmentResult = {
  id: 1,
  title: 'Web Development Quiz',
  course: 'Introduction to Web Development',
  score: 85,
  totalQuestions: 20,
  correctAnswers: 17,
  timeTaken: '25 minutes',
  feedback: 'Good work! You have a solid understanding of web development basics.',
  questions: [
    {
      id: 1,
      question: 'What is HTML?',
      yourAnswer: 'Hyper Text Markup Language',
      correctAnswer: 'Hyper Text Markup Language',
      isCorrect: true,
    },
    {
      id: 2,
      question: 'Which of the following is a CSS framework?',
      yourAnswer: 'React',
      correctAnswer: 'Bootstrap',
      isCorrect: false,
    },
    {
      id: 3,
      question: 'What does CSS stand for?',
      yourAnswer: 'Cascading Style Sheets',
      correctAnswer: 'Cascading Style Sheets',
      isCorrect: true,
    },
  ],
};

const AssessmentResult = () => {
  const { id } = useParams();
  const result = assessmentResult; // In a real app, fetch result by id

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Result Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{result.title}</h1>
          <p className="mt-1 text-gray-500">{result.course}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Score</p>
            <p className="mt-1 text-3xl font-semibold text-blue-600">
              {result.score}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Correct Answers</p>
            <p className="mt-1 text-3xl font-semibold text-green-600">
              {result.correctAnswers}/{result.totalQuestions}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Time Taken</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {result.timeTaken}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">{result.feedback}</p>
        </div>
      </div>

      {/* Question Review */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Question Review
        </h2>
        <div className="space-y-6">
          {result.questions.map((question) => (
            <div
              key={question.id}
              className="p-4 border rounded-lg"
            >
              <p className="font-medium text-gray-900">{question.question}</p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 w-24">Your Answer:</span>
                  <span
                    className={`text-sm ${
                      question.isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {question.yourAnswer}
                  </span>
                </div>
                {!question.isCorrect && (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 w-24">
                      Correct Answer:
                    </span>
                    <span className="text-sm text-green-600">
                      {question.correctAnswer}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <Link to="/assessments" className="btn-secondary">
          Back to Assessments
        </Link>
        <Link to="/courses" className="btn-primary">
          Continue Learning
        </Link>
      </div>
    </div>
  );
};

export default AssessmentResult; 