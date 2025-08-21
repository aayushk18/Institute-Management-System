import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { axiosInstance } from '../../../utils/axios';
import toast from 'react-hot-toast';
import { useAdminStore } from '../../../utils/useAuthStore';

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];




const getDaysInMonth = (month, year) => {

  const totalDays = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let i = 1; i <= totalDays; i++) {

    const date = new Date(year, month, i);
    const dayName = weekdays[date.getDay()];
    const isSunday = date.getDay() === 0;
    const yearStr = date.getFullYear();
    const monthStr = String(date.getMonth() + 1).padStart(2, "0");
    const dayStr = String(date.getDate()).padStart(2, "0");

    const dateStr = `${yearStr}-${monthStr}-${dayStr}`;

    days.push({
      date,
      dateStr,
      display: `${i} ${monthNames[month]}`,
      weekday: dayName,
      isSunday
    })

  }

  console.log('Generated days:', days.map(day => day.dateStr));

  return days;
};



const FacultyAttendancePage = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [attendance, setAttendance] = useState({});


  const location = useLocation();
  const state = location.state;
  const value = state?.pass;
  console.log(value);


  useEffect(() => {

    getAttendance()

  }, [selectedMonth, selectedYear])

  const sendAttendance = async () => {

    const staffModel = value.staffType == "Academic Staff" ? "AcademicStaff" : "Staff"

    const Data = {
      month: selectedMonth + 1,
      year: selectedYear,
      staffModel,
      id: value._id || value.id,
      attendance,
    }

    console.log(Data);


    await axiosInstance.post('user/admin/faculty/update-attendance', Data)
    toast.success("Attendance Updated Succesfully")


  }

  const getAttendance = async () => {
    const Data = {
      month: selectedMonth + 1,
      year: selectedYear,
      id: value.id || value._id,
    };
    const response = await axiosInstance.post('user/admin/faculty/get-general-staff-attendance', Data)
    const data = response.data;

    console.log(data);



    if (data.staff.attendance) {



      const attendanceObj = data.staff.attendance.reduce((acc, curr) => {
        acc[curr.date] = curr.status  // default if empty
        return acc;
      }, {});

      setAttendance(attendanceObj)
    }

  }



  const days = getDaysInMonth(selectedMonth, selectedYear);



  useEffect(() => {


    const initial = {};
    days.forEach(({ dateStr, isSunday }) => {
      initial[dateStr] = isSunday ? 'Sunday' : '';
    });


    getAttendance()

    setAttendance(initial); // Reset attendance to only include current month's days


  }, [selectedMonth, selectedYear]);



  const handleChangeStatus = (dateStr, status) => {
    setAttendance((prev) => ({ ...prev, [dateStr]: status }));
  };

  const getColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-500 text-white';
      case 'Half Day':
        return 'bg-orange-500 text-white';
      case 'Absent':
        return 'bg-red-500 text-white';
      case 'Sunday':
        return 'bg-white text-gray-500 border';
      default:
        return 'bg-white';
    }
  };

  const getCalendarGrid = () => {
    const firstDayOfMonth = days[0].date.getDay();
    const blankDays = Array(firstDayOfMonth).fill(null);
    return [...blankDays, ...days];
  };

  const getAttendanceSummary = () => {
    const counts = {
      Present: 0,
      Absent: 0,
      'Half Day': 0,
      Sunday: 0,
      Unmarked: 0,
    };

    Object.values(attendance).forEach((status) => {
      if (status === 'Present') counts.Present++;
      else if (status === 'Absent') counts.Absent++;
      else if (status === 'Half Day') counts['Half Day']++;
      else if (status === 'Sunday') counts.Sunday++;
      else counts.Unmarked++;
    });

    return [
      { name: 'Present', value: counts.Present, color: '#22c55e' },
      { name: 'Half Day', value: counts['Half Day'], color: '#f97316' },
      { name: 'Absent', value: counts.Absent, color: '#ef4444' },
      { name: 'Unmarked', value: counts.Unmarked, color: '#9ca3af' },
    ];
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      <h1 className="text-2xl font-bold mb-6">{`Employee Attendance - ${value.firstName} ${value?.midName} ${value?.lastName}`}</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {[currentYear, nextYear].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {monthNames.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Summary + Calendar */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        {/* Left: Donut Chart */}
        {/* Left: Donut Chart */}
        <div className="w-full lg:w-1/3 bg-gray-50 rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-4 text-center">Attendance Summary</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                dataKey="value"
                data={getAttendanceSummary()}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {getAttendanceSummary().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend below the chart */}
          <div className="mt-4 space-y-2">
            {getAttendanceSummary().map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }}></span>
                  <span className="font-medium">{entry.name}</span>
                </div>
                <span className="text-gray-700 font-semibold">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>



        {/* Right: Calendar */}
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-7 gap-2 text-sm mb-5 font-medium text-center text-gray-700">
            {weekdays.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 mb-8">
            {getCalendarGrid().map((day, idx) =>
              day ? (
                <div
                  key={day.dateStr}
                  className={`p-3 text-center border border-gray-300 ${getColor(attendance[day.dateStr])}`}
                >
                  <div className="font-semibold">{day.date.getDate()}</div>
                  <div className="text-xs">{attendance[day.dateStr] || 'Not Marked'}</div>
                </div>
              ) : (
                <div key={`blank-${idx}`} className="p-3"></div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Editable Attendance Table */}

      <div className='flex flex-row justify-between m-3'>
        <h2 className="text-xl font-semibold mb-2">Edit Attendance</h2>
        <button
          onClick={() => sendAttendance()}
          className='bg-gray-500 text-white hover:bg-gray-600 p-2 rounded-md'>Update</button>

      </div>
      <table className="w-full text-sm mb-10">
        <thead>
          <tr className="bg-gray-500 text-white text-left">
            <th className="p-2">Date</th>
            <th className="p-2">Day</th>
            <th className="p-2">Status</th>
            <th className="p-2">Set Status</th>
          </tr>
        </thead>
        <tbody>
          {days.map(({ dateStr, display, weekday, isSunday }) => (
            <tr key={dateStr} className={isSunday ? 'bg-gray-50' : ''}>
              <td className="p-2 border-t">{display}</td>
              <td className="p-2 border-t">{weekday}</td>
              <td className="p-2 border-t">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${attendance[dateStr] === 'Present'
                    ? 'bg-green-100 text-green-700'
                    : attendance[dateStr] === 'Half Day'
                      ? 'bg-orange-100 text-orange-700'
                      : attendance[dateStr] === 'Absent'
                        ? 'bg-red-300 text-red-700'
                        : attendance[dateStr] === 'Sunday'
                          ? 'bg-gray-100 text-gray-500'
                          : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {attendance[dateStr] || 'Not Marked'}
                </span>
              </td>
              <td className="p-2 border-t">
                {isSunday ? (
                  <span className="text-gray-400">N/A</span>
                ) : (
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleChangeStatus(dateStr, 'Present')}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Present
                    </button>

                    <button
                      onClick={() => handleChangeStatus(dateStr, 'Absent')}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => handleChangeStatus(dateStr, 'Half Day')}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Half Day
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyAttendancePage;















