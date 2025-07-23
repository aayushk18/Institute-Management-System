import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import CropMotherImage from '../../utils/imgConfig/CropMotherImage';
import CropFatherImage from '../../utils/imgConfig/CropFatherImage';
import CropGuardianImage from '../../utils/imgConfig/CropGuardianImage';
import { useAdminStore } from '../../utils/useAuthStore';
import toast from 'react-hot-toast';
import CropProfileImage from '../../utils/imgConfig/CropProfileImage';

const NewRegistration2 = () => {



    const { updateRegistrationForm2 } = useAdminStore()


    const location = useLocation();
    const state = location.state;
    const stu = state?.pass;

    const student = stu


    const navigate = useNavigate()




    console.log(student);


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
        // aadhar: null,

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
        // fatherGraduationCertificate: null,

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
        // motherGraduationCertificate: null,

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
        // guardianGraduationCertificate: null,

        currentAddress: '',
        permanentAddress: '',
        hometown: '',

        previousSchoolLastClass: '',
        previousSchoolName: '',
        previousSchoolLocation: '',
        previousSchoolLeavingYear: '',
        // previousSchoolLastClassMarksheet: null,
        // previousSchoolTransferCertificate: null,

        // ID proof
    });
    const parentsDetails1 = [
        { label: "Father's First Name", key: 'fatherFirstName', type: 'text' },
        { label: "Father's Middle Name", key: 'fatherMidName', type: 'text' },
        { label: "Father's Last Name", key: 'fatherLastName', type: 'text' },
        { label: "Father's Phone no", key: 'fatherPhone', type: 'text' },
        { label: "Father's Email", key: 'fatherEmail', type: 'text' },
        { label: "Father's Occupation", key: 'fatherOccupation', type: 'text' },
        //  { label: "Father's Office Address", key: 'fatherOfficeAddress', type: 'text', colSpan: 2 },
        { label: "Father's Edu. Qualification", key: 'fatherQualification', type: 'text' },
        // { label: "Father's College Name", key: 'fatherCollegeName', type: 'text' },
        // { label: "Father's College Address", key: 'fatherCollegeAddress', type: 'text', colSpan: 2 },
        // { label: "Year of Graduation", key: 'fatherGraduationYear', type: 'text' },
        // { label: "Graduation Certificate", key: 'fatherGraduationCertificate', type: 'file' },
    ];

    const parentsDetails2 = [
        { label: "Mother's First Name", key: 'motherFirstName', type: 'text' },
        { label: "Mother's Middle Name", key: 'motherMidName', type: 'text' },
        { label: "Mother's Last Name", key: 'motherLastName', type: 'text' },
        { label: "Mother's Phone no", key: 'motherPhone', type: 'text' },
        { label: "Mother's Email", key: 'motherEmail', type: 'text' },
        { label: "Mother's Occupation", key: 'motherOccupation', type: 'text' },
        // { label: "Mother's Office Address", key: 'motherOfficeAddress', type: 'text', colSpan: 2 },
        { label: "Mother's Qualification", key: 'motherQualification', type: 'text' },
        // { label: "Mother's College Name", key: 'motherCollegeName', type: 'text' },
        // { label: "Mother's College Address", key: 'motherCollegeAddress', type: 'text', colSpan: 2 },
        // { label: "Year of Graduation", key: 'motherGraduationYear', type: 'text' },
        // { label: "Graduation Certificate", key: 'motherGraduationCertificate', type: 'file' },
    ];

    const parentsDetails3 = [
        { label: "Guardian's First Name", key: 'guardianFirstName', type: 'text' },
        { label: "Guardian's Middle Name", key: 'guardianMidName', type: 'text' },
        { label: "Guardian's Last Name", key: 'guardianLastName', type: 'text' },
        { label: "Guardian's Phone no", key: 'guardianPhone', type: 'text' },
        { label: "Guardian's Email", key: 'guardianEmail', type: 'text' },
        { label: "Guardian's Relation", key: 'guardianRelation', type: 'text' },
        { label: "Guardian's Occupation", key: 'guardianOccupation', type: 'text' },
        // { label: "Guardian's Office Address", key: 'guardianOfficeAddress', type: 'text', colSpan: 2 },
        { label: "Guardian's Qualification", key: 'guardianQualification', type: 'text' },
        // { label: "Guardian's College Name", key: 'guardianCollegeName', type: 'text' },
        // { label: "Guardian's College Address", key: 'guardianCollegeAddress', type: 'text', colSpan: 2 },
        // { label: "Year of Graduation", key: 'guardianGraduationYear', type: 'text' },
        // { label: "Graduation Certificate", key: 'guardianGraduationCertificate', type: 'file' },
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedForm = Object.fromEntries(
            Object.entries(form).filter(([key, value]) => value !== '')
        );


        if (Object.keys(updatedForm).length === 0) {
            toast.success("No data to submit ");
            // navigate(`/admin/admissions/registration-form/page-3/${student.firstName}-${student.StudentClass}-${student.phone}`, { state: { pass: student } })

        } else {

            updatedForm.checkStudentClass = student.StudentClass;
            updatedForm.checkphone = student.phone;
            updatedForm.checkfirstName = student.firstName;
            updatedForm.checkdob = student.dob;



            const success = await updateRegistrationForm2(updatedForm)
            console.log(updatedForm);

            if (success == true) {
                navigate(`/admin/admissions/registration-form/page-3/${student.firstName}-${student.StudentClass}-${student.phone}`, { state: { pass: student } })
                toast.success("Student Profile Updated Successfully ");

            }
            console.log("Filtered form with non-empty values:", updatedForm);
        }

        navigate(`/admin/admissions/registration-form/page-3/${student.firstName}-${student.StudentClass}-${student.phone}`, { state: { pass: student } })
    }

    return (
        <div>

            <div className="w-full bg-gray-100 flex flex-col    p-4 sm:p-6 md:p-10">
                <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                    Student Registration Form
                </h2>

                <form
                    // onSubmit={(e) => handleSubmit(e)}
                    className="bg-white w-full p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg ">
                    {/* Parents Details */}
                    <section className="mb-8">
                        <div className="space-y-8">

                            <div className='my-5'>
                                <div className='w-full my-10 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                                    <div className=' h-full flex justify-center items-center text-center'>
                                        <h3 className="text-xl self-center font-semibold text-gray-700 ">
                                            Father's Details
                                        </h3>
                                    </div>
                                </div>
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

                                            <h2 className="text-md font-bold mt-2  text-gray-600 text-center">Father's Image</h2>

                                            <div className='p-1'>
                                                <CropFatherImage student={student} />
                                            </div>





                                        </div>
                                    </div>



                                    {parentsDetails1.map(({ label, key, type, colSpan = 1 }) => (
                                        <div key={key} className={`col-span-${colSpan}`}>
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
                                </div>
                                <label className="block text-gray-600 mt-5 my-2 text-sm sm:text-base font-medium">
                                    Father Office Address
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                    <input placeholder='Organization Name / Office Name' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='Street / Locality' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='City / Town' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='District' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='State / Union Territory' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='PIN Code' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='Country' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />

                                </div>
                            </div>
                            <div>
                                <div className='w-full my-10 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                                    <div className=' h-full flex justify-center items-center text-center'>
                                        <h3 className="text-xl self-center font-semibold text-gray-700 ">
                                            Mother's Details
                                        </h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">


                                    <div className=" items-center justify-center col-span-1 row-span-3  bg-gray-100">
                                        <div className="bg-white flex flex-col justify-between p-2 px-4 h-full  rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200  w-full">

                                            <h2 className="text-md font-bold mt-2 text-gray-600 text-center">Mother's Image</h2>

                                            <div className='p-1'>
                                                <CropMotherImage student={student} />
                                            </div>

                                        </div>
                                    </div>

                                    {parentsDetails2.map(({ label, key, type, colSpan = 1, rowSpan = 1 }) => (
                                        <div key={key} className={`col-span-${colSpan}`}>
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
                                </div>
                                <label className="block text-gray-600 mt-5 my-2 text-sm sm:text-base font-medium">
                                    Mother Office Address
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                    <input placeholder='Organization Name / Office Name' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='Street / Locality' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='City / Town' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='District' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='State / Union Territory' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='PIN Code' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='Country' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />

                                </div>


                            </div>
                            <div>
                                <div className='w-full my-10 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                                    <div className=' h-full flex justify-center items-center text-center'>
                                        <h3 className="text-xl self-center font-semibold text-gray-700 ">
                                            Guardian's Details
                                        </h3>
                                    </div>
                                </div>
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

                                            <h2 className="text-md font-bold mt-2 text-gray-600  text-center">Guardian's Image</h2>

                                            <div className='p-1'>
                                                <CropGuardianImage student={student} />
                                            </div>

                                        </div>
                                    </div>



                                    {parentsDetails3.map(({ label, key, type, colSpan = 1, rowSpan = 1 }) => (
                                        <div key={key} className={`col-span-${colSpan}`}>
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
                                </div>

                                <label className="block text-gray-600 mt-5 my-2 text-sm sm:text-base font-medium">
                                    Guardian Office Address
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                    <input placeholder='Organization Name / Office Name' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='Street / Locality' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='City / Town' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='District' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='State / Union Territory' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='PIN Code' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />
                                    <input placeholder='Country' className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200" />

                                </div>
                            </div>
                        </div>

                        <div className='flex w-full flex-row'>
                            {/* <div className='m-5 p-3 font-semibold bg-gray-500 w-fit text-white rounded-md'>


                                <button
                                    onClick={() => navigate(`/admin/admissions/registration-form/page-1/${student.firstName}-${student.StudentClass}-${student.phone}`, { state: { pass: student } })}>
                                    Back
                                </button>

                            </div> */}

                            <div className='mt-10 text-lg p-5 font-semibold bg-gray-500 w-full text-center text-white rounded-md'>


                                <button
                                    onClick={(e) => handleSubmit(e)}>
                                    Submit & Next
                                </button>


                            </div>

                        </div>
                    </section>

                </form >

            </div>

        </div>
    )
}

export default NewRegistration2