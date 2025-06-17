import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ASSESSMENT_TYPES, SCORE_RANGES } from '../utils/types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AssessmentVisualizations = ({ history, assessments }) => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const chartsRef = useRef({
    line: null,
    bar: null,
    pie: null,
  });

  useEffect(() => {
    if (!lineChartRef.current || !barChartRef.current || !pieChartRef.current) return;

    // Destroy existing charts
    Object.values(chartsRef.current).forEach(chart => {
      if (chart) {
        chart.destroy();
      }
    });

    // Score Trends Chart
    const scoreTrendsData = {
      labels: history
        .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt))
        .map((item) => new Date(item.completedAt).toLocaleDateString()),
      datasets: [
        {
          label: 'Score',
          data: history
            .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt))
            .map((item) => item.score),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    // Section Performance Chart
    const sectionPerformanceData = {
      labels: Object.keys(ASSESSMENT_TYPES),
      datasets: [
        {
          label: 'Average Questions',
          data: Object.keys(ASSESSMENT_TYPES).map((type) => {
            const typeAssessments = assessments.filter((a) => a.type === type);
            return typeAssessments.length > 0
              ? typeAssessments.reduce((acc, curr) => acc + curr.questions.length, 0) / typeAssessments.length
              : 0;
          }),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
      ],
    };

    // Score Distribution Chart
    const scoreDistributionData = {
      labels: Object.values(SCORE_RANGES).map((range) => range.label),
      datasets: [
        {
          data: Object.values(SCORE_RANGES).map((range) =>
            history.filter((item) => item.score >= range.min && item.score <= range.max).length
          ),
          backgroundColor: Object.values(SCORE_RANGES).map((range) => {
            switch (range.color) {
              case 'green':
                return 'rgba(75, 192, 192, 0.5)';
              case 'blue':
                return 'rgba(54, 162, 235, 0.5)';
              case 'yellow':
                return 'rgba(255, 205, 86, 0.5)';
              case 'red':
                return 'rgba(255, 99, 132, 0.5)';
              default:
                return 'rgba(201, 203, 207, 0.5)';
            }
          }),
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Assessment Performance',
        },
      },
    };

    // Create new charts
    chartsRef.current.line = new ChartJS(lineChartRef.current, {
      type: 'line',
      data: scoreTrendsData,
      options: chartOptions,
    });

    chartsRef.current.bar = new ChartJS(barChartRef.current, {
      type: 'bar',
      data: sectionPerformanceData,
      options: chartOptions,
    });

    chartsRef.current.pie = new ChartJS(pieChartRef.current, {
      type: 'pie',
      data: scoreDistributionData,
      options: chartOptions,
    });

    // Cleanup function
    return () => {
      Object.values(chartsRef.current).forEach(chart => {
        if (chart) {
          chart.destroy();
        }
      });
    };
  }, [history, assessments]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Score Trends</h3>
        <div style={{ height: '300px', position: 'relative' }}>
          <canvas ref={lineChartRef} />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Section-wise Performance</h3>
        <div style={{ height: '300px', position: 'relative' }}>
          <canvas ref={barChartRef} />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Score Distribution</h3>
        <div style={{ height: '300px', position: 'relative' }}>
          <canvas ref={pieChartRef} />
        </div>
      </div>
    </div>
  );
};

AssessmentVisualizations.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      assessmentId: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      completedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  assessments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      questions: PropTypes.array.isRequired,
    })
  ).isRequired,
};

export default AssessmentVisualizations; 