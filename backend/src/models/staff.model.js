import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({

    // 1. Personal Details
    firstName: { type: String, },
    midName: { type: String, },
    lastName: { type: String, },
    gender: { type: String },
    dob: { type: Date, },
    nationality: { type: String },
    maritalStatus: { type: String },
    bloodGroup: { type: String },
    photo: { type: String },
    signature: { type: String },

    // 2. Contact Information
    phone: { type: String },
    alternatePhone: { type: String },
    email: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },

    // 3. Employment Details
    userType: { type: String },
    staffType: { type: String, },
    department: { type: String },
    designation: { type: String },
    dateOfJoining: { type: Date },
    employeeId: { type: String },
    employmentType: { type: String },
    reportingAuthority: { type: String },

    salaryDetails_basic: { type: Number },
    salaryDetails_hra: { type: Number },
    salaryDetails_allowances: { type: Number },


    // 4. Professional Background
    highestQualification: { type: String },
    specialization: { type: String },
    otherCertifications: [String],
    yearsOfExperience: { type: Number },
    workHistory: [{
        name: String,
        position: String,
        duration: String,
    }],
    skills: [String],

    // 5. Login & System Access (if needed)
    username: { type: String },
    password: { type: String }, // hashed
    role: { type: String, },
    accessPermissions: [String],

    // 6. Documents Upload

    documents_resume: { type: String },
    documents_idProof: { type: String },
    documents_qualificationCertificates: [String],
    documents_experienceLetters: [String],
    documents_policeVerification: { type: String },



    // 6. Bank Detials 
    accountHolderName: { type: String },
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    branch: { type: String },
    accountType: { type: String },

    // // 7. Declaration
    // declaration: {
    //     agreed: { type: Boolean, default: false },
    //     signedBy: { type: String },
    //     signedDate: { type: Date, default: Date.now }
    // }
})

export const Staff = mongoose.model("Staff", staffSchema)