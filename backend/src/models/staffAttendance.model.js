import mongoose from "mongoose";

const dailyStatusSchema = new mongoose.Schema({
    date: { type: String, required: true },
    status: { type: String }
}, { _id: false });


const staffSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, refPath: 'staffModel' },
    staffModel: {
        type: String,
        required: true,
        enum: ['Staff', 'AcademicStaff']
    },
    attendance: [dailyStatusSchema]
})


const staffAttendanceSchema = new mongoose.Schema({
    month: { type: Number },
    year: { type: Number },
    staffs: [staffSchema]
}, { timestamps: true });



export const StaffAttendance = mongoose.model('StaffAttendance', staffAttendanceSchema)