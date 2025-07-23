import React, { useState, useEffect } from "react";

// Mock Data for Holidays, Classes, Streams, and Subjects
const holidays = [
  { date: "2025-01-01", name: "New Year's Day" },
  { date: "2025-01-26", name: "Republic Day" },
  { date: "2025-03-29", name: "Holi" },
  { date: "2025-08-15", name: "Independence Day" },
  { date: "2025-10-02", name: "Gandhi Jayanti" },
  { date: "2025-10-20", name: "Diwali" },
  { date: "2025-12-25", name: "Christmas" },
  // Add more holidays as needed
];

const classesData = {
  "Class 9": {
    // Added Class 9 to ensure it appears in headers
    General: ["Mathematics", "Science", "Social Science", "English", "Hindi"],
  },
  "Class 10": {
    Science: ["Physics", "Chemistry", "Biology", "Mathematics"],
    Commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    Arts: ["History", "Political Science", "Geography", "English Literature"],
  },
  "Class 12": {
    Science: [
      "Physics",
      "Chemistry",
      "Biology",
      "Mathematics",
      "Computer Science",
    ],
    Commerce: [
      "Accountancy",
      "Business Studies",
      "Economics",
      "Applied Mathematics",
      "Informatics Practices",
    ],
    Arts: [
      "History",
      "Political Science",
      "Sociology",
      "Psychology",
      "Fine Arts",
    ],
  },
  // Add more classes and their streams/subjects
};

const Home = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [dateSheet, setDateSheet] = useState([]);

  // Get all unique class names from the classesData for table headers
  const allClasses = Object.keys(classesData).sort((a, b) => {
    // Sort classes numerically (e.g., 'Class 9', 'Class 10', 'Class 12')
    const numA = parseInt(a.replace("Class ", ""));
    const numB = parseInt(b.replace("Class ", ""));
    return numA - numB;
  });

  // Function to get the number of days in a month
  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  // Function to get the first day of the month (0 for Sunday, 1 for Monday, etc.)
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  // Function to check if a date is a Sunday
  const isSunday = (year, month, day) => {
    const date = new Date(year, month, day);
    return date.getDay() === 0; // Sunday is 0
  };

  // Function to get the holiday information for a given date
  const getHolidayInfo = (year, month, day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return holidays.find((holiday) => holiday.date === dateString);
  };

  // Handle navigation to the previous month
  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  // Handle navigation to the next month
  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  // Handle date click in the calendar
  const handleDateClick = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    // Only allow selection if it's not a Sunday or a holiday
    if (
      !isSunday(currentYear, currentMonth, day) &&
      !getHolidayInfo(currentYear, currentMonth, day)
    ) {
      setSelectedDate(date);
    }
  };

  // Handle class selection change
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedStream(""); // Reset stream when class changes
    setSelectedSubjects([]); // Reset subjects when class changes
  };

  // Handle stream selection change
  const handleStreamChange = (e) => {
    setSelectedStream(e.target.value);
    setSelectedSubjects([]); // Reset subjects when stream changes
  };

  // Handle subject checkbox change
  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSubjects((prev) =>
      checked ? [...prev, value] : prev.filter((subject) => subject !== value)
    );
  };

  // Generate a new entry for the date sheet
  const generateDateSheet = () => {
    if (
      !selectedDate ||
      !selectedClass ||
      !selectedStream ||
      selectedSubjects.length === 0
    ) {
      // Use a custom alert message instead of browser's alert()
      const messageBox = document.createElement("div");
      messageBox.className =
        "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"; // Added z-50 for layering
      messageBox.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-xl text-center">
          <p class="text-lg font-semibold mb-4">Please select a date, class, stream, and at least one subject to generate the date sheet.</p>
          <button id="close-message-box" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      document.getElementById("close-message-box").onclick = () =>
        document.body.removeChild(messageBox);
      return;
    }

    const newEntry = {
      date: selectedDate.toDateString(),
      class: selectedClass,
      stream: selectedStream,
      subjects: [...selectedSubjects],
    };

    setDateSheet((prev) => {
      // Check if an entry for the same date, class, and stream already exists
      const existingIndex = prev.findIndex(
        (entry) =>
          entry.date === newEntry.date &&
          entry.class === newEntry.class &&
          entry.stream === newEntry.stream
      );

      if (existingIndex > -1) {
        // If it exists, update the subjects for that entry
        const updatedDateSheet = [...prev];
        updatedDateSheet[existingIndex].subjects = newEntry.subjects;
        return updatedDateSheet;
      } else {
        // Otherwise, add a new entry
        return [...prev, newEntry];
      }
    });

    // Optionally reset fields after adding
    setSelectedDate(null);
    setSelectedClass("");
    setSelectedStream("");
    setSelectedSubjects([]);
  };

  // Render the calendar days for the current month
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear); // 0 for Sunday, 1 for Monday

    const days = [];
    // Add empty cells for days before the 1st of the month to align with the weekday headers
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 text-center"></div>);
    }

    // Add actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDaySunday = isSunday(currentYear, currentMonth, day);
      const holidayInfo = getHolidayInfo(currentYear, currentMonth, day);
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;

      let dayClasses =
        "p-2 text-center rounded-md cursor-pointer transition-colors duration-200";
      if (isCurrentDaySunday) {
        dayClasses +=
          " bg-red-100 text-red-500 line-through cursor-not-allowed";
      } else if (holidayInfo) {
        dayClasses +=
          "bg-yellow-100 text-yellow-700 font-semibold relative group";
      } else if (isSelected) {
        dayClasses += " bg-blue-500 text-white";
      } else {
        dayClasses += " hover:bg-gray-200";
      }

      days.push(
        <div
          key={day}
          className={dayClasses}
          onClick={() => handleDateClick(day)}
          title={holidayInfo ? holidayInfo.name : ""} // Show holiday name on hover
        >
          {day}
          {holidayInfo && (
            <span className="absolute bottom-0 left-0 right-0 text-xs bg-yellow-300 text-yellow-800 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {holidayInfo.name}
            </span>
          )}
        </div>
      );
    }
    return days;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const availableStreams = selectedClass
    ? Object.keys(classesData[selectedClass])
    : [];
  const availableSubjects =
    selectedClass && selectedStream
      ? classesData[selectedClass][selectedStream]
      : [];

  // Group dateSheet entries by date for easier rendering in the new table format
  const groupedDateSheet = dateSheet.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = {};
    }
    // Combine subjects if multiple entries for the same class on the same date (e.g., different streams added separately)
    if (acc[entry.date][entry.class]) {
      // Use a Set to avoid duplicate subjects if somehow added
      acc[entry.date][entry.class] = [
        ...new Set([...acc[entry.date][entry.class], ...entry.subjects]),
      ];
    } else {
      acc[entry.date][entry.class] = entry.subjects;
    }
    return acc;
  }, {});

  // Get sorted unique dates for table rows
  const uniqueDates = Object.keys(groupedDateSheet).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date Selection Part */}
        <div className="border-r md:border-r-2 border-gray-200 pr-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Select Date
          </h2>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h3 className="text-xl font-semibold text-gray-700">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-sm font-medium text-gray-600 mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
          {selectedDate && (
            <p className="mt-4 text-center text-lg font-medium text-blue-600">
              Selected Date: {selectedDate.toDateString()}
            </p>
          )}
        </div>

        {/* Class, Stream, and Subject Selection Part */}
        <div className="pl-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Details Selection
          </h2>

          {/* Class Selection */}
          <div className="mb-6">
            <label
              htmlFor="class-select"
              className="block text-gray-700 text-lg font-medium mb-2"
            >
              Select Class:
            </label>
            <select
              id="class-select"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
              value={selectedClass}
              onChange={handleClassChange}
            >
              <option value="">-- Select Class --</option>
              {Object.keys(classesData).map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          {/* Stream Selection */}
          {selectedClass && (
            <div className="mb-6">
              <label
                htmlFor="stream-select"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Select Stream:
              </label>
              <select
                id="stream-select"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                value={selectedStream}
                onChange={handleStreamChange}
                disabled={!selectedClass}
              >
                <option value="">-- Select Stream --</option>
                {availableStreams.map((streamName) => (
                  <option key={streamName} value={streamName}>
                    {streamName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Subject Selection */}
          {selectedStream && availableSubjects.length > 0 && (
            <div className="mb-6">
              <label className="block text-gray-700 text-lg font-medium mb-2">
                Select Subjects:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {availableSubjects.map((subject) => (
                  <div key={subject} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`subject-${subject}`}
                      value={subject}
                      checked={selectedSubjects.includes(subject)}
                      onChange={handleSubjectChange}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`subject-${subject}`}
                      className="ml-2 text-gray-800 text-base cursor-pointer"
                    >
                      {subject}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={generateDateSheet}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add to Date Sheet
          </button>
        </div>

        {/* Generated Date Sheet Display in Table Format */}
        <div className="md:col-span-2 mt-8 p-6 bg-blue-50 rounded-xl shadow-inner">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
            Generated Date Sheet
          </h2>
          {dateSheet.length === 0 ? (
            <p className="text-center text-gray-600">
              No entries in the date sheet yet. Add some above!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-blue-100 text-blue-800 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left border-b border-gray-300">
                      Date
                    </th>
                    {allClasses.map((className) => (
                      <th
                        key={className}
                        className="py-3 px-6 text-left border-b border-gray-300"
                      >
                        {className}
                      </th>
                    ))}
                    <th className="py-3 px-6 text-left border-b border-gray-300">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {uniqueDates.map((date) => {
                    const rowData = groupedDateSheet[date];
                    let totalSubjectsInRow = 0;
                    return (
                      <tr
                        key={date}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {date}
                        </td>
                        {allClasses.map((className) => {
                          const subjectsForClass = rowData[className] || [];
                          totalSubjectsInRow += subjectsForClass.length;
                          return (
                            <td
                              key={`${date}-${className}`}
                              className="py-3 px-6 text-left"
                            >
                              {subjectsForClass.length > 0
                                ? subjectsForClass.join(", ")
                                : "-"}
                            </td>
                          );
                        })}
                        <td className="py-3 px-6 text-left font-semibold">
                          {totalSubjectsInRow}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
