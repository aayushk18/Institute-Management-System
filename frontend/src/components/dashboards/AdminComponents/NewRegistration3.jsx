import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const NewRegistration3 = () => {

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

    const classSections = Array.from({ length: 15 }, (_, i) => {
        const cls = i < 3 ? ['Nursery', 'LKG', 'UKG'][i] : (i - 2).toString();
        return {
            class: cls,
            subclasses: 'ABCDEFG'.split('').map(section => ({ section })),
        };
    });

    const residentialDetails = [
        { label: 'Current Address', key: 'currentAddress', type: 'text', colSpan: 2 },
        { label: 'Permanent Address', key: 'permanentAddress', type: 'text', colSpan: 2 },
        { label: 'Hometown', key: 'hometown', type: 'text', colSpan: 2 },
    ];

    const previousSchoolRecord = [
        { label: 'Previous School Name', key: 'previousSchoolName', type: 'text' },
        { label: 'School Location', key: 'previousSchoolLocation', type: 'text' },
        { label: 'Year of Leaving', key: 'previousSchoolLeavingYear', type: 'text' },
        { label: 'Last Class Marksheet', key: 'previousSchoolLastClassMarksheet', type: 'file' },
        { label: 'Transfer Certificate', key: 'previousSchoolTransferCertificate', type: 'file' }

    ];
    const [filePreviews, setFilePreviews] = useState({});



    return (

        <div>
            <div className="w-full bg-gray-100 flex flex-col    p-4 sm:p-6 md:p-10">
                <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                    Student Registration Form
                </h2>

                <form
                    // onSubmit={handleSubmit} 
                    className="bg-white w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg ">



                    {/* Residential Details */}
                    <section className="mb-8">
                        <h3 className="text-md text-center sm:text-lg font-semibold text-gray-700 mb-6">Residential Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {residentialDetails.map(({ label, key, type, colSpan = 1 }) => (
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
                            ))}
                        </div>


                        {/* Previous School Details */}
                        <section className="mb-8">
                            <h3 className="text-md text-center sm:text-lg font-semibold text-gray-700 mb-6">Previous School Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                                <div>
                                    <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">Last Class</label>
                                    <select
                                        value={form.previousSchoolLastClass}
                                        onChange={(e) => setForm({ ...form, previousSchoolLastClass: e.target.value })}
                                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                    >
                                        <option value="">Select class</option>
                                        {classSections.map(({ class: cls }) => (
                                            <option key={cls} value={cls}>{cls}</option>
                                        ))}
                                    </select>
                                </div>
                                {previousSchoolRecord.map(({ label, key, type, colSpan = 1 }) => (
                                    <div key={key} className={`col-span-${colSpan}`}>
                                        <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">{label}</label>
                                        {type === 'file' ? (
                                            <div>
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

                            </div>

                            <div className='flex flex-row'>
                                <div className='m-5 p-5 bg-gray-500 w-fit text-white rounded-2xl'>

                                    <NavLink to='/admin/admissions/registration-form/page-2'>
                                        Back
                                    </NavLink>

                                </div>

                                <div className='m-5 p-5 bg-gray-500 w-fit text-white rounded-2xl'>


                                    <NavLink to='/admin/admissions/'>
                                        Submit
                                    </NavLink>
                                </div>

                            </div>

                        </section>


                    </section>

                </form>


            </div>
        </div>



    )
}

export default NewRegistration3