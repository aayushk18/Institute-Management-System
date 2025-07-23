

import React, { useState } from 'react';
import { useAdminStore } from '../../utils/useAuthStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const navigate = useNavigate();
    const { isSending, AddNewStudent } = useAdminStore();

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [filePreviews, setFilePreviews] = useState({});
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
        fatherPhoneNo: '',
        motherPhoneNo: '',
        motherTongue: '',
        religion: '',
        currentAddress: '',
        permanentAddress: '',
        hometown: '',
        studentAadhar: null,
        studentBirthCertificate: null,
        fatherAadhar: null,
        fatherPan: null,
        fatherBirthCertificate: null,
        fatherPassport: null,
        motherAadhar: null,
        motherPan: null,
        motherBirthCertificate: null,
        motherPassport: null,
        guardianAadhar: null,
        guardianPan: null,
        guardianBirthCertificate: null,
        guardianPassport: null,
        fatherPhoto: null,
        motherPhoto: null,
        guardianPhoto: null,
        fatherOccupation: '',
        fatherOfficeAddress: '',
        fatherDegree: '',
        fatherCollegeName: '',
        fatherCollegeAddress: '',
        fatherGraduationYear: '',
        fatherGraduationCertificate: null,
        motherOccupation: '',
        motherOfficeAddress: '',
        motherDegree: '',
        motherCollegeName: '',
        motherCollegeAddress: '',
        motherGraduationYear: '',
        motherGraduationCertificate: null,
        guardianName: '',
        guardianRelation: '',
        guardianOccupation: '',
        guardianOfficeAddress: '',
        guardianDegree: '',
        guardianCollegeName: '',
        guardianCollegeAddress: '',
        guardianGraduationYear: '',
        guardianGraduationCertificate: null,
        previousSchoolName: '',
        schoolLocation: '',
        yearOfLeaving: '',
        lastClass: '',
        lastClassMarksheet: null,
    });

    const classSections = Array.from({ length: 15 }, (_, i) => {
        const cls = i < 3 ? ['Nursery', 'LKG', 'UKG'][i] : (i - 2).toString();
        return {
            class: cls,
            subclasses: 'ABCDEFG'.split('').map(section => ({ section })),
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
            'fatherPhoneNo',
            'motherPhoneNo',
            'email',
            'password',
        ];

        for (const field of requiredFields) {
            if (!form[field].trim()) {
                toast.error(`${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`);
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

    const handleFileChangeStudent = (key) => (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ ...form, [key]: file });
            setFilePreviews({ ...filePreviews, [key]: URL.createObjectURL(file) });
        }

    };
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




    const personalDetails = [
        { label: 'First Name', key: 'firstName', type: 'text' },
        { label: 'Middle Name', key: 'midName', type: 'text' },
        { label: 'Last Name', key: 'lastName', type: 'text' },
        { label: 'Gender', key: 'gender', type: 'select', optons: [{ val: "Select" }, { val: "Male" }, { val: "Female" }, { val: "Other" }] },
        { label: 'Date', key: 'date', type: 'date' },
        { label: 'Nationality', key: 'nationality', type: 'select', optons: [{ val: "Select" }, { val: "Indian" }, { val: "NRI" }, { val: "Other" }] },
        { label: 'Category', key: 'category', type: 'select', optons: [{ val: "Select" }, { val: "General" }, { val: "OBC" }, { val: "SC" }, { val: "ST" }] },
        { label: 'Sub-category', key: 'pwd', type: 'select', optons: [{ val: "Select" }, { val: "none" }, { val: "PWD" }, { val: "EWS" }, { val: "PWD + EWS" }] },
        { label: 'Qouta', key: 'quota', type: 'select', optons: [{ val: "Select" }, { val: "none" }, { val: "Defence" }, { val: "Sports" }, { val: "Freedom Fighter" }, { val: "Kashmiri Migrant" }, { val: "Minority" }] },
        { label: 'Religion', key: 'religion', type: 'text' },
        { label: 'Mother Tongue', key: 'motherTongue', type: 'text' },
        { label: 'Email', key: 'email', type: 'email' },
        { label: 'Phone no', key: 'phone', type: 'text' },
        { label: 'Alternative Phone no', key: 'phone', type: 'text' },
        { label: 'Aadhar Card', key: 'aadhar', type: 'file' },



    ];

    const residentialDetails = [
        { label: 'Current Address', key: 'currentAddress', type: 'text', colSpan: 2 },
        { label: 'Permanent Address', key: 'permanentAddress', type: 'text', colSpan: 2 },
        { label: 'Hometown', key: 'hometown', type: 'text', colSpan: 2 },
    ];

    const indiaStatesAndUTs = [
        {
            name: "Andhra Pradesh",
            capital: "Amaravati",
            cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"]
        },
        {
            name: "Arunachal Pradesh",
            capital: "Itanagar",
            cities: ["Tawang", "Pasighat", "Ziro", "Bomdila", "Roing"]
        },
        {
            name: "Assam",
            capital: "Dispur",
            cities: ["Guwahati", "Silchar", "Dibrugarh", "Tezpur", "Jorhat"]
        },
        {
            name: "Bihar",
            capital: "Patna",
            cities: ["Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia"]
        },
        {
            name: "Chhattisgarh",
            capital: "Raipur",
            cities: ["Bhilai", "Bilaspur", "Korba", "Durg", "Raigarh"]
        },
        {
            name: "Goa",
            capital: "Panaji",
            cities: ["Vasco da Gama", "Margao", "Mapusa", "Ponda", "Bicholim"]
        },
        {
            name: "Gujarat",
            capital: "Gandhinagar",
            cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"]
        },
        {
            name: "Haryana",
            capital: "Chandigarh",
            cities: ["Faridabad", "Gurugram", "Panipat", "Ambala", "Hisar"]
        },
        {
            name: "Himachal Pradesh",
            capital: "Shimla",
            cities: ["Dharamshala", "Mandi", "Solan", "Bilaspur", "Hamirpur"]
        },
        {
            name: "Jharkhand",
            capital: "Ranchi",
            cities: ["Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh"]
        },
        {
            name: "Karnataka",
            capital: "Bengaluru",
            cities: ["Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Davangere"]
        },
        {
            name: "Kerala",
            capital: "Thiruvananthapuram",
            cities: ["Kochi", "Kozhikode", "Thrissur", "Alappuzha", "Kollam"]
        },
        {
            name: "Madhya Pradesh",
            capital: "Bhopal",
            cities: ["Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar"]
        },
        {
            name: "Maharashtra",
            capital: "Mumbai",
            cities: ["Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"]
        },
        {
            name: "Manipur",
            capital: "Imphal",
            cities: ["Thoubal", "Bishnupur", "Churachandpur", "Ukhrul", "Senapati"]
        },
        {
            name: "Meghalaya",
            capital: "Shillong",
            cities: ["Tura", "Nongpoh", "Jowai", "Baghmara", "Williamnagar"]
        },
        {
            name: "Mizoram",
            capital: "Aizawl",
            cities: ["Lunglei", "Champhai", "Serchhip", "Kolasib", "Saiha"]
        },
        {
            name: "Nagaland",
            capital: "Kohima",
            cities: ["Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto"]
        },
        {
            name: "Odisha",
            capital: "Bhubaneswar",
            cities: ["Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri"]
        },
        {
            name: "Punjab",
            capital: "Chandigarh",
            cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"]
        },
        {
            name: "Rajasthan",
            capital: "Jaipur",
            cities: ["Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer"]
        },
        {
            name: "Sikkim",
            capital: "Gangtok",
            cities: ["Namchi", "Gyalshing", "Mangan", "Rangpo", "Jorethang"]
        },
        {
            name: "Tamil Nadu",
            capital: "Chennai",
            cities: ["Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"]
        },
        {
            name: "Telangana",
            capital: "Hyderabad",
            cities: ["Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam"]
        },
        {
            name: "Tripura",
            capital: "Agartala",
            cities: ["Udaipur", "Dharmanagar", "Kailasahar", "Belonia", "Khowai"]
        },
        {
            name: "Uttar Pradesh",
            capital: "Lucknow",
            cities: ["Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut"]
        },
        {
            name: "Uttarakhand",
            capital: "Dehradun",
            cities: ["Haridwar", "Haldwani", "Roorkee", "Rudrapur", "Kashipur"]
        },
        {
            name: "West Bengal",
            capital: "Kolkata",
            cities: ["Asansol", "Siliguri", "Durgapur", "Howrah", "Bardhaman"]
        },
        {
            name: "Andaman and Nicobar Islands",
            capital: "Port Blair",
            cities: ["Port Blair", "Diglipur", "Mayabunder", "Rangat", "Hut Bay"]
        },
        {
            name: "Chandigarh",
            capital: "Chandigarh",
            cities: ["Chandigarh"]
        },
        {
            name: "Dadra and Nagar Haveli and Daman and Diu",
            capital: "Daman",
            cities: ["Daman", "Diu", "Silvassa"]
        },
        {
            name: "Delhi",
            capital: "New Delhi",
            cities: ["New Delhi", "Dwarka", "Rohini", "Saket", "Karol Bagh"]
        },
        {
            name: "Jammu and Kashmir",
            capital: "Srinagar (Summer), Jammu (Winter)",
            cities: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"]
        },
        {
            name: "Ladakh",
            capital: "Leh",
            cities: ["Leh", "Kargil", "Diskit", "Nubra", "Padum"]
        },
        {
            name: "Lakshadweep",
            capital: "Kavaratti",
            cities: ["Kavaratti", "Agatti", "Amini", "Andrott", "Kalpeni"]
        },
        {
            name: "Puducherry",
            capital: "Puducherry",
            cities: ["Puducherry", "Karaikal", "Mahe", "Yanam"]
        }
    ];

    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');


    const documentProofs = [
    ];

    const docProofStudent = [
        { label: 'Student Aadhar Card', key: 'studentAadhar', type: 'file' },
        { label: 'Student Birth Certificate', key: 'studentBirthCertificate' },
        { label: 'Student other Documents', key: 'studentOtherDocuments' }

    ]
    const docProofFather = [
        { label: 'Father Aadhar Card', key: 'fatherAadhar', type: 'file' },
        { label: 'Father PAN Card', key: 'fatherPan', type: 'file' },
        { label: 'Father Birth Certificate', key: 'fatherBirthCertificate', type: 'file' },
        { label: 'Father Other Documents', key: 'fatherOtherDocuments', type: 'file' },
    ]
    const docProofMother = [
        { label: 'Mother Aadhar Card', key: 'motherAadhar', type: 'file' },
        { label: 'Mother PAN Card', key: 'motherPan', type: 'file' },
        { label: 'Mother Birth Certificate', key: 'motherBirthCertificate', type: 'file' },
        { label: 'Mother Other Documents', key: 'motherOtherDocuments', type: 'file' },
    ]
    const docProofGuardian = [
        { label: 'Guardian Aadhar Card', key: 'guardianAadhar', type: 'file' },
        { label: 'Guardian PAN Card', key: 'guardianPan', type: 'file' },
        { label: 'Guardian Birth Certificate', key: 'guardianBirthCertificate', type: 'file' },
        { label: 'Guardian Other Documents', key: 'guardianOtherDocuments', type: 'file' },
    ]

    const parentsDetails1 = [
        { label: "Father's First Name", key: 'FatherFirstName', type: 'text' },
        { label: "Father's Middle Name", key: 'FatherMidName', type: 'text' },
        { label: "Father's Last Name", key: 'FatherLastName', type: 'text' },
        { label: "Father's Phone no", key: 'FatherPhone', type: 'text' },
        { label: "Father's Email", key: 'FatherEmail', type: 'text' },
        { label: "Father's Occupation", key: 'fatherOccupation', type: 'text' },
        { label: "Father's Office Address", key: 'fatherOfficeAddress', type: 'text', colSpan: 2 },
        { label: "Father's Edu. Qualification", key: 'fatherDegree', type: 'text' },
        { label: "Father's College Name", key: 'fatherCollegeName', type: 'text' },
        { label: "Father's College Address", key: 'fatherCollegeAddress', type: 'text', colSpan: 2 },
        { label: "Year of Graduation", key: 'fatherGraduationYear', type: 'text' },
        { label: "Graduation Certificate", key: 'fatherGraduationCertificate', type: 'file' },
    ];

    const parentsDetails2 = [
        { label: "Mother's First Name", key: 'MotherFirstName', type: 'text' },
        { label: "Mother's Middle Name", key: 'MotherMidName', type: 'text' },
        { label: "Mother's Last Name", key: 'MotherLastName', type: 'text' },
        { label: "Mother's Phone no", key: 'MotherPhone', type: 'text' },
        { label: "Mother's Email", key: 'MotherEmail', type: 'text' },
        { label: "Mother's Occupation", key: 'motherOccupation', type: 'text' },
        { label: "Mother's Office Address", key: 'motherOfficeAddress', type: 'text', colSpan: 2 },
        { label: "Mother's Degree", key: 'motherDegree', type: 'text' },
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
        { label: "Guardian's Degree", key: 'guardianDegree', type: 'text' },
        { label: "Guardian's College Name", key: 'guardianCollegeName', type: 'text' },
        { label: "Guardian's College Address", key: 'guardianCollegeAddress', type: 'text', colSpan: 2 },
        { label: "Year of Graduation", key: 'guardianGraduationYear', type: 'text' },
        { label: "Graduation Certificate", key: 'guardianGraduationCertificate', type: 'file' },
    ];

    const previousSchoolRecord = [
        { label: 'Previous School Name', key: 'previousSchoolName', type: 'text' },
        { label: 'School Location', key: 'schoolLocation', type: 'text' },
        { label: 'Year of Leaving', key: 'yearOfLeaving', type: 'text' },
        { label: 'Last Class Marksheet', key: 'lastClassMarksheet', type: 'file' },
    ];




    const [selectedImageStudent, setSelectedImageStudent] = useState(null);
    const [selectedImageFather, setSelectedImageFather] = useState(null);
    const [selectedImageMother, setSelectedImageMother] = useState(null);
    const [selectedImageGuardian, setSelectedImageGuardian] = useState(null);



    const handleImageChangeStudent = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImageStudent(imageUrl);
        }
    };
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
    const handleImageChangeGuardian = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImageGuardian(imageUrl);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const status = await AddNewStudent(form);
            if (status) {
                toast.success('Student profile created successfully!');
                navigate('/admin/student');
            }
        } catch (error) {
            toast.error('Failed to create student profile. Please try again.');
        }
    };

    return (
        <div className="w-full bg-gray-100 flex flex-col    p-5 sm:p-6 md:p-10">
            <h2 className="  text-lg sm:text-3xl md:text-2xl font-bold  text-gray-800 mb-8 content-center text-center">
                Add New Student
            </h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full ">
                {/* Personal Details */}
                <section className="mb-8">
                    <h3 className="text-md text-center sm:text-lg font-semibold text-gray-700 mb-6">Personal Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div></div>
                        <div>
                        </div>
                        <div>
                            <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">Class</label>
                            <select
                                value={form.lastClass}
                                onChange={(e) => setForm({ ...form, lastClass: e.target.value })}
                                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                            >
                                <option value="">Select class</option>
                                {classSections.map(({ class: cls }) => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">ID Proof</label>
                            <select
                                value={form.lastClass}
                                onChange={(e) => setForm({ ...form, lastClass: e.target.value })}
                                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                            >
                                <option value="">Select Document</option>

                                <option  >Aadhar Card</option>
                                <option  >Birth Certificate</option>
                                <option  >Other Document</option>


                            </select>
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


                        <div className=" items-center justify-center col-span-1 row-span-3  bg-gray-100">
                            <div className="bg-white flex flex-col justify-between p-2 px-4 h-full  rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200  w-full">

                                <h2 className="text-md font-bold mt-2   text-center">Student's Image</h2>

                                {selectedImageStudent && (
                                    <div className="mt-2 justify-items-center">
                                        <img
                                            src={selectedImageStudent}
                                            alt="Uploaded"
                                            className="w-35 h-35 rounded-lg shadow-md"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChangeStudent}
                                    className="block relative  w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 p-2"
                                />
                                <button className='p-1 bg-gray-500 m-1 font-semibold text-sm rounded-md text-white hover:bg-gray-600'>Update photo
                                </button>





                            </div>
                        </div>




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
                </section>

                {/* Parents Details */}
                <section className="mb-8">
                    <div className="space-y-8">

                        <div>
                            <h3 className="text-md text-center sm:text-lg font-semibold text-gray-700 mb-6">Father's Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">




                                {/* {docProofFather.map(({ label, key, type, colSpan = 1 }) => (
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

                                        <h2 className="text-md font-bold mt-2   text-center">Father's Image</h2>

                                        {selectedImageFather && (
                                            <div className="mt-2 justify-items-center">
                                                <img
                                                    src={selectedImageFather}
                                                    alt="Uploaded"
                                                    className="w-35 h-35 rounded-lg shadow-md"
                                                />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChangeFather}
                                            className="block relative  w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 p-2"
                                        />
                                        <button className='p-1 bg-gray-500 m-1 font-semibold text-sm rounded-md text-white hover:bg-gray-600'>Update photo
                                        </button>





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

                                        <h2 className="text-md font-bold mt-2   text-center">Mother's Image</h2>

                                        {selectedImageMother && (
                                            <div className="mt-2 justify-items-center">
                                                <img
                                                    src={selectedImageMother}
                                                    alt="Uploaded"
                                                    className="w-35 h-35 rounded-lg shadow-md"
                                                />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChangeMother}
                                            className="block relative  w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 p-2"
                                        />
                                        <button className='p-1 bg-gray-500 m-1 font-semibold text-sm rounded-md text-white hover:bg-gray-600'>Update photo
                                        </button>





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

                                        <h2 className="text-md font-bold mt-2   text-center">Guardian's Image</h2>

                                        {selectedImageGuardian && (
                                            <div className="mt-2 justify-items-center">
                                                <img
                                                    src={selectedImageGuardian}
                                                    alt="Uploaded"
                                                    className="w-35 h-35 rounded-lg shadow-md"
                                                />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChangeGuardian}
                                            className="block relative  w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 p-2"
                                        />
                                        <button className='p-1 bg-gray-500 m-1 font-semibold text-sm rounded-md text-white hover:bg-gray-600'>Update photo
                                        </button>





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
                </section>

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
                </section>



                {/* Previous School Details */}
                <section className="mb-8">
                    <h3 className="text-md text-center sm:text-lg font-semibold text-gray-700 mb-6">Previous School Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                        <div>
                            <label className="block text-gray-800 mb-2 text-sm sm:text-base font-medium">Last Class</label>
                            <select
                                value={form.lastClass}
                                onChange={(e) => setForm({ ...form, lastClass: e.target.value })}
                                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:outline-none transition duration-200"
                            >
                                <option value="">Select class</option>
                                {classSections.map(({ class: cls }) => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>










                {/* Submit Button */}
                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={isSending}
                        className={`w-full p-4 rounded-md font-semibold text-white transition duration-300 ${isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-800'
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




















