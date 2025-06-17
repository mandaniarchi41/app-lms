import React from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import { ASSESSMENT_TYPES, TIMER_TYPES } from '../utils/types';

const AssessmentQuestion = ({
  question,
  onAnswer,
  answer,
  onNext,
  isLastQuestion,
  timerType,
  timeLimit
}) => {
  if (!question) {
    return <div className="text-red-500">Error: Question data is missing</div>;
  }

  const renderLikertScale = () => (
    <div className="space-y-4">
      {question.options.map((option, index) => (
        <label
          key={index}
          className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value={index}
            checked={answer === index}
            onChange={() => onAnswer(question.id, index)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-3 text-gray-900">{option}</span>
        </label>
      ))}
    </div>
  );

  const renderPointBased = () => (
    <div className="space-y-4">
      {question.options.map((option, index) => (
        <label
          key={index}
          className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        >
          <input
            type="radio"
            name={`question-${question.id}`}
            value={index}
            checked={answer === index}
            onChange={() => onAnswer(question.id, index)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-3 text-gray-900">{option}</span>
          {question.points && (
            <span className="ml-auto text-sm text-gray-500">
              {question.points} points
            </span>
          )}
        </label>
      ))}
    </div>
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {timerType === TIMER_TYPES.PER_QUESTION && timeLimit > 0 && (
        <div className="mb-4">
          <Timer
            initialTime={timeLimit}
            onTimeUp={onNext}
            isActive={true}
          />
        </div>
      )}
      
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {question.text}
      </h3>
      
      {question.type === ASSESSMENT_TYPES.LIKERT
        ? renderLikertScale()
        : renderPointBased()}

      <div className="mt-6 flex justify-end">
        <button
          onClick={onNext}
          className="btn-primary"
          disabled={answer === undefined}
        >
          {isLastQuestion ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

AssessmentQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    points: PropTypes.number,
    timeLimit: PropTypes.number,
    correctAnswer: PropTypes.number
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  answer: PropTypes.number,
  onNext: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  timerType: PropTypes.string,
  timeLimit: PropTypes.number
};

export default AssessmentQuestion; 