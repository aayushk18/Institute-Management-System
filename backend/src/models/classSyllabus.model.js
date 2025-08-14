import mongoose from "mongoose";


const chapterSchema = new mongoose.Schema({
    name: { type: String },
    brief: { type: String },
    pdf: { type: String }
});


const subjectSchema = new mongoose.Schema({
    subject: { type: String },
    chapters: [chapterSchema]
});

const streamSchema = new mongoose.Schema({
    stream: { type: String },
    subjects: [subjectSchema]
});


const classSyllabusSchema = new mongoose.Schema({
    StudentClass: { type: String },
    syllabus: [streamSchema]
}, { timestamps: true });


export const ClassSyllabus = mongoose.model("ClassSyllabus", classSyllabusSchema);
