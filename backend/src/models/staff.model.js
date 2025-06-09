import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,


    },
    lastName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date
    },
    gender: { type: String },
    email: { type: String },
    loginID: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

    classes: [{

        StudentClass: { type: String },
        section: { type: String },
        subject: { type: String }
    }],

    userType: {
        type: String,
        default: 'teacher'
    }



})

export const Staff = mongoose.model("Staff", staffSchema)