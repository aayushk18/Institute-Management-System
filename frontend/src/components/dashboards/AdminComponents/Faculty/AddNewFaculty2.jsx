import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../../utils/axios'
import toast from 'react-hot-toast'

const AddNewFaculty2 = () => {

    // GENERAL  STAFF
    const navigate = useNavigate()

    // formFields.js
    const student = []

    const personalDetails = [
        // 1. Personal Details
        { label: "First Name", key: "firstName", type: "text", colSpan: 1 },
        { label: "Middle Name", key: "midName", type: "text", colSpan: 1 },
        { label: "Last Name", key: "lastName", type: "text", colSpan: 1 },
        { label: "Gender", key: "gender", type: "select", options: [{ val: "Select" }, { val: "Male" }, { val: "Female" }, { val: "Other" }], colSpan: 1 },
        { label: "Date of Birth", key: "dob", type: "date", colSpan: 1 },
        { label: "Nationality", key: "nationality", type: "text", colSpan: 1 },
        { label: "Marital Status", key: "maritalStatus", type: "select", options: [{ val: "Select" }, { val: "Single" }, { val: "Married" }, { val: "Divorced" }, { val: "Widowed" }], colSpan: 1 },
        { label: "Blood Group", key: "bloodGroup", type: "text", colSpan: 1 },
        { label: "Photo ", key: "photo", type: "text", colSpan: 2 },
        { label: "Signature ", key: "signature", type: "text", colSpan: 2 },
    ]

    const qualifications = [
        { label: "Highest Qualification", key: "highestQualification", type: "text", colSpan: 1 },
        { label: "Specialization", key: "specialization", type: "text", colSpan: 1 },
        { label: "Other Certifications", key: "otherCertifications", type: "text", colSpan: 2 },
        { label: "Years of Experience", key: "yearsOfExperience", type: "number", colSpan: 1 },
        { label: "Subject Expertise", key: "subjectExpertise", type: "text", colSpan: 2 },
    ]
    const contactInfo = [
        { label: "Mobile", key: "phone", type: "text", colSpan: 1 },
        { label: "Alternate Phone", key: "altPhone", type: "text", colSpan: 1 },
        { label: "Email", key: "email", type: "email", colSpan: 1 },
        { label: "Present Address", key: "presentAddress", type: "text", colSpan: 2 },
        { label: "Permanent Address", key: "permanentAddress", type: "text", colSpan: 2 },
    ]

    const employmentDetails = [
        // 3. Employment Details
        { label: "Staff Type", key: "staffType", type: "text", colSpan: 1 },
        { label: "Department", key: "department", type: "text", colSpan: 1 },
        { label: "Designation", key: "designation", type: "text", colSpan: 1 },
        { label: "Date of Joining", key: "dateOfJoining", type: "date", colSpan: 1 },
        { label: "Employee ID", key: "employeeId", type: "text", colSpan: 1 },
        { label: "Employment Type", key: "employmentType", type: "select", options: [{ val: "Select" }, { val: "Permanent" }, { val: "Contract" }, { val: "Outsourced" }], colSpan: 1 },
        { label: "Reporting Authority", key: "reportingAuthority", type: "text", colSpan: 2 },
        { label: "Basic Salary", key: "salaryDetails_basic", type: "number", colSpan: 1 },
        { label: "HRA", key: "salaryDetails_hra", type: "number", colSpan: 1 },
        { label: "Allowances", key: "salaryDetails_allowances", type: "number", colSpan: 1 },
    ]

    const systemAccess = [
        // 5. Login & System Access
        { label: "Username", key: "username", type: "text", colSpan: 1 },
        { label: "Password", key: "password", type: "password", colSpan: 1 },
        { label: "Role", key: "role", type: "select", options: [{ val: "Select" }, { val: "Staff" }, { val: "Admin" }], colSpan: 1 },
        { label: "Access Permissions (comma-separated)", key: "accessPermissions", type: "text", colSpan: 2 },
    ]
    const documentUploads = [
        // 6. Document Uploads
        { label: "Resume ", key: "documents_resume", type: "text", colSpan: 2 },
        { label: "ID Proof  ", key: "documents_idProof", type: "text", colSpan: 2 },
        { label: "Qualification Certificates ", key: "documents_qualificationCertificates", type: "text", colSpan: 2 },
        { label: "Experience Letters ", key: "documents_experienceLetters", type: "text", colSpan: 2 },
        { label: "Police Verification ", key: "documents_policeVerification", type: "text", colSpan: 2 },
    ];
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

    const getFacultyFormData = async () => {
        const data = {
            id: faculty.id
        }

        const response = await axiosInstance.post('/user/admin/faculty/general-staff-form', data)
        const Data = response.data;
        console.log(Data.data);

        Data.data.dob = Data.data.dob.split('T')[0]
        setFormData(Data.data)

        if (Data.data.workHistory) {
            setPreviousInstitutions(Data.data?.workHistory)

        }

        console.log(formData);

    }

    useEffect(() => {

        getFacultyFormData()

    }, [])



    const [formData, setFormData] = useState({
        firstName: '',
        midName: '',
        lastName: '',
        gender: '',
        dob: '',
        nationality: '',
        maritalStatus: '',
        bloodGroup: '',
        phone: '',
        altPhone: '',
        email: '',
        presentAddress: '',
        permanentAddress: ''
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

    const location = useLocation();
    const state = location.state;
    const faculty = state?.pass;


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullData = {
            ...formData,
            workHistory: previousInstitutions,
            subjects,
            assignedClasses: selectedClasses,
            userType: "staff"
        };
        console.log('Submitted Data:', fullData);
        const Data = {
            id: faculty.id,
            updateData: fullData
        }


        const response = await axiosInstance.post('/user/admin/faculty/update-general-staff-form', Data);
        const data = response.data;
        console.log(data);

        if (data.success == true) {
            toast.success('Academic Staff Details Updated')
            navigate('/admin/faculties/all-staff')
        }
    };




    return (
        <div>

            <div>

                <div className="w-full bg-gray-100 flex flex-col    p-4 sm:p-6 md:p-10">
                    <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                        General Staff Details
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        // onSubmit={(e) => handleSubmit(e)}
                        className="bg-white w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg ">

                        <section className="mb-8">
                            {/* Personal Details */}
                            <div className='w-full mb-15 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                                <div className=' h-full flex justify-center items-center text-center'>
                                    <h3 className="text-xl self-center font-semibold text-gray-700 ">
                                        Personal Details
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
                                <div className="col-span-3 row-span-2 border p-4 rounded-md shadow-md overflow-y-auto max-h-60">
                                    <h3 className="font-semibold mb-2">Previous Work Experiences</h3>
                                    <div className="flex flex-col md:flex-row gap-2 mb-2">
                                        <input name="name" placeholder="Organisation Name" value={newInstitution.name} onChange={handleInstitutionChange} className="input flex-1" />
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

                                {documentUploads.map(({ label, key, type, colSpan = 1, options }) => (
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

            </div >

        </div>
    )
}

export default AddNewFaculty2