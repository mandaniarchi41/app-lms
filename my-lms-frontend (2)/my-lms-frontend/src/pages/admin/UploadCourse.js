import React, { useState } from 'react';

const UploadCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'beginner',
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real app, this would upload the course to the server
    console.log('Course data:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Upload New Course</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Course Title
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
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                className="mt-1 input-field"
              />
            </div>

            <div>
              <label
                htmlFor="instructor"
                className="block text-sm font-medium text-gray-700"
              >
                Instructor
              </label>
              <input
                type="text"
                name="instructor"
                id="instructor"
                required
                value={formData.instructor}
                onChange={handleChange}
                className="mt-1 input-field"
              />
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
                placeholder="e.g., 8 weeks"
                className="mt-1 input-field"
              />
            </div>

            <div>
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700"
              >
                Level
              </label>
              <select
                name="level"
                id="level"
                required
                value={formData.level}
                onChange={handleChange}
                className="mt-1 input-field"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700"
              >
                Course Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary">
            Upload Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadCourse; 