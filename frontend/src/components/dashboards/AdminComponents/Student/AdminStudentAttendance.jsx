import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAdminStore } from '../../../utils/useAuthStore';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const dummyEvents = [
    { date: '2025-08-15', status: 'holiday', remark: 'Raksha Bandhan' },
    { date: '2025-08-20', status: 'half day', remark: 'Annual Day' }
]

const dummyStudents = [
    { id: 1, firstName: 'John', lastName: 'Doe', StudentClass: '10', section: 'C', Roll_no: '101', status: 'Present' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', StudentClass: '10', section: 'C', Roll_no: '102', status: 'Absent' },
    { id: 4, firstName: 'Bob', lastName: 'Martin', StudentClass: '8', section: 'C', Roll_no: '104' }, // Unmarked,
    { id: 5, firstName: 'Andrew', lastName: 'Martin', StudentClass: '10', section: 'C', Roll_no: '105' } // Unmarked

];

const AdminStudentAttendance = () => {

    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [selectedClass, setSelectedClass] = useState('1');
    const [selectedSection, setSelectedSection] = useState('A');
    const [selectedDate, setSelectedDate] = useState(null);
    const [students, setStudents] = useState([]);
    const [events, setEvents] = useState([]);

    const { getFullClassData } = useAdminStore()

    useEffect(() => {
        fetchEvents();
    }, [year, month]);

    const fetchEvents = () => {
        setEvents(dummyEvents);
    };

    const getDaysInMonth = () => {
        const firstDay = new Date(year, month, 1);
        const totalDays = new Date(year, month + 1, 0).getDate();
        const blankDays = Array(firstDay.getDay()).fill(null);
        return [
            ...blankDays,
            ...Array.from({ length: totalDays }, (_, i) => new Date(year, month, i + 1))
        ];
    };

    const handleDateClick = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        const event = events.find((e) => e.date === dateStr);
        if (date.getDay() === 0 || event?.status === 'holiday') return;

        setSelectedDate(date);
        fetchAttendance(date);
    };

    const fetchAttendance = async (date) => {

        const cls = await getFullClassData(selectedClass, selectedSection);

        console.log(cls);
        console.log(date);


        setStudents(cls);
    };

    const handleStatusChange = (id, status) => {
        setStudents((prev) =>
            prev.map((student) =>
                student.id === id ? { ...student, status } : student
            )
        );
        console.log(students);

    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Present': return 'bg-green-500 text-white';
            case 'Absent': return 'bg-red-500 text-white';
            // case 'Half Day': return 'bg-orange-500 text-white';
            default: return 'bg-gray-300 text-black';
        }
    };

    const getEvent = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        return events.find((e) => e.date === dateStr);
    };

    const getAttendanceSummary = () => {
        const counts = { Present: 0, Absent: 0, Unmarked: 0 };
        students.forEach((s) => {
            if (s.status === 'Present') counts.Present++;
            else if (s.status === 'Absent') counts.Absent++;
            // else if (s.status === 'Half Day') counts['Half Day']++;
            else counts.Unmarked++;
        });
        return [
            { name: 'Present', value: counts.Present, color: '#22c55e' },
            // { name: 'Half Day', value: counts['Half Day'], color: '#f97316' },
            { name: 'Absent', value: counts.Absent, color: '#ef4444' },
            { name: 'Unmarked', value: counts.Unmarked, color: '#9ca3af' },
        ];
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white">
            <div className="flex justify-between gap-4 mb-6">
                <div className="flex gap-2">
                    <select value={year} onChange={(e) => setYear(+e.target.value)} className="border p-2 rounded">
                        {[year, year + 1].map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <select value={month} onChange={(e) => setMonth(+e.target.value)} className="border p-2 rounded">
                        {months.map((m, idx) => <option key={idx} value={idx}>{m}</option>)}
                    </select>
                </div>
                <div className="flex gap-2">
                    <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="border p-2 rounded">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((cls) => <option key={cls}>{cls}</option>)}
                    </select>
                    <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="border p-2 rounded">
                        {['A', 'B', 'C', 'D', 'E', 'F'].map((sec) => <option key={sec}>{sec}</option>)}
                    </select>
                </div>
            </div>

            <table className="w-full text-center mb-10">
                <thead>
                    <tr>
                        {weekdays.map((day) => (
                            <th key={day} className="p-2   font-semibold">{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: Math.ceil(getDaysInMonth().length / 7) }, (_, weekIdx) => (
                        <tr key={weekIdx} className=' '>
                            {getDaysInMonth().slice(weekIdx * 7, weekIdx * 7 + 7).map((date, idx) => {
                                if (!date) return <td key={idx} className="   p-4"></td>;
                                const dateStr = date.toISOString().split('T')[0];
                                const event = getEvent(date);
                                const isSunday = date.getDay() === 0;
                                const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                                const isDisabled = isSunday || event?.status === 'holiday';
                                const bg = isDisabled ? 'bg-gray-200' : isSelected ? 'bg-gray-500 hover:bg-gray-600 text-white' : 'bg-white';


                                if (isDisabled) {
                                    return (

                                        <td key={idx} className={` font-bold   p-2 `}>

                                            <div className={`h-full  p-2 border-gray-300 align-top ${bg}`}>

                                                <div className="font-medium ">{date.getDate()}</div>
                                                {/* {event && <div className={`text-xs ${isSelected ? "text-white" : "text-gray-600"}`}></div>} */}
                                                <div className={`text-xs ${isSelected ? "text-white" : "text-gray-600"}`}>{event ? event.remark : 'Sunday'}</div>
                                            </div>

                                        </td>
                                    )
                                } else {

                                    return (

                                        <td key={idx} className={`   p-2 `} onClick={() => handleDateClick(date)}>

                                            <div className={`h-full p-2 cursor-pointer hover:bg-gray-50  border-2 border-gray-300 align-top ${bg}`}>
                                                <div className="font-medium">{date.getDate()}</div>
                                                {event && <div className={`text-xs ${isSelected ? "text-white" : "text-gray-600"}`}>{event.remark}</div>}

                                                <button className={`text-xs ${isSelected ? "text-white" : "text-gray-600"}`} >Mark</button>

                                            </div>

                                        </td>
                                    );
                                }


                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedDate && (
                <div className="flex gap-8 mb-8">
                    <div className="w-1/3 bg-gray-50 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold text-center mb-4">Attendance Summary</h2>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={getAttendanceSummary()} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>
                                    {getAttendanceSummary().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 text-sm space-y-1">
                            {getAttendanceSummary().map((entry, i) => (
                                <div key={i} className="flex justify-between">
                                    <span>{entry.name}</span>
                                    <span className="font-medium">{entry.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-2/3">
                        <h2 className="text-xl font-semibold mb-4">Student Attendance for {selectedDate.toDateString()}</h2>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-500 text-white">
                                    <th className="p-2">S.No</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Class</th>
                                    <th className="p-2">Roll No</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s, idx) => (
                                    <tr key={s.id} className="border-t">
                                        <td className="p-2">{idx + 1}</td>
                                        <td className="p-2">{`${s.firstName} ${s.lastName}`}</td>
                                        <td className="p-2">{`${s.StudentClass} ${s.section}`}</td>
                                        <td className="p-2">{s.Roll_no}</td>
                                        <td className="p-2">
                                            <span className={`px-2 py-1 text-xs rounded ${getStatusColor(s.status)}`}>{s.status || 'Unmarked'}</span>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex gap-1">
                                                {['Present', 'Absent'].map((status) => (
                                                    <button
                                                        key={status}
                                                        onClick={() => handleStatusChange(s.id, status)}
                                                        className={`text-xs px-2 py-1 rounded ${getStatusColor(status)}`}
                                                    >
                                                        {status}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminStudentAttendance;


