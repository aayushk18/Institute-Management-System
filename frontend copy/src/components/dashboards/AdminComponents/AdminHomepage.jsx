import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const genderData = [
    { name: 'Boys', value: 1531 },
    { name: 'Girls', value: 1320 },
];

const COLORS = ['#4f46e5', '#ec4899'];

const attendanceByClass = {
    '7th': {
        week: [
            { name: 'Mon', present: 100, absent: 20 },
            { name: 'Tue', present: 110, absent: 15 },
            { name: 'Wed', present: 120, absent: 10 },
            { name: 'Thu', present: 115, absent: 12 },
            { name: 'Fri', present: 130, absent: 8 },
            { name: 'Sat', present: 95, absent: 25 },
        ],
        month: [
            { name: 'Jan', present: 600, absent: 100 },
            { name: 'Feb', present: 620, absent: 80 },
            { name: 'Mar', present: 640, absent: 70 },
            { name: 'Apr', present: 660, absent: 60 },
            { name: 'May', present: 680, absent: 50 },
            { name: 'Jun', present: 700, absent: 40 },
        ],
    },
    '9th': {
        week: [
            { name: 'Mon', present: 130, absent: 25 },
            { name: 'Tue', present: 140, absent: 20 },
            { name: 'Wed', present: 150, absent: 18 },
            { name: 'Thu', present: 135, absent: 22 },
            { name: 'Fri', present: 160, absent: 15 },
            { name: 'Sat', present: 120, absent: 30 },
        ],
        month: [
            { name: 'Jan', present: 750, absent: 120 },
            { name: 'Feb', present: 770, absent: 110 },
            { name: 'Mar', present: 790, absent: 100 },
            { name: 'Apr', present: 810, absent: 90 },
            { name: 'May', present: 830, absent: 80 },
            { name: 'Jun', present: 850, absent: 70 },
        ],
    },
    '10th': {
        week: [
            { name: 'Mon', present: 150, absent: 30 },
            { name: 'Tue', present: 160, absent: 25 },
            { name: 'Wed', present: 170, absent: 20 },
            { name: 'Thu', present: 155, absent: 28 },
            { name: 'Fri', present: 180, absent: 18 },
            { name: 'Sat', present: 140, absent: 35 },
        ],
        month: [
            { name: 'Jan', present: 900, absent: 150 },
            { name: 'Feb', present: 920, absent: 140 },
            { name: 'Mar', present: 940, absent: 130 },
            { name: 'Apr', present: 960, absent: 120 },
            { name: 'May', present: 980, absent: 110 },
            { name: 'Jun', present: 1000, absent: 100 },
        ],
    },
};

const AdminHomepage = () => {
    const [chartType, setChartType] = useState('week');
    const [selectedClass, setSelectedClass] = useState('7th');
    const attendanceData = attendanceByClass[selectedClass][chartType];


    const totalPerson = {
        TotalStudents: 2851,
        TotalTeachers: 120,
        TotalEmployees: 75
    }
    const handleSelect = (setter) => (e) => setter(e.target.value);

    return (
        <div className=" p-5 space-y-6">





            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4">





                <div className="bg-white rounded-lg border-t-1 shadow-md border-gray-200 border p-4 text-center">
                    <h2 className="text-xl font-bold">Total Students</h2>
                    <p className="text-2xl">{totalPerson.TotalStudents}</p>
                </div>
                <div className="bg-white rounded-lg border-t-1 shadow-md border-gray-200 border p-4 text-center">
                    <h2 className="text-xl font-bold"> Total Teachers</h2>
                    <span className="text-2xl">{totalPerson.TotalTeachers}</span>
                </div>
                <div className="bg-white rounded-lg border-t-1 shadow-md border-gray-200 border p-4 text-center">
                    <h2 className="text-xl font-bold">TotalStudents</h2>
                    <span className="text-2xl">{totalPerson.TotalEmployees}</span>
                </div>
                <div className="bg-white rounded-lg border-t-1 shadow-md border-gray-200 border p-4 text-center">
                    <h2 className="text-xl font-bold">Total Employyes</h2>
                    <span className="text-2xl">{totalPerson.TotalStudents}</span>
                </div>

            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-md border-t-1  border-gray-200 border p-4">
                    <h3 className="text-lg font-semibold mb-4">Gender Ratio</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {genderData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg border-t-1 shadow-md border-gray-200 border p-4">
                    <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold">Attendance Report</h3>
                        <div className="flex gap-2">
                            <select value={selectedClass} onChange={handleSelect(setSelectedClass)} className="border px-2 py-1 rounded-md">
                                <option value="7th">7th</option>
                                <option value="9th">9th</option>
                                <option value="10th">10th</option>
                            </select>
                            <select value={chartType} onChange={handleSelect(setChartType)} className="border px-2 py-1 rounded-md">
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                            </select>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={attendanceData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="present" stackId="a" fill="#10b981" name="Present" />
                            <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border-t-1 shadow-md border-gray-200 border p-4 lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Notice Board</h3>
                    <ul className="space-y-2">
                        <li className="border-b pb-2">Annual Sports Day on 15th June</li>
                        <li className="border-b pb-2">Parent-Teacher Meeting on 22nd June</li>
                        <li className="border-b pb-2">Mid-Term Exams start 1st July</li>
                    </ul>
                </div>

                <div className="bg-white rounded-lg  border-t-1 shadow-md border-gray-200 border p-4">
                    <h3 className="text-lg font-semibold mb-4">Calendar</h3>
                    <div className="border rounded p-4 text-gray-500 text-center">
                        <p>[Calendar Component Placeholder]</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHomepage;