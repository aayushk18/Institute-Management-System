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
    staffType: { type: String, },
    department: { type: String },
    designation: { type: String },
    dateOfJoining: { type: Date },
    employeeId: { type: String },
    employmentType: { type: String },
    reportingAuthority: { type: String },
    salaryDetails: {
        basic: { type: Number },
        hra: { type: Number },
        allowances: { type: Number }
    },

    // 4. Professional Background
    workHistory: [{
        organization: String,
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
    documents: {
        resume: { type: String },
        idProof: { type: String },
        qualificationCertificates: [String],
        experienceLetters: [String],
        policeVerification: { type: String },
    },

    // // 7. Declaration
    // declaration: {
    //     agreed: { type: Boolean, default: false },
    //     signedBy: { type: String },
    //     signedDate: { type: Date, default: Date.now }
    // }
})

export const Staff = mongoose.model("Staff", staffSchema)