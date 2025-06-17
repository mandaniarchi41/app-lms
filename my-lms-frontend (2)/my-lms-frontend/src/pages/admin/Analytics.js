import React from 'react';

const Analytics = () => {
  // Mock data for analytics
  const analyticsData = {
    overview: {
      totalUsers: 1234,
      activeUsers: 890,
      totalCourses: 45,
      totalAssessments: 89,
    },
    userGrowth: [
      { month: 'Jan', users: 100 },
      { month: 'Feb', users: 150 },
      { month: 'Mar', users: 200 },
      { month: 'Apr', users: 250 },
      { month: 'May', users: 300 },
      { month: 'Jun', users: 350 },
    ],
    courseStats: [
      { name: 'Web Development', students: 250, completion: 75 },
      { name: 'Data Science', students: 180, completion: 65 },
      { name: 'Machine Learning', students: 150, completion: 60 },
      { name: 'Mobile Development', students: 120, completion: 70 },
    ],
    assessmentStats: [
      { name: 'Quiz 1', averageScore: 85, attempts: 200 },
      { name: 'Midterm', averageScore: 75, attempts: 180 },
      { name: 'Final Exam', averageScore: 80, attempts: 150 },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 truncate">
                  Total Users
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  {analyticsData.overview.totalUsers}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 truncate">
                  Active Users
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  {analyticsData.overview.activeUsers}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 truncate">
                  Total Courses
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  {analyticsData.overview.totalCourses}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 truncate">
                  Total Assessments
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  {analyticsData.overview.totalAssessments}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Statistics */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Course Statistics
          </h3>
          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.courseStats.map((course, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.students}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.completion}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Assessment Statistics */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Assessment Statistics
          </h3>
          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assessment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Average Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attempts
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.assessmentStats.map((assessment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {assessment.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {assessment.averageScore}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {assessment.attempts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            User Growth
          </h3>
          <div className="mt-4">
            <div className="h-64 flex items-end space-x-2">
              {analyticsData.userGrowth.map((data, index) => (
                <div key={index} className="flex-1">
                  <div
                    className="bg-blue-500 rounded-t"
                    style={{
                      height: `${(data.users / 400) * 100}%`,
                    }}
                  />
                  <div className="text-center text-xs text-gray-500 mt-2">
                    {data.month}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 