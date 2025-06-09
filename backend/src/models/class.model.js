import mongoose from "mongoose"


const classSchema = new mongoose.Schema({


    StudentClass: { type: String },
    sections: [{
        section: { type: String },
        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }]

    }],
    timetable: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Timetable'
        }
    ],


})

export const Classes = mongoose.model('Class', classSchema)