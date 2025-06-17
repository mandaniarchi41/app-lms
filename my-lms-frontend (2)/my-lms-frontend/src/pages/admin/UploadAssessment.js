import React, { useState } from 'react';

const UploadAssessment = () => {
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    type: 'quiz',
    duration: '',
    dueDate: '',
    questions: [
      {
        question: '',
        type: 'multiple-choice',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setFormData((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value,
      };
      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setFormData((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].options[optionIndex] = value;
      return {
        ...prev,
        questions: newQuestions,
      };
    });
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          type: 'multiple-choice',
          options: ['', '', '', ''],
          correctAnswer: 0,
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real app, this would upload the assessment to the server
    console.log('Assessment data:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Upload New Assessment</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Assessment Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 input-field"
              />
            </div>

            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700"
              >
                Course
              </label>
              <input
                type="text"
                name="course"
                id="course"
                required
                value={formData.course}
                onChange={handleChange}
                className="mt-1 input-field"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                name="type"
                id="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="mt-1 input-field"
              >
                <option value="quiz">Quiz</option>
                <option value="exam">Exam</option>
                <option value="project">Project</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration
              </label>
              <input
                type="text"
                name="duration"
                id="duration"
                required
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 30 minutes"
                className="mt-1 input-field"
              />
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                required
                value={formData.dueDate}
                onChange={handleChange}
                className="mt-1 input-field"
              />
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Questions</h2>
            <button
              type="button"
              onClick={addQuestion}
              className="btn-secondary"
            >
              Add Question
            </button>
          </div>

          <div className="space-y-8">
            {formData.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-medium text-gray-900">
                    Question {questionIndex + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeQuestion(questionIndex)}
                    className="text-red-600 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`question-${questionIndex}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Question Text
                    </label>
                    <input
                      type="text"
                      id={`question-${questionIndex}`}
                      value={question.question}
                      onChange={(e) =>
                        handleQuestionChange(questionIndex, 'question', e.target.value)
                      }
                      className="mt-1 input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Options
                    </label>
                    <div className="mt-2 space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center">
                          <input
                            type="radio"
                            name={`correct-answer-${questionIndex}`}
                            checked={question.correctAnswer === optionIndex}
                            onChange={() =>
                              handleQuestionChange(
                                questionIndex,
                                'correctAnswer',
                                optionIndex
                              )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(
                                questionIndex,
                                optionIndex,
                                e.target.value
                              )
                            }
                            className="ml-2 input-field"
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary">
            Upload Assessment
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadAssessment; 