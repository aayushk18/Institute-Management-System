import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'


import {
    Bar
} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import StudentGenderRaioChart from './StudentGenderRaioChart';
import StudentFeesDetailGraph from './StudentFeesDetailGraph';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const dummyData = {
    "Current Month": { submitted: 120, pending: 30 },
    "Previous Month": { submitted: 100, pending: 50 },
    "Previous 3 Months": { submitted: 310, pending: 90 },
    "Previous 6 Months": { submitted: 600, pending: 140 }
};


const notices = [
    { id: 1, title: "Semester Exam Schedule Released", date: "2025-06-01" },
    { id: 2, title: "Holiday Notice for Eid", date: "2025-05-30" },
    { id: 3, title: "New Library Timings", date: "2025-05-25" },
    { id: 4, title: "Workshop on AI & ML", date: "2025-05-20" },
    { id: 5, title: "Fee Payment Deadline Extended", date: "2025-05-18" },
    { id: 6, title: "Annual Sports Meet Registration", date: "2025-05-15" }
];

const StudentAdminComponent = () => {

    const [selectedRange, setSelectedRange] = useState("Current Month");

    const handleRangeChange = (e) => {
        setSelectedRange(e.target.value);
    };

    const chartData = {
        labels: ["Fees Submitted", "Fees Pending"],
        datasets: [
            {
                label: selectedRange,
                data: [
                    dummyData[selectedRange].submitted,
                    dummyData[selectedRange].pending
                ],
                backgroundColor: ["#4a5565", "#d1d5dc"]
            }
        ]
    };


    const [showAll, setShowAll] = useState(false);

    const visibleNotices = showAll ? notices : notices.slice(0, 3);




    return (
        <div className=' mb-5  w-full '>



            <div className='grid grid-cols-5'>
                <div className='bg-white col-span-2   rounded-lg shadow-md row-span-4 m-5'>
                    <StudentGenderRaioChart boys={2512} girls={2214} />


                </div>
                <div className='bg-white rounded-lg shadow-md col-span-2 row-span-4 m-5'>

                    <StudentFeesDetailGraph />

                </div>

                <div className='bg-white m-5 hover:bg-gray-500 hover:text-white transition duration-300 text-xl rounded-lg shadow-md  p-2 text-center content-center'>
                    <NavLink to='students'>
                        Student
                    </NavLink>
                </div>
                <div className='bg-white m-5 hover:bg-gray-500 hover:text-white transition duration-300 text-xl rounded-lg shadow-md  p-2 text-center content-center'>
                    <button>
                        Fees
                    </button>
                </div>


                <div className='bg-white m-5 hover:bg-gray-500 hover:text-white transition duration-300 text-xl rounded-lg shadow-md  p-2 text-center content-center'>
                    <button>
                        Timetable
                    </button>
                </div>
                <div className='bg-white m-5 hover:bg-gray-500 hover:text-white transition duration-300 text-xl rounded-lg shadow-md  p-2 text-center content-center'>
                    <button>
                        Other Details
                    </button>
                </div>

                {/* <Outlet /> */}
            </div>
            <div className='grid grid-cols-2 gap-5 m-5'>
                <div>
                    <div className=" p-6 bg-white shadow-md rounded-md">
                        <h2 className="text-md font-semibold text-center mb-4">Events and Calender</h2>

                        <div className="mb-2 flex flex-row justify-between">
                            <select
                                className="w-fit p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                                value={selectedRange}
                                onChange={handleRangeChange}
                            >
                                <option>Current Month</option>
                                <option>Previous Month</option>
                                <option>Previous 3 Months</option>
                                <option>Previous 6 Months</option>
                            </select>

                            <button className='p-2 bg-gray-500 hover:bg-gray-600 rounded-md text-white'>Fees Details</button>
                        </div>

                        <Bar data={chartData} />

                        {/* <div className="mt-2 text-center flex flex-row gap-2 justify-center">
                            <p className="text-sm">📊 <strong>Submitted:</strong> {dummyData[selectedRange].submitted}</p>
                            <p className="text-sm">⏳ <strong>Pending:</strong> {dummyData[selectedRange].pending}</p>
                        </div> */}
                    </div>
                </div>
                <div className='w-full'>
                    <div className=" p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">📢 Notices & Circulars</h2>
                        <ul className="space-y-3">
                            {visibleNotices.map((notice) => (
                                <li
                                    key={notice.id}
                                    className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition"
                                >
                                    <p className="font-medium">{notice.title}</p>
                                    <p className="text-sm text-gray-500">{notice.date}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="text-center mt-4">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                {showAll ? "View Less ▲" : "View More ▼"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default StudentAdminComponent