import mongoose from "mongoose";


const dailyStatusSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    status: { type: String },
    remark: { type: String },
});

const staffAttendanceSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    month: { type: String },
    year: { type: String },
    attendance: [dailyStatusSchema],
}, { timestamps: true });


export const StaffAttendance = mongoose.model('StaffAttendance', staffAttendanceSchema)