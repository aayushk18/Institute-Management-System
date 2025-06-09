import { Admin } from "../models/admin.model.js";
import bycrypt from 'bcryptjs'
import { Student } from '../models/student.model.js';
import { Timetable } from "../models/timetable.model.js";
import { Classes } from "../models/class.model.js";
import { Staff } from "../models/staff.model.js";
import { login } from "./auth.controller.js";
import { NewRegistration } from "../models/NewRegistration.model.js";
import FormData from "form-data";
import fs from 'fs';
import axios from "axios";




// export const setNewStudent = async (req, res) => {


//     const { firstName, lastName, studentpic, dob, gender, Class, section, fatherName, motherName, email, fatherphoneno, motherphoneno } = req.body;


//     try {
//         if (!firstName || !lastName || !studentpic || !dob || !gender || !Class || !section || !fatherName || !motherName || !email || !fatherphoneno || !motherphoneno) {
//             res.send(400).json({ message: "All fields are required" })
//         }

//         const findUserEmail = await User.findOne({ email: email });

//         if (findUserEmail) return res.status(400).json({ message: "Email already exist" });

//     } catch (error) {
//         res.status(400).json({ message: "Invalid user data" })
//     }
// }

export const addNewClass = async (req, res) => {
    const addsec = [{ section: "A" },
    { section: "B" },
    { section: "C" },
    { section: "D" },
    { section: "E" },
    { section: "F" },
    ]
    try {
        const { StudentClass } = req.body;
        const addClass = new Classes({

            StudentClass: StudentClass,

        })

        addsec.map((el) => {

            addClass.sections.push(el)


        })

        const ClassesSaved = await addClass.save()



        return res.status(200).json('Classes Updated successfully')





    } catch (error) {
        console.log("error in class adding controller", error.message);

        return res.status(401).json({ message: 'Internal server error' })

    }

} // tested



export const updateAdmin = async (req, res) => {
    const { loginID, password, firstName, lastName, oldPassword } = req.body

    console.log(loginID, password, firstName, lastName);




    try {


        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        const admin = await Admin.findOne({ loginID: loginID })

        console.log(hashedPassword);


        const checkPassword = await bycrypt.compare(oldPassword, admin.password);

        console.log(admin.password);
        console.log(oldPassword);


        console.log(checkPassword);


        if (!checkPassword) {
            return res.status(401).json({ message: 'Invalid Password' })
        }

        const newAdmin = await Admin.updateOne({
            firstName,
            lastName,
            loginID,
            password: hashedPassword
        })

        res.status(201).json({
            _id: newAdmin._id,
            firstName: newAdmin.firstName,
            lastName: newAdmin.lastName,
            loginID: newAdmin.loginID,
            password: newAdmin.password

        })


    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ message: "Internal server Error" })
    }
}
export const resetrollno = async (req, res) => {

    try {
        const { StudentClass, section } = req.body;
        console.log(StudentClass, section);


        if (!StudentClass || !section) {
            return res.status(400).json({ error: 'Class and section are required.' });
        }

        // Find and sort students
        const students = await Student.find({ StudentClass, section }).sort({
            firstName: 1,
            lastName: 1,
            fatherName: 1
        });

        // Update roll numbers
        const updates = students.map((student, index) => {
            const newRoll = String(index + 1).padStart(3, '0'); // e.g., '001'
            student.Roll_no = newRoll[newRoll.length - 1];
            return student.save();
        });

        await Promise.all(updates);

        res.status(200).json({ message: `Roll numbers updated for class ${StudentClass}, section ${section}` });
    } catch (error) {
        console.error('Error updating roll numbers:', error);
        res.status(500).json({ error: 'Server error while updating roll numbers' });
    }


}

export const getAllStudents = async (req, res) => {

    const data = []
    try {
        const allStudents = await Student.find();
        allStudents.map((el => {

            data.push({ firstName: el.firstName, lastName: el.lastName, rollno: el.Roll_no, fatherName: el.fatherName, StudentClass: el.StudentClass, motherName: el.motherName, email: el.email, fatherphoneno: el.fatherphoneno, motherphoneno: el.motherphoneno, section: el.section, active: el.active, _id: el._id, dob: el.dob, loginID: el.loginID })
        }))




        res.status(200).json(data)
    } catch (error) {
        res.status(401).json({ message: "Unable to find students" })
    }
}

export const AddNewStaff = async (req, res) => {
    const { loginID, password, firstName, lastName, email, gender, dob, Designation } = req.body

    try {
        console.log(loginID, password, firstName, lastName);

        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)



        const newStaff = new Staff({
            firstName,
            lastName,
            loginID,
            email,
            gender,
            dob,
            password: hashedPassword
        })
        await newStaff.save();
        res.status(201).json({
            _id: newStaff._id,
            firstName: newStaff.firstName,
            lastName: newStaff.lastName,
            loginID: newStaff.loginID,
            password: newStaff.password,
            email: newStaff.email,
            gender: newStaff.gender,
            dob: newStaff.dob

        })


    } catch (error) {
        console.log("Error in add teacher controller", error.message)
        res.status(500).json({ message: "Internal server Error" })
    }
}

export const AddStudentAccount = async (req, res) => {
    const { password, firstName, lastName, gender, dob, email, StudentClass, section, fatherName, motherName, fatherphoneno, motherphoneno } = req.body

    try {


        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        const createLoginID = (firstName, lastName, fatherName, dob) => {

            const parts = dob.split("-")
            const month = parts[1]
            const day = parts[2]
            const father = fatherName.split(" ")




            const str = firstName + '_' + father[0][0] + father[0][father[0].length - 1] + lastName[0] + day + month
            const str1 = str.toLowerCase()

            return str1

        }

        const loginID = createLoginID(firstName, lastName, fatherName, dob)

        const checkStudent = await Student.find({
            firstName, lastName, fatherName, dob,
            StudentClass: StudentClass,
            section: section,



        })

        if (!checkStudent || checkStudent.length == 0) {

            const setToClass = Classes.findOne({
                StudentClass, 'sections.section': section
            })

        } else return res.status(401).json({ message: "Student already exist" })



        const newStudent = new Student({
            firstName,
            lastName,
            gender,
            dob,
            email,
            StudentClass,
            section,
            fatherName,
            motherName,
            fatherphoneno,
            motherphoneno,
            loginID: loginID,
            password: hashedPassword
        })


        if (!checkStudent || checkStudent.length == 0) {

            await newStudent.save();
        } else return res.status(400).json({ message: "Record with same Roll number already exist in class " + StudentClass + '-' + section + 'with Name' + checkStudent.firstName })


        const classDoc = await Classes.findOne({ StudentClass: checkStudent.StudentClass });

        if (!classDoc) {
            console.log('Class not found');
        } else {
            const Section = await classDoc.sections.find(sec => sec.section === checkStudent.section);

            if (!Section) {
                console.log('Section not found');
            } else {
                // Push student ID if not already present
                if (!Section.students.includes(checkStudent._id)) {
                    Section.students.push(checkStudent._id);
                    await classDoc.save();
                    console.log('Student added to 8A');
                } else {
                    console.log('Student already in section');
                }
            }
        }

        console.log('Succesfully Created');



        res.status(200).json({

            message: 'Succesfully Created'
        })
        // const findClass = await Classes.findOne({ StudentClass, section });

        // if (!findClass) {
        //     const newClass = await new Classes({
        //         StudentClass,
        //         section
        //     })
        //     await newClass.save()
        // }


        // findClass.students.push(newStudent._id);
        // await findClass.save();




    } catch (error) {
        console.log("Error in new student controller", error.message)
        res.status(500).json({ message: "Internal server Error" })
    }
}

export const UpdateStudent = async (req, res) => {
    const { password, firstName, lastName, gender, dob, email, StudentClass, section, fatherName, motherName, fatherphoneno, motherphoneno } = req.body;


}

export const setTimetableForClass = async (req, res) => {

    const { StudentClass, section, subject, day, time, firstName, lastName } = req.body
    try {



        const newTimetable = new Timetable({
            subject,
            timing: {
                day,
                time
            },
            teacher: {
                firstName,
                lastName
            }
        });

        await newTimetable.save();


        const findClass = await Classes.findOne({ StudentClass, section });

        if (!findClass) {
            return;
        }


        findClass.timetable.push(newTimetable._id);
        await findClass.save();

        console.log('Timetable added to class successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
};

export const setClassesAndSubjectsForTeacher = async (req, res) => {

}

// admission

export const addNewRegistration = async (req, res) => {
    const {
        StudentClass,
        firstName,
        midName,
        lastName,
        gender,
        dob,
        nationality,
        category,
        subCategory,
        quota,
        motherTongue,
        religion,
        email,
        phone,
        altphone,
        aadhar,

        fatherFirstName,
        fatherMidName,
        fatherLastName,
        fatherPhone,
        fatherEmail,
        fatherOccupation,
        fatherOfficeAddress,
        fatherQualification,
        fatherCollegeName,
        fatherCollegeAddress,
        fatherGraduationYear,
        fatherGraduationCertificate,

        motherFirstName,
        motherMidName,
        motherLastName,
        motherPhone,
        motherEmail,
        motherOccupation,
        motherOfficeAddress,
        motherQualification,
        motherCollegeName,
        motherCollegeAddress,
        motherGraduationYear,
        motherGraduationCertificate,

        guardianFirstName,
        guardianMidName,
        guardianLastName,
        guardianPhone,
        guardianEmail,
        guardianRelation,
        guardianOccupation,
        guardianOfficeAddress,
        guardianQualification,
        guardianCollegeName,
        guardianCollegeAddress,
        guardianGraduationYear,
        guardianGraduationCertificate,

        currentAddress,
        permanentAddress,
        hometown,

        previousSchoolLastClass,
        previousSchoolName,
        previousSchoolLocation,
        previousSchoolLeavingYear,
        previousSchoolLastClassMarksheet,
        previousSchoolTransferCertificate,
    } = req.body;

    try {
        // const checkNewStudent = await NewRegistration.find({
        //     firstName, midName, lastName, fatherFirstName, dob,
        //     StudentClass, dob, fatherLastName
        // })
        // if (checkNewStudent) {
        //     res.status(401).json({
        //         message: "Record Already exist!!"
        //     })
        // }
        const addNewRegistration = NewRegistration({
            StudentClass,
            firstName,
            midName,
            lastName,
            gender,
            dob,
            nationality,
            category,
            subCategory,
            quota,
            motherTongue,
            religion,
            email,
            phone,
            altphone,
            aadhar,

            fatherFirstName,
            fatherMidName,
            fatherLastName,
            fatherPhone,
            fatherEmail,
            fatherOccupation,
            fatherOfficeAddress,
            fatherQualification,
            fatherCollegeName,
            fatherCollegeAddress,
            fatherGraduationYear,
            fatherGraduationCertificate,

            motherFirstName,
            motherMidName,
            motherLastName,
            motherPhone,
            motherEmail,
            motherOccupation,
            motherOfficeAddress,
            motherQualification,
            motherCollegeName,
            motherCollegeAddress,
            motherGraduationYear,
            motherGraduationCertificate,

            guardianFirstName,
            guardianMidName,
            guardianLastName,
            guardianPhone,
            guardianEmail,
            guardianRelation,
            guardianOccupation,
            guardianOfficeAddress,
            guardianQualification,
            guardianCollegeName,
            guardianCollegeAddress,
            guardianGraduationYear,
            guardianGraduationCertificate,

            currentAddress,
            permanentAddress,
            hometown,

            previousSchoolLastClass,
            previousSchoolName,
            previousSchoolLocation,
            previousSchoolLeavingYear,
            previousSchoolLastClassMarksheet,
            previousSchoolTransferCertificate

        })
        await addNewRegistration.save()

        res.status(200).json({

            message: 'Succesfully Created'
        })


    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }

}

export const showAllNewRegistration = async (req, res) => {

    const data = []
    try {

        const allStudents = await NewRegistration.find();


        allStudents.map((el => {


            data.push({
                StudentClass: el.StudentClass,
                firstName: el.firstName,
                midName: el.midName,
                lastName: el.lastName,
                gender: el.gender,
                dob: el.dob,
                email: el.email,
                phone: el.phone,


                fatherFirstName: el.fatherFirstName,
                fatherMidName: el.fatherMidName,
                fatherLastName: el.fatherLastName,
                // fatherPhone,
                // fatherEmail,
                // fatherOccupation,
                // fatherOfficeAddress,
                // fatherQualification,
                // fatherCollegeName,
                // fatherCollegeAddress,
                // fatherGraduationYear,
                // fatherGraduationCertificate,

                motherFirstName: el.motherFirstName,
                motherMidName: el.motherMidName,
                motherLastName: el.motherLastName,
                // motherPhone,
                // motherEmail,
                // motherOccupation,
                // motherOfficeAddress,
                // motherQualification,
                // motherCollegeName,
                // motherCollegeAddress,
                // motherGraduationYear,
                // motherGraduationCertificate,

                guardianFirstName: el.guardianFirstName,
                guardianMidName: el.guardianMidName,
                guardianLastName: el.guardianLastName,
                // guardianPhone,
                // guardianEmail,
                // guardianRelation,
                // guardianOccupation,
                // guardianOfficeAddress,
                // guardianQualification,
                // guardianCollegeName,
                // guardianCollegeAddress,
                // guardianGraduationYear,
                // guardianGraduationCertificate,

                // currentAddress,
                // permanentAddress,
                // hometown,

                // previousSchoolLastClass,
                // previousSchoolName,
                // previousSchoolLocation,
                // previousSchoolLeavingYear,
                // previousSchoolLastClassMarksheet,
                // previousSchoolTransferCertificate,

            })
        }))



        console.log(data);

        res.status(200).json(data)
    } catch (error) {
        console.log(error.message);

        // res.status(401).json({ message: "Unable to find students" })
    }
}

export const testingElement = async () => {




}

export const testing = async (req, res) => {


    try {

        const { name, fatherName, rollno } = req.body;
        const file = req.file;

        console.log(req.file, "yess file exist", req.body);


        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }





        res.status(201).json({
            message: 'File uploaded!',
            fileInfo: {
                name: file.originalname,
                type: file.mimetype,
                savedAs: file.filename
            }
        });

        // const form = new FormData();
        // form.append('file', file.buffer, {
        //     filename: file.originalname,
        //     contentType: file.mimetype
        // });

        // const response = await axios.post('http://localhost:5001/extract', form, {
        //     headers: form.getHeaders()
        // });

        // res.json(response.data);
        // res.status(201).json(ress);


    } catch (error) {
        console.error('Error sending to Python:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }



}