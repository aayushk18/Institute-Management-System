import { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Search, Download } from 'lucide-react';

const DailyAttendanceTable = ({ filters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  // Generate sample daily attendance data
  const generateDailyData = () => {
    const data = [];
    let startDate, endDate;

    if (filters.dateRange.start && filters.dateRange.end) {
      startDate = new Date(filters.dateRange.start);
      endDate = new Date(filters.dateRange.end);
    } else if (filters.month > 0) {
      startDate = new Date(filters.year, filters.month - 1, 1);
      endDate = new Date(filters.year, filters.month, 0);
    } else {
      // Current month
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      // Skip weekends
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const isPresent = Math.random() > 0.05; // 95% attendance rate
        const checkInTime = isPresent ? 
          `${8 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} AM` : 
          null;
        const checkOutTime = isPresent ? 
          `${4 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} PM` : 
          null;

        data.push({
          id: data.length + 1,
          date: new Date(d),
          status: isPresent ? 'Present' : 'Absent',
          checkIn: checkInTime,
          checkOut: checkOutTime,
          workingHours: isPresent ? `${7 + Math.floor(Math.random() * 2)}.${Math.floor(Math.random() * 6)}` : '0',
          remarks: isPresent ? 'On time' : ['Sick leave', 'Personal leave', 'Emergency'][Math.floor(Math.random() * 3)]
        });
      }
    }

    return data.reverse(); // Most recent first
  };

  const attendanceData = generateDailyData();

  // Filter data based on search term
  const filteredData = attendanceData.filter(record => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.date.toLocaleDateString().toLowerCase().includes(searchLower) ||
      record.status.toLowerCase().includes(searchLower) ||
      record.remarks.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'Absent':
        return <XCircle size={20} className="text-red-600" />;
      default:
        return <Clock size={20} className="text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Absent':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const exportData = () => {
    // Simple CSV export
    const headers = ['Date', 'Status', 'Check In', 'Check Out', 'Working Hours', 'Remarks'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(record => [
        record.date.toLocaleDateString(),
        record.status,
        record.checkIn || 'N/A',
        record.checkOut || 'N/A',
        record.workingHours,
        record.remarks
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${filters.month > 0 ? `${filters.month}-${filters.year}` : 'data'}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar size={20} className="text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Daily Attendance Records</h2>
        </div>
        <button
          onClick={exportData}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Download size={16} className="mr-2" />
          Export CSV
        </button>
      </div>

      {/* Search and Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by date, status, or remarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
          Showing {currentData.length} of {filteredData.length} records
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Date</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Day</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Check In</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Check Out</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Working Hours</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {record.date.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: '2-digit',
                        year: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">
                      {record.date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900 font-medium">
                      {record.checkIn || '-'}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900 font-medium">
                      {record.checkOut || '-'}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900 font-medium">
                      {record.workingHours}h
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600 text-sm">
                      {record.remarks}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-12 text-center">
                  <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No attendance records found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your search or date filters</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyAttendanceTable;