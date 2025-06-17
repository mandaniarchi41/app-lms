import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SCORE_RANGES, ASSESSMENT_TYPES, TIMER_TYPES } from '../utils/types';
import AssessmentVisualizations from './AssessmentVisualizations';

const AssessmentDashboard = ({ assessments, history, onStartAssessment, onCreateNewAssessment, isAdmin }) => {
  const getScoreRange = (score) => {
    return Object.values(SCORE_RANGES).find(
      (range) => score >= range.min && score <= range.max
    );
  };

  const calculateAverageScore = () => {
    if (history.length === 0) return 0;
    const total = history.reduce((sum, assessment) => sum + assessment.score, 0);
    return Math.round(total / history.length);
  };

  const getRecentAssessments = () => {
    return history
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .slice(0, 5);
  };

  const averageScore = calculateAverageScore();
  const recentAssessments = getRecentAssessments();
  const scoreRange = getScoreRange(averageScore);

  // Calculate statistics
  const totalAssessments = assessments.length;
  const completedAssessments = history.length;

  // Calculate progress over time (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const progressData = last7Days.map(date => {
    const dayHistory = history.filter(h => h.completedAt.split('T')[0] === date);
    return {
      date,
      count: dayHistory.length,
      averageScore: dayHistory.length > 0
        ? Math.round(dayHistory.reduce((sum, h) => sum + h.score, 0) / dayHistory.length)
        : 0
    };
  });

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Assessments</h3>
          <p className="text-3xl font-bold text-blue-600">{totalAssessments}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Completed</h3>
          <p className="text-3xl font-bold text-green-600">{completedAssessments}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Average Score</h3>
          <p className="text-3xl font-bold text-purple-600">{averageScore}%</p>
        </div>
      </div>

      {/* Visualizations */}
      {history.length > 0 && (
        <AssessmentVisualizations
          history={history}
          assessments={assessments}
        />
      )}

      {/* Available Assessments */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Available Assessments</h3>
          {isAdmin && (
            <button
              onClick={onCreateNewAssessment}
              className="btn-primary"
              type="button"
            >
              Create New Assessment
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="border rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-2">{assessment.title}</h4>
              <p className="text-gray-600 mb-4">{assessment.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {assessment.questions.length} Questions
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {assessment.totalTime} {assessment.timerType === TIMER_TYPES.PER_QUESTION ? 'min per question' : 'min total'}
                </span>
              </div>
              <button
                onClick={() => onStartAssessment(assessment)}
                className="btn-primary w-full"
              >
                Start Assessment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

AssessmentDashboard.propTypes = {
  assessments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      questions: PropTypes.array.isRequired,
      timerType: PropTypes.string.isRequired,
      totalTime: PropTypes.number.isRequired,
      passingScore: PropTypes.number.isRequired
    })
  ).isRequired,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      assessmentId: PropTypes.string.isRequired,
      assessmentTitle: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      timeSpent: PropTypes.number.isRequired,
      completedAt: PropTypes.string.isRequired,
      answers: PropTypes.object.isRequired
    })
  ).isRequired,
  onStartAssessment: PropTypes.func.isRequired,
  onCreateNewAssessment: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

export default AssessmentDashboard; 