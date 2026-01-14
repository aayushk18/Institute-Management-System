import { useState } from 'react';
import AttendanceFilters from './AttendanceFilters';
import DailyAttendanceTable from './DailyAttendanceTable';
import MonthlyAttendanceChart from './MonthlyAttendanceChart';
import AttendanceStats from './AttendanceStats';

const AttendanceMain = () => {
  const [filters, setFilters] = useState({
    month: new Date().getMonth() + 1, // Current month
    year: new Date().getFullYear(),
    dateRange: {
      start: '',
      end: ''
    }
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Attendance Records
        </h1>
        <p className="text-gray-600">
          Track your daily attendance, view monthly summaries, and analyze attendance patterns.
        </p>
      </div>

      {/* Filters */}
      <AttendanceFilters onFilterChange={handleFilterChange} />

      {/* Monthly Chart Overview */}
      <MonthlyAttendanceChart filters={filters} />

      {/* Attendance Stats */}
      <AttendanceStats filters={filters} />

      {/* Daily Attendance Table */}
      <DailyAttendanceTable filters={filters} />
    </div>
  );
};

export default AttendanceMain;