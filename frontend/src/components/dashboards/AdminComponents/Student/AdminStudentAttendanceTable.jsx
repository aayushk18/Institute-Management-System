import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../../utils/useAuthStore';

const AdminStudentAttendanceTable = () => {

    const navigate = useNavigate();
    const { getAllStudents, resetRollno } = useAdminStore();

    const [studentsData, setstudentsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const stu = await getAllStudents();
            if (!stu || stu.length === 0) {
                setstudentsData(allData);
            } else {
                setstudentsData(stu);
                console.log(stu);

            }
        };
        fetchData();
    }, []);

    const classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const sections = ['A', 'B', 'C', 'D', 'E', 'F'];

    const filteredStudents = studentsData.filter(student => {
        const matchesSearch = `${student.rollno} ${student.firstName}${student.lastName || ''} ${student.fatherName}`.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = selectedClass ? student.StudentClass === selectedClass : true;
        const matchesSection = selectedSection ? student.section === selectedSection : true;
        return matchesSearch && matchesClass && matchesSection;
    });


    console.log(filteredStudents);


    const totalPages = Math.ceil(filteredStudents.length / entriesPerPage);
    const currentEntries = filteredStudents.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);






    return (
        <div>

            <div className="w-full h-full p-5 text-white">


                <div className="flex flex-row justify-between gap-4 mb-4">

                    <div className="flex flex-row gap-4">
                        <select
                            className="p-4 rounded-md bg-white  border-t-1 shadow-md border-gray-200 hover:bg-gray-50 border text-black"
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
                                className="p-4 rounded-md  bg-white  border-t-1 shadow-md border-gray-200 border hover:bg-gray-50 text-black"
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}>
                                <option value="">Select Section</option>
                                {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
                            </select>
                        )}


                    </div>


                </div>





                <div className='p-5  bg-white  border-t-1 shadow-md border-gray-200 border rounded-lg'>

                    <div className="flex justify-between items-center mb-2">

                        {/* <div className="text-black">
            Showing {currentPage} out of {totalPages} pages
        </div> */}
                        <div>
                            <label className="text-black mr-2">Entries per page:</label>
                            <select value={entriesPerPage} onChange={(e) => { setEntriesPerPage(parseInt(e.target.value)); setCurrentPage(1); }} className="p-2 border border-t-2 border-gray-200 shadow-md rounded-md text-black">
                                {[10, 20, 30, 50].map(num => <option key={num} value={num}>{num}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="p-2 rounded-md bg-white  border-t-1 shadow-md border-gray-200 border text-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='h-120 overflow-scroll inset-shadow-gray-200 inset-shadow-sm border border-b-2 border-b-gray-100 rounded-lg'>


                        <table className="w-full border border-white">
                            <thead>
                                <tr className="bg-gray-500">
                                    <th className="p-2 border-b">S.No</th>
                                    <th className="p-2 border-b">Roll No</th>
                                    <th className="p-2 border-b">Name</th>
                                    <th className="p-2 border-b">Father Name</th>
                                    <th className="p-2 border-b">Overall Attendance</th>
                                    <th className="p-2 border-b">Action</th>
                                    <th className="p-2 border-b">Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {currentEntries.map((student, index) => (
                                    <tr key={student.sno} className="text-center text-black">
                                        <td className="p-2 border-b">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                        <td className="p-2 border-b">{student.rollno}</td>
                                        <td className="p-2  cursor-pointer border-b">
                                            <button onClick={() => navigate(`/admin/student/${student.firstName}-${student.lastName}-${student.rollno}`, { state: { pass: student } })} >{student.firstName} {student.lastName}</button>
                                        </td>
                                        <td className="p-2 cursor-pointer border-b">
                                            <button onClick={() => navigate(`/admin/student/${student.firstName}-${student.lastName}-${student.rollno}`, { state: { pass: student } })} >{student.fatherName}</button>
                                        </td>
                                        <td className="p-2 border-b">75%</td>
                                        <td className="p-2 border-b">
                                            <button onClick={() => navigate(`/admin/student/attendance/${student.firstName}-${student.rollno}`, { state: { pass: student } })} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md">View Attendance</button>
                                        </td>
                                        <td className="p-2 border-b">
                                            <span className={`h-3 w-3 inline-block rounded-full ${student.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <div className="text-black">
                            Showing {currentEntries.length} entries out of {filteredStudents.length}
                        </div>
                        <div className="flex gap-2">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Previous</button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 rounded ${currentPage === page ? 'bg-gray-600 text-white' : 'bg-gray-300'}`}>{page}</button>
                            ))}
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Next</button>
                        </div>
                    </div>

                </div>



            </div>
        </div>
    )
}

export default AdminStudentAttendanceTable