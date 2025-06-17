import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AssessmentDetails = () => {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    // In a real app, this would fetch assessment details from the server
    // Mock data for demonstration
    setAssessment({
      id: id,
      title: 'Web Development Fundamentals Quiz',
      description: 'Test your knowledge of HTML, CSS, and JavaScript basics.',
      duration: 30, // minutes
      totalQuestions: 10,
      passingScore: 70,
      questions: [
        {
          id: 1,
          question: 'What does HTML stand for?',
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
          question: 'Which CSS property is used to change the text color?',
          options: ['text-color', 'color', 'font-color', 'text-style'],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: 'Which of the following is a JavaScript framework?',
          options: ['Django', 'React', 'Flask', 'Express'],
          correctAnswer: 1,
        },
      ],
    });
    setLoading(false);
    setTimeLeft(30 * 60); // Convert minutes to seconds
  }, [id]);

  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleSubmit = () => {
    // In a real app, this would submit the answers to the server
    console.log('Submitted answers:', answers);
    // Calculate score and show results
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Assessment not found</h2>
        <p className="mt-2 text-gray-600">
          The assessment you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Assessment Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{assessment.title}</h1>
          <div className="text-lg font-medium text-gray-900">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>
        <p className="text-gray-600 mb-4">{assessment.description}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Duration: {assessment.duration} minutes</span>
          <span>Questions: {assessment.totalQuestions}</span>
          <span>Passing Score: {assessment.passingScore}%</span>
        </div>
      </div>

      {/* Current Question */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} of {assessment.questions.length}
          </span>
        </div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {assessment.questions[currentQuestion].question}
        </h2>
        <div className="space-y-3">
          {assessment.questions[currentQuestion].options.map((option, index) => (
            <label
              key={index}
              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name={`question-${assessment.questions[currentQuestion].id}`}
                checked={answers[assessment.questions[currentQuestion].id] === index}
                onChange={() =>
                  handleAnswerSelect(assessment.questions[currentQuestion].id, index)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          disabled={currentQuestion === 0}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {currentQuestion === assessment.questions.length - 1 ? (
          <button onClick={handleSubmit} className="btn-primary">
            Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
            className="btn-primary"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AssessmentDetails; 