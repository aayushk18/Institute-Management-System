import mongoose from "mongoose";

const academicStaffSchema = new mongoose.Schema({


    // 1. Personal Details
    firstName: { type: String, },
    midName: { type: String, },
    lastName: { type: String, },
    gender: { type: String, },
    dob: { type: Date },
    nationality: { type: String },
    maritalStatus: { type: String, }, //enum: ['Single', 'Married', 'Divorced', 'Widowed']
    bloodGroup: { type: String },
    photo: { type: String }, // store file path or URL
    signature: { type: String }, // store file path or URL



    // 2. Contact Information
    phone: { type: String },
    altPhone: { type: String },
    email: { type: String, },
    presentAddress: { type: String },
    permanentAddress: { type: String },



    // 3. Academic & Professional Qualifications
    highestQualification: { type: String },
    specialization: { type: String },
    otherCertifications: [String],
    yearsOfExperience: { type: Number },
    previousInstitutions: [{
        name: String,
        position: String,
        duration: String
    }],
    subjectExpertise: [String],



    // 4. Employment Details
    staffType: { type: String },
    designation: { type: String },
    department: { type: String },
    dateOfJoining: { type: Date },
    employeeId: { type: String },
    employmentType: { type: String },
    reportingAuthority: { type: String },
    salaryDetails: {
        basic: { type: Number },
        hra: { type: Number },
        allowances: { type: Number }
    },



    // 5. Login & System Access
    username: { type: String },
    password: { type: String },
    role: { type: String },
    accessPermissions: [String],


    // 6. Documents Upload
    documents: {
        resume: { type: String },
        idProof: { type: String },
        qualificationCertificates: [String],
        experienceLetters: [String],
        policeVerification: { type: String },
    },


    classRange: [String],


    classes: [
        { StudentClass: { type: String } },
        { subject: { type: String } }
    ],







}, {
    timestamps: true
})

export const AcademicStaff = mongoose.model("AcademicStaff", academicStaffSchema)