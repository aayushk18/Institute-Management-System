import bycrypt from 'bcryptjs'
import { Timetable } from '../models/timetable.model.js';
import { Staff } from '../models/staff.model.js';
import { Homework } from '../models/homework.model.js';
import { Student } from '../models/student.model.js';
import { Classes } from '../models/class.model.js';
import { Result } from '../models/result.model.js';



export const AddHomework = async (req, res) => {
    const { StudentClass, section, subject, HomeworkTitle, HomeworkDescription, deadline, attachment, firstName, lastName } = req.body;

    try {



        const newHomework = new Homework({
            StudentClass,
            subject,
            section,
            HomeworkTitle,
            HomeworkDescription,
            deadline,
            attachment,
            firstName,
            lastName,
        })
        await newHomework.save()
        console.log("Successfully uploaded at homework collection");


        const findClass = await Classes.findOne({ StudentClass, section });

        if (!findClass) {
            return res.status(401).json({ message: "Class not exist " })

        }


        findClass.homeworks.push(newHomework._id);
        await findClass.save();

        console.log("Successfully uploaded at classroom");


        const allStudents = await Student.find({ StudentClass, section });

        if (!allStudents) {
            return res.status(201).json({ message: "Student not found" });
        }
        const hw = { homework: newHomework._id }
        for (const student of allStudents) {
            student.assignment.push(hw);
            await student.save();

        }




        res.status(201).json({
            StudentClass: newHomework.StudentClass,
            section: newHomework.section,
            HomeworkTitle: newHomework.HomeworkTitle,
            HomeworkDescription: newHomework.HomeworkDescription,
            deadline: newHomework.deadline,
            attachment: newHomework.attachment,
            firstName: newHomework.teacher.firstName,
            lastName: newHomework.teacher.lastName,
        })


    } catch (error) {
        res.status(401).json({ message: "Teacher cannot be able to upload assignment " })
        console.log("error in staff controller", error.message);

    }
}

export const homeworkUpdateToTeacher = async (req, res) => {

    const { StudentClass, section } = req.body;
    const allStudents = await Student.find({ StudentClass, section })
    if (!allStudents || allStudents.length == 0) {
        res.status(401).json({ message: "Students not found" })
    }

    res.status(401).json(allStudents.map((user) => ({

        firstName: user.firstName,
        lastName: user.lastName,
        rollno: user.rollno,
        assignmentUpdate: user.assignment,
        assignment: user.assignment

    })))



}

export const findTimetableforTeacher = async (req, res) => {

    try {
        const teacher = Staff.firstName + Staff.lastName

        const timetable = Timetable.find({ teacher: teacher })

        if (timetable) {
            res.status(200).json(timetable);
        } else res.status(401).json({ message: 'Timetable not found' });
    } catch (error) {
        console.log("error in staff controller:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const showStudents = async (req, res) => {
    const { StudentClass, section } = req.body;



    try {

        const allStudent = await Student.find({
            $and: [{ StudentClass },
            { section }
            ]
        })

        if (!allStudent || allStudent.length == 0) {
            return res.status(401).json({ message: "Students not found" })
        }


        res.status(200).json(allStudent.map((user) => ({



            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            loginID: user.loginID,
            gender: user.gender,
            dob: user.dob,
            rollno: user.rollno,
            email: user.email,
            StudentClass: user.StudentClass,
            section: user.section,
            fatherName: user.fatherName,
            motherName: user.motherName,
            fatherphoneno: user.fatherphoneno,
            motherphoneno: user.motherphoneno




        })))


    } catch (error) {

    }


}


export const uploadResult = async (req, res) => {


}
export const uploadTestMarks = async (req, res) => {
    const { subjectName, Marks, StudentClass, section, rollno } = req.body;

    try {


        const checkStudent = await Student.findOne({
            $and: [
                { StudentClass: StudentClass },
                { section: section },
                { rollno: rollno }
            ]
        })

        if (!checkStudent) {
            return res.status(401).json({ message: "Student not exist" })

        }

        const findResult = await Result.findOne({
            $and: [
                { StudentClass: StudentClass },
                { section: section },
                { rollno: rollno }
            ]
        })


        const setResult = new Result({

            firstName: checkStudent.firstName,
            lastName: checkStudent.lastName,
            rollno: checkStudent.rollno,
            StudentClass: checkStudent.StudentClass,
            section: checkStudent.section,

        })
        if (!findResult) {
            await setResult.save();
        }

        const updateResult = await Result.updateOne({ rollno, StudentClass, section }, {

            $push: {
                'current.tests': {
                    subjectName,
                    Marks
                }
            }
        })


        res.status(201).json({
            message: "Successfully updated"


        })






    } catch (error) {
        console.log("error in staff controller", error.message);
        res.status(401).json({ message: "Internal server error" })


    }






}

