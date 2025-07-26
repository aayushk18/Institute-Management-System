import mongoose from "mongoose";


const chapterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brief: { type: String },
    pdf: { type: String }
});


const subjectSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    chapters: [chapterSchema]
});


const classSyllabusSchema = new mongoose.Schema({
    StudentClass: { type: String, required: true },
    syllabus: [subjectSchema]
}, { timestamps: true });


export const ClassSyllabus = mongoose.model("ClassSyllabus", classSyllabusSchema);
