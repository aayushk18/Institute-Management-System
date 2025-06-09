import React, { useState } from 'react';

const studentRecords = [
    { name: 'Aman Sharma', father: 'Rakesh Sharma', mother: 'Sunita Sharma', class: '1st', status: '75% completed' },
    { name: 'Priya Singh', father: 'Dinesh Singh', mother: 'Kavita Singh', class: '2nd', status: '82% completed' },
    { name: 'Rohit Verma', father: 'Suresh Verma', mother: 'Meena Verma', class: '3rd', status: '75% completed' },
    { name: 'Anjali Mehra', father: 'Manoj Mehra', mother: 'Poonam Mehra', class: '1st', status: '82% completed' },
    { name: 'Vikram Chauhan', father: 'Rajeev Chauhan', mother: 'Seema Chauhan', class: '2nd', status: '75% completed' },
    { name: 'Sneha Rathi', father: 'Amit Rathi', mother: 'Anita Rathi', class: '3rd', status: '82% completed' },
    { name: 'Karan Kapoor', father: 'Rohit Kapoor', mother: 'Neha Kapoor', class: '1st', status: '75% completed' },
    { name: 'Neha Yadav', father: 'Ajay Yadav', mother: 'Shweta Yadav', class: '2nd', status: '82% completed' },
    { name: 'Ritesh Kumar', father: 'Pradeep Kumar', mother: 'Sarla Kumar', class: '3rd', status: '75% completed' },
    { name: 'Pooja Sharma', father: 'Sanjay Sharma', mother: 'Rina Sharma', class: '1st', status: '82% completed' },
    { name: 'Arjun Patel', father: 'Mahesh Patel', mother: 'Leela Patel', class: '2nd', status: '75% completed' },
    { name: 'Divya Joshi', father: 'Naveen Joshi', mother: 'Rekha Joshi', class: '3rd', status: '82% completed' },
    { name: 'Siddharth Rao', father: 'Devendra Rao', mother: 'Nirmala Rao', class: '1st', status: '75% completed' },
    { name: 'Meera Nair', father: 'Suresh Nair', mother: 'Lakshmi Nair', class: '2nd', status: '82% completed' },
    { name: 'Tanmay Desai', father: 'Prakash Desai', mother: 'Geeta Desai', class: '3rd', status: '75% completed' },
    { name: 'Isha Malik', father: 'Rohit Malik', mother: 'Neeta Malik', class: '1st', status: '82% completed' },
    { name: 'Raj Malhotra', father: 'Ashok Malhotra', mother: 'Vandana Malhotra', class: '2nd', status: '75% completed' },
    { name: 'Simran Kaur', father: 'Harjeet Singh', mother: 'Parminder Kaur', class: '3rd', status: '82% completed' },
    { name: 'Aarav Gupta', father: 'Rajan Gupta', mother: 'Kirti Gupta', class: '1st', status: '75% completed' },
    { name: 'Tanya Bhatia', father: 'Puneet Bhatia', mother: 'Smita Bhatia', class: '2nd', status: '82% completed' },
    { name: 'Yash Thakur', father: 'Vikas Thakur', mother: 'Shalini Thakur', class: '3rd', status: '75% completed' },
];

const AdminNewAdmissions = () => {
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRecords = studentRecords.filter((record) =>
        `${record.name} ${record.father} ${record.mother} ${record.class}  ${record.status}`
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

        <div className='w-full  p-5'>

            <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                New Admissions
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
                        <button className='p-2 px-3 bg-gray-500 text-white rounded-sm'>New Profile</button>
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
                                <th className="p-2 border-b-1">Mother's Name</th>
                                <th className="p-2 border-b-1">Class</th>
                                <th className="p-2 border-b-1">Registration Status</th>
                                <th className="p-2 border-b-1">Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((student, index) => (
                                <tr key={index} className="border-t">
                                    <td className="p-2 border-b-1">{student.name}</td>
                                    <td className="p-2 border-b-1">{student.father}</td>
                                    <td className="p-2 border-b-1">{student.mother}</td>
                                    <td className="p-2 border-b-1">{student.class}</td>
                                    <td className="p-2 border-b-1">{student.status}</td>
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

    );
};

export default AdminNewAdmissions;
