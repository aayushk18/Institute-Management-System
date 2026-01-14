import { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Calendar, TrendingUp } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyAttendanceChart = ({ filters }) => {
  const chartRef = useRef(null);

  // Sample monthly attendance data
  const getMonthlyData = () => {
    if (filters.dateRange.start && filters.dateRange.end) {
      // For date range, show daily data
      return getDailyRangeData();
    }

    // Monthly data for the year
    const monthlyData = {
      2024: [
        { month: 'Jan', present: 22, absent: 1, total: 23 },
        { month: 'Feb', present: 20, absent: 1, total: 21 },
        { month: 'Mar', present: 23, absent: 0, total: 23 },
        { month: 'Apr', present: 22, absent: 1, total: 23 },
        { month: 'May', present: 21, absent: 1, total: 22 },
        { month: 'Jun', present: 20, absent: 0, total: 20 },
        { month: 'Jul', present: 23, absent: 0, total: 23 },
        { month: 'Aug', present: 22, absent: 1, total: 23 },
        { month: 'Sep', present: 21, absent: 1, total: 22 },
        { month: 'Oct', present: 23, absent: 0, total: 23 },
        { month: 'Nov', present: 22, absent: 1, total: 23 },
        { month: 'Dec', present: 20, absent: 0, total: 20 }
      ],
      2023: [
        { month: 'Jan', present: 21, absent: 2, total: 23 },
        { month: 'Feb', present: 19, absent: 2, total: 21 },
        { month: 'Mar', present: 22, absent: 1, total: 23 },
        { month: 'Apr', present: 21, absent: 2, total: 23 },
        { month: 'May', present: 20, absent: 2, total: 22 },
        { month: 'Jun', present: 19, absent: 1, total: 20 },
        { month: 'Jul', present: 22, absent: 1, total: 23 },
        { month: 'Aug', present: 21, absent: 2, total: 23 },
        { month: 'Sep', present: 20, absent: 2, total: 22 },
        { month: 'Oct', present: 22, absent: 1, total: 23 },
        { month: 'Nov', present: 21, absent: 2, total: 23 },
        { month: 'Dec', present: 19, absent: 1, total: 20 }
      ]
    };

    return monthlyData[filters.year] || monthlyData[2024];
  };

  const getDailyRangeData = () => {
    const start = new Date(filters.dateRange.start);
    const end = new Date(filters.dateRange.end);
    const days = [];
    
    // Calculate total days in range
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      // Skip weekends
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const isPresent = Math.random() > 0.1; // 90% attendance rate
        const dayName = d.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric'
        });
        
        days.push({
          month: dayName,
          present: isPresent ? 1 : 0,
          absent: isPresent ? 0 : 1,
          total: 1,
          fullDate: new Date(d)
        });
      }
    }
    
    // If more than 15 days, group by weeks for better visualization
    if (days.length > 15) {
      return groupByWeeks(days);
    }
    
    return days;
  };

  const groupByWeeks = (dailyData) => {
    const weeks = [];
    let currentWeek = [];
    let weekStart = null;
    
    dailyData.forEach((day, index) => {
      if (currentWeek.length === 0) {
        weekStart = new Date(day.fullDate);
      }
      
      currentWeek.push(day);
      
      // Group by 5 working days or if it's the last item
      if (currentWeek.length === 5 || index === dailyData.length - 1) {
        const weekEnd = new Date(currentWeek[currentWeek.length - 1].fullDate);
        const totalPresent = currentWeek.reduce((sum, d) => sum + d.present, 0);
        const totalAbsent = currentWeek.reduce((sum, d) => sum + d.absent, 0);
        
        weeks.push({
          month: `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
          present: totalPresent,
          absent: totalAbsent,
          total: totalPresent + totalAbsent
        });
        
        currentWeek = [];
      }
    });
    
    return weeks;
  };

  const data = getMonthlyData();
  
  const totalPresent = data.reduce((sum, item) => sum + item.present, 0);
  const totalAbsent = data.reduce((sum, item) => sum + item.absent, 0);
  const totalDays = totalPresent + totalAbsent;
  const attendancePercentage = totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) : 0;

  const isDateRange = filters.dateRange.start && filters.dateRange.end;
  const isLongRange = data.length > 15;

  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Present Days',
        data: data.map(item => item.present),
        backgroundColor: '#10B981',
        borderColor: '#059669',
        borderWidth: 0,
        borderRadius: isDateRange ? 4 : 6,
        borderSkipped: false,
        barThickness: isDateRange ? (isLongRange ? 'flex' : 20) : 'flex',
        maxBarThickness: isDateRange ? 25 : 40,
      },
      {
        label: 'Absent Days',
        data: data.map(item => item.absent),
        backgroundColor: '#EF4444',
        borderColor: '#DC2626',
        borderWidth: 0,
        borderRadius: isDateRange ? 4 : 6,
        borderSkipped: false,
        barThickness: isDateRange ? (isLongRange ? 'flex' : 20) : 'flex',
        maxBarThickness: isDateRange ? 25 : 40,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
            weight: '500'
          }
        }
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
          title: function(context) {
            if (isDateRange) {
              return isLongRange ? `Week: ${context[0].label}` : `Date: ${context[0].label}`;
            }
            return `Month: ${context[0].label}`;
          },
          afterLabel: function(context) {
            const total = data[context.dataIndex].total;
            const percentage = total > 0 ? Math.round((context.parsed.y / total) * 100) : 0;
            return `${percentage}% of ${isDateRange ? (isLongRange ? 'week' : 'day') : 'month'}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: isDateRange ? (isLongRange ? 10 : 11) : 12,
            weight: '500'
          },
          color: '#6b7280',
          maxRotation: isDateRange ? 45 : 0,
          minRotation: isDateRange ? (isLongRange ? 45 : 0) : 0
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6'
        },
        ticks: {
          font: {
            size: 12
          },
          color: '#6b7280',
          stepSize: 1,
          max: isDateRange && !isLongRange ? 1 : undefined
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    layout: {
      padding: {
        top: 10,
        bottom: isDateRange && isLongRange ? 20 : 10
      }
    }
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.update('active');
    }
  }, [filters]);

  const getTitle = () => {
    if (filters.dateRange.start && filters.dateRange.end) {
      const startDate = new Date(filters.dateRange.start).toLocaleDateString();
      const endDate = new Date(filters.dateRange.end).toLocaleDateString();
      return `Daily Attendance (${startDate} - ${endDate})`;
    }
    const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    if (filters.month > 0) {
      return `${monthNames[filters.month]} ${filters.year} Attendance`;
    }
    return `${filters.year} Monthly Attendance Overview`;
  };

  const getChartHeight = () => {
    if (isDateRange) {
      return isLongRange ? 'h-96' : 'h-80';
    }
    return 'h-80';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar size={20} className="text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{attendancePercentage}%</div>
            <div className="text-sm text-gray-600">Overall</div>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <TrendingUp size={24} className="text-green-600" />
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className={`${getChartHeight()} mb-6`}>
        <Bar ref={chartRef} data={chartData} options={chartOptions} />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{totalPresent}</div>
          <div className="text-sm text-gray-600">
            Present {isDateRange ? 'Days' : 'Days'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{totalAbsent}</div>
          <div className="text-sm text-gray-600">
            Absent {isDateRange ? 'Days' : 'Days'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{totalDays}</div>
          <div className="text-sm text-gray-600">
            Total {isDateRange ? 'Days' : 'Days'}
          </div>
        </div>
      </div>

      {/* Date Range Info */}
      {isDateRange && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>📊 Chart View:</strong> {isLongRange ? 
              'Data grouped by weeks for better visualization of long date ranges' : 
              'Daily attendance view for selected date range'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default MonthlyAttendanceChart;