import mongoose from "mongoose";


const dailyStatusSchema = new mongoose.Schema({
    date: { type: String, required: true },
    status: { type: String }
}, { _id: false })


const studentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, refPath: 'Student' },
    attendance: [dailyStatusSchema]
})


const studentAttendanceSchema = new mongoose.Schema({
    month: { type: Number },
    year: { type: Number },
    students: [studentSchema]
}, { timestamps: true })


export const StudentAttendance = mongoose.model('StudentAttendance', studentAttendanceSchema);
