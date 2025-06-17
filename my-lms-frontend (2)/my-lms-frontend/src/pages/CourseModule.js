import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock data for module content
const moduleContent = {
  id: 1,
  courseId: 1,
  title: 'HTML Basics',
  description: 'Learn the fundamentals of HTML markup language.',
  content: `
    <h2>Introduction to HTML</h2>
    <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages.</p>
    
    <h3>Basic Structure</h3>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;My First Heading&lt;/h1&gt;
    &lt;p&gt;My first paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>

    <h3>Common HTML Elements</h3>
    <ul>
      <li>&lt;h1&gt; to &lt;h6&gt; - Headings</li>
      <li>&lt;p&gt; - Paragraphs</li>
      <li>&lt;a&gt; - Links</li>
      <li>&lt;img&gt; - Images</li>
      <li>&lt;div&gt; - Division/Container</li>
    </ul>
  `,
  resources: [
    {
      id: 1,
      title: 'HTML Cheat Sheet',
      type: 'PDF',
      url: '#',
    },
    {
      id: 2,
      title: 'HTML Video Tutorial',
      type: 'Video',
      url: '#',
    },
  ],
};

const CourseModule = () => {
  const { id, moduleId } = useParams();
  const module = moduleContent; // In a real app, fetch module by id

  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
            <p className="mt-1 text-gray-500">{module.description}</p>
          </div>
          <Link
            to={`/courses/${id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Back to Course
          </Link>
        </div>
      </div>

      {/* Module Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: module.content }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Resources */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900">Resources</h2>
            <div className="mt-4 space-y-4">
              {module.resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{resource.title}</p>
                    <p className="text-sm text-gray-500">{resource.type}</p>
                  </div>
                  <a
                    href={resource.url}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900">Your Progress</h2>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Module Progress</span>
                <span className="font-medium text-gray-900">0%</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
            <button className="mt-4 w-full btn-primary">
              Mark as Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModule; 