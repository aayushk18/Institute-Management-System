import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import CropMotherImage from '../../utils/imgConfig/CropMotherImage';
import CropFatherImage from '../../utils/imgConfig/CropFatherImage';
import CropGuardianImage from '../../utils/imgConfig/CropGuardianImage';

const NewRegistration2 = () => {


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
    const parentsDetails1 = [
        { label: "Father's First Name", key: 'fatherFirstName', type: 'text' },
        { label: "Father's Middle Name", key: 'fatherMidName', type: 'text' },
        { label: "Father's Last Name", key: 'fatherLastName', type: 'text' },
        { label: "Father's Phone no", key: 'fatherPhone', type: 'text' },
        { label: "Father's Email", key: 'fatherEmail', type: 'text' },
        { label: "Father's Occupation", key: 'fatherOccupation', type: 'text' },
        { label: "Father's Office Address", key: 'fatherOfficeAddress', type: 'text', colSpan: 2 },
        { label: "Father's Edu. Qualification", key: 'fatherQualification', type: 'text' },
        { label: "Father's College Name", key: 'fatherCollegeName', type: 'text' },
        { label: "Father's College Address", key: 'fatherCollegeAddress', type: 'text', colSpan: 2 },
        { label: "Year of Graduation", key: 'fatherGraduationYear', type: 'text' },
        { label: "Graduation Certificate", key: 'fatherGraduationCertificate', type: 'file' },
    ];

    const parentsDetails2 = [
        { label: "Mother's First Name", key: 'motherFirstName', type: 'text' },
        { label: "Mother's Middle Name", key: 'motherMidName', type: 'text' },
        { label: "Mother's Last Name", key: 'motherLastName', type: 'text' },
        { label: "Mother's Phone no", key: 'motherPhone', type: 'text' },
        { label: "Mother's Email", key: 'motherEmail', type: 'text' },
        { label: "Mother's Occupation", key: 'motherOccupation', type: 'text' },
        { label: "Mother's Office Address", key: 'motherOfficeAddress', type: 'text', colSpan: 2 },
        { label: "Mother's Qualification", key: 'motherQualification', type: 'text' },
        { label: "Mother's College Name", key: 'motherCollegeName', type: 'text' },
        { label: "Mother's College Address", key: 'motherCollegeAddress', type: 'text', colSpan: 2 },
        { label: "Year of Graduation", key: 'motherGraduationYear', type: 'text' },
        { label: "Graduation Certificate", key: 'motherGraduationCertificate', type: 'file' },
    ];

    const parentsDetails3 = [
        { label: "Guardian's First Name", key: 'guardianFirstName', type: 'text' },
        { label: "Guardian's Middle Name", key: 'guardianMidName', type: 'text' },
        { label: "Guardian's Last Name", key: 'guardianLastName', type: 'text' },
        { label: "Guardian's Phone no", key: 'guardianPhone', type: 'text' },
        { label: "Guardian's Email", key: 'guardianEmail', type: 'text' },
        { label: "Guardian's Relation", key: 'guardianRelation', type: 'text' },
        { label: "Guardian's Occupation", key: 'guardianOccupation', type: 'text' },
        { label: "Guardian's Office Address", key: 'guardianOfficeAddress', type: 'text', colSpan: 2 },
        { label: "Guardian's Qualification", key: 'guardianQualification', type: 'text' },
        { label: "Guardian's College Name", key: 'guardianCollegeName', type: 'text' },
        { label: "Guardian's College Address", key: 'guardianCollegeAddress', type: 'text', colSpan: 2 },
        { label: "Year of Graduation", key: 'guardianGraduationYear', type: 'text' },
        { label: "Graduation Certificate", key: 'guardianGraduationCertificate', type: 'file' },
    ];

    const handleFileChangeFather = (key) => (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ ...form, [key]: file });
            setFilePreviews({ ...filePreviews, [key]: URL.createObjectURL(file) });
        }

    };
    const handleFileChangeMother = (key) => (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ ...form, [key]: file });
            setFilePreviews({ ...filePreviews, [key]: URL.createObjectURL(file) });
        }

    };
    const handleFileChangeGuardian = (key) => (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ ...form, [key]: file });
            setFilePreviews({ ...filePreviews, [key]: URL.createObjectURL(file) });
        }

    };

    const [filePreviews, setFilePreviews] = useState({});



    const handleImageChangeFather = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImageFather(imageUrl);
        }
    };
    const handleImageChangeMother = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImageMother(imageUrl);
        }
    };

    const [selectedImageFather, setSelectedImageFather] = useState(null);
    const [selectedImageMother, setSelectedImageMother] = useState(null);
    const [selectedImageGuardian, setSelectedImageGuardian] = useState(null);
    const handleImageChangeGuardian = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImageGuardian(imageUrl);
        }
    };

    const handleSubmit = (e) => {

        e.preventDefault();
    }

    return (
        <div>

            <div className="w-full bg-gray-100 flex flex-col    p-4 sm:p-6 md:p-10">
                <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                    Student Registration Form
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg ">
                    {/* Parents Details */}
                    <section className="mb-8">
                        <div className="space-y-8">

                            <div>
                                <h3 className="text-md text-center sm:text-lg font-semibold text-gray-700 mb-6">Father's Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">




                                    {/* {docProofFather.map(({ label, key, type, colSpan = 1 }) => (
    //                                 <div key={key} className={`col-span-${colSpan}`}>
    //                                     <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">{label}</label>
    //                                     <input
    //                                         type="file"
    //                                         accept="image/*,application/pdf"

    //                                         className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
    //                                     />
    //                                     {filePreviews[key] && (
    //                                         <div className="mt-2">
    //                                             {form[key]?.type.includes('image') ? (
    //                                                 <img
    //                                                     src={filePreviews[key]}
    //                                                     alt={`${label} Preview`}
    //                                                     className="max-w-full h-auto rounded-md shadow-sm"
    //                                                 />
    //                                             ) : (
    //                                                 <p className="text-sm text-gray-600">PDF uploaded: {form[key]?.name}</p>
    //                                             )}
    //                                         </div>
    //                                     )}
    //                                 </div>
    //                             ))} */}
                                    <div className=" items-center justify-center col-span-1 row-span-3  bg-gray-100">
                                        <div className="bg-white flex flex-col justify-between p-2 px-4 h-full  rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200  w-full">

                                            <div className='p-1'>
                                                <CropFatherImage />
                                            </div>
                                        </div>
                                    </div>


                                    {parentsDetails1.map(({ label, key, type, colSpan = 1 }) => (
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
                            </div>
                            <div>
                                <h3 className="text-md text-center sm:text-lg font-semibold text-gray-700 mb-6">Mother's Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                    {/* {docProofMother.map(({ label, key, type, colSpan = 1 }) => (
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

                                    <div className=" items-center justify-center col-span-1 row-span-3  bg-gray-100">
                                        <div className="bg-white flex flex-col justify-between p-2 px-4 h-full  rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200  w-full">

                                            <div className='p-1'>
                                                <CropMotherImage />
                                            </div>
                                        </div>
                                    </div>


                                    {parentsDetails2.map(({ label, key, type, colSpan = 1, rowSpan = 1 }) => (
                                        <div key={key} className={`col-span-${colSpan}`}>
                                            <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">{label}</label>
                                            {type === 'file' ? (
                                                <div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChangeMother(key)}
                                                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                    />
                                                    {filePreviews[key] && (
                                                        <img
                                                            src={filePreviews[key]}
                                                            alt={`${label} Preview`}
                                                            className="mt-2 max-w-full h-auto rounded-md shadow-sm"
                                                        />
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
                            </div>
                            <div>
                                <h3 className="text-md text-center sm:text-lg font-semibold text-gray-700 mb-6">Guardian's Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">


                                    {/* {docProofGuardian.map(({ label, key, type, colSpan = 1 }) => (
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
                                    <div className=" items-center justify-center col-span-1 row-span-3  bg-gray-100">
                                        <div className="bg-white flex flex-col justify-between p-2 px-4 h-full  rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200  w-full">

                                            <div className='p-1'>
                                                <CropGuardianImage />
                                            </div>
                                        </div>
                                    </div>



                                    {parentsDetails3.map(({ label, key, type, colSpan = 1, rowSpan = 1 }) => (
                                        <div key={key} className={`col-span-${colSpan}`}>

                                            <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">{label}</label>
                                            {type === 'file' ? (
                                                <div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChangeGuardian(key)}
                                                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                                    />
                                                    {filePreviews[key] && (
                                                        <img
                                                            src={filePreviews[key]}
                                                            alt={`${label} Preview`}
                                                            className="mt-2 max-w-full h-auto rounded-md shadow-sm"
                                                        />
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
                            </div>
                        </div>

                        <div className='flex flex-row'>
                            <div className='m-5 p-5 bg-gray-500 w-fit text-white rounded-2xl'>

                                <NavLink to='/admin/admissions/registration-form/page-1'>
                                    Back
                                </NavLink>

                            </div>

                            <div className='m-5 p-5 bg-gray-500 w-fit text-white rounded-2xl'>


                                <NavLink to='/admin/admissions/registration-form/page-3'>
                                    Submit & Next
                                </NavLink>
                            </div>

                        </div>
                    </section>

                </form >

            </div>

        </div>
    )
}

export default NewRegistration2