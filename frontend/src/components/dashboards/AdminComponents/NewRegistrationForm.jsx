import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const NewRegistrationForm = () => {



    const classSections = Array.from({ length: 15 }, (_, i) => {
        const cls = i < 3 ? ['Nursery', 'LKG', 'UKG'][i] : (i - 2).toString();
        return {
            class: cls,
            subclasses: 'ABCDEFG'.split('').map(section => ({ section })),
        };
    });
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
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
        aadhar: null,

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
        fatherGraduationCertificate: null,

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
        motherGraduationCertificate: null,

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
        guardianGraduationCertificate: null,

        currentAddress: '',
        permanentAddress: '',
        hometown: '',

        previousSchoolLastClass: '',
        previousSchoolName: '',
        previousSchoolLocation: '',
        previousSchoolLeavingYear: '',
        previousSchoolLastClassMarksheet: null,
        previousSchoolTransferCertificate: null,

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
        { label: 'Sub-category', key: 'subCategory', type: 'select', optons: [{ val: "Select" }, { val: "PWD" }, { val: "EWS" }, { val: "PWD + EWS" }] },
        { label: 'Qouta', key: 'quota', type: 'select', optons: [{ val: "Select" }, { val: "Defence" }, { val: "Sports" }, { val: "Freedom Fighter" }, { val: "Kashmiri Migrant" }, { val: "Minority" }] },
        { label: 'Religion', key: 'religion', type: 'text' },
        { label: 'Mother Tongue', key: 'motherTongue', type: 'text' },
        { label: 'Email', key: 'email', type: 'email' },
        { label: 'Phone no', key: 'phone', type: 'text' },
        { label: 'Alternative Phone no', key: 'altphone', type: 'text' },
        // { label: 'Aadhar Card', key: 'aadhar', type: 'file' },



    ];
    return (
        <div>
            <div className="w-full bg-gray-100 flex flex-col    p-4 sm:p-6 md:p-10">
                <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                    Student Registration Form
                </h2>

                <form
                    // onSubmit={handleSubmit} 
                    className="bg-white w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg ">
                    {/* Personal Details */}
                    <section className="mb-8">
                        <h3 className="text-md text-center sm:text-lg font-semibold text-gray-700 mb-6">Student's Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">


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

                            <div>
                                <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">Class</label>
                                <select
                                    value={form.StudentClass}
                                    onChange={(e) => setForm({ ...form, StudentClass: e.target.value })}
                                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                >
                                    <option value="">Select class</option>
                                    {classSections.map(({ class: cls }) => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                                </select>
                            </div>


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

                        <div className='m-5 p-5 bg-gray-500 w-fit text-white rounded-2xl'>

                            <NavLink to='/admin/admissions/registration-form/page-1'>
                                Register
                            </NavLink>
                        </div>



                    </section>

                </form >

            </div>



        </div>
    )
}

export default NewRegistrationForm