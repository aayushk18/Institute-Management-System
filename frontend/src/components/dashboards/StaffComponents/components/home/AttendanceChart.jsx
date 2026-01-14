import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Calendar } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = () => {
  const chartRef = useRef(null);

  // Simplified data - only Present and Absent
  const attendanceData = [
    { name: 'Present', value: 22, color: '#10B981' },
    { name: 'Absent', value: 3, color: '#EF4444' }
  ];

  const totalDays = attendanceData.reduce((sum, item) => sum + item.value, 0);
  const presentDays = attendanceData.find(item => item.name === 'Present')?.value || 0;
  const attendancePercentage = Math.round((presentDays / totalDays) * 100);

  const chartData = {
    labels: attendanceData.map(item => item.name),
    datasets: [
      {
        data: attendanceData.map(item => item.value),
        backgroundColor: attendanceData.map(item => item.color),
        borderColor: attendanceData.map(item => item.color),
        borderWidth: 0,
        cutout: '70%',
        borderRadius: 8,
        spacing: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#6b7280',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const percentage = Math.round((context.parsed / totalDays) * 100);
            return `${context.label}: ${context.parsed} days (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    elements: {
      arc: {
        borderWidth: 0,
      }
    }
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      // Trigger animation on mount
      chart.update('active');
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Current Month Attendance</h2>
        <Calendar size={20} className="text-gray-400" />
      </div>

      {/* Chart Container */}
      <div className="relative">
        <div className="h-64 relative">
          <Doughnut ref={chartRef} data={chartData} options={chartOptions} />
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {attendancePercentage}%
              </div>
              <div className="text-sm text-gray-500 font-medium">
                Present
              </div>
            </div>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="flex justify-center gap-6 mt-6">
          {attendanceData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600 font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Stats */}
      <div className="mt-6 space-y-3 bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Total Working Days</span>
          <span className="font-semibold text-gray-900">{totalDays}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Present Days</span>
          <span className="font-semibold text-green-600">{presentDays}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Absent Days</span>
          <span className="font-semibold text-red-600">
            {attendanceData.find(item => item.name === 'Absent')?.value || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;