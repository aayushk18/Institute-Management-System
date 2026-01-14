import { Calendar, TrendingUp, Clock, Award } from 'lucide-react';

const AttendanceStats = ({ filters }) => {
  // Calculate stats based on filters
  const getStats = () => {
    // Sample data - in real app this would come from API
    const baseStats = {
      currentMonth: {
        present: 21,
        absent: 1,
        total: 22,
        percentage: 95.5
      },
      lastMonth: {
        present: 22,
        absent: 1,
        total: 23,
        percentage: 95.7
      },
      yearToDate: {
        present: 245,
        absent: 8,
        total: 253,
        percentage: 96.8
      },
      streak: {
        current: 15,
        longest: 45
      }
    };

    if (filters.month > 0) {
      // Specific month data
      const monthData = {
        1: { present: 22, absent: 1, total: 23 },
        2: { present: 20, absent: 1, total: 21 },
        3: { present: 23, absent: 0, total: 23 },
        4: { present: 22, absent: 1, total: 23 },
        5: { present: 21, absent: 1, total: 22 },
        6: { present: 20, absent: 0, total: 20 },
        7: { present: 23, absent: 0, total: 23 },
        8: { present: 22, absent: 1, total: 23 },
        9: { present: 21, absent: 1, total: 22 },
        10: { present: 23, absent: 0, total: 23 },
        11: { present: 22, absent: 1, total: 23 },
        12: { present: 20, absent: 0, total: 20 }
      };

      const data = monthData[filters.month] || baseStats.currentMonth;
      return {
        ...baseStats,
        currentMonth: {
          ...data,
          percentage: Math.round((data.present / data.total) * 100)
        }
      };
    }

    return baseStats;
  };

  const stats = getStats();
  const trend = stats.currentMonth.percentage - stats.lastMonth.percentage;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Current Period Attendance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar size={24} className="text-blue-600" />
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            trend >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          {stats.currentMonth.percentage}%
        </h3>
        <p className="text-gray-600 text-sm font-medium">
          {filters.month > 0 ? 'Selected Month' : 'Current Month'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {stats.currentMonth.present}/{stats.currentMonth.total} days present
        </p>
      </div>

      {/* Year to Date */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <TrendingUp size={24} className="text-green-600" />
          </div>
          <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Excellent
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          {stats.yearToDate.percentage}%
        </h3>
        <p className="text-gray-600 text-sm font-medium">Year to Date</p>
        <p className="text-xs text-gray-500 mt-1">
          {stats.yearToDate.present}/{stats.yearToDate.total} days present
        </p>
      </div>

      {/* Current Streak */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Clock size={24} className="text-orange-600" />
          </div>
          <div className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
            Active
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          {stats.streak.current}
        </h3>
        <p className="text-gray-600 text-sm font-medium">Current Streak</p>
        <p className="text-xs text-gray-500 mt-1">
          Consecutive present days
        </p>
      </div>

      {/* Best Streak */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Award size={24} className="text-purple-600" />
          </div>
          <div className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
            Record
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          {stats.streak.longest}
        </h3>
        <p className="text-gray-600 text-sm font-medium">Best Streak</p>
        <p className="text-xs text-gray-500 mt-1">
          Personal record
        </p>
      </div>
    </div>
  );
};

export default AttendanceStats;