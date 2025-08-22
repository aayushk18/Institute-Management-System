import React from 'react';
import {
    User,
    Phone,
    Mail,
    MapPin,
    Briefcase,
    GraduationCap,
    FileText,
    CreditCard,
    Calendar,
    Building,
    Shield,
    Award,
    Clock,
    Users,
    Download,
    Eye,
    Heart,
    Globe
} from 'lucide-react';

// Sample data for demonstration
const sampleStaffData = {
    firstName: "Dr. Sarah",
    midName: "Jane",
    lastName: "Mitchell",
    gender: "Female",
    dob: new Date("1985-03-15"),
    nationality: "American",
    maritalStatus: "Married",
    bloodGroup: "A+",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    signature: "signature.png",

    phone: "+1 (555) 123-4567",
    alternatePhone: "+1 (555) 987-6543",
    email: "sarah.mitchell@institute.edu",
    presentAddress: "123 University Avenue, Academic City, AC 12345",
    permanentAddress: "456 Residential Street, Hometown, HT 67890",

    staffType: "Academic",
    department: "Computer Science",
    designation: "Associate Professor",
    dateOfJoining: new Date("2018-08-15"),
    employeeId: "CS001234",
    employmentType: "Full-time",
    reportingAuthority: "Prof. John Anderson",
    salaryDetails_basic: 75000,
    salaryDetails_hra: 22500,
    salaryDetails_allowances: 15000,

    highestQualification: "Ph.D. in Computer Science",
    specialization: "Machine Learning & Artificial Intelligence",
    otherCertifications: ["AWS Certified Solutions Architect", "Google Cloud Professional", "Certified Data Scientist"],
    yearsOfExperience: 12,
    workHistory: [
        { name: "Tech Corp", position: "Senior Software Engineer", duration: "2015-2018" },
        { name: "AI Solutions Inc", position: "Research Scientist", duration: "2012-2015" }
    ],
    skills: ["Machine Learning", "Python", "TensorFlow", "Research", "Data Analysis", "Academic Writing"],

    username: "sarah.mitchell",
    role: "Faculty",
    accessPermissions: ["Academic Portal", "Research Database", "Student Management", "Grade Management"],

    documents_resume: "resume_sarah_mitchell.pdf",
    documents_idProof: "id_proof.pdf",
    documents_qualificationCertificates: ["phd_certificate.pdf", "masters_certificate.pdf"],
    documents_experienceLetters: ["techcorp_experience.pdf", "ai_solutions_experience.pdf"],
    documents_policeVerification: "police_verification.pdf",

    accountHolderName: "Dr. Sarah Jane Mitchell",
    bankName: "First National Bank",
    accountNumber: "1234567890",
    ifscCode: "FNB0001234",
    branch: "University Branch",
    accountType: "Savings"
};

const StaffProfile = () => {

    const staff = sampleStaffData;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IND',
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    return (
        <div className="min-h-screen    p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Profile</h1>
                </div>

                {/* Profile Header Card */}
                <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
                    <div className="bg-gray-600 px-8 py-6">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <img
                                    src={staff.photo}
                                    alt={`${staff.firstName} ${staff.lastName}`}
                                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                            </div>
                            <div className="text-white">
                                <h2 className="text-2xl font-bold">
                                    {staff.firstName} {staff.midName} {staff.lastName}
                                </h2>
                                <p className=" text-lg">{staff.designation}</p>
                                <p className="">{staff.department}</p>
                                <div className="flex items-center mt-2 space-x-4">
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                        ID: {staff.employeeId}
                                    </span>
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                        {staff.staffType}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Personal Details */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                Personal Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Gender</label>
                                        <p className="text-gray-900">{staff.gender}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                                        <p className="text-gray-900 flex items-center">
                                            {formatDate(staff.dob)}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Nationality</label>
                                        <p className="text-gray-900 flex items-center">
                                            {staff.nationality}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Marital Status</label>
                                        <p className="text-gray-900">{staff.maritalStatus}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Blood Group</label>
                                        <p className="text-gray-900 flex items-center">
                                            {staff.bloodGroup}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                Contact Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Primary Phone</label>
                                        <p className="text-gray-900 flex items-center">
                                            {staff.phone}
                                        </p>
                                    </div>
                                    {staff.alternatePhone && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Alternate Phone</label>
                                            <p className="text-gray-900 flex items-center">
                                                {staff.alternatePhone}
                                            </p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Email</label>
                                        <p className="text-gray-900 flex items-center">
                                            {staff.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Present Address</label>
                                        <p className="text-gray-900 flex items-start">
                                            {staff.presentAddress}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Permanent Address</label>
                                        <p className="text-gray-900 flex items-start">
                                            {staff.permanentAddress}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Employment Details */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                Employment Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Department</label>
                                        <p className="text-gray-900 flex items-center">
                                            {staff.department}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Employment Type</label>
                                        <p className="text-gray-900">{staff.employmentType}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Date of Joining</label>
                                        <p className="text-gray-900 flex items-center">
                                            {formatDate(staff.dateOfJoining)}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Reporting Authority</label>
                                        <p className="text-gray-900 flex items-center">
                                            {staff.reportingAuthority}
                                        </p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-green-900 mb-2">Salary Breakdown</h4>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-green-700">Basic:</span>
                                                <span className="font-medium">{formatCurrency(staff.salaryDetails_basic)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-green-700">HRA:</span>
                                                <span className="font-medium">{formatCurrency(staff.salaryDetails_hra)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-green-700">Allowances:</span>
                                                <span className="font-medium">{formatCurrency(staff.salaryDetails_allowances)}</span>
                                            </div>
                                            <div className="border-t pt-1 mt-2 flex justify-between font-semibold">
                                                <span>Total:</span>
                                                <span>{formatCurrency(staff.salaryDetails_basic + staff.salaryDetails_hra + staff.salaryDetails_allowances)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Background */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                Professional Background
                            </h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Highest Qualification</label>
                                        <p className="text-gray-900 font-medium">{staff.highestQualification}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Specialization</label>
                                        <p className="text-gray-900">{staff.specialization}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Years of Experience</label>
                                        <p className="text-gray-900 flex items-center">
                                            {staff.yearsOfExperience} years
                                        </p>
                                    </div>
                                </div>

                                {/* Certifications */}
                                <div>
                                    <label className="text-sm font-medium text-gray-500 mb-3 block">Other Certifications</label>
                                    <div className="flex flex-wrap gap-2">
                                        {staff.otherCertifications.map((cert, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
                                            >
                                                <Award className="w-3 h-3 mr-1" />
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Skills */}
                                <div>
                                    <label className="text-sm font-medium text-gray-500 mb-3 block">Skills</label>
                                    <div className="flex flex-wrap gap-2">
                                        {staff.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Work History */}
                                <div>
                                    <label className="text-sm font-medium text-gray-500 mb-3 block">Work History</label>
                                    <div className="space-y-3">
                                        {staff.workHistory.map((work, index) => (
                                            <div key={index} className="border-l-4 border-gray-400 pl-4 py-2">
                                                <h4 className="font-medium text-gray-900">{work.position}</h4>
                                                <p className="text-gray-600">{work.name}</p>
                                                <p className="text-gray-500 text-sm">{work.duration}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* System Access */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                System Access
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Username</label>
                                    <p className="text-gray-900 font-mono bg-gray-50 px-3 py-2 rounded">
                                        {staff.username}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Role</label>
                                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {staff.role}
                                    </span>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 mb-2 block">Access Permissions</label>
                                    <div className="space-y-2">
                                        {staff.accessPermissions.map((permission, index) => (
                                            <div key={index} className="flex items-center text-sm text-gray-700">
                                                <Shield className="w-3 h-3 mr-2 text-green-500" />
                                                {permission}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Documents */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                Documents
                            </h3>
                            <div className="space-y-3">
                                {staff.documents_resume && (
                                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <FileText className="w-4 h-4 mr-2 text-gray-400" />
                                            <span className="text-sm">Resume</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="text-gray-600 hover:text-blue-500">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-800">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {staff.documents_idProof && (
                                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <FileText className="w-4 h-4 mr-2 text-gray-400" />
                                            <span className="text-sm">ID Proof</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="text-gray-600 hover:text-blue-500">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-800">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {staff.documents_qualificationCertificates.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                                            <span className="text-sm">Qualification Certificate {index + 1}</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="text-gray-600 hover:text-blue-500">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-800">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bank Details */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                Bank Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Account Holder</label>
                                    <p className="text-gray-900">{staff.accountHolderName}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Bank Name</label>
                                    <p className="text-gray-900">{staff.bankName}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Branch</label>
                                    <p className="text-gray-900">{staff.branch}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <div className="grid grid-cols-1 gap-2">
                                        <div>
                                            <label className="text-xs font-medium text-gray-500">Account Number</label>
                                            <p className="text-gray-900 font-mono text-sm">••••••••{staff.accountNumber.slice(-2)}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500">IFSC Code</label>
                                            <p className="text-gray-900 font-mono text-sm">{staff.ifscCode}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500">Account Type</label>
                                            <p className="text-gray-900 text-sm">{staff.accountType}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
};

export default StaffProfile;
