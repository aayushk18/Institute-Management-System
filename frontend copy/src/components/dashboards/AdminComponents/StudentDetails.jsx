import React, { useState } from "react";
import { UserCircle2, BookOpenCheck, CalendarDays, BarChart3, FlaskConical, Trophy, Receipt } from "lucide-react";
import { useLocation } from "react-router-dom";

const StudentDetails = () => {
    const [selectedYear, setSelectedYear] = useState("2025");

    const location = useLocation();
    const state = location.state;
    const st = state?.pass;

    console.log(st);




    const marksData = {
        "2022": [
            { subject: "Math", ut1: 9, half: 35, ut2: 8, annual: 36 },
            { subject: "Science", ut1: 10, half: 38, ut2: 9, annual: 39 },
            { subject: "English", ut1: 8, half: 32, ut2: 9, annual: 37 },
        ],
        "2023": [
            { subject: "Math", ut1: 8, half: 36, ut2: 9, annual: 35 },
            { subject: "Science", ut1: 10, half: 37, ut2: 10, annual: 38 },
            { subject: "English", ut1: 9, half: 34, ut2: 8, annual: 36 },
        ],
        "2024": [
            { subject: "Math", ut1: 10, half: 38, ut2: 10, annual: 40 },
            { subject: "Science", ut1: 9, half: 37, ut2: 9, annual: 39 },
            { subject: "English", ut1: 8, half: 35, ut2: 8, annual: 37 },
        ],
        "2025": [
            { subject: "Math", ut1: 9 },
            { subject: "Science", ut1: 10 },
            { subject: "English", ut1: 8 },
        ],
    };

    return (

        <div className=" overflow-scroll p-8">

            <div className="  rounded-lg h-170  text-gray-800 space-y-8 ">

                <div className="bg-white  border-t-1 shadow-md border-gray-200 border rounded-lg p-6">
                    <h2 className="text-2xl font-semibold flex items-center mb-4"><UserCircle2 className="mr-2" /> Student Profile</h2>
                    <div className="grid grid-cols-2  gap-1">
                        <p className="bg-gray-200 p-2"><strong>Name: </strong>{st.firstName} {st.lastName}</p>
                        <p className="bg-gray-200 p-2"><strong>Roll Number: </strong>{st.rollno}</p>
                        <p className=" p-2"><strong>Class: </strong>{st.StudentClass} {st.section}</p>
                        <p className=" p-2"><strong>Date of Birth: </strong>{st.dob}</p>
                        <p className="bg-gray-200 p-2"><strong>login ID: </strong>{st.loginID}</p>
                        <p className="bg-gray-200 p-2"><strong>Father Name: </strong>{st.fatherName}</p>
                        <p className="b p-2"><strong>Mother Name: </strong>{st.motherName}</p>
                        <p className=" p-2"><strong>Father Phone no: </strong>{st.fatherphoneno}</p>
                        <p className="bg-gray-200 p-2"><strong>Mother Phone no: </strong>{st.fatherphoneno}</p>

                        <p className="bg-gray-200 p-2"><strong>Email: </strong>{st.email}</p>
                        <p className=" p-2"><strong>Status: </strong>{st.active ? 'Active' : 'Inactive'}</p>
                    </div>
                </div>


                <div className="bg-white  border-t-1 shadow-md border-gray-200 border rounded-lg p-6">
                    <h2 className="text-2xl font-semibold flex items-center mb-4"><BookOpenCheck className="mr-2" /> Academic Information</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Subjects Enrolled: Math, Science, English, History</li>

                        <li>Homework: Math due June 5, English due June 6</li>
                        <li>Next Exam: Science - June 10</li>
                    </ul>
                </div>


                <div className="bg-white  border-t-1 shadow-md border-gray-200 border rounded-lg p-6">
                    <h2 className="text-2xl font-semibold flex items-center mb-4"><CalendarDays className="mr-2" /> Attendance</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Monthly Summary: 120 present, 5 absent, 3 late</li>
                        <li>Subject-wise: Math - 98%, Science - 97%</li>
                        <li>Leave Applications: 2 approved</li>
                    </ul>
                </div>


                <div className="bg-white  border-t-1 shadow-md border-gray-200 border rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold flex items-center"><BarChart3 className="mr-2" /> Result</h2>
                        <select
                            className="p-2 border border-t-2 border-gray-200 shadow-md rounded-md text-black"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                        </select>
                    </div>
                    <div className="overflow-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-500">
                                <tr>
                                    <th className="p-2 text-white">Subject</th>
                                    <th className="p-2 text-white">UT1 (10)</th>
                                    <th className="p-2 text-white">Final Marks </th>
                                    {selectedYear !== "2025" && (
                                        <>
                                            <th className="p-2 text-white">Half-Yearly (40)</th>
                                            <th className="p-2 text-white">UT2 (10)</th>
                                            <th className="p-2 text-white">Annual (40)</th>
                                            <th className="p-2 text-white">Final Marks </th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {marksData[selectedYear].map((row, idx) => {
                                    const final = (row.ut1 || 0) + (row.ut2 || 0) + (row.half || 0) + (row.annual || 0);



                                    return (
                                        <tr key={idx} className="border-b border-gray-700">
                                            <td className="p-2 font-medium">{row.subject}</td>
                                            <td className="p-2">{row.ut1}</td>
                                            <td className="p-2 font-bold">{final}</td>
                                            {selectedYear !== "2025" && (
                                                <>
                                                    <td className="p-2">{row.half}</td>
                                                    <td className="p-2">{row.ut2}</td>
                                                    <td className="p-2">{row.annual}</td>
                                                    <td className="p-2 font-bold">{final}</td>
                                                </>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className=" bg-white  border-t-1 shadow-md border-gray-200 border rounded-lg p-6">
                    <h2 className="text-2xl font-semibold flex items-center mb-4"><FlaskConical className="mr-2" /> Assignments & Projects</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Math Project due June 10</li>
                        <li>Science Lab Report submitted - Marks: 9/10</li>
                        <li>English Essay Feedback: Good improvement</li>
                    </ul>
                </div>


                <div className=" bg-white  border-t-1 shadow-md border-gray-200 border rounded-lg p-6">
                    <h2 className="text-2xl font-semibold flex items-center mb-4"><Trophy className="mr-2" /> Achievements & Activities</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Science Fair Winner 2024</li>
                        <li>Football Team Captain</li>
                        <li>Member of Debate Club</li>
                    </ul>
                </div>


                <div className="bg-white  border-t-1 shadow-md border-gray-200 border rounded-lg p-6">
                    <h2 className="text-2xl font-semibold flex items-center mb-4"><Receipt className="mr-2" /> Fee Details</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Fee Structure: ₹30,000 per year</li>
                        <li>Payment History: Paid ₹15,000 on Jan 15</li>
                        <li>Pending Dues: ₹15,000 due by July 1</li>
                        <li><a href="#" className="text-blue-400 underline">Download Receipt</a></li>
                    </ul>
                </div>
            </div>
        </div>

    );
}
export default StudentDetails;