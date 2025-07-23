import React, { useState, useMemo, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminStore } from "../../utils/useAuthStore";
import { Loader } from "lucide-react";


const classList = ["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => `${i + 1}`)];

const dummyData = classList.reduce((acc, className, index) => {
    acc[className] = {
        total: 30 + index,
        vacancy: 5 + (index % 5),
        leaving: index % 3,
    };
    return acc;
}, {});

const studentData = Array.from({ length: 50 }, (_, i) => ({
    name: `Student ${i + 1}`,
    fatherName: `Father ${i + 1}`,
    class: classList[i % classList.length],
    email: `student${i + 1}@gmail.com`,
    status: i % 2 === 0 ? "Registered" : "Pending",
}));

const AdminNewRegistration = () => {

    const navigate = useNavigate()
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { showallNewRegistrations, updateRegistrations } = useAdminStore()

    const [student, setstudent] = useState([])
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const stu = await showallNewRegistrations();
            // if (!stu || stu.length === 0) {
            // setstudentsData(studentData);
            // } else {
            if (!stu || stu.length === 0) {

            } else {
                setstudent(stu);

                console.log(stu);
            }
        };
        fetchData();
    }, []);




    const handleCheckboxChange = (className) => {
        setSelectedClasses((prev) =>
            prev.includes(className)
                ? prev.filter((cls) => cls !== className)
                : [...prev, className]
        );
    };

    const filteredData = student.filter((student) => {
        const matchedSearch = `${student.firstName}${student.midName}${student.lastName || ''}${student.fatherFirstName}${student.fatherMidName}${student.fatherLastName || ''}${student.StudentClass}${student.email}${student.phone}`.toLowerCase().includes(searchTerm.toLowerCase());
        return matchedSearch;
        // student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||

        // student.status.toLowerCase().includes(searchTerm.toLowerCase())


        // student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // student.status.toLowerCase().includes(searchTerm.toLowerCase())

    });

    // console.log(filteredData);



    // const filteredData = useMemo(() => {
    //     return studentsData.filter((student) =>
    //         student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         student.midName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         student.fatherFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         student.fatherMidName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         //student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         student.fatherLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         student.StudentClass.toLowerCase().includes(searchTerm.toLowerCase())


    //         // student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||

    //         // student.status.toLowerCase().includes(searchTerm.toLowerCase())


    //         // student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         // student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         // student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         // student.status.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    // }, [searchTerm]);




    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );
    console.log(paginatedData);


    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (

        <div className='w-full p-5'>
            <div className="max-w-7xl justify-center mx-auto space-y-8">
                <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                    New Registrations
                </h2>
                <div className="p-5 rounded-md bg-white border-t-1 shadow-md border-gray-200 border hover:bg-gray-50 text-black">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Select Classes</h3>
                    <div className="flex flex-wrap gap-4">
                        {classList.map((className) => (
                            <div key={className} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={className}
                                    checked={selectedClasses.includes(className)}
                                    onChange={() => handleCheckboxChange(className)}
                                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor={className} className="text-sm text-gray-700">
                                    {className}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-5 rounded-md bg-white border-t-1 shadow-md border-gray-200 border hover:bg-gray-50 text-black">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Class Details</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-white">
                            <thead className="bg-gray-500">
                                <tr>
                                    <th className="px-4 py-2 border-b-1">Class</th>
                                    <th className="px-4 py-2 border-b-1">Total Students</th>
                                    <th className="px-4 py-2 border-b-1">Vacancy</th>
                                    <th className="px-4 py-2 border-b-1">Leaving Students</th>
                                    <th className="px-4 py-2 border-b-1 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedClasses.map((className) => (
                                    <tr key={className} className="hover:bg-gray-50 text-gray-800 transition">
                                        <td className="border-b-1 px-4 py-2">{className}</td>
                                        <td className="border-b-1 py-2">{dummyData[className].total}</td>
                                        <td className="border-b-1 px-4 py-2">{dummyData[className].vacancy}</td>
                                        <td className="border-b-1 px-4 py-2">{dummyData[className].leaving}</td>
                                        <td className="border-b-1 px-4 py-2 text-center">
                                            <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded shadow">
                                                Set Form
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {selectedClasses.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center text-gray-500 py-6">
                                            No class selected. Please select a class to view details.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="p-5 rounded-md bg-white border-t-1 shadow-md border-gray-200 border hover:bg-gray-50 text-black">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">New Registrations Record</h3>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-700">Total entries: {filteredData.length}</span>
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className=" px-3 py-1 rounded-md text-sm"
                            />
                            <select
                                value={entriesPerPage}
                                onChange={(e) => {
                                    setEntriesPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="border-t-1 border-gray-200 p-2 shadow-md shadow-gray-200 px-2 py-1 rounded-md text-sm"
                            >
                                {[10, 20, 30, 50].map((num) => (
                                    <option key={num} value={num}>{`Show ${num} entries`}</option>
                                ))}
                            </select>

                            <NavLink to='/admin/admissions/registration-form' className='p-2 bg-gray-500 rounded-sm hover:bg-gray-600 text-white'>Add Manually</NavLink>
                        </div>
                    </div>
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-500 text-white">
                            <tr>2
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Father Name</th>
                                <th className="px-4 py-2">Class</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone no</th>
                                {/* <th className="px-4 py-2">Registration Status</th> */}
                                <th className="px-4 py-2">Action</th>
                                <th className="px-4 py-2"></th>

                            </tr>
                        </thead>

                        {isLoading ? (<div className=" p-5 text-center  w-full">
                            <Loader className="animate-spin" />
                        </div>) : (<tbody>
                            {paginatedData.map((student, idx) => (
                                <tr key={idx} className="hover:bg-gray-100">
                                    <td className="px-4 py-2">{student.firstName} {student.midName} {student.lastName}</td>
                                    <td className="px-4 py-2">{student.fatherFirstName} {student.fatherMidName} {student.fatherLastName}</td>
                                    <td className="px-4 py-2">{student.StudentClass}</td>
                                    <td className="px-4 py-2">{student.email}</td>
                                    <td className="px-4 py-2">{student.phone}</td>

                                    {/* <td className="px-4 py-2">{student.status}</td> */}
                                    {/* <td className="px-4 py-2"></td> */}


                                    {/* <td className="px-4 py-2">{student.name}</td> */}
                                    {/* <td className="px-4 py-2">{student.fatherName}</td> */}
                                    {/* <td className="px-4 py-2">{student.class}</td> */}
                                    {/* <td className="px-4 py-2">{student.status}</td> */}
                                    <td className="px-4 py-2">
                                        <button className="bg-gray-500 text-white px-3 py-1 rounded shadow text-sm hover:bg-gray-600"
                                            onClick={() => {
                                                navigate(`/admin/admissions/registration-form/page-1/${student.firstName}-${student.StudentClass}-${student.phone}`, { state: { pass: student } })
                                            }}
                                        >
                                            Edit Profile
                                        </button>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button className="bg-gray-500 text-white px-3 py-1 rounded shadow text-sm hover:bg-gray-600"
                                            onClick={() => {
                                                navigate(`/admin/admissions/registration-form/details/${student.firstName}-${student.StudentClass}-${student.phone}`, { state: { pass: student } })
                                            }}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>)}




                    </table>
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
                        <span>
                            Showing page {currentPage} of {totalPages}
                        </span>
                        <div className="space-x-1">
                            <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 border rounded disabled:opacity-50">
                                Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => changePage(page)}
                                    className={`px-2 py-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 border rounded disabled:opacity-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNewRegistration;





























