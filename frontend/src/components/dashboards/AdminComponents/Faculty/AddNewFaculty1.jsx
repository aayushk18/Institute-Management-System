import React, { useState } from 'react';


const AddNewFaculty1 = () => {




    // formFields.js
    const student = []

    const personalDetails = [
        { label: "Full Name", key: "fullName", type: "text", colSpan: 1 },
        { label: "Gender", key: "gender", type: "select", options: [{ val: "Select" }, { val: "Male" }, { val: "Female" }, { val: "Other" }], colSpan: 1 },
        { label: "Date of Birth", key: "dob", type: "date", colSpan: 1 },
        { label: "Nationality", key: "nationality", type: "text", colSpan: 1 },
        { label: "Marital Status", key: "maritalStatus", type: "select", options: [{ val: "Select" }, { val: "Single" }, { val: "Married" }, { val: "Divorced" }, { val: "Widowed" }], colSpan: 1 },
        { label: "Blood Group", key: "bloodGroup", type: "text", colSpan: 1 },
    ]
    const contactInfo = [
        { label: "Mobile", key: "phone", type: "text", colSpan: 1 },
        { label: "Alternate Phone", key: "altPhone", type: "text", colSpan: 1 },
        { label: "Email", key: "email", type: "email", colSpan: 1 },
        { label: "Present Address", key: "presentAddress", type: "text", colSpan: 2 },
        { label: "Permanent Address", key: "permanentAddress", type: "text", colSpan: 2 },
    ]
    const qualifications = [
        { label: "Highest Qualification", key: "highestQualification", type: "text", colSpan: 1 },
        { label: "Specialization", key: "specialization", type: "text", colSpan: 1 },
        { label: "Other Certifications", key: "otherCertifications", type: "text", colSpan: 2 },
        { label: "Years of Experience", key: "yearsOfExperience", type: "number", colSpan: 1 },
        { label: "Subject Expertise", key: "subjectExpertise", type: "text", colSpan: 2 },
    ]
    const employmentDetails = [
        { label: "Designation", key: "designation", type: "text", colSpan: 1 },
        { label: "Department", key: "department", type: "text", colSpan: 1 },
        { label: "Date of Joining", key: "dateOfJoining", type: "date", colSpan: 1 },
        { label: "Employee ID", key: "employeeId", type: "text", colSpan: 1 },
        { label: "Employment Type", key: "employmentType", type: "select", options: [{ val: "Permanent" }, { val: "Contract" }, { val: "Guest" }], colSpan: 1 },
        { label: "Reporting Authority", key: "reportingAuthority", type: "text", colSpan: 2 },
    ]
    const systemAccess = [
        { label: "Username", key: "username", type: "text", colSpan: 1 },
        { label: "Password", key: "password", type: "password", colSpan: 1 },
        { label: "Role", key: "role", type: "select", options: [{ val: "Select" }, { val: "Admin" }, { val: "Principal" }, { val: "HOD" }, { val: "Teacher" }], colSpan: 1 },
        { label: "Access Permissions", key: "accessPermissions", type: "text", colSpan: 2 },
    ]
    const bankDetails = [
        { label: "Account Holder Name", key: "accountHolderName", type: "text", colSpan: 2 },
        { label: "Bank Name", key: "bankName", type: "text", colSpan: 2 },
        { label: "Account Number", key: "accountNumber", type: "text", colSpan: 2 },
        { label: "IFSC Code", key: "ifscCode", type: "text", colSpan: 1 },
        { label: "Branch", key: "branch", type: "text", colSpan: 1 },
        {
            label: "Account Type", key: "accountType", type: "select", colSpan: 1, options: [
                { val: "Select" },
                { val: "Savings" },
                { val: "Current" },
                { val: "Salary" }
            ]
        },
    ];


    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        dob: '',
        nationality: '',
        maritalStatus: '',
        bloodGroup: '',
        phone: '',
        altPhone: '',
        email: '',
        presentAddress: '',
        permanentAddress: '',


    });


    const [previousInstitutions, setPreviousInstitutions] = useState([]);
    const [newInstitution, setNewInstitution] = useState({ name: '', position: '', duration: '' });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const allClasses = [
        "Nursery", "LKG", "UKG",
        "1", "2", "3", "4", "5", "6",
        "7", "8", "9", "10", "11", "12",
    ];
    const [selectedClasses, setSelectedClasses] = useState([]);


    const allSubjects = [
        "Mathematics", "Physics", "Chemistry", "Biology",
        "English", "Hindi", "Sanskrit", "History",
        "Geography", "Political Science", "Economics",
        "Commerce", "Accounts", "Business Studies",
        "Computer Science", "Physical Education",
        "Environmental Science", "Art", "Music", "Psychology",
    ];


    const [subjects, setSubjects] = useState([]);
    const [subjectSearch, setSubjectSearch] = useState('');


    const handleInstitutionChange = (e) => {
        const { name, value } = e.target;
        setNewInstitution({
            ...newInstitution,
            [name]: value,
        });
    };

    const addInstitution = () => {
        if (newInstitution.name && newInstitution.position && newInstitution.duration) {
            setPreviousInstitutions([...previousInstitutions, newInstitution]);
            setNewInstitution({ name: '', position: '', duration: '' });
        }
    };

    const removeInstitution = (index) => {
        setPreviousInstitutions(previousInstitutions.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullData = {
            ...formData,
            previousInstitutions,
            subjects,
            assignedClasses: selectedClasses,
        };
        console.log('Submitted Data:', fullData);
    };


    return (
        <div>

            <div>
                <div>
                    <div className="w-full bg-gray-100 flex flex-col p-4 sm:p-6 md:p-10">

                        <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                            Teachers Details
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg ">

                            <section className="mb-8">
                                {/* Personal Details */}
                                <div className='w-full mb-15 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                                    <div className=' h-full flex justify-center items-center text-center'>
                                        <h3 className="text-xl self-center font-semibold text-gray-700 ">
                                            Z Details
                                        </h3>
                                    </div>


                                </div>
                                <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                                    {personalDetails.map(({ label, key, type, colSpan = 1, options }) => (
                                        <div key={key} className={`col-span-${colSpan} text-gray-600`}>
                                            <label className="block text-gray-600 mb-2 text-sm sm:text-base font-medium">
                                                {label}
                                            </label>

                                            {type === 'select' ? (
                                                <select
                                                    value={formData[key] || student?.[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                >
                                                    {options?.map((option, idx) => (
                                                        <option key={idx} value={option.val}>
                                                            {option.val}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={type}
                                                    value={
                                                        type === 'date'
                                                            ? formData[key] || student?.[key] || ''
                                                            : formData[key] || ''
                                                    }
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    placeholder={type === 'date' ? '' : student?.[key] || `Enter ${label.toLowerCase()}`}
                                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                />
                                            )}
                                        </div>
                                    ))}

                                </div>

                                {/* Contact Info */}
                                <div className='w-full mb-15 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                                    <div className=' h-full flex justify-center items-center text-center'>
                                        <h3 className="text-xl self-center font-semibold text-gray-700 ">
                                            Contact Details
                                        </h3>
                                    </div>


                                </div>
                                <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                                    {contactInfo.map(({ label, key, type, colSpan = 1, options }) => (
                                        <div key={key} className={`col-span-${colSpan} text-gray-600`}>
                                            <label className="block text-gray-600 mb-2 text-sm sm:text-base font-medium">
                                                {label}
                                            </label>

                                            {type === 'select' ? (
                                                <select
                                                    value={formData[key] || student?.[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                >
                                                    {options?.map((option, idx) => (
                                                        <option key={idx} value={option.val}>
                                                            {option.val}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={type}
                                                    value={
                                                        type === 'date'
                                                            ? formData[key] || student?.[key] || ''
                                                            : formData[key] || ''
                                                    }
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    placeholder={type === 'date' ? '' : student?.[key] || `Enter ${label.toLowerCase()}`}
                                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                />
                                            )}
                                        </div>
                                    ))}

                                </div>


                                {/* Academic & Professional */}
                                <div className='w-full mb-15 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                                    <div className=' h-full flex justify-center items-center text-center'>
                                        <h3 className="text-xl self-center font-semibold text-gray-700 ">
                                            Academic & Professional Details
                                        </h3>
                                    </div>


                                </div>
                                <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                                    {qualifications.map(({ label, key, type, colSpan = 1, options }) => (
                                        <div key={key} className={`col-span-${colSpan} text-gray-600`}>
                                            <label className="block text-gray-600 mb-2 text-sm sm:text-base font-medium">
                                                {label}
                                            </label>

                                            {type === 'select' ? (
                                                <select
                                                    value={formData[key] || student?.[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                >
                                                    {options?.map((option, idx) => (
                                                        <option key={idx} value={option.val}>
                                                            {option.val}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={type}
                                                    value={
                                                        type === 'date'
                                                            ? formData[key] || student?.[key] || ''
                                                            : formData[key] || ''
                                                    }
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    placeholder={type === 'date' ? '' : student?.[key] || `Enter ${label.toLowerCase()}`}
                                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                />
                                            )}
                                        </div>
                                    ))}

                                    <div className="col-span-2 row-span-2 border   border-gray-300 p-4 overflow-hidden rounded-md h-70 ">
                                        <h3 className="font-semibold mb-2">Subject Expertise</h3>
                                        {/* Added Subjects */}
                                        <div className="flex flex-wrap gap-2 overflow-y-scroll max-h-40  mb-2">
                                            {subjects.map((subject, index) => (
                                                <div key={index} className="bg-gray-100 px-3 py-1 rounded shadow text-sm flex items-center justify-between">
                                                    <span>{subject}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setSubjects(subjects.filter((_, i) => i !== index))
                                                        }
                                                        className="ml-2 text-red-500 text-xs font-bold"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Search Bar */}
                                        <input
                                            type="text"
                                            placeholder="Search Subject"
                                            value={subjectSearch}
                                            onChange={(e) => setSubjectSearch(e.target.value)}
                                            className="input mb-2 w-full"
                                        />

                                        {/* Filtered Suggestions */}
                                        <div className="mb-3">
                                            {allSubjects
                                                .filter(sub =>
                                                    sub.toLowerCase().includes(subjectSearch.toLowerCase()) &&
                                                    !subjects.includes(sub)
                                                )
                                                .slice(0, 5)
                                                .map((sub, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => {
                                                            setSubjects([...subjects, sub]);
                                                            setSubjectSearch('');
                                                        }}
                                                        className="block text-left w-full px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded mb-1 text-sm"
                                                    >
                                                        {sub}
                                                    </button>
                                                ))}
                                            {subjectSearch && allSubjects.every(s => !s.toLowerCase().includes(subjectSearch.toLowerCase())) && (
                                                <p className="text-xs text-gray-500 italic">No matches</p>
                                            )}
                                        </div>


                                    </div>


                                    <div className="mb-6 col-span-2 border border-gray-300   p-4 rounded-md   overflow-y-auto h-70 ">
                                        <h3 className="text-lg font-semibold mb-2">Classes</h3>
                                        <div className="grid grid-cols-6 gap-2">
                                            {allClasses.map((cls, index) => {
                                                const isSelected = selectedClasses.includes(cls);
                                                return (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedClasses((prev) =>
                                                                isSelected
                                                                    ? prev.filter((c) => c !== cls)
                                                                    : [...prev, cls]
                                                            );
                                                        }}
                                                        className={`px-1 py-2 rounded text-sm border text-center   ${isSelected
                                                            ? 'bg-gray-500 text-white border-gray-600'
                                                            : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100'} `}
                                                    >
                                                        {cls}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Display Selected */}
                                        {selectedClasses.length > 0 && (
                                            <div className="mt-3">
                                                <h4 className="text-sm  font-semibold">Selected Classes:</h4>
                                                <p className="text-sm p-1 border text-gray-700">{selectedClasses.join(', ')}</p>
                                            </div>
                                        )}
                                    </div>

                                </div>


                                {/* Employment */}
                                <div className='w-full mb-15 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                                    <div className=' h-full flex justify-center items-center text-center'>
                                        <h3 className="text-xl self-center font-semibold text-gray-700 ">
                                            Employment Details
                                        </h3>
                                    </div>


                                </div>
                                <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                                    {employmentDetails.map(({ label, key, type, colSpan = 1, options }) => (
                                        <div key={key} className={`col-span-${colSpan} text-gray-600`}>
                                            <label className="block text-gray-600 mb-2 text-sm sm:text-base font-medium">
                                                {label}
                                            </label>

                                            {type === 'select' ? (
                                                <select
                                                    value={formData[key] || student?.[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                >
                                                    {options?.map((option, idx) => (
                                                        <option key={idx} value={option.val}>
                                                            {option.val}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={type}
                                                    value={
                                                        type === 'date'
                                                            ? formData[key] || student?.[key] || ''
                                                            : formData[key] || ''
                                                    }
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    placeholder={type === 'date' ? '' : student?.[key] || `Enter ${label.toLowerCase()}`}
                                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <div className="col-span-3 row-span-2 border border-gray-300 p-4 rounded-md   overflow-y-auto max-h-60">
                                        <h3 className="font-semibold mb-2">Previous Institutions</h3>
                                        <div className="flex flex-col md:flex-row gap-2 mb-2">
                                            <input name="name" placeholder="Institution Name" value={newInstitution.name} onChange={handleInstitutionChange} className="input flex-1" />
                                            <input name="position" placeholder="Position" value={newInstitution.position} onChange={handleInstitutionChange} className="input flex-1" />
                                            <input name="duration" placeholder="Duration" value={newInstitution.duration} onChange={handleInstitutionChange} className="input flex-1" />
                                            <button type="button" onClick={addInstitution} className="bg-gray-500 text-white px-4 py-2 rounded">Add</button>
                                        </div>

                                        <div className="space-y-2">
                                            {previousInstitutions.map((inst, index) => (
                                                <div key={index} className="bg-gray-100 p-2 rounded shadow-sm flex justify-between items-center">
                                                    <div>
                                                        <p className="text-sm font-medium">{inst.name}</p>
                                                        <p className="text-xs">{inst.position} ({inst.duration})</p>
                                                    </div>
                                                    <button type="button" onClick={() => removeInstitution(index)} className="text-red-600 font-bold">X</button>
                                                </div>
                                            ))}
                                        </div>



                                    </div>

                                </div>


                                {/* System Access */}
                                <div className='w-full mb-15 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                                    <div className=' h-full flex justify-center items-center text-center'>
                                        <h3 className="text-xl self-center font-semibold text-gray-700 ">
                                            System Access Details
                                        </h3>
                                    </div>


                                </div>
                                <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                                    {systemAccess.map(({ label, key, type, colSpan = 1, options }) => (
                                        <div key={key} className={`col-span-${colSpan} text-gray-600`}>
                                            <label className="block text-gray-600 mb-2 text-sm sm:text-base font-medium">
                                                {label}
                                            </label>

                                            {type === 'select' ? (
                                                <select
                                                    value={formData[key] || student?.[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                >
                                                    {options?.map((option, idx) => (
                                                        <option key={idx} value={option.val}>
                                                            {option.val}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={type}
                                                    value={
                                                        type === 'date'
                                                            ? formData[key] || student?.[key] || ''
                                                            : formData[key] || ''
                                                    }
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    placeholder={type === 'date' ? '' : student?.[key] || `Enter ${label.toLowerCase()}`}
                                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                />
                                            )}
                                        </div>
                                    ))}

                                </div>

                                {/* Bank Details */}
                                <div className='w-full mb-15 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                                    <div className=' h-full flex justify-center items-center text-center'>
                                        <h3 className="text-xl self-center font-semibold text-gray-700 ">
                                            Bank Details
                                        </h3>
                                    </div>


                                </div>
                                <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                                    {bankDetails.map(({ label, key, type, colSpan = 1, options }) => (
                                        <div key={key} className={`col-span-${colSpan} text-gray-600`}>
                                            <label className="block text-gray-600 mb-2 text-sm sm:text-base font-medium">
                                                {label}
                                            </label>

                                            {type === 'select' ? (
                                                <select
                                                    value={formData[key] || student?.[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                >
                                                    {options?.map((option, idx) => (
                                                        <option key={idx} value={option.val}>
                                                            {option.val}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={type}
                                                    value={
                                                        type === 'date'
                                                            ? formData[key] || student?.[key] || ''
                                                            : formData[key] || ''
                                                    }
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    placeholder={type === 'date' ? '' : student?.[key] || `Enter ${label.toLowerCase()}`}
                                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                />
                                            )}
                                        </div>
                                    ))}

                                </div>

                                {/* Declaration */}
                                <div className="col-span-4 flex items-center gap-2 mt-4">
                                    <input type="checkbox" name="declarationAgreed" onChange={handleInputChange} />
                                    <label htmlFor="declarationAgreed" className="text-sm">I hereby declare that the above information is true to the best of my knowledge.</label>
                                </div>


                                <div className='mt-10 text-lg p-5 font-semibold bg-gray-500 w-full text-center text-white rounded-md'>

                                    <button
                                        onClick={(e) => handleSubmit(e)}>
                                        Submit
                                    </button>

                                </div>
                            </section>

                        </form >

                    </div>

                </div>

            </div >

        </div>
    )
}

export default AddNewFaculty1

