import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock data for assessment questions
const assessmentQuestions = [
  {
    id: 1,
    question: 'What is HTML?',
    type: 'multiple-choice',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Hyper Transfer Markup Language',
      'Hyper Text Modern Language',
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: 'Which of the following is a CSS framework?',
    type: 'multiple-choice',
    options: ['React', 'Angular', 'Bootstrap', 'Node.js'],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: 'What does CSS stand for?',
    type: 'multiple-choice',
    options: [
      'Computer Style Sheets',
      'Cascading Style Sheets',
      'Creative Style Sheets',
      'Colorful Style Sheets',
    ],
    correctAnswer: 1,
  },
];

const AssessmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  // Timer effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit the answers to the server
    navigate(`/assessments/${id}/result`);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const question = assessmentQuestions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Timer */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">
            Question {currentQuestion + 1} of {assessmentQuestions.length}
          </h2>
          <div className="text-lg font-medium text-gray-900">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {question.question}
        </h3>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <label
              key={index}
              className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={answers[question.id] === index}
                onChange={() => handleAnswer(question.id, index)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn-secondary"
        >
          Previous
        </button>
        <div className="flex space-x-4">
          {currentQuestion === assessmentQuestions.length - 1 ? (
            <button onClick={handleSubmit} className="btn-primary">
              Submit Assessment
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentDetail; 