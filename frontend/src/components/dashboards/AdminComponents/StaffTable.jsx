import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
const staffData = Array.from({ length: 53 }, (_, i) => ({
    id: i + 1,
    name: `Staff ${i + 1}`,
    department: ['Admin', 'Teaching', 'Support'][i % 3],
    role: ['Teacher', 'Clerk', 'Cleaner'][i % 3],
    phone: `98765432${String(i).padStart(2, '0')}`
}));

const StaffTable = () => {
    const [search, setSearch] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [department, setDepartment] = useState('');

    const filteredData = staffData.filter((staff) => {
        const query = search.toLowerCase();
        return (
            (staff.name?.toLowerCase().includes(query) ||
                staff.department?.toLowerCase().includes(query) ||
                staff.role?.toLowerCase().includes(query) ||
                staff.phone?.toLowerCase().includes(query)) &&
            (department ? staff.department === department : true)
        );
    });


    const totalStaff = filteredData.length;
    const totalPages = Math.ceil(totalStaff / entriesPerPage);
    const currentData = filteredData.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );

    return (
        <div className="p-6 bg-white rounded shadow-md">
            {/* Top Row */}
            <div className="flex flex-wrap items-center justify-between mb-4 space-y-2 sm:space-y-0 sm:flex-nowrap">
                {/* Dropdown */}
                <select
                    className="border p-2 rounded"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    <option value="">All Departments</option>
                    <option value="Admin">Admin</option>
                    <option value="Teaching">Teaching</option>
                    <option value="Support">Support</option>
                </select>

                {/* Search + Button */}
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search staff..."
                        className="border p-2 rounded"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <NavLink to='/admin/faculties/new-staff' className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                        Add Staff
                    </NavLink>
                </div>
            </div>

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
                <div>Total Staff: {totalStaff}</div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full  text-sm">
                    <thead className="bg-gray-500 text-white">
                        <tr>
                            <th className="border-b px-4 py-2">ID</th>
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
                                <td className="border-b  px-4 py-2">{staff.id}</td>
                                <td className="border-b  px-4 py-2">{staff.name}</td>
                                <td className="border-b  px-4 py-2">{staff.phone}</td>
                                <td className="border-b  px-4 py-2">{staff.department}</td>
                                <td className="border-b  px-4 py-2">{staff.role}</td>
                                <td className="border-b  px-4 py-2 space-x-2">
                                    <button className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
                                        View
                                    </button>
                                    <button className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
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
    );
};

export default StaffTable;
