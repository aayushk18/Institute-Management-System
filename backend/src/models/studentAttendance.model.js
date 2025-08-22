import mongoose from "mongoose";


const dailyStatusSchema = new mongoose.Schema({
    date: { type: String, required: true },
    status: { type: String }
}, { _id: false })


const studentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, refPath: 'Student' },
    attendance: [dailyStatusSchema]
})


const classSchema = new mongoose.Schema({
    StudentClass: { type: String },
    section: { type: String },
    students: [studentSchema]

})


const studentAttendanceSchema = new mongoose.Schema({
    month: { type: Number },
    year: { type: Number },
    classes: [classSchema]

}, { timestamps: true })


export const StudentAttendance = mongoose.model('StudentAttendance', studentAttendanceSchema);
