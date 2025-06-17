import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SCORE_RANGES } from '../utils/types';
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

const AssessmentResult = ({ assessment, score, answers }) => {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem(`feedback_${assessment.id}`);
    return savedFeedback ? JSON.parse(savedFeedback) : { upvotes: 0, downvotes: 0, comments: [] };
  });
  const [commentText, setCommentText] = useState('');
  const [shareEmail, setShareEmail] = useState('');

  useEffect(() => {
    localStorage.setItem(`feedback_${assessment.id}`, JSON.stringify(feedback));
  }, [feedback, assessment.id]);

  const getScoreRange = (score) => {
    return Object.values(SCORE_RANGES).find(
      (range) => score >= range.min && score <= range.max
    );
  };

  const scoreRange = getScoreRange(score);

  const handleShareResults = async () => {
    if (!shareEmail) {
      toast.error('Please enter an email address to share results.');
      return;
    }

    const templateParams = {
      to_email: shareEmail,
      assessment_title: assessment.title,
      user_score: score,
      message: `I just completed the assessment "${assessment.title}" and scored ${score}%!\n\nCheck it out here (link placeholder): [Your Assessment Link Here]`,
    };

    console.log('Sending email with parameters:', templateParams);

    try {
      const PUBLIC_KEY = 'GUZd-FfwrkYCkJrV7';
      const SERVICE_ID = 'service_l3jhvyc';
      const TEMPLATE_ID = 'template_wxldcyt';

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      toast.success('Result summary sent successfully!');
      setShareEmail('');
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error(`Failed to send email: ${error.text || error.message || 'Please check your EmailJS setup.'}`);
    }
  };

  const handleUpvote = () => {
    setFeedback(prev => ({ ...prev, upvotes: prev.upvotes + 1 }));
  };

  const handleDownvote = () => {
    setFeedback(prev => ({ ...prev, downvotes: prev.downvotes + 1 }));
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = { id: Date.now(), text: commentText.trim(), date: new Date().toISOString() };
      setFeedback(prev => ({ ...prev, comments: [...prev.comments, newComment] }));
      setCommentText('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Score Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Assessment Results</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg text-gray-600">Your Score</p>
            <p className="text-3xl font-bold text-gray-900">{score}%</p>
          </div>
          <div className={`px-4 py-2 rounded-full bg-${scoreRange.color}-100`}>
            <span className={`text-${scoreRange.color}-800 font-medium`}>
              {scoreRange.label}
            </span>
          </div>
        </div>
      </div>

      {/* Question Review */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Question Review</h3>
        <div className="space-y-6">
          {assessment.questions.map((question, index) => (
            <div key={question.id} className="border-b pb-4 last:border-b-0">
              <p className="font-medium text-gray-900 mb-2">
                {index + 1}. {question.text}
              </p>
              <div className="ml-4">
                <p className="text-sm text-gray-600">
                  Your Answer: {question.options[answers[question.id]]}
                </p>
                {question.type === 'point_based' && (
                  <p className="text-sm text-gray-600">
                    Points: {question.points}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interpretation */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Interpretation</h3>
        <p className="text-gray-600">
          {score >= assessment.passingScore
            ? "Congratulations! You've passed the assessment."
            : "You need to improve your understanding of the subject matter."}
        </p>

        {/* Placeholder for Percentile-based Interpretation */}
        <p className="mt-4 text-gray-600 italic">
          (Percentile-based interpretation would be displayed here, requiring backend data and calculations.)
        </p>

        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {score < 50 && (
              <li>Review the basic concepts and fundamentals</li>
            )}
            {score >= 50 && score < 70 && (
              <li>Practice more exercises to strengthen your understanding</li>
            )}
            {score >= 70 && score < 90 && (
              <li>Focus on advanced topics and complex scenarios</li>
            )}
            {score >= 90 && (
              <li>Consider mentoring others or taking advanced assessments</li>
            )}
          </ul>
        </div>
      </div>

      {/* Share Results Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Share Your Results</h3>
        <p className="text-gray-600 mb-4">
          You can share your assessment summary via email. Please note that for full functionality
          (e.g., generating unique, persistent shareable links, tracking shares), a backend server
          would be required.
        </p>
        <div className="mb-4">
          <label htmlFor="shareEmail" className="sr-only">Recipient Email</label>
          <input
            type="email"
            id="shareEmail"
            value={shareEmail}
            onChange={(e) => setShareEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter recipient email address"
          />
        </div>
        <button
          onClick={handleShareResults}
          className="btn-primary w-full"
        >
          Share Results via Email
        </button>
      </div>

      {/* Feedback Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Provide Feedback</h3>
        <div className="flex items-center space-x-4 mb-6">
          <button onClick={handleUpvote} className="flex items-center space-x-1 text-green-600 hover:text-green-500">
            <i className="fas fa-thumbs-up"></i>
            <span>Upvote ({feedback.upvotes})</span>
          </button>
          <button onClick={handleDownvote} className="flex items-center space-x-1 text-red-600 hover:text-red-500">
            <i className="fas fa-thumbs-down"></i>
            <span>Downvote ({feedback.downvotes})</span>
          </button>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 mb-2">Comments</h4>
          <div className="flex space-x-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button onClick={handleAddComment} className="btn-primary">
              Add Comment
            </button>
          </div>

          <div className="space-y-3">
            {feedback.comments.length === 0 ? (
              <p className="text-gray-500 italic">No comments yet. Be the first to leave feedback!</p>
            ) : (
              feedback.comments.map(comment => (
                <div key={comment.id} className="p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-800">{comment.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(comment.date).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

AssessmentResult.propTypes = {
  assessment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        points: PropTypes.number
      })
    ).isRequired,
    passingScore: PropTypes.number.isRequired
  }).isRequired,
  score: PropTypes.number.isRequired,
  answers: PropTypes.object.isRequired
};

export default AssessmentResult; 