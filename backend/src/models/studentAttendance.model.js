import mongoose from "mongoose";

const allStudentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    date: { type: String },
    status: { type: String },
    remark: { type: String }
});

const studentStatusSchema = new mongoose.Schema({
    attendance: [allStudentSchema],
    date: { type: String, },
    // status: { type: String },
    // remark: { type: String }
});

const studentAttendanceSchema = new mongoose.Schema({

    StudentClass: {
        type: String,
        required: true
    },
    section: {
        type: String,
    },
    months: [{
        // year: { type: String },
        month: { type: String }, // e.g., "2025-06"
        dates: [studentStatusSchema]
    }]

}, { timestamps: true });

export const StudentAttendance = mongoose.model('StudentAttendance', studentAttendanceSchema);
