import React, { useState } from 'react';
import { useAdminStore } from '../../utils/useAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const navigate = useNavigate();
    const { isSending, AddNewStudent } = useAdminStore();

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [form, setForm] = useState({
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
        motherphoneno: ''
    });

    const classSections = Array.from({ length: 15 }, (_, i) => {
        const cls = i < 3 ? ['Nursery', 'LKG', 'UKG'][i] : (i - 2).toString();
        return {
            class: cls,
            subclasses: 'ABCDEFG'.split('').map(section => ({ section }))
        };
    });

    const classObj = classSections.find(cls => cls.class === selectedClass);

    const validateForm = () => {
        const requiredFields = [
            'firstName',
            'lastName',
            'gender',
            'dob',
            'StudentClass',
            'section',
            'fatherName',
            'motherName',
            'fatherphoneno',
            'motherphoneno',
            'email',
            'password'
        ];

        for (const field of requiredFields) {
            if (!form[field].trim()) {
                toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
                return false;
            }
        }

        if (!/\S+@\S+\.\S+/.test(form.email)) {
            toast.error('Invalid Email Format');
            return false;
        }

        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const status = await AddNewStudent(form);
            if (status) navigate('/admin/student');
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className=" h-screen overflow-scroll mx-auto  p-10">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-700 mb-8">Create New Student Profile</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 md:p-10 rounded-2xl shadow-md">
                {/* Personal Details */}
                {[
                    { label: 'First Name', name: 'firstName', type: 'text' },
                    { label: 'Last Name', name: 'lastName', type: 'text' },
                    { label: 'Father Name', name: 'fatherName', type: 'text' },
                    { label: 'Mother Name', name: 'motherName', type: 'text' },
                    { label: 'Date of Birth', name: 'dob', type: 'date' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'Father\'s Phone No', name: 'fatherphoneno', type: 'text' },
                    { label: 'Mother\'s Phone No', name: 'motherphoneno', type: 'text' }
                ].map(({ label, name, type }) => (
                    <div key={name}>
                        <label className="block text-gray-800 mb-2">{label}</label>
                        <input
                            type={type}
                            value={form[name]}
                            onChange={e => setForm({ ...form, [name]: e.target.value })}
                            placeholder={`Enter ${label.toLowerCase()}`}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2  focus:ring-gray-800 focus:outline-none"
                        />
                    </div>
                ))}

                {/* Gender */}
                <div>
                    <label className="block text-gray-800 mb-2">Gender</label>
                    <select
                        value={form.gender}
                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2  focus:ring-gray-800 focus:outline-none"
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Class and Section */}
                <div>
                    <label className="block text-gray-800 mb-2">Class</label>
                    <select
                        value={selectedClass}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSelectedClass(value);
                            setForm({ ...form, StudentClass: value, section: '' });
                            setSelectedSection('');
                        }}
                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none"
                    >
                        <option value="">Select class</option>
                        {classSections.map(({ class: cls }) => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </select>
                </div>

                {selectedClass && (
                    <div>
                        <label className="block text-gray-800 mb-2">Section</label>
                        <select
                            value={selectedSection}
                            onChange={(e) => {
                                setSelectedSection(e.target.value);
                                setForm({ ...form, section: e.target.value });
                            }}
                            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none"
                        >
                            <option value="">Select section</option>
                            {classObj?.subclasses.map(({ section }) => (
                                <option key={section} value={section}>{section}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Submit Button */}
                <div className="col-span-full">
                    <button
                        type="submit"
                        disabled={isSending}
                        className={`w-full p-4 rounded-md font-semibold text-white transition duration-300 ${isSending
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-800'
                            }`}
                    >
                        {isSending ? 'Creating...' : 'Create Student'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;




















// import React, { useState } from 'react'
// import { useAdminStore } from '../../utils/useAuthStore';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';


// const AddStudent = () => {

//     const navigate = useNavigate();

//     const { isSending, AddNewStudent } = useAdminStore()







//     const [selectedClass, setSelectedClass] = useState("");
//     const [selectedSection, setSelectedSection] = useState("");



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
//                 const status = await AddNewStudent(Form)

//                 if (status) {
//                     navigate('/admin/student')
//                 }

//             }
//         } catch (error) {

//         }



//     }

//     return (
//         <div className='w-full'>

//             <span className='text-5xl font-bold m-5 text-gray-500'>Create New Student Profile</span>


//             <form

//                 className='grid md:grid-cols-4 gap-6 sm:gap-8  p-6 md:p-10  rounded-3xl '
//             >

//                 <div>
//                     <label className='block text-black  mb-2'>First Name</label>
//                     <input

//                         value={Form.firstName}
//                         onChange={(e) => setForm({ ...Form, firstName: e.target.value })}
//                         required
//                         type="text"
//                         placeholder='Enter First Name'
//                         className='p-4 rounded-md w-full  placeholder:text-gray400 font-semibold border-gray-400 border-2'
//                     />
//                 </div>
//                 <div>
//                     <label className='block text-black mb-2'>Last Name</label>
//                     <input
//                         value={Form.lastName}
//                         onChange={(e) => setForm({ ...Form, lastName: e.target.value })}
//                         required
//                         type="text"
//                         placeholder='Enter Last Name'
//                         className='p-4 rounded-md w-full placeholder:text-gray-500 font-semibold   border-gray-400 border-2 '
//                     />
//                 </div>
//                 <div>
//                     <label className='block text-black mb-2'>Father Name</label>
//                     <input
//                         value={Form.fatherName}
//                         onChange={(e) => setForm({ ...Form, fatherName: e.target.value })}
//                         required
//                         type="text"
//                         placeholder='Enter Father Name'
//                         className='p-4 rounded-md w-full  placeholder:text-gray-500 font-semibold  border-gray-400 border-2 '
//                     />
//                 </div>
//                 <div>
//                     <label className='block text-black mb-2'>Mother Name</label>
//                     <input
//                         value={Form.motherName}
//                         onChange={(e) => setForm({ ...Form, motherName: e.target.value })}
//                         required
//                         type="text"
//                         placeholder='Enter Mother Name'
//                         className='p-4 rounded-md w-full  placeholder:text-gray-500 font-semibold  border-gray-400 border-2'
//                     />
//                 </div>


//                 <div>
//                     <label className='block text-black mb-2'>Date of Birth</label>
//                     <input
//                         value={Form.dob}
//                         onChange={(e) => setForm({ ...Form, dob: e.target.value })}
//                         required
//                         type="date"
//                         className='p-4 rounded-md w-full  text-gray-500 font-semibold  border-gray-400 border-2'
//                     />
//                 </div>


//                 <div className="">
//                     <label className="block text-black  mb-2">Gender</label>
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
//                     <label className='block text-black mb-2'>Email</label>
//                     <input
//                         value={Form.email}
//                         onChange={(e) => setForm({ ...Form, email: e.target.value })}
//                         required
//                         placeholder='Enter email...'

//                         className='p-4 rounded-md w-full placeholder:text-gray-500 font-semibold border-gray-400 border-2'
//                     />
//                 </div>

//                 <div className='col-span-2'>
//                     <label className='block text-black mb-2'>Father's Phone Number</label>
//                     <input
//                         value={Form.fatherphoneno}
//                         onChange={(e) => setForm({ ...Form, fatherphoneno: e.target.value })}
//                         required
//                         placeholder="Enter father's phone number..."

//                         className='p-4 rounded-md w-full placeholder:text-gray-500 font-semibold border-gray-400 border-2'
//                     />
//                 </div>

//                 <div className='col-span-2'>
//                     <label className='block text-black mb-2'>Mother's Phone Number</label>
//                     <input
//                         value={Form.motherphoneno}
//                         onChange={(e) => setForm({ ...Form, motherphoneno: e.target.value })}
//                         required
//                         placeholder="Enter mother's phone number..."

//                         className='p-4 rounded-md w-full placeholder:text-gray-500 font-semibold border-gray-400 border-2'
//                     />
//                 </div>

//                 <div className='col-span-4'>

//                     <div className="grid grid-cols-4 gap-5">

//                         <div>
//                             <label className="block text-black mb-2">Class</label>
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
//                                 <label className="block text-black mb-2">Section</label>
//                                 <select
//                                     value={selectedSection}
//                                     onChange={(e) => {
//                                         setSelectedSection(e.target.value)
//                                         setForm({ ...Form, section: e.target.value })
//                                     }}
//                                     className="p-4 rounded-md w-full text-black placeholder-gray-400 border-gray-400 border-2"
//                                 >
//                                     <option value="">Select a section</option>
//                                     {classObj?.subclasses.map((sub, i) => (
//                                         <option key={i} value={sub.section}>{sub.section}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         )}
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

// export default AddStudent