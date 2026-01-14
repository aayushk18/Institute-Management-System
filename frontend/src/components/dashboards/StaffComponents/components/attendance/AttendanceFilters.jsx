import { useState } from 'react';
import { Filter, Calendar, ChevronDown } from 'lucide-react';

const AttendanceFilters = ({ onFilterChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filterType, setFilterType] = useState('month'); // 'month' or 'range'

  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    onFilterChange({
      month: month,
      year: selectedYear,
      dateRange: { start: '', end: '' }
    });
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    onFilterChange({
      month: selectedMonth,
      year: year,
      dateRange: { start: '', end: '' }
    });
  };

  const handleDateRangeChange = (field, value) => {
    const newRange = { ...dateRange, [field]: value };
    setDateRange(newRange);
    
    if (newRange.start && newRange.end) {
      onFilterChange({
        month: 0, // Reset month when using date range
        year: selectedYear,
        dateRange: newRange
      });
    }
  };

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
    if (type === 'month') {
      setDateRange({ start: '', end: '' });
      onFilterChange({
        month: selectedMonth,
        year: selectedYear,
        dateRange: { start: '', end: '' }
      });
    } else {
      onFilterChange({
        month: 0,
        year: selectedYear,
        dateRange: dateRange
      });
    }
  };

  const resetFilters = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
    setDateRange({ start: '', end: '' });
    setFilterType('month');
    onFilterChange({
      month: currentMonth,
      year: currentYear,
      dateRange: { start: '', end: '' }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter size={20} className="text-blue-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Filter Attendance Records</h2>
        </div>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Reset to Current Month
        </button>
      </div>

      {/* Filter Type Toggle */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleFilterTypeChange('month')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filterType === 'month'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar size={16} className="inline mr-2" />
            Month View
          </button>
          <button
            onClick={() => handleFilterTypeChange('range')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filterType === 'range'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar size={16} className="inline mr-2" />
            Date Range
          </button>
        </div>
      </div>

      {/* Month/Year Filters */}
      {filterType === 'month' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Month
            </label>
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Year
            </label>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* Date Range Filters */}
      {filterType === 'range' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              min={dateRange.start}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
            />
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-sm font-medium text-blue-900">Active Filter:</span>
          {filterType === 'month' ? (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {months.find(m => m.value === selectedMonth)?.name} {selectedYear}
            </span>
          ) : (
            dateRange.start && dateRange.end && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilters;