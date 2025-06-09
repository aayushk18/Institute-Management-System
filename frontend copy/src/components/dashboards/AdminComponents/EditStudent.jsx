// Updated version of EditStudent.js with a professional and responsive design
// Text colors set to gray and dark gray for a clean appearance

import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../../utils/useAuthStore';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const EditStudent = () => {
    const location = useLocation();
    const state = location.state;
    const st = state?.pass;

    const navigate = useNavigate();
    const { isSending, AddNewStudent } = useAdminStore();

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [enabled, setEnabled] = useState(false);

    const [Form, setForm] = useState({
        password: '123456',
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        email: '',
        StudentClass: '',
        section: '',
        fatherName: '',
        motherName: '',
        fatherphoneno: '',
        motherphoneno: '',
    });

    const classSections = [...Array(13)].map((_, i) => {
        const cls = i < 3 ? ['Nursery', 'LKG', 'UKG'][i] : (i - 2).toString();
        return {
            class: cls,
            subclasses: 'ABCDEFG'.split('').map(section => ({ section })),
        };
    });

    const classObj = classSections.find(cls => cls.class === selectedClass);

    const validateForm = () => {
        if (!Form.firstName.trim()) return toast.error('First Name is required');
        if (!Form.lastName.trim()) return toast.error('Last Name is required');
        if (!Form.gender.trim()) return toast.error('Gender is required');
        if (!Form.dob.trim()) return toast.error('Date of Birth is required');
        if (!Form.StudentClass.trim()) return toast.error('Class is required');
        if (!Form.section.trim()) return toast.error('Section is required');
        if (!Form.fatherName.trim()) return toast.error('Father Name is required');
        if (!Form.motherName.trim()) return toast.error('Mother Name is required');
        if (!Form.fatherphoneno.trim()) return toast.error('Father phone No is required');
        if (!Form.motherphoneno.trim()) return toast.error('Mother phone No is required');
        if (!/\S+@\S+\.\S+/.test(Form.email)) return toast.error('Invalid Email Format');
        if (!Form.password) return toast.error('Password is required');
        if (Form.password.length < 6) return toast.error('Password must be at least 6 characters');
        return true;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const success = validateForm();
        try {
            if (success) {
                // Submit form logic here
                navigate('/admin/student');
            }
        } catch (error) {
            toast.error('Submission failed');
        }
    };

    return (
        <div className="w-full px-4 md:px-12 py-6">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-700 mb-6">Update Student Profile</h2>

            <form onSubmit={submitHandler} className="grid md:grid-cols-4 gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-md">
                {[
                    { label: 'First Name', key: 'firstName', type: 'text' },
                    { label: 'Last Name', key: 'lastName', type: 'text' },
                    { label: 'Father Name', key: 'fatherName', type: 'text', colSpan: 2 },
                    { label: 'Mother Name', key: 'motherName', type: 'text', colSpan: 2 },
                    { label: 'Date of Birth', key: 'dob', type: 'date' },
                    { label: 'Email', key: 'email', type: 'email', },
                    { label: "Father's Phone Number", key: 'fatherphoneno', type: 'text', colSpan: 2 },
                    { label: "Mother's Phone Number", key: 'motherphoneno', type: 'text', colSpan: 2 },
                ].map(({ label, key, type, colSpan }) => (
                    <div key={key} className={`col-span-${colSpan || 1}`}>
                        <label className="block font-semibold text-gray-600 mb-2">{label}</label>
                        <input
                            value={Form[key]}
                            onChange={(e) => setForm({ ...Form, [key]: e.target.value })}
                            required
                            type={type}
                            placeholder={st?.[key] || `Enter ${label.toLowerCase()}`}
                            className="p-4 rounded-md w-full text-gray-700 focus:ring-2 focus:ring-gray-800 focus:outline-none placeholder:text-gray-400 border border-gray-300"
                        />
                    </div>
                ))}

                <div>
                    <label className="block font-semibold text-gray-600 mb-2">Gender</label>
                    <select
                        value={Form.gender}
                        onChange={(e) => setForm({ ...Form, gender: e.target.value })}
                        className="p-4 rounded-md focus:ring-2 focus:ring-gray-800 focus:outline-none w-full text-gray-700 border border-gray-300"
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold text-gray-600 mb-2">Class</label>
                    <select
                        value={selectedClass}
                        onChange={(e) => {
                            setSelectedClass(e.target.value);
                            setForm({ ...Form, StudentClass: e.target.value });
                            setSelectedSection('');
                        }}
                        className="p-4 rounded-md w-full text-gray-700 border focus:ring-2 focus:ring-gray-800 focus:outline-none border-gray-300"
                    >
                        <option value="">Select a class</option>
                        {classSections.map((cls, i) => (
                            <option key={i} value={cls.class}>{cls.class}</option>
                        ))}
                    </select>
                </div>

                {selectedClass && (
                    <div>
                        <label className="block font-semibold text-gray-600 mb-2">Section</label>
                        <select
                            value={selectedSection}
                            onChange={(e) => {
                                setSelectedSection(e.target.value);
                                setForm({ ...Form, section: e.target.value });
                            }}
                            className="p-4 rounded-md w-full focus:ring-2 focus:ring-gray-800 focus:outline-none text-gray-700 border border-gray-300"
                        >
                            <option value="">Select a section</option>
                            {classObj?.subclasses.map((sub, i) => (
                                <option key={i} value={sub.section}>{sub.section}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="flex items-center space-x-4">
                    <span className="font-semibold text-gray-600">Active</span>
                    <button
                        type="button"
                        onClick={() => setEnabled(!enabled)}
                        className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                        <span
                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${enabled ? 'translate-x-8' : ''}`}
                        />
                    </button>
                </div>

                <div className="col-span-4">
                    <button
                        type="submit"
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 rounded-md transition-all duration-150"
                    >
                        {isSending ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditStudent;




























// import React, { useEffect, useState } from 'react'
// import { useAdminStore } from '../../utils/useAuthStore';
// import toast from 'react-hot-toast';
// import { useLocation, useNavigate } from 'react-router-dom';

// const EditStudent = () => {

//     const location = useLocation();
//     const state = location.state;

//     const st = state?.pass

//     const [enabled, setEnabled] = useState(false);
//     console.log(st);






//     const navigate = useNavigate();

//     const { isSending, AddNewStudent } = useAdminStore()







//     const [selectedClass, setSelectedClass] = useState("");
//     const [selectedSection, setSelectedSection] = useState("");

//     // useEffect(() => {
//     //     if (st.StudentClass && st.section) {
//     //         setSelectedClass(st.section)
//     //         setSelectedSection(st.section)
//     //     }

//     // }, [selectedClass])




//     const [Form, setForm] = useState({

//         password: '123456',
//         firstName: '',
//         lastName: '',
//         gender: '',
//         dob: '',
//         email: '',
//         StudentClass: '',
//         section: '',
//         fatherName: '',
//         motherName: '',
//         fatherphoneno: '',
//         motherphoneno: ''
//     })


//     const classSections = [
//         { class: "Nursery", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "LKG", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "UKG", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "1", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "2", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "3", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "4", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "5", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "6", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "7", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "8", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "9", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "10", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "11", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//         { class: "12", subclasses: [{ section: "A" }, { section: "B" }, { section: "C" }, { section: "D" }, { section: "E" }, { section: "F" }, { section: "G" }] },
//     ];


//     const [IsGenderOption, setIsGenderOption] = useState(false)


//     const classObj = classSections.find(cls => cls.class === selectedClass);

//     const validateForm = () => {
//         if (!Form.firstName.trim()) return toast.error("First Name is required");

//         if (!Form.lastName.trim()) return toast.error("Last Name is required");

//         if (!Form.gender.trim()) return toast.error("Gender is required");
//         if (!Form.dob.trim()) return toast.error("Date of Birth is required");
//         if (!Form.StudentClass.trim()) return toast.error("Class is required");
//         if (!Form.section.trim()) return toast.error("Section is required");
//         if (!Form.fatherName.trim()) return toast.error("Father Name is required");
//         if (!Form.motherName.trim()) return toast.error("Mother Name is required");
//         if (!Form.fatherphoneno.trim()) return toast.error("Father phone No is required");
//         if (!Form.motherphoneno.trim()) return toast.error("Mother phone No is required");

//         if (!/\S+@\S+\.\S+/.test(Form.email)) return toast.error("Invalid Email Format");
//         if (!Form.password) return toast.error("Password is required");

//         if (Form.password.length < 6) return toast.error("Password must be at least 6 characters");

//         return true
//     }

//     const submitHandler = async (e) => {





//         e.preventDefault();


//         const success = validateForm()
//         try {

//             if (success == true) {


//                 if (status) {
//                     navigate('/admin/student')
//                 }

//             }
//         } catch (error) {

//         }



//     }

//     return (
//         <div className='w-full'>

//             <span className='text-5xl font-bold m-5 text-gray-400'>Update Student Profile</span>


//             <form

//                 className='grid md:grid-cols-4 gap-6 sm:gap-8  p-6 md:p-10  rounded-3xl '
//             >

//                 <div>
//                     <label className='block font-semibold text-green-800  mb-2'>First Name</label>
//                     <input

//                         value={Form.firstName}
//                         onChange={(e) => setForm({ ...Form, firstName: e.target.value })}
//                         required
//                         type="text"
//                         placeholder={st ? `${st.firstName}` : 'Write first Name'}
//                         className='p-4 rounded-md w-full  placeholder:text-gray-500 font-semibold border-gray-400 border-2'
//                     />
//                 </div>
//                 <div>
//                     <label className='block font-semibold text-green-800 mb-2'>Last Name</label>
//                     <input
//                         value={Form.lastName}
//                         onChange={(e) => setForm({ ...Form, lastName: e.target.value })}
//                         required
//                         type="text"
//                         placeholder={st.lastName ? `${st.lastName}` : 'Write last Name'}
//                         className='p-4 rounded-md w-full placeholder:text-gray-500 font-semibold   border-gray-400 border-2 '
//                     />
//                 </div>
//                 <div>
//                     <label className='block font-semibold text-green-800 mb-2'>Father Name</label>
//                     <input
//                         value={Form.fatherName}
//                         onChange={(e) => setForm({ ...Form, fatherName: e.target.value })}
//                         required
//                         type="text"
//                         placeholder={st ? `${st.fatherName}` : 'Write father Name'}
//                         className='p-4 rounded-md w-full  placeholder:text-gray-500 font-semibold  border-gray-400 border-2 '
//                     />
//                 </div>
//                 <div>
//                     <label className='block font-semibold text-green-800 mb-2'>Mother Name</label>
//                     <input
//                         value={Form.motherName}
//                         onChange={(e) => setForm({ ...Form, motherName: e.target.value })}
//                         required
//                         type="text"
//                         placeholder={st ? `${st.motherName}` : 'Write mother Name'}
//                         className='p-4 rounded-md w-full  placeholder:text-gray-500 font-semibold  border-gray-400 border-2'
//                     />
//                 </div>


//                 <div>
//                     <label className='block font-semibold text-green-800 mb-2'>Date of Birth</label>
//                     <input
//                         value={Form.dob}
//                         onChange={(e) => setForm({ ...Form, dob: e.target.value })}
//                         placeholder={st ? `${st.dob}` : 'Write dob'}
//                         required
//                         type="date"
//                         className='p-4 rounded-md w-full  text-gray-500 font-semibold  border-gray-400 border-2'
//                     />
//                 </div>


//                 <div className="">
//                     <label className="block font-semibold text-green-800  mb-2">Gender</label>
//                     <select
//                         value={Form.gender}
//                         onChange={(e) => setForm({ ...Form, gender: e.target.value })}

//                         className="p-4 rounded-md w-full text-gray-500 font-semibold border-gray-400 border-2 "
//                         required
//                     >
//                         <option value="">Select gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                     </select>
//                 </div>






//                 <div className=''>
//                     <label className='block font-semibold text-green-800 mb-2'>Email</label>
//                     <input
//                         value={Form.email}
//                         onChange={(e) => setForm({ ...Form, email: e.target.value })}
//                         required
//                         placeholder={st.email ? `${st.email}` : 'Write email'}

//                         className='p-4 rounded-md w-full placeholder:text-gray-500 font-semibold border-gray-400 border-2'
//                     />
//                 </div>

//                 <div className='col-span-2'>
//                     <label className='block font-semibold text-green-800 mb-2'>Father's Phone Number</label>
//                     <input
//                         value={Form.fatherphoneno}
//                         onChange={(e) => setForm({ ...Form, fatherphoneno: e.target.value })}
//                         required
//                         placeholder={st.fatherphoneno ? `${st.fatherphoneno}` : 'Write father phone no'}

//                         className='p-4 rounded-md w-full placeholder:text-gray-500 font-semibold border-gray-400 border-2'
//                     />
//                 </div>

//                 <div className='col-span-2'>
//                     <label className='block font-semibold text-green-800 mb-2'>Mother's Phone Number</label>
//                     <input
//                         value={Form.motherphoneno}
//                         onChange={(e) => setForm({ ...Form, motherphoneno: e.target.value })}
//                         required
//                         placeholder={st.motherphoneno ? `${st.motherphoneno}` : 'Write mother phone no'}

//                         className='p-4 rounded-md w-full placeholder:text-gray-500 font-semibold border-gray-400 border-2'
//                     />
//                 </div>

//                 <div className='col-span-4'>

//                     <div className="grid grid-cols-4 gap-5">

//                         <div>
//                             <label className="block font-semibold text-green-800 mb-2">Class</label>
//                             <select
//                                 value={selectedClass}
//                                 onChange={(e) => {
//                                     setSelectedClass(e.target.value);

//                                     setForm({ ...Form, StudentClass: e.target.value })
//                                     setSelectedSection(""); // reset section when class changes
//                                 }}
//                                 className="p-4 rounded-md w-full text-gray-500 font-semibold border-gray-400 border-2"
//                             >
//                                 <option value="">Select a class</option>
//                                 {classSections.map((cls, i) => (
//                                     <option key={i} value={cls.class}>{cls.class}</option>
//                                 ))}
//                             </select>
//                         </div>



//                         {selectedClass && (
//                             <div>
//                                 <label className="block font-semibold text-green-800 mb-2">Section</label>
//                                 <select
//                                     value={selectedSection}
//                                     onChange={(e) => {
//                                         setSelectedSection(e.target.value)
//                                         setForm({ ...Form, section: e.target.value })
//                                     }}
//                                     className="p-4 rounded-md w-full text-gray-500 font-semibold border-green-400 border-2"
//                                 >
//                                     <option value="">Select a section</option>
//                                     {classObj?.subclasses.map((sub, i) => (
//                                         <option key={i} value={sub.section}>{sub.section}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                         )}

//                         <div className="flex flex-col items-center space-x-4">

//                             <div className=" font-semibold text-green-800">Active</div>
//                             <button
//                                 onClick={() => setEnabled(!enabled)}
//                                 className={` inline-flex items-center h-8 rounded-full w-18 transition-colors duration-300 ${enabled ? 'bg-gray-600' : 'bg-gray-300'
//                                     }`}
//                             >
//                                 <span
//                                     className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ${enabled ? 'translate-x-11' : 'translate-x-1'
//                                         }`}
//                                 />
//                             </button>
//                         </div>
//                     </div>
//                 </div>







//                 <div className=''>
//                     <button
//                         type="submit"
//                         className='p-4 bg-gray-500 text-white font-semibold  hover:shadow-none hover:scale-110 w-full rounded-md transition-all duration-150'
//                         onClick={(e) => submitHandler(e)}
//                     >
//                         {isSending ? 'Creating...' : 'Create Account'}
//                     </button>
//                 </div>
//             </form >

//         </div >
//     )
// }

// export default EditStudent;