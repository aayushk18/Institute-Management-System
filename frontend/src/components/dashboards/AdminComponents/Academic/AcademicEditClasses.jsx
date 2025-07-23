import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAdminStore } from "../../../utils/useAuthStore";

const MOCK_STUDENTS = [
    { _id: "45565gg65676h5676", firstName: "John Doe", Roll_no: "101", StudentClass: "10", active: true },
    { _id: "65656fgfg56565", firstName: "Jane Smith", Roll_no: "102", StudentClass: "10", active: false },
    { _id: "77889hghg888", firstName: "Alice Johnson", Roll_no: "103", StudentClass: "10", active: true },
    { _id: "ghfgh345435", firstName: "Bob Williams", Roll_no: "104", StudentClass: "10", active: true },
    { _id: "ghfhgf555", firstName: "Emma Watson", Roll_no: "105", StudentClass: "10", active: true },
    { _id: "fgdfgdfgdfg", firstName: "Chris Evans", Roll_no: "106", StudentClass: "10", active: true },
    { _id: "retret65765", firstName: "Natalie Portman", Roll_no: "107", StudentClass: "10", active: false },
    { _id: "vcbcvb3343", firstName: "Tom Holland", Roll_no: "108", StudentClass: "10", active: true },
    { _id: "zxczxc111", firstName: "Scarlett Johansson", Roll_no: "109", StudentClass: "10", active: true },
    { _id: "ertret888", firstName: "Mark Ruffalo", Roll_no: "110", StudentClass: "10", active: true },
    { _id: "qweqwe999", firstName: "Benedict Cumberbatch", Roll_no: "111", StudentClass: "10", active: false },
];

const MOCK_CLASS_DATA = ["45565gg65676h5676", "65656fgfg56565"];

const AcademicEditClasses = () => {
    const [students, setStudents] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { getStudentClassData, getClassData, updateClassData } = useAdminStore()

    // Pagination
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);


    // data fetch ke liye
    const fetchStudents = async () => {
        setLoading(true);
        setStudents([])
        setSelectedIds([])

        const stu = await getStudentClassData(selectedClass, selectedSection)
        const cls = await getClassData(selectedClass, selectedSection)

        console.log(cls);

        setTimeout(() => {
            if (stu) {
                setStudents(stu);
            }
            if (cls) {
                setSelectedIds(cls)
            }


            // setSelectedIds(MOCK_CLASS_DATA);
            setLoading(false);
        }, 1000);


    };

    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]



        );

        console.log(selectedIds);
    };

    // const handleSelectAll = () => {
    //     const currentPageIds = paginatedStudents.map((s) => s.id);
    //     const allSelected = currentPageIds.every((id) => selectedIds.includes(id));
    //     setSelectedIds(
    //         allSelected
    //             ? selectedIds.filter((id) => !currentPageIds.includes(id))
    //             : [...new Set([...selectedIds, ...currentPageIds])]
    //     );
    // };

    // class update ke liye 

    const handleSelectAll = () => {
        const filteredIds = filteredStudents.map((s) => s.id);
        const allFilteredSelected = filteredIds.every((id) => selectedIds.includes(id));

        setSelectedIds(
            allFilteredSelected
                ? selectedIds.filter((id) => !filteredIds.includes(id)) // Deselect all filtered
                : [...new Set([...selectedIds, ...filteredIds])]        // Select all filtered
        );

        console.log(selectedIds);

    };


    const handleUpdate = () => {

        console.log(searchTerm);

        console.log("Form data to send to DB:", selectedIds);

        updateClassData(selectedClass, selectedSection, selectedIds)


    };

    // refresh ke liye
    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            fetchStudents();
        }, 1000);
    };

    const filteredStudents = students.filter((student) => {
        const term = searchTerm.toLowerCase();
        return (
            student.firstName.toLowerCase().includes(term) ||
            // student?.midName.toLowerCase().includes(term) ||
            student.lastName.toLowerCase().includes(term) ||
            student.Roll_no.toString().includes(term)

        );
    });

    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
    const paginatedStudents = filteredStudents.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const changePage = (direction) => {
        if (direction === "prev" && currentPage > 1) setCurrentPage((p) => p - 1);
        if (direction === "next" && currentPage < totalPages) setCurrentPage((p) => p + 1);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 text-gray-800">
            <h2 className="text-2xl font-bold mb-4">Update Classes</h2>

            {/* Selection */}
            <div className="flex flex-wrap gap-4 mb-6">
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="p-4 bg-white text-gray-600 rounded-md  border-t-1 shadow-md border-gray-200 border hover:bg-gray-50 w-full md:w-1/4"
                >
                    <option value="">Select Class</option>
                    <option value="nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>

                <select
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="p-4 bg-white text-gray-600 rounded  border-t-1 shadow-md border-gray-200 border hover:bg-gray-50 w-full md:w-1/4"
                >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                </select>

                <button
                    onClick={fetchStudents}
                    className="  text-white px-6 py-2 p-4 bg-gray-500   rounded hover:bg-gray-600"
                >
                    Show
                </button>
            </div>

            <div className="p-5  bg-white text-gray-600 rounded-md  border-t-1 shadow-md border-gray-200 border " >
                {/* Actions */}
                <div className="flex flex-row justify-between gap-4 mb-4">

                    <div className="flex gap-4 flex-row">
                        <button
                            onClick={handleUpdate}
                            className="   px-6 py-2  p-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Update
                        </button>

                        <button
                            onClick={handleRefresh}
                            className=" px-6 py-2  p-4 bg-white text-gray-600 rounded-md  border-t-1 shadow-md border-gray-200 border hover:bg-gray-50"
                        >

                            Refresh
                        </button>
                    </div>


                    <div className="flex  gap-4 flex-row">
                        <input
                            type="text"
                            placeholder="Search by name, roll no or class..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // reset to page 1 on new search
                            }}
                            className="rounded-md bg-white border-t-1 shadow-md border-gray-200 border  p-2 flex-1 min-w-[200px]"
                        />
                        <select
                            className=" p-2 rounded-md bg-white border-t-1 shadow-md border-gray-200 border "
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1); // reset to page 1
                            }}
                        >
                            <option value={10}>10 rows</option>
                            <option value={20}>20 rows</option>
                            <option value={50}>50 rows</option>
                        </select>
                    </div>




                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full  border border-white  ">
                        <thead className=" ">
                            <tr className="bg-gray-500 text-white">
                                <th className=" p-2 border-b text-center">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={
                                            paginatedStudents.length > 0 &&
                                            paginatedStudents.every((s) => selectedIds.includes(s.id))
                                        }
                                    />
                                </th>
                                <th className="p-2 border-b">S.No</th>
                                <th className="p-2 border-b">Name</th>
                                <th className="p-2 border-b">Roll No</th>
                                <th className="p-2 border-b">Class</th>
                                <th className="p-2 border-b">Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-6">
                                        <Loader2 className="mx-auto animate-spin text-gray-500 w-6 h-6" />
                                    </td>
                                </tr>
                            ) : paginatedStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-6">
                                        No data is available
                                    </td>
                                </tr>
                            ) : (
                                paginatedStudents.map((student, index) => (
                                    <tr key={student.id} className="text-center text-gray-600">
                                        <td className="p-2 border-b text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(student.id)}
                                                onChange={() => handleCheckboxChange(student.id)}
                                            />
                                        </td>
                                        <td className="p-2 border-b text-center">
                                            {(currentPage - 1) * rowsPerPage + index + 1}
                                        </td>
                                        <td className="p-2 border-b">{`${student.firstName}  ${student.lastName}`}</td>
                                        <td className="p-2 border-b">{student.Roll_no}</td>
                                        <td className="p-2 border-b text-center">{`${student.StudentClass}  ${student.section}`}</td>
                                        <td className="p-2 border-b text-center">
                                            <span
                                                className={`inline-block w-3 h-3 rounded-full ${student.active ? "bg-green-500" : "bg-red-500"}`}
                                            ></span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {filteredStudents.length > 0 && (
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-600">
                            Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                            {Math.min(currentPage * rowsPerPage, filteredStudents.length)} of{" "}
                            {filteredStudents.length} entries
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => changePage("prev")}
                                disabled={currentPage === 1}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <span className="px-3 py-1">{currentPage}</span>
                            <button
                                onClick={() => changePage("next")}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

            </div>


        </div>
    );
};

export default AcademicEditClasses;
