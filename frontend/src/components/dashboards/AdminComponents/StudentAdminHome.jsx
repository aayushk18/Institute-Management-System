import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../utils/useAuthStore';

const allData = [
    { sno: 1, rollno: '101', firstName: 'Aman Kumar', fatherName: 'Rajesh Kumar', StudentClass: '1', section: 'A', active: true },
    { sno: 2, rollno: '102', firstName: 'Riya Singh', fatherName: 'Dinesh Singh', StudentClass: '2', section: 'B', active: false },
    { sno: 3, rollno: '103', firstName: 'Vikram Das', fatherName: 'Suresh Das', StudentClass: '1', section: 'B', active: true },
    { sno: 4, rollno: '104', firstName: 'Sneha Gupta', fatherName: 'Mahesh Gupta', StudentClass: '3', section: 'C', active: true },
    // Add more mock data for pagination if needed
];

const StudentAdminHome = () => {
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

                    {selectedClass && selectedSection && (
                        <button onClick={() => resetRollno(selectedClass, selectedSection)} className="p-4 rounded-md bg-white  border-t-1 shadow-md border-gray-200 border text-black hover:bg-gray-50">
                            Reset Roll no of {selectedClass} {selectedSection}
                        </button>
                    )}
                </div>

                <div className="flex flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-4 rounded-md bg-white  border-t-1 shadow-md border-gray-200 border text-black"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <NavLink to='/admin/student/new-student' className="p-4 bg-gray-500 text-white rounded-md hover:bg-gray-600">Add New Student</NavLink>
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
                                <th className="p-2 border-b">Edit</th>
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
                                    <td className="p-2 border-b">{student.StudentClass} {student.section}</td>
                                    <td className="p-2 border-b">
                                        <button onClick={() => navigate(`/admin/student/update-student/${student.firstName}-${student.lastName}-${student.rollno}`, { state: { pass: student } })} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md">Edit</button>
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
    );
};

export default StudentAdminHome;



















// import React, { useEffect, useState } from 'react'
// import { Navigate, NavLink, useNavigate } from 'react-router-dom'
// import { useAdminStore } from '../../utils/useAuthStore';
// {/* <NavLink className='border-2  text-black p-5 text-2xl rounded-md' to='new-student'>Add New Student </NavLink> */ }

// const allData = [
//     { sno: 1, rollno: '101', firstName: 'Aman Kumar', fatherName: 'Rajesh Kumar', class: '1st', section: 'A', isActive: true },
//     { sno: 2, rollno: '102', firstName: 'Riya Singh', fatherName: 'Dinesh Singh', class: '2nd', section: 'B', isActive: false },
//     { sno: 3, rollno: '103', firstName: 'Vikram Das', fatherName: 'Suresh Das', class: '1st', section: 'B', isActive: true },
//     { sno: 4, rollno: '104', firstName: 'Sneha Gupta', fatherName: 'Mahesh Gupta', class: '3rd', section: 'C', isActive: true },
// ];

// const StudentAdminHome = () => {

//     const navigate = useNavigate();

//     const { getAllStudents, resetRollno } = useAdminStore()


//     const [students, setstudents] = useState([])


//     const [studentsData, setstudentsData] = useState([])




//     useEffect(() => {
//         const fetchData = async () => {
//             const stu = await getAllStudents();
//             setstudents(stu);

//             if (!stu || stu.length === 0) {
//                 setstudentsData(allData);
//             } else {
//                 setstudentsData(stu);


//             }
//         };
//         fetchData();
//     }, []);










//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedClass, setSelectedClass] = useState('');
//     const [selectedSection, setSelectedSection] = useState('');

//     const classes = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
//     const sections = ['A', 'B', 'C', 'D', 'E', 'F'];

//     const filteredStudents = studentsData.filter(student => {
//         const matchesSearch = `${student.rollno} ${student.firstName}${student.lastName} ${student.fatherName}`.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesClass = selectedClass ? student.StudentClass === selectedClass : true;
//         const matchesSection = selectedSection ? student.section === selectedSection : true;
//         return matchesSearch && matchesClass && matchesSection;
//     });




//     return (
//         <div className="w-full h-full  text-white">



//             <div className="flex flex-row justify-between gap-4 mb-4">

//                 <div className="flex flex-row  gap-4 ">
//                     <select
//                         className="p-4 rounded-md border-t-1 w-fit shadow-md border-gray-200 text-black hover:bg-gray-100"
//                         value={selectedClass}
//                         onChange={(e) => {
//                             setSelectedClass(e.target.value);
//                             setSelectedSection('');
//                         }}
//                     >
//                         <option value="">Select Class</option>
//                         {classes.map(cls => (
//                             <option key={cls} value={cls}>{cls}</option>
//                         ))}
//                     </select>

//                     {selectedClass && (
//                         <select
//                             className="p-4 rounded-md border-t-1 w-fit text-black shadow-md border-gray-200  hover:bg-gray-100"
//                             value={selectedSection}
//                             onChange={(e) => setSelectedSection(e.target.value)}
//                         >
//                             <option value="">Select Section</option>
//                             {sections.map(sec => (
//                                 <option key={sec} value={sec}>{sec}</option>
//                             ))}
//                         </select>

//                     )

//                     }
//                     {selectedClass && selectedSection && <button onClick={() => resetRollno(selectedClass, selectedSection)} className="p-4 rounded-md cursor-pointer border-t-1 text-black shadow-md border-gray-200  hover:bg-gray-100">Reset Roll no of {selectedClass} {selectedSection}</button>}

//                 </div>
//                 <div className="flex flex-row   justify-between ">
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         className="p-4 rounded-md border-t-1 shadow-md border-gray-200 text-black w-1/2"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <NavLink to='/admin/student/new-student' className="p-4 bg-gray-400 text-white rounded-md hover:bg-gray-500">Add New Student</NavLink>
//                 </div>

//             </div>


//             {/* Table area starting */}
//             <div className='p-5 border-t-1 shadow-lg border-gray-200 border rounded-lg'>
//                 <div className='h-120 overflow-scroll rounded-lg inset-shadow-sm '>

//                     <table className="w-full border  border-white">
//                         <thead>
//                             <tr className="bg-gray-400 ">
//                                 <th className="p-2 border-b border-white">S.No</th>
//                                 <th className="p-2 border-b border-white">Roll No</th>
//                                 <th className="p-2 border-b border-white">Name</th>
//                                 <th className="p-2 border-b border-white">Father Name</th>
//                                 <th className="p-2 border-b border-white">Class Section</th>
//                                 <th className="p-2 border-b border-white">Edit</th>
//                                 <th className="p-2 border-b border-white">Status</th>
//                             </tr>
//                         </thead>


//                         <tbody>


//                             {filteredStudents.map((student, index) => (
//                                 <tr key={student.sno} className="text-center text-black">
//                                     <td className="p-2 border-b border-gray-400">{index}</td>
//                                     <td className="p-2 border-b border-gray-400">{student.rollno}</td>
//                                     <td className="p-2 border-b border-gray-400">{student.firstName} {student.lastName}</td>

//                                     <td className="p-2 border-b border-gray-400">{student.fatherName}</td>
//                                     <td className="p-2 border-b border-gray-400">{student.StudentClass} {student.section}</td>
//                                     <td className="p-2 border-b border-gray-400">
//                                         <button onClick={() => {
//                                             const pass = student;
//                                             console.log(pass);

//                                             navigate(`/admin/student/update-student/${student.firstName + '-' + student.lastName + '-' + student.rollno}`, {
//                                                 state: {
//                                                     pass: student
//                                                 }
//                                             })
//                                         }}
//                                             className="bg-gray-400 hover:bg-gray-500 text-white  px-3 py-1 rounded-md">Edit</button>
//                                     </td>
//                                     <td className="p-2 border-b border-gray-500">
//                                         <span className={`h-3 w-3 inline-block rounded-full ${student.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
//                                     </td>
//                                 </tr>
//                             ))}



//                         </tbody>


//                     </table>

//                 </div>
//             </div>
//             {/* Table area end */}


//         </div>
//     );
// };

// export default StudentAdminHome;
