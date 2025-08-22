import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../../utils/useAuthStore';
import { Loader } from 'lucide-react';


const StaffTable = () => {


    const data = Array.from({ length: 53 }, (_, i) => ({

    }));

    const navigate = useNavigate()

    const [search, setSearch] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [department, setDepartment] = useState('');
    const [staffData, setStaffData] = useState(data);

    const { showAllStaff } = useAdminStore()


    const fetchData = async () => {
        const allStaff = await showAllStaff();
        console.log(allStaff);

        if (department == "Academic") {
            setStaffData(allStaff.academic)
            console.log(allStaff.academic);

        } else if (department == "General") {
            setStaffData(allStaff.general)

        }
        console.log(staffData);


    };


    useEffect(() => {


        fetchData()


    }, [department])


    const filteredData = staffData?.filter((staff) => {
        const query = search.toLowerCase();
        return (
            (staff.firstName?.toLowerCase().includes(query) ||
                staff.midName?.toLowerCase().includes(query) ||
                staff.lastName?.toLowerCase().includes(query) ||
                staff.staffType?.toLowerCase().includes(query) ||
                staff.designation?.toLowerCase().includes(query) ||
                staff.phone?.toLowerCase().includes(query))
        );
    });


    const totalStaff = filteredData.length;
    const totalPages = Math.ceil(totalStaff / entriesPerPage);
    const currentData = filteredData.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    return (
        <div className=" ">
            {/* Top Row */}
            <div className="flex flex-wrap items-center justify-between my-10 space-y-2 sm:space-y-0 sm:flex-nowrap">
                {/* Dropdown */}
                <select
                    className=" p-5 bg-white shadow-md   border-t-1 border-gray-200 rounded"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    <option value="">Select</option>
                    <option value="Academic">Academic Staff</option>
                    <option value="General">General Staff</option>
                </select>

                {/* Search + Button */}
                <div className="flex items-center space-x-5">
                    <input
                        type="text"
                        placeholder="Search staff..."
                        className="p-5 bg-white shadow-md   border-t-1 border-gray-200 rounded"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <NavLink to='/admin/faculties/new-staff' className="bg-gray-500 text-white px-4 py-5 rounded hover:bg-gray-600">
                        Add Staff
                    </NavLink>
                </div>
            </div>


            <div className='p-5 border border-t-1 border-gray-200 rounded shadow-md bg-white'>


                {/* Table Top */}
                <div className="flex items-center justify-between mb-2">
                    <div>
                        Show{' '}
                        <select
                            className="border rounded px-2 py-1"
                            value={entriesPerPage}
                            onChange={(e) => {
                                setEntriesPerPage(Number(e.target.value));
                                setCurrentPage(1); // reset to first page
                            }}
                        >
                            {[10, 20, 50].map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </select>{' '}
                        entries
                    </div>
                    <div>Total Staff: {totalStaff || 0}</div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">

                    {department != '' ? (<>


                        <table className="min-w-full  text-sm">
                            <thead className="bg-gray-500 text-white">
                                <tr>
                                    <th className="border-b px-4 py-2">Name</th>
                                    <th className="border-b px-4 py-2">Phone no</th>
                                    <th className="border-b px-4 py-2">Department</th>
                                    <th className="border-b px-4 py-2">Role</th>
                                    <th className="border-b px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((staff) => (
                                    <tr key={staff.id} className="text-center">

                                        <td className="border-b  px-4 py-2">{`${staff.firstName} ${staff?.midName} ${staff?.lastName}`}</td>
                                        <td className="border-b  px-4 py-2">{staff.phone}</td>
                                        <td className="border-b  px-4 py-2">{staff.staffType}</td>
                                        <td className="border-b  px-4 py-2">{staff.designation}</td>
                                        <td className="border-b  px-4 py-2 space-x-2">
                                            <button
                                                onClick={() => {
                                                    navigate(`/admin/faculties/all-staff/profile/${staff.firstName}-${staff.phone}`, { state: { pass: staff } })
                                                }} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
                                                View
                                            </button>
                                            <button onClick={() => {
                                                if (staff.staffType == "Academic Staff") {
                                                    navigate(`/admin/faculties/academic-staff/${staff.firstName}-${staff.phone}`, { state: { pass: staff } })
                                                } else {
                                                    navigate(`/admin/faculties/general-staff/${staff.firstName}-${staff.phone}`, { state: { pass: staff } })
                                                }
                                            }}
                                                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {currentData.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">
                                            No matching staff found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>


                    </>) : (


                        <div className="flex items-center justify-center w-full h-50">
                            <span className='text-2xl'>Please the Staff Type </span>
                        </div>

                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

            </div>

        </div>
    );
};

export default StaffTable;
