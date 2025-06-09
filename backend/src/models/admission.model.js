import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({


    registrationForm: [{
        Field: { type: String },
        Value: { type: String },
        inputType: { type: String }
    }],
    newRegistrations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Registration'
        }
    ],
    newAdmissions: []

})

export const Admission = mongoose.model("Admission", admissionSchema)