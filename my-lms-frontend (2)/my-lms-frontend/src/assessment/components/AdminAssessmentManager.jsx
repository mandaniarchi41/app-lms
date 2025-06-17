import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ASSESSMENT_TYPES, TIMER_TYPES, createAssessment, createQuestion } from '../utils/types';
import { toast } from 'react-hot-toast';

const AdminAssessmentManager = ({ assessments, onSave, onDelete }) => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: ASSESSMENT_TYPES.LIKERT,
    timerType: TIMER_TYPES.NONE,
    totalTime: 0,
    passingScore: 70,
    questions: [],
    isFree: false,
    couponCode: '',
    price: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setFormData((prev) => {
      const newQuestions = [...(prev.questions || [])];
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value
      };
      return { ...prev, questions: newQuestions };
    });
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...(prev.questions || []),
        createQuestion({
          id: Date.now().toString(),
          text: '',
          type: prev.type,
          options: ['Option 1', 'Option 2'] // Start with two generic options
        })
      ]
    }));
  };

  const removeQuestion = (index) => {
    setFormData((prev) => ({
      ...prev,
      questions: (prev.questions || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assessment = createAssessment({
      ...formData,
      id: selectedAssessment?.id || Date.now().toString()
    });
    onSave(assessment);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: ASSESSMENT_TYPES.LIKERT,
      timerType: TIMER_TYPES.NONE,
      totalTime: 0,
      passingScore: 70,
      questions: [],
      isFree: false,
      couponCode: '',
      price: 0
    });
    setSelectedAssessment(null);
    setIsEditing(false);
    setShowCreateForm(false);
  };

  const editAssessment = (assessment) => {
    setSelectedAssessment(assessment);
    setFormData({
      ...assessment,
      questions: Array.isArray(assessment.questions) ? [...assessment.questions] : []
    });
    setIsEditing(true);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const fileContent = event.target.result;
          const fileExtension = file.name.split('.').pop().toLowerCase();

          if (fileExtension === 'json') {
            const parsedData = JSON.parse(fileContent);
            if (parsedData.title && parsedData.description && Array.isArray(parsedData.questions)) {
              setFormData(prev => ({
                ...prev,
                questions: [...(prev.questions || []), ...parsedData.questions.map(q => createQuestion(q))]
              }));
              setIsEditing(true);
              setSelectedAssessment(null);
              toast.success(`Assessment questions loaded from JSON file! Added ${parsedData.questions.length} questions.`);
            } else {
              toast.error('Invalid JSON format in file for assessment. Missing title, description, or questions array.');
            }
          } else if (fileExtension === 'csv') {
            const lines = fileContent.split(/\r?\n/).filter(line => line.trim() !== '');
            if (lines.length > 1) { // Expect at least header and one data row
              const headers = lines[0].split(',').map(h => h.trim());
              const csvQuestions = [];

              for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(v => v.trim());
                const questionData = {};
                headers.forEach((header, index) => {
                  questionData[header] = values[index];
                });

                const options = [];
                for (let j = 1; ; j++) {
                  const optionKey = `Option${j}`;
                  if (questionData[optionKey]) {
                    options.push(questionData[optionKey]);
                  } else {
                    break;
                  }
                }

                if (questionData.QuestionText && options.length > 0 && questionData.CorrectAnswerIndex !== undefined) {
                  csvQuestions.push(createQuestion({
                    id: `csv-q-${i}-${Date.now()}`,
                    text: questionData.QuestionText,
                    type: questionData.Type || ASSESSMENT_TYPES.POINT_BASED,
                    options: options,
                    points: parseInt(questionData.Points) || 1,
                    timeLimit: parseInt(questionData.TimeLimit) || 0,
                    correctAnswer: parseInt(questionData.CorrectAnswerIndex)
                  }));
                }
              }

              if (csvQuestions.length > 0) {
                setFormData(prev => ({
                  ...prev,
                  questions: [...(prev.questions || []), ...csvQuestions]
                }));
                setIsEditing(true);
                setSelectedAssessment(null);
                toast.success(`Assessment questions loaded from CSV! Added ${csvQuestions.length} questions.`);
              } else {
                toast.error('No valid questions found in CSV file. Please check format and ensure all required columns are present.');
              }
            } else {
              toast.error('CSV file is empty or malformed (requires header and at least one question row).');
            }
          } else if (fileExtension === 'docx') {
            toast.error('Word (.docx) structured content parsing is not supported on the frontend. A backend server is required for this functionality.');
            // Optionally, set basic info from filename - will not add questions
            setFormData(prev => ({
              ...prev,
              title: file.name.replace('.docx', '') || prev.title,
              description: 'Questions cannot be extracted from DOCX on frontend.',
              questions: [...(prev.questions || [])]
            }));
            setIsEditing(true);
            setSelectedAssessment(null);
          } else {
            toast.error('Unsupported file type. Please upload a JSON, CSV, or DOCX file.');
          }
        } catch (error) {
          toast.error('Error processing file: ' + error.message);
        }
      };
      reader.readAsText(file);
    } else {
      toast.error('No file selected.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
          <p className="text-sm text-green-500">+12%</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Active Courses</h3>
          <p className="text-3xl font-bold text-blue-600">45</p>
          <p className="text-sm text-green-500">+5%</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Assessments</h3>
          <p className="text-3xl font-bold text-blue-600">89</p>
          <p className="text-sm text-red-500">-2%</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Average Score</h3>
          <p className="text-3xl font-bold text-purple-600">78%</p>
          <p className="text-sm text-green-500">+4%</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg text-left">
            <i className="fas fa-users text-2xl text-blue-600 mb-3"></i>
            <h4 className="font-medium text-gray-900">Manage Users</h4>
            <p className="text-sm text-gray-600">View and manage user accounts</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-left">
            <i className="fas fa-chart-bar text-2xl text-green-600 mb-3"></i>
            <h4 className="font-medium text-gray-900">View Analytics</h4>
            <p className="text-sm text-gray-600">Track platform performance</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-left">
            <i className="fas fa-plus-circle text-2xl text-purple-600 mb-3"></i>
            <h4 className="font-medium text-gray-900">Add New Course</h4>
            <p className="text-sm text-gray-600">Create and upload course content</p>
          </div>
        </div>
      </div>

      {/* Create New Assessment Button */}
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <button
          onClick={() => {
            resetForm();
            setShowCreateForm(true);
          }}
          className="btn-primary w-full"
          type="button"
        >
          Create New Assessment
        </button>
      </div>

      {/* Assessment List */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Existing Assessments</h3>
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
              <div className="flex space-x-2">
                <button
                  onClick={() => editAssessment(assessment)}
                  className="btn-secondary flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(assessment.id)}
                  className="btn-danger flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment Form (for creating/editing) */}
      {(isEditing || showCreateForm) && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {isEditing ? 'Edit Assessment' : 'Create New Assessment'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Assessment Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={ASSESSMENT_TYPES.LIKERT}>Likert-Scale</option>
                <option value={ASSESSMENT_TYPES.POINT_BASED}>Point-Based</option>
              </select>
            </div>
            <div>
              <label htmlFor="timerType" className="block text-sm font-medium text-gray-700">Timer Type</label>
              <select
                id="timerType"
                name="timerType"
                value={formData.timerType}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={TIMER_TYPES.NONE}>No Timer</option>
                <option value={TIMER_TYPES.FULL_TEST}>Full Test Timer</option>
                <option value={TIMER_TYPES.PER_QUESTION}>Per Question Timer</option>
              </select>
            </div>
            {formData.timerType !== TIMER_TYPES.NONE && (
              <div>
                <label htmlFor="totalTime" className="block text-sm font-medium text-gray-700">Total Time (minutes)</label>
                <input
                  type="number"
                  id="totalTime"
                  name="totalTime"
                  value={formData.totalTime}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
              </div>
            )}
            <div>
              <label htmlFor="passingScore" className="block text-sm font-medium text-gray-700">Passing Score (%)</label>
              <input
                type="number"
                id="passingScore"
                name="passingScore"
                value={formData.passingScore}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                min="0" max="100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFree"
                name="isFree"
                checked={formData.isFree}
                onChange={(e) => setFormData(prev => ({ ...prev, isFree: e.target.checked }))}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isFree" className="text-sm font-medium text-gray-700">This assessment is free</label>
            </div>
            {!formData.isFree && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700">Coupon Code (Optional)</label>
                  <input
                    type="text"
                    id="couponCode"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., BLACKFRIDAY20"
                  />
                </div>
              </div>
            )}

            {/* File Upload for Questions */}
            <div className="space-y-2">
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">Upload Questions (JSON, CSV, DOCX)</label>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".json,.csv,.docx"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-1">Note: DOCX parsing for structured questions is not supported on the frontend. Only JSON and CSV (strict format) can append questions.</p>
            </div>

            <h4 className="text-lg font-medium text-gray-900 mt-6 mb-2">Questions</h4>
            {formData.questions.length === 0 && (
              <p className="text-sm text-gray-600">No questions added yet. Click 'Add Question' to start or upload a file.</p>
            )}
            <div className="space-y-4">
              {(formData.questions || []).map((question, qIndex) => (
                <div key={question.id || qIndex} className="border p-4 rounded-md space-y-3 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Question {qIndex + 1}</label>
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIndex)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div>
                    <label htmlFor={`question-text-${qIndex}`} className="block text-sm font-medium text-gray-700">Text</label>
                    <input
                      type="text"
                      id={`question-text-${qIndex}`}
                      value={question.text}
                      onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={`question-type-${qIndex}`} className="block text-sm font-medium text-gray-700">Question Type</label>
                    <select
                      id={`question-type-${qIndex}`}
                      value={question.type}
                      onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={ASSESSMENT_TYPES.LIKERT}>Likert-Scale</option>
                      <option value={ASSESSMENT_TYPES.POINT_BASED}>Point-Based</option>
                    </select>
                  </div>

                  {question.type === ASSESSMENT_TYPES.POINT_BASED && (
                    <div>
                      <label htmlFor={`question-points-${qIndex}`} className="block text-sm font-medium text-gray-700">Points</label>
                      <input
                        type="number"
                        id={`question-points-${qIndex}`}
                        value={question.points}
                        onChange={(e) => handleQuestionChange(qIndex, 'points', parseInt(e.target.value) || 0)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                      />
                    </div>
                  )}

                  {/* Options for Point-Based and Likert questions */}
                  {question.type === ASSESSMENT_TYPES.POINT_BASED && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Options</label>
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...question.options];
                              newOptions[oIndex] = e.target.value;
                              handleQuestionChange(qIndex, 'options', newOptions);
                            }}
                            className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Option ${oIndex + 1}`}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newOptions = question.options.filter((_, i) => i !== oIndex);
                              handleQuestionChange(qIndex, 'options', newOptions);
                            }}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newOptions = [...question.options, `Option ${question.options.length + 1}`];
                          handleQuestionChange(qIndex, 'options', newOptions);
                        }}
                        className="mt-2 btn-secondary"
                      >
                        Add Option
                      </button>
                    </div>
                  )}

                  {question.type === ASSESSMENT_TYPES.POINT_BASED && (
                    <div>
                      <label htmlFor={`correct-answer-${qIndex}`} className="block text-sm font-medium text-gray-700">Correct Answer (Index)</label>
                      <input
                        type="number"
                        id={`correct-answer-${qIndex}`}
                        value={question.correctAnswer}
                        onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', parseInt(e.target.value) || 0)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        min="0" max={question.options.length - 1}
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter the 0-based index of the correct option (e.g., 0 for the first option, 1 for the second).</p>
                    </div>
                  )}

                  {question.type === ASSESSMENT_TYPES.LIKERT && (
                    <div>
                      <label htmlFor={`likert-scale-${qIndex}`} className="block text-sm font-medium text-gray-700">Likert Scale Description</label>
                      <p className="text-sm text-gray-600">Likert scale questions typically use a fixed set of options (e.g., Strongly Disagree to Strongly Agree). The score is usually based on the selected option's value.</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor={`question-time-limit-${qIndex}`} className="block text-sm font-medium text-gray-700">Time Limit (seconds, 0 for none)</label>
                    <input
                      type="number"
                      id={`question-time-limit-${qIndex}`}
                      value={question.timeLimit}
                      onChange={(e) => handleQuestionChange(qIndex, 'timeLimit', parseInt(e.target.value) || 0)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>

                  {/* Branching Logic - Simple example: go to next question or skip */}
                  <div>
                    <label htmlFor={`branch-logic-${qIndex}`} className="block text-sm font-medium text-gray-700">Branching Logic (Optional)</label>
                    <input
                      type="text"
                      id={`branch-logic-${qIndex}`}
                      value={question.branchLogic || ''}
                      onChange={(e) => handleQuestionChange(qIndex, 'branchLogic', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., if answer is A, skip to question 5"
                    />
                    <p className="text-xs text-gray-500 mt-1">This is a placeholder for adaptive assessment logic. Implement backend parsing for complex rules.</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addQuestion}
              className="btn-secondary mt-4"
            >
              Add Question
            </button>

            <div className="flex space-x-4 mt-6">
              <button
                type="submit"
                className="btn-primary"
              >
                {isEditing ? 'Save Changes' : 'Create Assessment'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

AdminAssessmentManager.propTypes = {
  assessments: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminAssessmentManager; 