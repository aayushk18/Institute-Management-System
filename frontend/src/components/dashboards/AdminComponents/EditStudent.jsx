





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

    const personalDetails = [
        { label: 'First Name', key: 'firstName', type: 'text' },
        { label: 'Last Name', key: 'lastName', type: 'text' },
        { label: 'Father Name', key: 'fatherName', type: 'text', colSpan: 2 },
        { label: 'Mother Name', key: 'motherName', type: 'text', colSpan: 2 },
        { label: 'Date of Birth', key: 'dob', type: 'date' },
        { label: 'Email', key: 'email', type: 'email', },
        { label: "Mother Tongue", key: 'Your Mother Tongue', type: 'text', colSpan: 2 },
        { label: "Religion", key: 'Hindu', type: 'text', colSpan: 2 },
    ]

    const IDproveDocuments = [


        { label: 'Aadhar Card', key: 'firstName', type: 'text' },
        { label: 'Birth Certificate', key: 'firstName', type: 'text' },
        { label: 'Father Aadhar', key: 'firstName', type: 'text' },
        { label: 'Mother Aadhar', key: 'firstName', type: 'text' },
        { label: 'Father PAN', key: 'firstName', type: 'text' },
        { label: 'Mother PAN', key: 'firstName', type: 'text' },
        { label: 'Father Passport', key: 'firstName', type: 'text' },
        { label: 'Mother Passport', key: 'firstName', type: 'text' },
        { label: 'Father Degree', key: 'firstName', type: 'text' },
        { label: 'Mother Degree', key: 'firstName', type: 'text' },


        { label: '', key: 'firstName', type: 'text' },
    ]

    const ResidentialDetails = [
        { label: 'Current Address', key: 'firstName', type: 'text' },
        { label: 'Permanent Address', key: 'lastName', type: 'text' },
        { label: 'Hometown', key: 'lastName', type: 'text' },
    ]

    const previousSchoolRecord = [
        { label: 'Previous School Name', key: 'firstName', type: 'text' },
        { label: 'School Location', key: 'lastName', type: 'text' },
        { label: 'Year of Leaving', key: 'lastName', type: 'text' },
        { label: 'Last Class', key: 'lastName', type: 'text' }
    ]


    // {renderInput('Previous School Name', 'prevSchoolName')}
    // {renderInput('School Location', 'prevSchoolLocation')}
    // {renderInput('Year of Leaving', 'prevSchoolLeavingYear')}
    // {renderInput('Last Class', 'prevSchoolLastClass')}

    // {renderInput('Current Address', 'currentAddress')}
    // {renderInput('Permanent Address', 'permanentAddress')}
    // {renderInput('Hometown', 'hometown')}


    // {renderInput('Father College Name', 'fatherCollege')}
    // {renderInput('Mother College Name', 'motherCollege')}

    // {renderInput('Father Graduation Year', 'fatherGraduationYear')}
    // {renderInput('Mother Graduation Year', 'motherGraduationYear')}
    // {renderInput('Father College Location', 'fatherCollegeLocation')}
    // {renderInput('Mother College Location', 'motherCollegeLocation')}




    // {renderInput('Bus No.', 'transportBusNo')}













    return (
        <div className="w-full px-4 md:px-12 py-6">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-700 mb-6">Update Student Profile</h2>

            <form onSubmit={submitHandler} className="grid md:grid-cols-4 gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-md">
                {personalDetails.map(({ label, key, type, colSpan }) => (
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









