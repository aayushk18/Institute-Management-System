import Button from '@mui/material/Button';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';



const AddNewFaculty = () => {


    const navigate = useNavigate()





    const [form, setForm] = useState({
        StudentClass: '',
        firstName: '',
        midName: '',
        lastName: '',
        gender: '',
        dob: '',
        nationality: '',
        category: '',
        subCategory: '',
        quota: '',
        motherTongue: '',
        religion: '',
        email: '',
        phone: '',
        altphone: ''
    });
    const personalDetails = [
        { label: 'First Name', key: 'firstName', type: 'text' },
        { label: 'Middle Name', key: 'midName', type: 'text' },
        { label: 'Last Name', key: 'lastName', type: 'text' },
        { label: 'Date of birth', key: 'dob', type: 'date' },
        { label: 'Gender', key: 'gender', type: 'select', optons: [{ val: "Select" }, { val: "Male" }, { val: "Female" }, { val: "Other" }] },
        { label: 'Email', key: 'email', type: 'email' },
        { label: 'Phone no', key: 'phone', type: 'text' },
        { label: 'Alternative Phone no', key: 'altphone', type: 'text' },
    ];


    const schoolJobs = [

        {
            branch: "Academic Staff",
            roles: [
                { name: "Primary School Teacher", sub_roles: ["English", "Hindi", "Maths", "EVS", "GK"] },
                { name: "Secondary School Teacher", sub_roles: ["English", "Hindi", "Mathematics", "Science", "SST"] },
                { name: "Intermediate Art/ Humanities Teacher", sub_roles: ["English", "Mathematics", "History", "Geography", "Political Science", "Sociology", "Psychology", "Economics", "Philosophy"] },
                { name: "Intermediate Commerce Teacher", sub_roles: ["English", "Accountancy", "Business Studies", "Economics", "Mathematics"] },
                { name: "Intermediate Science Teacher", sub_roles: ["English", "Mathematics", "Physics", "Chemistry", "Biology", "IT (C++)", "IT (Python)", "IT (Java)"] },
                { name: "Special Education Teacher" },
                { name: "Physical Education (PE) Teacher" },
                { name: "Art/Music/Dance Teacher", sub_roles: ["Art", "Music", "Dance"] },
                { name: "Language Teacher", sub_roles: ["French", "Spanish", "German"] },
                { name: "Computer Science/ICT Teacher" },
                { name: "Substitute Teacher" },
                { name: "Teaching Assistant / Paraprofessional" }
            ]
        },

        {
            branch: "Administrative Staff",
            roles: [
                { name: "Principal / Headmaster" },
                { name: "Vice Principal / Assistant Principal" },
                { name: "School Administrator" },
                { name: "Academic Coordinator" },
                { name: "Admissions Officer" },
                { name: "Registrar" },
                { name: "Front Desk Receptionist" },
                { name: "Office Assistant / Clerk" },
                { name: "HR Officer" },
                { name: "School Counselor / Guidance Counselor" }
            ]
        },
        {
            branch: "Support & Maintenance Staff",
            roles: [
                { name: "Librarian" },
                { name: "IT Technician / Network Administrator" },
                { name: "Janitor / Custodian" },
                { name: "Security Guard" },
                { name: "Bus Driver" },
                { name: "Bus Attendant" },
                { name: "Maintenance Worker" },
                { name: "Lab Technician" },
                { name: "Groundskeeper" }
            ]
        },
        {
            branch: "Food Service Staff",
            roles: [
                { name: "Cafeteria Manager" },
                { name: "Cook / Chef" },
                { name: "Kitchen Helper / Food Server" },
                { name: "Nutritionist" }
            ]
        },
        {
            branch: "Student Support Services",
            roles: [
                { name: "School Psychologist" },
                { name: "Social Worker" },
                { name: "Speech Therapist" },
                { name: "Occupational Therapist" },
                { name: "Nurse / Health Aide" },
                { name: "Career Counselor" }
            ]
        },
        {
            branch: "Finance & Procurement",
            roles: [
                { name: "Accountant / Bursar" },
                { name: "Procurement Officer" },
                { name: "Fee Collection Clerk" }
            ]
        }
    ];





    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedSubRole, setSelectedSubRole] = useState("");

    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');


    const handleBranchChange = (e) => {
        setSelectedBranch(e.target.value);
        setSelectedRole("");
        setSelectedSubRole("");
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
        setSelectedSubRole("");
    };

    const currentBranch = schoolJobs.find(b => b.branch === selectedBranch);
    const currentRole = currentBranch?.roles.find(r => r.name === selectedRole);








    const validateForm = (e) => {

        // console.log(form.firstName.trim());

        if (!form.firstName.trim()) return toast.error('First Name is required');
        if (!form.gender.trim()) return toast.error('First Name is required');
        if (!form.dob.trim()) return toast.error('First Name is required');
        if (!form.nationality.trim()) return toast.error('First Name is required');
        if (!form.category.trim()) return toast.error('First Name is required');
        if (!form.religion.trim()) return toast.error('First Name is required');
        if (!form.motherTongue.trim()) return toast.error('First Name is required');
        if (!form.email.trim()) return toast.error('First Name is required');
        if (!form.phone.trim()) return toast.error('First Name is required');
        if (!form.altphone.trim()) return toast.error('First Name is required');

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        navigate(`/admin/faculties/edit-staff-1`, { state: { pass: form } })


        const success = validateForm()
        if (success == true) {
            // const set = await setRegistrationForm(form)


            // if (set == true) {
            //     updateRegistrations(form)
            //     navigate(`/admin/admissions/registration-form/page-1/${form.firstName}-${form.StudentClass}-${form.phone}`, { state: { pass: form } })

            // }
        }


    }


    return (
        <div>
            <div className="w-full bg-gray-100 flex flex-col    p-4 sm:p-6 md:p-10">
                <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                    New Staff Registration
                </h2>

                <form
                    // onSubmit={handleSubmit} 
                    className="bg-white w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg ">
                    {/* Personal Details */}
                    <section className="mb-8">
                        {/* <h3 className="text-md text-center sm:text-lg font-semibold text-gray-700 mb-6">Student's Details</h3> */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 my-10 lg:grid-cols-4 gap-4 sm:gap-6">


                            {/* <div>
                            <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">ID Proof</label>
                            <select
                                value={form.lastClass}
                                // onChange={(e) => setForm({ ...form, lastClass: e.target.value })}
                                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                            >
                                <option value="">Select Document</option>

                                <option  >Aadhar Card</option>
                                <option  >Birth Certificate</option>
                                <option  >Other Document</option>


                            </select>
                        </div> */}

                            {/* {docProofStudent.map(({ label, key, type, colSpan = 1 }) => (
                        <div key={key} className={`col-span-${colSpan}`}>
                            <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">{label}</label>
                            <input
                                type="file"
                                accept="image/*,application/pdf"

                                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                            />
                            {filePreviews[key] && (
                                <div className="mt-2">
                                    {form[key]?.type.includes('image') ? (
                                        <img
                                            src={filePreviews[key]}
                                            alt={`${label} Preview`}
                                            className="max-w-full h-auto rounded-md shadow-sm"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-600">PDF uploaded: {form[key]?.name}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))} */}







                            {personalDetails.map(({ label, key, type, colSpan = 1, optons }) => (
                                <div key={key} className={`col-span-${colSpan}`}>
                                    <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">
                                        {label}
                                    </label>

                                    {type === 'select' ? (
                                        <select
                                            value={form[key] || ''}
                                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                        >
                                            {optons?.map((option, idx) => (
                                                <option key={idx} value={option.val}>
                                                    {option.val}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={type}
                                            value={form[key] || ''}
                                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                            placeholder={`Enter ${label.toLowerCase()}`}
                                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                        />
                                    )}
                                </div>
                            ))}




                            <div className='' >
                                <label className="block mb-2">Branch</label>
                                <select
                                    value={selectedBranch}
                                    onChange={handleBranchChange}
                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                >
                                    <option value="">Select a branch</option>
                                    {schoolJobs.map((b, i) => (
                                        <option key={i} value={b.branch}>{b.branch}</option>
                                    ))}
                                </select>
                            </div>

                            {selectedBranch && (
                                <div>
                                    <label className="block mb-2">Role</label>
                                    <select
                                        value={selectedRole}
                                        onChange={handleRoleChange}
                                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                    >
                                        <option value="">Select a role</option>
                                        {currentBranch?.roles.map((r, i) => (
                                            <option key={i} value={r.name}>{r.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}


                            {selectedRole && currentRole?.sub_roles && (
                                <div>
                                    <label className="block mb-2">Sub Role</label>
                                    <select
                                        value={selectedSubRole}
                                        onChange={(e) => setSelectedSubRole(e.target.value)}
                                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                    >
                                        <option value="">Select a sub-role</option>
                                        {currentRole.sub_roles.map((sub, i) => (
                                            <option key={i} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                </div>
                            )}


                            {/* <div className="col-span-2 row-span-2 border p-4 rounded-md shadow-md overflow-y-auto max-h-60">
                                <h3 className="font-semibold mb-2">Subjects</h3>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Add Subject"
                                        value={newSubject}
                                        onChange={(e) => setNewSubject(e.target.value)}
                                        className="input flex-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (newSubject.trim()) {
                                                setSubjects([...subjects, newSubject.trim()]);
                                                setNewSubject('');
                                            }
                                        }}
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
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
                            </div> */}





                            {/* {personalDetails.map(({ label, key, type, colSpan = 1 }) => (
                        <div key={key} className={`col-span-${colSpan}`}>
                            <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">{label}</label>
                            <input



                                type={type}
                                value={form[key] || ''}
                                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                placeholder={`Enter ${label.toLowerCase()}`}
                                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"

                            />
                        </div>


                    ))} */}



                            {/* 
                    <div>
                        <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">Class</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSelectedClass(value);
                                setForm({ ...form, StudentClass: value, section: '' });
                                setSelectedSection('');
                            }}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                        >
                            <option value="">Select class</option>
                            {classSections.map(({ class: cls }) => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                    </div> */}
                            {/* {selectedClass && (
                        <div>
                            <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">Section</label>
                            <select
                                value={selectedSection}
                                onChange={(e) => {
                                    setSelectedSection(e.target.value);
                                    setForm({ ...form, section: e.target.value });
                                }}
                                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                            >
                                <option value="">Select section</option>
                                {classObj?.subclasses.map(({ section }) => (
                                    <option key={section} value={section}>{section}</option>
                                ))}
                            </select>
                        </div>
                    )} */}
                        </div>

                        <div className=' w-full '>

                            <button className='text-white p-5 w-full font-semibold bg-gray-500  rounded-md '
                                onClick={(e) => handleSubmit(e)}
                            // to='/admin/faculties/edit-staff-1'
                            >
                                Register
                            </button>
                        </div>



                    </section>

                </form >

            </div>



        </div >
    )
}

export default AddNewFaculty