import mongoose from "mongoose"

const resultSchema = new mongoose.Schema({



    firstName: { type: String },
    lastName: { type: String },
    rollno: { type: Number },
    StudentClass: { type: String },
    section: { type: String },
    current: {
        tests: [{
            subjectName: { type: String },
            Marks: { type: Number },
        }]
    },

    years: [{
        year: { type: Number },
        subjects: [
            {
                subjectName: { type: String },
                Theory: { type: Number },
                Practical: { type: Number }
            }
        ],
        finalScore: { type: Number }

    }]
})

export const Result = mongoose.model('Result', resultSchema)