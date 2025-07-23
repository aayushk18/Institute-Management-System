import React, { useRef } from 'react'





const Feedback = () => {
    const printRef = useRef();

    const handlePrint = () => {
        const printContents = printRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // Reload back to full app
    };

    const student = {
        name: "Aarav Sharma",
        rollNo: "23",
        class: "10",
        section: "B",
        gender: "Male",
        dob: "2008-05-12",
        fatherName: "Ramesh Sharma",
        motherName: "Sunita Sharma",
        contact: "9876543210",
        address: "123, Green Street, New Delhi"
    };

    return (
        <div className="p-4">
            <div ref={printRef} className="bg-white shadow-md p-6 rounded-md max-w-xl mx-auto">
                <h2 className="text-xl font-bold mb-4 text-center">Student Information</h2>
                <table className="w-full text-left border-collapse">
                    <tbody>
                        <tr><td className="font-semibold">Name:</td><td>{student.name}</td></tr>
                        <tr><td className="font-semibold">Roll No:</td><td>{student.rollNo}</td></tr>
                        <tr><td className="font-semibold">Class:</td><td>{student.class}</td></tr>
                        <tr><td className="font-semibold">Section:</td><td>{student.section}</td></tr>
                        <tr><td className="font-semibold">Gender:</td><td>{student.gender}</td></tr>
                        <tr><td className="font-semibold">Date of Birth:</td><td>{student.dob}</td></tr>
                        <tr><td className="font-semibold">Father's Name:</td><td>{student.fatherName}</td></tr>
                        <tr><td className="font-semibold">Mother's Name:</td><td>{student.motherName}</td></tr>
                        <tr><td className="font-semibold">Contact:</td><td>{student.contact}</td></tr>
                        <tr><td className="font-semibold">Address:</td><td>{student.address}</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="text-center mt-4">
                <button
                    onClick={handlePrint}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Print / Save as PDF
                </button>
            </div>
        </div>
    );
};


export default Feedback