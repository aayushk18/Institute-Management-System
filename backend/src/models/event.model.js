import mongoose from "mongoose";



const dateSchema = new mongoose.Schema({
    date: { type: String },
    status: { type: String },
    remark: { type: String },
})

const eventSchema = new mongoose.Schema({
    dates: [dateSchema],
    month: { type: String },
    year: { type: String },

});

export const Event = mongoose.model("Event", eventSchema);