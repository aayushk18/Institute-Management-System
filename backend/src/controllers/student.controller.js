import { Homework } from "../models/homework.model.js";
import { Student } from "../models/student.model.js";
import { Timetable } from "../models/timetable.model.js";




export const findTimetableforStudent = async (req, res) => {

    try {


        const timetable = Timetable.find({
            $and: [
                { StudentClass: Student.StudentClass },
                { section: Student.section }
            ]
        })

        if (timetable) {
            res.status(200).json(timetable);
        } else res.status(401).json({ message: 'Timetable not found' });
    } catch (error) {
        console.log("error in staff controller:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const showHomeworks = async (req, res) => {

    const { StudentClass, section } = req.body;
    console.log(StudentClass, section);

    try {

        const allHomeworks = await Homework.find({ StudentClass, section })

        if (!allHomeworks || allHomeworks.length === 0) {
            return res.status(401).json({ message: "No homework found " })

        }

        const formattedHomeworks = allHomeworks.map(hw => ({
            subject: hw.subject,
            StudentClass: hw.StudentClass,
            section: hw.section,
            HomeworkTitle: hw.HomeworkTitle,
            HomeworkDescription: hw.HomeworkDescription,
            deadline: hw.deadline,
            attachment: hw.attachment,
            teacherFirstName: hw.teacher?.firstName || '',
            teacherLastName: hw.teacher?.lastName || ''
        }));


        res.status(200).json(formattedHomeworks);


    } catch (error) {
        res.status(401).json({ message: "Internal server error" })
        console.log("error in homework by student", error.message);

    }
}

export const uploadHomework = async (req, res) => {

    // cloudinary upload with update status as upload

}