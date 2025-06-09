import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({

    subject: { type: String },
    timing: {
        day: { type: Date },
        time: { type: Date }
    },
    teacher: {
        firstName: { type: String },
        lastName: { type: String }
    }
})

export const Timetable = mongoose.model('Timetable', timetableSchema)