




import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../../utils/useAuthStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';


const allData = [
    { sno: 1, rollno: '101', firstName: 'Aman Kumar', fatherName: 'Rajesh Kumar', StudentClass: '1', section: 'A', active: true },
    { sno: 2, rollno: '102', firstName: 'Riya Singh', fatherName: 'Dinesh Singh', StudentClass: '2', section: 'B', active: false },
    { sno: 3, rollno: '103', firstName: 'Vikram Das', fatherName: 'Suresh Das', StudentClass: '1', section: 'B', active: true },
    { sno: 4, rollno: '104', firstName: 'Sneha Gupta', fatherName: 'Mahesh Gupta', StudentClass: '3', section: 'C', active: true },
    // Add more mock data for pagination if needed
];

const AcademicActiveClasses = () => {
    const navigate = useNavigate();
    const { getAllStudents, resetRollno, updateStudentStatus, ActivateStudent, InactivateStudent } = useAdminStore();

    const [studentsData, setstudentsData] = useState([]);
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [inactiveSearchTerm, setInactiveSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);


    const fetchData = async () => {
        const stu = await getAllStudents();
        if (!stu || stu.length === 0) {
            setstudentsData(allData);
        } else {
            setstudentsData(stu);
            console.log(stu);
        }
    };


    const classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const sections = ['A', 'B', 'C', 'D', 'E', 'F'];

    // Filter students based on class and section only
    const filteredStudents = studentsData.filter(student => {
        const matchesClass = selectedClass ? student.StudentClass === selectedClass : true;
        const matchesSection = selectedSection ? student.section === selectedSection : true;
        return matchesClass && matchesSection;
    });

    // Separate active and inactive students
    const activeStudents = filteredStudents.filter(student => student.active);
    const inactiveStudents = filteredStudents.filter(student => !student.active);

    // Filter active students based on active search term
    const filteredActiveStudents = activeStudents.filter(student => {
        return `${student.rollno} ${student.firstName}${student.lastName || ''} ${student.fatherName}`.toLowerCase().includes(activeSearchTerm.toLowerCase());
    });

    // Filter inactive students based on inactive search term
    const filteredInactiveStudents = inactiveStudents.filter(student => {
        return `${student.rollno} ${student.firstName}${student.lastName || ''} ${student.fatherName}`.toLowerCase().includes(inactiveSearchTerm.toLowerCase());
    });

    // Data for pie chart
    const pieData = [
        { name: 'Active Students', value: activeStudents.length },
        { name: 'Inactive Students', value: inactiveStudents.length }
    ];

    const COLORS = ['#10B981', '#EF4444'];

    const handleActivateStudent = async (id) => {
        const Form = {
            studentId: id
        }

        await ActivateStudent(Form)

    }
    const handleInactivateStudent = async (id) => {
        const Form = {
            studentId: id
        }

        await InactivateStudent(Form)

    }



    useEffect(() => {

        fetchData();

    }, []);



    const totalPages = Math.ceil(filteredActiveStudents.length / entriesPerPage);
    const currentEntries = filteredActiveStudents.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

    return (
        <div className="w-full h-full p-5 text-white">
            <div className="flex flex-row justify-between gap-4 mb-4">
                <div className="flex flex-row gap-4">
                    <select
                        className="p-4 rounded-md bg-white border-t-1 shadow-md border-gray-200 hover:bg-gray-50 border text-black"
                        value={selectedClass}
                        onChange={(e) => {
                            setSelectedClass(e.target.value);
                            setSelectedSection('');
                        }}>
                        <option value="">Select Class</option>
                        {classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                    </select>

                    {selectedClass && (
                        <select
                            className="p-4 rounded-md bg-white border-t-1 shadow-md border-gray-200 border hover:bg-gray-50 text-black"
                            value={selectedSection}
                            onChange={(e) => setSelectedSection(e.target.value)}>
                            <option value="">Select Section</option>
                            {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
                        </select>
                    )}

                    {selectedClass && selectedSection && (
                        <button onClick={() => resetRollno(selectedClass, selectedSection)} className="p-4 rounded-md bg-white border-t-1 shadow-md border-gray-200 border text-black hover:bg-gray-50">
                            Reset Roll no of {selectedClass} {selectedSection}
                        </button>
                    )}
                </div>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-4">
                        <NavLink to='/admin/academics/classes/update-class' className="p-4 bg-white text-gray-600 rounded-md  border-t-1 shadow-md border-gray-200 border hover:bg-gray-50">Promote</NavLink>
                    </div>
                    <div className="flex flex-row gap-4">
                        <NavLink to='/admin/academics/classes/update-class' className="p-4 bg-gray-500 text-white rounded-md hover:bg-gray-600">Update Class</NavLink>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="mb-6 p-5 bg-white border-t-1 shadow-md border-gray-200 border rounded-lg">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Pie Chart */}
                    <div className="w-full md:w-1/3 h-64">
                        <h3 className="text-black mb-4 font-semibold">Student Status Distribution</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Inactive Students Table */}
                    <div className="w-full md:w-2/3">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-black font-semibold">Inactive Students ({filteredInactiveStudents.length})</h3>
                            <input
                                type="text"
                                placeholder="Search inactive students..."
                                className="p-2 rounded-md bg-white border-t-1 shadow-md border-gray-200 border text-black"
                                value={inactiveSearchTerm}
                                onChange={(e) => setInactiveSearchTerm(e.target.value)}
                            />
                        </div>
                        {filteredInactiveStudents.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full border border-white">
                                    <thead>
                                        <tr className="bg-gray-500">
                                            <th className="p-2 border-b">Roll No</th>
                                            <th className="p-2 border-b">Name</th>
                                            <th className="p-2 border-b">Father Name</th>
                                            <th className="p-2 border-b">Class Section</th>
                                            <th className="p-2 border-b">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredInactiveStudents.map((student) => (
                                            <tr key={student.rollno} className="text-center text-black">
                                                <td className="p-2 border-b">{student.rollno}</td>
                                                <td className="p-2 border-b">{student.firstName} {student.lastName}</td>
                                                <td className="p-2 border-b">{student.fatherName}</td>
                                                <td className="p-2 border-b">{student.StudentClass} {student.section}</td>
                                                <td className="p-2 border-b">
                                                    <button
                                                        onClick={() => {
                                                            handleActivateStudent(student._id)
                                                            fetchData()

                                                        }}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                                                    >
                                                        Activate
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-black">No inactive students found</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Students Table (Active Only) */}
            <div className='p-5 bg-white border-t-1 shadow-md border-gray-200 border rounded-lg'>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <label className="text-black mr-2">Entries per page:</label>
                        <select
                            value={entriesPerPage}
                            onChange={(e) => {
                                setEntriesPerPage(parseInt(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="p-2 border border-t-2 border-gray-200 shadow-md rounded-md text-black"
                        >
                            {[10, 20, 30, 50].map(num => <option key={num} value={num}>{num}</option>)}
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Search active students..."
                        className="p-2 rounded-md bg-white border-t-1 shadow-md border-gray-200 border text-black"
                        value={activeSearchTerm}
                        onChange={(e) => setActiveSearchTerm(e.target.value)}
                    />
                </div>

                <div className='h-120 overflow-scroll inset-shadow-gray-200 inset-shadow-sm border border-b-2 border-b-gray-100 rounded-lg'>
                    <table className="w-full border border-white">
                        <thead>
                            <tr className="bg-gray-500">
                                <th className="p-2 border-b">S.No</th>
                                <th className="p-2 border-b">Roll No</th>
                                <th className="p-2 border-b">Name</th>
                                <th className="p-2 border-b">Father Name</th>
                                <th className="p-2 border-b">Class Section</th>
                                <th className="p-2 border-b">Action</th>
                                <th className="p-2 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEntries.map((student, index) => (
                                <tr key={student.sno} className="text-center text-black">
                                    <td className="p-2 border-b">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                    <td className="p-2 border-b">{student.rollno}</td>
                                    <td className="p-2 cursor-pointer border-b">
                                        <button onClick={() => navigate(`/admin/student/${student.firstName}-${student.lastName}-${student.rollno}`, { state: { pass: student } })}>
                                            {student.firstName} {student.lastName}
                                        </button>
                                    </td>
                                    <td className="p-2 cursor-pointer border-b">
                                        <button onClick={() => navigate(`/admin/student/${student.firstName}-${student.lastName}-${student.rollno}`, { state: { pass: student } })}>
                                            {student.fatherName}
                                        </button>
                                    </td>
                                    <td className="p-2 border-b">{student.StudentClass} {student.section}</td>

                                    <td className="p-2 border-b">
                                        <button
                                            onClick={() => {
                                                handleInactivateStudent(student._id)
                                                fetchData()

                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                        >
                                            Inactive
                                        </button>
                                    </td>
                                    <td className="p-2 border-b">
                                        <span className={`h-3 w-3 inline-block rounded-full bg-green-500`}></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="text-black">
                        Showing {currentEntries.length} entries out of {filteredActiveStudents.length}
                    </div>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded ${currentPage === page ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicActiveClasses;


