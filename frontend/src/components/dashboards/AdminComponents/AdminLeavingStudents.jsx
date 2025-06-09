import React, { useState } from 'react';

const studentRecords = [
    { name: 'Aman Sharma', father: 'Rakesh Sharma', rollno: '1', class: '1 D', reason: 'Transferred to another city' },
    { name: 'Priya Singh', father: 'Dinesh Singh', rollno: '2', class: '3 F', reason: 'Family relocation' },
    { name: 'Rohit Verma', father: 'Suresh Verma', rollno: '3', class: '4 A', reason: 'Joined boarding school' },
    { name: 'Anjali Mehra', father: 'Manoj Mehra', rollno: '4', class: '2 E', reason: 'Health issues' },
    { name: 'Vikram Chauhan', father: 'Rajeev Chauhan', rollno: '5', class: '6 D', reason: 'Enrolled in specialized school' },
    { name: 'Sneha Rathi', father: 'Amit Rathi', rollno: '6', class: '3 A', reason: 'Moved abroad' },
    { name: 'Karan Kapoor', father: 'Rohit Kapoor', rollno: '7', class: '3 F', reason: 'Financial reasons' },
    { name: 'Neha Yadav', father: 'Ajay Yadav', rollno: '8', class: '4 D', reason: 'Shifted to home schooling' },
    { name: 'Ritesh Kumar', father: 'Pradeep Kumar', rollno: '9', class: '3rd', reason: 'Personal reasons' },
    { name: 'Pooja Sharma', father: 'Sanjay Sharma', rollno: '10', class: '1st', reason: 'Changed to CBSE board' },
    { name: 'Arjun Patel', father: 'Mahesh Patel', rollno: '11', class: '2nd', reason: 'Parent job transfer' },
    { name: 'Divya Joshi', father: 'Naveen Joshi', rollno: '12', class: '3rd', reason: 'Admission in reputed school' },
    { name: 'Siddharth Rao', father: 'Devendra Rao', rollno: '13', class: '1st', reason: 'Joined online academy' },
    { name: 'Meera Nair', father: 'Suresh Nair', rollno: '14', class: '2nd', reason: 'Family issues' },
    { name: 'Tanmay Desai', father: 'Prakash Desai', rollno: '15', class: '3rd', reason: 'Pursuing sports academy' },
    { name: 'Isha Malik', father: 'Rohit Malik', rollno: '16', class: '1st', reason: 'Relocated to native place' },
    { name: 'Raj Malhotra', father: 'Ashok Malhotra', rollno: '17', class: '2nd', reason: 'Joined military school' },
    { name: 'Simran Kaur', father: 'Harjeet Singh', rollno: '18', class: '3rd', reason: 'Started online education' },
    { name: 'Aarav Gupta', father: 'Rajan Gupta', rollno: '19', class: '1st', reason: 'Enrolled in competitive coaching' },
    { name: 'Tanya Bhatia', father: 'Puneet Bhatia', rollno: '20', class: '2nd', reason: 'Joined religious schooling' },
    { name: 'Yash Thakur', father: 'Vikas Thakur', rollno: '21', class: '3rd', reason: 'Personal development focus' },
];

const AdminLeavingStudents = () => {
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRecords = studentRecords.filter((record) =>
        `${record.name} ${record.father} ${record.mother} ${record.class}  ${record.rollno}  ${record.reason}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className=' w-full p-5'>
            <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                Exiting Students
            </h2>

            <div className="p-5 rounded-md bg-white border-t-1 shadow-md border-gray-200 border hover:bg-gray-50 text-black">
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 rounded-md text-black w-1/2"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />

                    <div className='space-x-5'>
                        <button className='p-2 px-3 bg-gray-500 text-white rounded-sm'>Add Profile</button>
                        <select
                            className="p-2 rounded-md text-black"
                            value={recordsPerPage}
                            onChange={(e) => {
                                setRecordsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                        >
                            <option value={10}>Show 10</option>
                            <option value={20}>Show 20</option>
                            <option value={30}>Show 30</option>
                            <option value={50}>Show 50</option>
                        </select>
                    </div>


                </div>

                <div className='h-100 overflow-scroll'>
                    <table className="w-full border border-white text-center">
                        <thead className="text-white bg-gray-500">
                            <tr>
                                <th className="p-2 border-b-1">Name</th>
                                <th className="p-2 border-b-1">Father's Name</th>
                                <th className="p-2 border-b-1">Roll no</th>
                                <th className="p-2 border-b-1">Class</th>
                                <th className="p-2 border-b-1">Reason</th>
                                <th className="p-2 border-b-1">Profile</th>

                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((student, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-2 border-b-1">{student.name}</td>
                                    <td className="p-2 border-b-1">{student.father}</td>
                                    <td className="p-2 border-b-1">{student.rollno}</td>
                                    <td className="p-2 border-b-1">{student.class}</td>
                                    <td className="p-2 border-b-1">{student.reason}</td>
                                    <td className="p-2 border-b-1">
                                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md">View Profile</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='w-full flex flex-row justify-between'>

                    <div className=" mt-2 text-center text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </div>

                    <div className="flex justify-center mt-4 gap-2">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md bg-gray-400 text-white disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-md bg-gray-400 text-white disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>



                </div>


            </div>

        </div>
    )


};

export default AdminLeavingStudents;
