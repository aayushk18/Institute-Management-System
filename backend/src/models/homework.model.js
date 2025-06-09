import mongoose from "mongoose";

const homeworkSchema = new mongoose.Schema({

    subject: { type: String },
    StudentClass: { type: String },
    section: { type: String },
    HomeworkTitle: { type: String },
    HomeworkDescription: { type: String },
    deadline: { type: Date },
    attachment: { type: String },
    teacher: {
        firstName: { type: String },
        lastName: { type: String }
    },


})

export const Homework = mongoose.model('Homework', homeworkSchema)