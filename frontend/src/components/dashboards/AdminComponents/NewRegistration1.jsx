import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import CropProfileImage from '../../utils/imgConfig/CropProfileImage';
import { useAdminStore } from '../../utils/useAuthStore';
import toast from 'react-hot-toast';


const NewRegistration1 = () => {

    const { setStudentpic, updateRegistrationForm1 } = useAdminStore()


    const [studentsData, setstudentsData] = useState([]);
    const location = useLocation();
    const state = location.state;
    const stu = state?.pass;

    const student = stu

    const navigate = useNavigate()




    console.log(student);




    const classSections = Array.from({ length: 15 }, (_, i) => {
        const cls = i < 3 ? ['Nursery', 'LKG', 'UKG'][i] : (i - 2).toString();
        return {
            class: cls,
            subclasses: 'ABCDEFG'.split('').map(section => ({ section })),
        };
    });
    const [selectedClass, setSelectedClass] = useState('');


    const [selectedSection, setSelectedSection] = useState('');

    const formData = new FormData()

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
        altphone: '',
        bloodGroup: '',

        fatherFirstName: '',
        fatherMidName: '',
        fatherLastName: '',
        fatherPhone: '',
        fatherEmail: '',
        fatherOccupation: '',
        fatherOfficeAddress: '',
        fatherQualification: '',
        fatherCollegeName: '',
        fatherCollegeAddress: '',
        fatherGraduationYear: '',
        // fatherGraduationCertificate: '',

        motherFirstName: '',
        motherMidName: '',
        motherLastName: '',
        motherPhone: '',
        motherEmail: '',
        motherOccupation: '',
        motherOfficeAddress: '',
        motherQualification: '',
        motherCollegeName: '',
        motherCollegeAddress: '',
        motherGraduationYear: '',
        // motherGraduationCertificate: '',

        guardianFirstName: '',
        guardianMidName: '',
        guardianLastName: '',
        guardianPhone: '',
        guardianEmail: '',
        guardianRelation: '',
        guardianOccupation: '',
        guardianOfficeAddress: '',
        guardianQualification: '',
        guardianCollegeName: '',
        guardianCollegeAddress: '',
        guardianGraduationYear: '',
        // guardianGraduationCertificate: '',

        currentAddress: '',
        permanentAddress: '',
        hometown: '',

        previousSchoolLastClass: '',
        previousSchoolName: '',
        previousSchoolLocation: '',
        previousSchoolLeavingYear: '',
        // previousSchoolLastClassMarksheet: '',
        // previousSchoolTransferCertificate: '',

        // ID proof
    });
    const personalDetails = [
        { label: 'First Name', key: 'firstName', type: 'text' },
        { label: 'Middle Name', key: 'midName', type: 'text' },
        { label: 'Last Name', key: 'lastName', type: 'text' },
        { label: 'Gender', key: 'gender', type: 'select', optons: [{ val: "Select" }, { val: "Male" }, { val: "Female" }, { val: "Other" }] },
        { label: 'Date of birth', key: 'dob', type: 'date' },
        { label: 'Nationality', key: 'nationality', type: 'select', optons: [{ val: "Select" }, { val: "Indian" }, { val: "NRI" }, { val: "Other" }] },
        { label: 'Category', key: 'category', type: 'select', optons: [{ val: "Select" }, { val: "General" }, { val: "OBC" }, { val: "SC" }, { val: "ST" }] },
        { label: 'Sub-category', key: 'subCategory', type: 'select', optons: [{ val: "Select" }, { val: "None" }, { val: "PWD" }, { val: "EWS" }, { val: "PWD + EWS" }] },
        { label: 'Qouta', key: 'quota', type: 'select', optons: [{ val: "Select" }, { val: "None" }, { val: "Defence" }, { val: "Sports" }, { val: "Freedom Fighter" }, { val: "Kashmiri Migrant" }, { val: "Minority" }] },
        { label: 'Religion', key: 'religion', type: 'text' },
        { label: 'Mother Tongue', key: 'motherTongue', type: 'text' },
        { label: 'Email', key: 'email', type: 'email' },
        { label: 'Phone no', key: 'phone', type: 'text' },
        { label: 'Blood Group', key: 'bloodGroup', type: 'select', optons: [{ val: "Select" }, { val: "A+" }, { val: "A-" }, { val: "B+" }, { val: "B-" }, { val: "AB+" }, { val: "AB-" }, { val: "O+" }, { val: "O-" }] },

        // { label: 'Alternative Phone no', key: 'altphone', type: 'text' },
        // { label: 'Aadhar Card', key: 'aadhar', type: 'file' },



    ];
    const [selectedImageStudent, setSelectedImageStudent] = useState(null);

    const handleFileChangeStudent = (key) => (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ ...form, [key]: file });
            setFilePreviews({ ...filePreviews, [key]: URL.createObjectURL(file) });
        }

    };


    const handleImageChangeStudent = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImageStudent(imageUrl);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        // Filter non-empty values
        const updatedForm = Object.fromEntries(
            Object.entries(form).filter(([key, value]) => value !== '')
        );


        if (Object.keys(updatedForm).length === 0) {
            toast.success("No data to submit ");
            navigate(`/admin/admissions/registration-form/page-2/${student.firstName}-${student.StudentClass}-${student.phone}`, { state: { pass: student } })

        } else {

            updatedForm.checkStudentClass = student.StudentClass;
            updatedForm.checkphone = student.phone;
            updatedForm.checkfirstName = student.firstName;
            updatedForm.checkdob = student.dob;



            const success = await updateRegistrationForm1(updatedForm)
            console.log(updatedForm);

            if (success == true) {
                navigate(`/admin/admissions/registration-form/page-2/${student.firstName}-${student.StudentClass}-${student.phone}`, { state: { pass: student } })
                toast.success("Student Profile Updated Successfully ");

            }
            console.log("Filtered form with non-empty values:", updatedForm);
        }


    }






    return (
        <div>
            <div>
                <div className="w-full bg-gray-100 flex flex-col    p-4 sm:p-6 md:p-10">
                    <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                        Student Registration Form
                    </h2>

                    <form
                        // onSubmit={(e) => handleSubmit(e)}
                        className="bg-white w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg ">
                        {/* Personal Details */}
                        <section className="mb-8">

                            <div className='w-full mb-15 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                                <div className=' h-full flex justify-center items-center text-center'>
                                    <h3 className="text-xl self-center font-semibold text-gray-700 ">
                                        Student's Details
                                    </h3>
                                </div>


                                <div className=' flex flex-row gap-5'>

                                    <div>

                                        <select
                                            value={form.StudentClass || student?.StudentClass || ''}
                                            onChange={(e) => setForm({ ...form, StudentClass: e.target.value })}
                                            className="w-full p-2 text-gray-600 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                        >
                                            <option value="">Select class</option>
                                            {classSections.map(({ class: cls }) => (
                                                <option key={cls} value={cls}>
                                                    {cls}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            value={form.lastClass}
                                            // onChange={(e) => setForm({ ...form, lastClass: e.target.value })}
                                            className="w-full p-2 rounded-md border border-gray-300 text-gray-600 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                        >
                                            <option value="">Select Document</option>

                                            <option  >Aadhar Card</option>
                                            <option  >Birth Certificate</option>
                                            <option  >Other Document</option>


                                        </select>
                                    </div>
                                </div>


                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">






                                <div className=" items-center justify-center col-span-1  row-span-3  bg-gray-100">
                                    <div className="bg-white flex flex-col justify-between p-2 px-4 h-full  rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200  w-full">

                                        <h2 className="text-md font-bold mt-2  text-gray-600 text-center">Student's Image</h2>

                                        <div className='p-1'>
                                            <CropProfileImage student={student} />
                                        </div>





                                    </div>
                                </div>




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







                                {/* {personalDetails.map(({ label, key, type, colSpan = 1, optons }) => (
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
                                ))} */}


                                {personalDetails.map(({ label, key, type, colSpan = 1, optons }) => (
                                    <div key={key} className={`col-span-${colSpan} text-gray-600`}>
                                        <label className="block text-gray-600 mb-2 text-sm sm:text-base font-medium">
                                            {label}
                                        </label>

                                        {type === 'select' ? (
                                            <select
                                                value={form[key] || student?.[key] || ''}
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
                                                value={
                                                    type === 'date'
                                                        ? form[key] || student?.[key] || ''
                                                        : form[key] || ''
                                                }
                                                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                                placeholder={type === 'date' ? '' : student?.[key] || `Enter ${label.toLowerCase()}`}
                                                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                            />
                                        )}
                                    </div>
                                ))}




                                {/*  {personalDetails.map(({ label, key, type, colSpan = 1, optons }) => (
                                    <div key={key} className={`col-span-${colSpan}`}>
                                        <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">
                                            {label}
                                        </label>

                                        {type === 'select' ? (
                                            <select
                                                value={form[key] || stu?.[key] || ''}
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
                                                placeholder={stu?.[key] || `Enter ${label.toLowerCase()}`}
                                                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                            />
                                        )}
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

                            <div className='mt-10 text-lg p-5 font-semibold bg-gray-500 w-full text-center text-white rounded-md'>


                                <button
                                    onClick={(e) => handleSubmit(e)}>
                                    Submit & Next
                                </button>


                            </div>
                        </section>

                    </form >

                </div>



            </div>
        </div >
    )
}

export default NewRegistration1