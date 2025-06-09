import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({


    registrationForm: [{
        Field: { type: String },
        Value: { type: String },
        order: { type: Number },
        DefaultValue: { type: String },
        inputType: { type: String },
        input: {}
    }]

})

export const Registration = mongoose.model("Registration", registrationSchema)