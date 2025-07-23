import Button from '@mui/material/Button';
import React, { useState } from 'react'
import { Form, Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../utils/useAuthStore';
import toast from 'react-hot-toast';
import pincode from '../../../assets/json/pincode';


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

        permanentHouseNo: '',
        permanentLocality: '',
        permanentCity: '',
        permanentDistrict: '',
        permanentState: '',
        permanentPinCode: '',
        permanentCountry: '',

        currentHouseNo: '',
        currentLocality: '',
        currentCity: '',
        currentDistrict: '',
        currentState: '',
        currentPinCode: '',
        currentCountry: '',


        previousSchoolLastClass: '',
        previousSchoolName: '',
        previousSchoolLocation: '',
        previousSchoolLeavingYear: '',
        // previousSchoolLastClassMarksheet: null,
        // previousSchoolTransferCertificate: null,

        // ID proof
    });

    const setPermanentAddressByPincode = (code) => {
        const pin = pincode(code)

        if (pin) {

            const ar = {
                permanentDistrict: pin.district,
                permanentState: pin.state,
                permanentCountry: "India"
            }

            return ar

        }
        return null;

    }

    const setCurrentAddressByPincode = (code) => {

        const pin = pincode(code)

        if (pin) {


            const ar = {
                currentDistrict: pin.district,
                currentState: pin.state,
                currentCountry: "India"
            }

            return ar

        }
        return null;
    }

    // setPermanentAddressByPincode()






    const location = useLocation();
    const state = location.state;
    const stu = state?.pass;

    const student = stu;


    const navigate = useNavigate();




    console.log(student);

    const { updateRegistrationForm3 } = useAdminStore()

    const classSections = Array.from({ length: 15 }, (_, i) => {
        const cls = i < 3 ? ['Nursery', 'LKG', 'UKG'][i] : (i - 2).toString();
        return {
            class: cls,
            subclasses: 'ABCDEFG'.split('').map(section => ({ section })),
        };
    });

    const residentialDetails1 = [
        { label: 'House / Flat No', key: 'currentHouseNo', type: 'text' },
        { label: 'Street / Locality', key: 'currentLocality', type: 'text' },
        { label: 'City / Town', key: 'currentCity', type: 'text' },
        { label: 'PIN Code', key: 'currentPinCode', type: 'text' },
        { label: 'District', key: 'currentDistrict', type: 'text' },
        { label: 'State', key: 'currentState', type: 'text' },
        { label: 'Country', key: 'currentCountry', type: 'text' },
    ];

    const residentialDetails2 = [
        { label: 'House Number / Flat No', key: 'permanentHouseNo', type: 'text' },
        { label: 'Street / Locality', key: 'permanentLocality', type: 'text' },
        { label: 'City / Town', key: 'permanentCity', type: 'text' },
        { label: 'PIN Code', key: 'permanentPinCode', type: 'text' },
        { label: 'District', key: 'permanentDistrict', type: 'text' },
        { label: 'State', key: 'permanentState', type: 'text' },
        { label: 'Country', key: 'permanentCountry', type: 'text' },
    ];

    const previousSchoolRecord = [
        { label: 'Previous School Name', key: 'previousSchoolName', type: 'text' },
        { label: 'School Location', key: 'previousSchoolLocation', type: 'text' },
        { label: 'Year of Leaving', key: 'previousSchoolLeavingYear', type: 'text' },
        { label: 'Marksheet', key: 'previousSchoolLastClassMarksheet', type: 'file' },
        { label: 'Marks', key: 'previousSchoolscore', type: 'text' },
        { label: 'Transfer Certificate', key: 'previousSchoolTransferCertificate', type: 'file' }

    ];
    const [filePreviews, setFilePreviews] = useState({});



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);


        const updatedForm3 = Object.fromEntries(
            Object.entries(form).filter(([key, value]) => value !== '')
        );
        console.log(updatedForm3);



        if (Object.keys(updatedForm3).length === 0) {
            toast.success("No data to submit ");
            navigate(`/admin/admissions/new-registrations`)

        } else {

            updatedForm3.checkStudentClass = student.StudentClass;
            updatedForm3.checkphone = student.phone;
            updatedForm3.checkfirstName = student.firstName;
            updatedForm3.checkdob = student.dob;



            const success = await updateRegistrationForm3(updatedForm3)
            console.log(updatedForm3);

            if (success == true) {
                navigate(`/admin/admissions/new-registrations`)
                toast.success("Student Profile Updated Successfully ");

            }
            console.log("Filtered form with non-empty values:", updatedForm3);
        }

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



                    {/* Residential Details */}


                    <section className="mb-8">
                        <div className='w-full my-10 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                            <div className=' h-full flex justify-center items-center text-center'>
                                <h3 className="text-2xl self-center font-semibold text-gray-700 ">
                                    Residential's Details
                                </h3>
                            </div>

                        </div>
                        <div className=' h-full pb-5  '>
                            <h3 className="text-lg  my-4 font-bold text-gray-600 ">
                                Current Address
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {residentialDetails1.map(({ label, key, type, colSpan = 1 }) => (
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
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setForm({ ...form, [key]: value });

                                                    if (key === 'currentPinCode' && value.length === 6) {
                                                        const address = setCurrentAddressByPincode(value);

                                                        if (address) {
                                                            setForm((prevForm) => ({
                                                                ...prevForm,
                                                                [key]: value,
                                                                ...address
                                                            }));
                                                        }
                                                    }

                                                }}


                                                placeholder={type === 'date' ? '' : student?.[key] || `Enter ${label.toLowerCase()}`}
                                                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className=' h-full  pb-5  '>
                            <h3 className="text-lg   my-4 font-bold text-gray-600 ">
                                Permanent Address
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {residentialDetails2.map(({ label, key, type, colSpan = 1 }) => (
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
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setForm({ ...form, [key]: value });

                                                    if (key === 'permanentPinCode' && value.length === 6) {
                                                        const address = setPermanentAddressByPincode(value);

                                                        if (address) {
                                                            setForm((prevForm) => ({
                                                                ...prevForm,
                                                                [key]: value,
                                                                ...address
                                                            }));
                                                        }
                                                    }

                                                }}


                                                placeholder={type === 'date' ? '' : student?.[key] || `Enter ${label.toLowerCase()}`}
                                                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className=' h-full '>
                            <h3 className="text-xl text-center my-8 font-semibold text-gray-600 ">
                                Hometown
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                {residentialDetails3.map(({ label, key, type, colSpan = 1 }) => (
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
                        </div> */}
                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                          
                        </div> */}


                        {/* Previous School Details */}
                        <section className="mb-8">
                            <div className='w-full my-10 pb-5  border-gray-300 border-b-2 flex flex-row place-items-center  justify-between'>

                                <div className=' h-full flex justify-center items-center text-center'>
                                    <h3 className="text-2xl self-center font-semibold text-gray-700 ">
                                        Previous School Details
                                    </h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                                <div>
                                    <label className="block text-gray-600 mb-2 text-sm sm:text-base font-medium">Last Class</label>
                                    <select
                                        value={form.previousSchoolLastClass || student.previousSchoolLastClass || ''}
                                        onChange={(e) => setForm({ ...form, previousSchoolLastClass: e.target.value })}
                                        className="w-full p-3 rounded-md border border-gray-300 text-gray-600 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                    >
                                        <option value="">Select class</option>
                                        {classSections.map(({ class: cls }) => (
                                            <option key={cls} value={cls}>{cls}</option>
                                        ))}
                                    </select>
                                </div>
                                {previousSchoolRecord.map(({ label, key, type, colSpan = 1 }) => (
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
                                                className="w-full p-3 rounded-md border text-gray-600 border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                                            />
                                        )}
                                    </div>

                                ))}

                            </div>

                            <div className='flex flex-row'>
                            </div>

                            <div className='mt-10 p-5 font-semibold bg-gray-500 w-full text-lg content-center text-center text-white rounded-md'>


                                <button
                                    onClick={(e) => handleSubmit(e)}>
                                    Submit
                                </button>
                            </div>



                        </section>


                    </section>

                </form>


            </div>
        </div >



    )
}

export default NewRegistration3