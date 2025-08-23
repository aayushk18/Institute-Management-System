import { Admin } from "../models/admin.model.js";
import bycrypt from 'bcryptjs'
import { Student } from '../models/student.model.js';
import { Timetable } from "../models/timetable.model.js";
import { Classes } from "../models/class.model.js";
import { Staff } from "../models/staff.model.js";
import { NewRegistration } from "../models/NewRegistration.model.js";
import { StaffAttendance } from "../models/staffAttendance.model.js";
import { Event } from "../models/event.model.js";
import { StudentAttendance } from "../models/studentAttendance.model.js";
import mongoose from "mongoose";
import { ClassSyllabus } from "../models/classSyllabus.model.js";
import { AcademicStaff } from "../models/academicStaff.model.js";






export const homeDashboardData = async (req, res) => {

    try {

        const totalStudent = await Student.countDocuments();

        const totalStaff = await Staff.countDocuments();

        const totalTeachers = await AcademicStaff.countDocuments();

        const maleCount = await Student.countDocuments({ gender: { $regex: /^male$/i } });
        const femaleCount = await Student.countDocuments({ gender: { $regex: /^female$/i } });

        res.status(200).json({
            totalStudent,
            totalStaff,
            totalTeachers,
            male: maleCount,
            female: femaleCount
        })




    } catch (error) {
        console.log("Error in admin controller", error.message)
        res.status(500).json({ message: "Internal server Error" })
    }
}

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

}

export const ActivateStudent = async (req, res) => {

    console.log(req.body);


    const { studentId } = req.body;

    try {
        await Student.findByIdAndUpdate(
            { _id: studentId },
            { $set: { active: true } }
        )
    } catch (error) {
        console.log("Error in admin controller", error.message)
        res.status(500).json({ message: "Internal server Error" })
    }


}

export const InactivateStudent = async (req, res) => {

    const { studentId } = req.body;
    console.log(studentId);


    try {
        await Student.findByIdAndUpdate(
            { _id: studentId },
            { $set: { active: false } }
        )
    } catch (error) {
        console.log("Error in admin controller", error.message)
        res.status(500).json({ message: "Internal server Error" })
    }


}

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
        // aadhar,

        // fatherFirstName,
        // fatherMidName,
        // fatherLastName,
        // fatherPhone,
        // fatherEmail,
        // fatherOccupation,
        // fatherOfficeAddress,
        // fatherQualification,
        // fatherCollegeName,
        // fatherCollegeAddress,
        // fatherGraduationYear,
        // fatherGraduationCertificate,

        // motherFirstName,
        // motherMidName,
        // motherLastName,
        // motherPhone,
        // motherEmail,
        // motherOccupation,
        // motherOfficeAddress,
        // motherQualification,
        // motherCollegeName,
        // motherCollegeAddress,
        // motherGraduationYear,
        // motherGraduationCertificate,

        // guardianFirstName,
        // guardianMidName,
        // guardianLastName,
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
    } = req.body;

    // console.log(StudentClass);


    try {
        const checkNewStudent = await NewRegistration.findOne({
            firstName, midName, lastName, dob,
            StudentClass, email, phone
        })
        console.log(checkNewStudent)
        if (!checkNewStudent || checkNewStudent.length == 0) {

        } else return res.status(401).json({
            message: "Record Already exist!!"
        })
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

            // fatherFirstName,
            // fatherMidName,
            // fatherLastName,
            // fatherPhone,
            // fatherEmail,
            // fatherOccupation,
            // fatherOfficeAddress,
            // fatherQualification,
            // fatherCollegeName,
            // fatherCollegeAddress,
            // fatherGraduationYear,
            // fatherGraduationCertificate,

            // motherFirstName,
            // motherMidName,
            // motherLastName,
            // motherPhone,
            // motherEmail,
            // motherOccupation,
            // motherOfficeAddress,
            // motherQualification,
            // motherCollegeName,
            // motherCollegeAddress,
            // motherGraduationYear,
            // motherGraduationCertificate,

            // guardianFirstName,
            // guardianMidName,
            // guardianLastName,
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
            // previousSchoolTransferCertificate

        })
        await addNewRegistration.save()

        res.status(200).json({

            message: 'Succesfully Created'
        })


    } catch (error) {

        res.status(500).json({ message: error.message })
    }

}

export const updateStudentRegistrationDetails = async (req, res) => {
    const {
        checkStudentClass,
        checkfirstName,
        checkdob,
        checkphone,

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
        bloodGroup,

    } = req.body;




    try {

        const checkNewStudent = await NewRegistration.findOne({
            firstName: checkfirstName, dob: checkdob,
            StudentClass: checkStudentClass, phone: checkphone
        })
        if (!checkNewStudent || checkNewStudent.length == 0) {

            return res.status(401).json({ message: "User not Exist" })
        }

        await NewRegistration.findOneAndUpdate(
            {
                firstName: checkfirstName, dob: checkdob,
                StudentClass: checkStudentClass, phone: checkphone
            },
            {
                $set: {

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
                    bloodGroup,


                }
            }
        );

        return res.status(201).json({ message: "Student Details Updated" })



    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

export const updateParentRegistrationDetails = async (req, res) => {
    const {

        checkStudentClass,
        checkfirstName,
        checkdob,
        checkphone,

        //  StudentClass,
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
        // fatherGraduationCertificate,

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
        // motherGraduationCertificate,

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
        // guardianGraduationCertificate,
    } = req.body;



    try {
        const checkNewStudent = await NewRegistration.findOne({
            firstName: checkfirstName, dob: checkdob,
            StudentClass: checkStudentClass, phone: checkphone
        })

        if (!checkNewStudent || checkNewStudent.length == 0) {

            return res.status(401).json({ message: "User not Exist" })
        }

        await NewRegistration.findOneAndUpdate(
            {
                firstName: checkfirstName, dob: checkdob,
                StudentClass: checkStudentClass, phone: checkphone
            },
            {
                $set: {

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
                    // fatherGraduationCertificate,

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
                    // motherGraduationCertificate,

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
                    guardianGraduationYear
                }
            }
        );

        return res.status(201).json({ message: "Parent Details Updated" })




    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })

    }

}

export const updateOthertRegistrationDetails = async (req, res) => {

    const {


        checkStudentClass,
        checkfirstName,
        checkdob,
        checkphone,

        permanentHouseNo,
        permanentLocality,
        permanentCity,
        permanentDistrict,
        permanentState,
        permanentPinCode,
        permanentCountry,

        currentHouseNo,
        currentLocality,
        currentCity,
        currentDistrict,
        currentState,
        currentPinCode,
        currentCountry,

        previousSchoolLastClass,
        previousSchoolName,
        previousSchoolLocation,
        previousSchoolLeavingYear,
        // previousSchoolLastClassMarksheet,
        // previousSchoolTransferCertificate,
    } = req.body;



    try {
        const checkNewStudent = await NewRegistration.findOne({
            firstName: checkfirstName, dob: checkdob,
            StudentClass: checkStudentClass, phone: checkphone
        })

        if (!checkNewStudent || checkNewStudent.length == 0) {

            return res.status(401).json({ message: "User not Exist" })
        }

        const Rs = await NewRegistration.findOneAndUpdate(
            {
                firstName: checkfirstName, dob: checkdob,
                StudentClass: checkStudentClass, phone: checkphone
            },
            {
                $set: {

                    permanentHouseNo,
                    permanentLocality,
                    permanentCity,
                    permanentDistrict,
                    permanentState,
                    permanentPinCode,
                    permanentCountry,

                    currentHouseNo,
                    currentLocality,
                    currentCity,
                    currentDistrict,
                    currentState,
                    currentPinCode,
                    currentCountry,


                    previousSchoolLastClass,
                    previousSchoolName,
                    previousSchoolLocation,
                    previousSchoolLeavingYear
                }
            }
        );

        console.log(Rs);

        return res.status(201).json({ message: "Residential and Previous School Details Updated" })


    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })

    }
}

export const showAllNewRegistration = async (req, res) => {

    const data = []
    try {

        const allStudents = await NewRegistration.find();


        allStudents.map((el => {


            data.push({


                StudentClass: el.StudentClass,
                studentpic: el.studentpic,
                firstName: el.firstName,
                midName: el.midName,
                lastName: el.lastName,
                gender: el.gender,
                dob: el.dob,
                email: el.email,
                phone: el.phone,
                altphone: el.altphone,
                bloodGroup: el.bloodGroup,

                nationality: el.nationality,
                category: el.category,
                subCategory: el.subCategory,
                quota: el.quota,
                religion: el.religion,
                motherTongue: el.motherTongue,


                fatherPic: el.fatherPic,
                fatherFirstName: el.fatherFirstName,
                fatherMidName: el.fatherMidName,
                fatherLastName: el.fatherLastName,
                fatherPhone: el.fatherPhone,
                fatherEmail: el.fatherEmail,
                fatherOccupation: el.fatherOccupation,
                fatherOfficeAddress: el.fatherOfficeAddress,
                fatherQualification: el.fatherQualification,
                fatherCollegeName: el.fatherCollegeName,
                fatherCollegeAddress: el.fatherCollegeAddress,
                fatherGraduationYear: el.fatherGraduationYear,
                fatherGraduationCertificate: el.fatherGraduationCertificate,



                motherPic: el.motherPic,
                motherFirstName: el.motherFirstName,
                motherMidName: el.motherMidName,
                motherLastName: el.motherLastName,
                motherPhone: el.motherPhone,
                motherEmail: el.motherEmail,
                motherOccupation: el.motherOccupation,
                motherOfficeAddress: el.motherOfficeAddress,
                motherQualification: el.motherQualification,
                motherCollegeName: el.motherCollegeName,
                motherCollegeAddress: el.motherCollegeAddress,
                motherGraduationYear: el.motherGraduationYear,
                motherGraduationCertificate: el.motherGraduationCertificate,


                guardianPic: el.guardianPic,
                guardianFirstName: el.guardianFirstName,
                guardianMidName: el.guardianMidName,
                guardianLastName: el.guardianLastName,
                guardianPhone: el.guardianPhone,
                guardianEmail: el.guardianEmail,
                guardianRelation: el.guardianRelation,
                guardianOccupation: el.guardianOccupation,
                guardianOfficeAddress: el.guardianOfficeAddress,
                guardianQualification: el.guardianQualification,
                guardianCollegeName: el.guardianCollegeName,
                guardianCollegeAddress: el.guardianCollegeAddress,
                guardianGraduationYear: el.guardianGraduationYear,
                guardianGraduationCertificate: el.guardianGraduationCertificate,

                permanentHouseNo: el.permanentHouseNo,
                permanentLocality: el.permanentLocality,
                permanentCity: el.permanentCity,
                permanentDistrict: el.currentDistrict,
                permanentState: el.permanentState,
                permanentPinCode: el.permanentPinCode,
                permanentCountry: el.permanentCountry,

                currentHouseNo: el.currentHouseNo,
                currentLocality: el.currentLocality,
                currentCity: el.currentCity,
                currentDistrict: el.currentDistrict,
                currentState: el.currentState,
                currentPinCode: el.currentPinCode,
                currentCountry: el.currentCountry,


                previousSchoolLastClass: el.previousSchoolLastClass,
                previousSchoolName: el.previousSchoolName,
                previousSchoolLocation: el.previousSchoolLocation,
                previousSchoolLeavingYear: el.previousSchoolLeavingYear,
                previousSchoolLastClassMarksheet: el.previousSchoolLastClassMarksheet,
                previousSchoolTransferCertificate: el.previousSchoolTransferCertificate,



            })
        }))



        // console.log(data);

        res.status(200).json(data)
    } catch (error) {
        console.log(error.message);

        // res.status(401).json({ message: "Unable to find students" })
    }
}

export const showRegistrationUser = async (req, res) => {

    const { StudentClass, firstName, dob, email, phone } = req.body;
    // console.log(req.body);


    const data = []
    try {

        const Students = await NewRegistration.find({ StudentClass, firstName, dob, email, phone });

        const tt = Students[0];

        return res.status(200).json(tt)

    } catch (error) {
        console.log(error.message);

        res.status(401).json({ message: "Unable to find students" })
    }
}

export const UploadStudentpic = async (req, res) => {
    try {

        const { firstName, email, StudentClass } = req.body;
        const file = req.file.filename;

        console.log(file, "yess file exist", req.body);


        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const set = await NewRegistration.findOneAndUpdate(
            { firstName, email, StudentClass },
            {
                $set: {
                    studentpic: file
                }
            }
        );

        console.log(set);


        return res.status(201).json({
            message: "Student photo Updated Successfully"
        });



    } catch (error) {
        console.error('Error sending to Python:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const UploadFatherpic = async (req, res) => {
    try {

        const { firstName, email, StudentClass } = req.body;
        const file = req.file.filename;

        console.log(file, "yess file exist", req.body);


        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const set = await NewRegistration.findOneAndUpdate(
            { firstName, email, StudentClass },
            {
                $set: {
                    fatherPic: file
                }
            }
        );

        console.log(set);


        return res.status(201).json({
            message: "Father photo Updated Successfully"
        });



    } catch (error) {
        console.error('Error sending to Python:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const UploadMotherpic = async (req, res) => {
    try {

        const { firstName, email, StudentClass } = req.body;
        const file = req.file.filename;

        console.log(file, "yess file exist", req.body);


        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const set = await NewRegistration.findOneAndUpdate(
            { firstName, email, StudentClass },
            {
                $set: {
                    motherPic: file
                }
            }
        );

        console.log(set);


        return res.status(201).json({
            message: "Mother photo Updated Successfully"
        });



    } catch (error) {
        console.error('Error sending to Python:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const UploadGuardianpic = async (req, res) => {
    try {

        const { firstName, email, StudentClass } = req.body;
        const file = req.file.filename;

        console.log(file, "yess file exist", req.body);


        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const set = await NewRegistration.findOneAndUpdate(
            { firstName, email, StudentClass },
            {
                $set: {
                    guardianPic: file
                }
            }
        );

        console.log(set);


        return res.status(201).json({
            message: "Guardian photo Updated Successfully"
        });



    } catch (error) {
        console.error('Error sending to Python:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}


// student attendance
export const UpdateStudentAttendance = async (req, res) => {
    try {
        const { StudentClass, section, studentId, attendance, month, year } = req.body;

        // Convert attendance object into array format
        const attendanceArray = Object.entries(attendance).map(([date, status]) => ({
            date,
            status
        }));

        // Step 1: Find or create attendance record for the month & year
        let record = await StudentAttendance.findOne({ month, year });
        if (!record) {
            record = new StudentAttendance({ month, year, classes: [] });
        }

        // Step 2: Find class inside "classes"
        let classDoc = record.classes.find(
            (cls) => cls.StudentClass === StudentClass && cls.section === section
        );
        if (!classDoc) {
            classDoc = { StudentClass, section, students: [] };
            record.classes.push(classDoc);
        }

        // Step 3: Find student inside class
        let studentDoc = classDoc.students.find(
            (stu) => stu.studentId.toString() === studentId.toString()
        );
        if (!studentDoc) {
            classDoc.students.push({ studentId, attendance: attendanceArray });
        } else {
            // Update attendance
            studentDoc.attendance = attendanceArray;
        }

        // Step 4: Save
        await record.save();

        res.status(200).json({ message: "Attendance updated successfully", data: record });
    } catch (error) {
        console.error("Error updating attendance:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getOneStudentAttendance = async (req, res) => {
    try {

        const { studentId, month, year, StudentClass, section } = req.body;
        console.log('step 1');


        if (!studentId || month === undefined || year === undefined || !StudentClass || !section) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        console.log('step 2');
        const attendanceDoc = await StudentAttendance.findOne({ month, year });

        if (!attendanceDoc) {
            return res.status(404).json({ message: "No attendance found for this month/year" });
        }

        console.log('step 3');
        const classData = attendanceDoc.classes.find(
            (c) => c.StudentClass === StudentClass && c.section === section
        );
        console.log(classData);

        if (!classData) {
            return res.status(404).json({ message: "Class/Section not found in this record" });
        }
        console.log('step 4');
        const studentData = classData.students.find(
            (s) => String(s.studentId) === String(studentId)
        );


        if (!studentData) {
            return res.status(404).json({ message: "Student not found in this class/section" });
        }
        console.log('step 5');
        return res.status(200).json({
            success: true,
            studentId: studentData.studentId,
            month,
            year,
            attendance: studentData.attendance,
        });
    } catch (err) {
        console.error("Error fetching student attendance:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
};

// class


// only display class students
export const getStudentsFromClass = async (req, res) => {
    const { StudentClass, section } = req.body;

    // console.log("yesss");



    try {
        const classDoc = await Classes.findOne({ StudentClass });

        if (!classDoc) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Find the section in the class
        const targetSection = classDoc.sections.find(sec => sec.section === section);

        if (!targetSection) {
            return res.status(404).json({ message: "Section not found" });
        }
        // console.log(targetSection);





        const Data = targetSection.students.map(id => id.toString());
        // console.log(Data);
        // console.log("yedssssss");

        return res.status(200).json(Data);

    } catch (error) {

    }

}

// set class students
export const setStudentsForClass = async (req, res) => {

    const { StudentClass, section, data } = req.body;

    if (!StudentClass || !section || !Array.isArray(data)) {
        return res.status(400).json({ message: 'Invalid input format' });
    }

    try {
        const classDoc = await Classes.findOne({ StudentClass });

        if (!classDoc) {
            const newClass = await Classes({
                StudentClass,
                sections: [{ section }],
            })




            await newClass.save();
        }

        // Find the specific section inside the class
        const targetSection = classDoc.sections.find(sec => sec.section === section);

        if (!targetSection) {
            const updatedClass = await Classes.findOneAndUpdate(
                { StudentClass, "sections.section": { $ne: section } }, // avoid duplicates
                { $push: { sections: { section } } },
                { new: true }
            );

            return res.status(200).json({ message: "New Class added Succesfully" })
        }

        const validStudentIds = data
            .filter(id => mongoose.Types.ObjectId.isValid(id))
            .map(id => new mongoose.Types.ObjectId(id));

        // Replace the students array with new data
        targetSection.students = validStudentIds;

        // Save the updated class document
        await classDoc.save();

        return res.status(200).json({ message: 'Section students updated successfully', students: targetSection.students });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export const getStudentsForClass = async (req, res) => {
    const { StudentClass, section } = req.body;

    console.log(req.body);


    const data = [];



    try {

        const students = await Student.find({ StudentClass, section })

        if (!students || students.length == 0) {
            return res.status(400).json({ message: "No Data Found" })
        }

        students.map((el) => {

            data.push({

                id: el.id,
                firstName: el.firstName,
                midName: el.midName,
                lastName: el.lastName,
                Roll_no: el.Roll_no,
                StudentClass: el.StudentClass,
                section: el.section,
                active: el.active

            })
        })

        return res.status(200).json(data)

    } catch (error) {

        return res.status(500).json({ message: "Internal server Error" })
    }



    return res.status(200).json({ message: "Updated Successfully" })



}

export const getClassData = async (req, res) => {
    const { StudentClass, section } = req.body;
    const data = []




    try {
        const classDoc = await Classes.findOne({ StudentClass });

        if (!classDoc) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Find the section in the class
        const targetSection = classDoc.sections.find(sec => sec.section === section);

        if (!targetSection) {
            return res.status(404).json({ message: "Section not found" });
        }





        const stu = await Student.find({ StudentClass, section })


        const matchedData = stu.filter(student => targetSection.students.includes(student.id))


        console.log(matchedData, "ji sarrr");


        matchedData.map((el) => {

            data.push({

                id: el.id,
                firstName: el.firstName,
                midName: el.midName,
                lastName: el.lastName,
                Roll_no: el.Roll_no,
                StudentClass: el.StudentClass,
                section: el.section,
                active: el.active


            })

        })

        return res.status(200).json(data)


    }

    catch (error) {

        return res.status(500).json({ message: "Internal server Error" })

    }
}



// faculty


export const addNewStaff = async (req, res) => {
    try {
        const {
            firstName,
            midName,
            lastName,
            gender,
            dob,
            email,
            phone,
            altphone,
            branch,
            roles,
        } = req.body;

        let newStaff;

        if (branch === "Academic Staff") {

            // Academic staff
            newStaff = new AcademicStaff({
                firstName,
                midName,
                lastName,
                gender,
                dob,
                email,
                phone,
                altPhone: altphone,
                role: roles,
                staffType: branch,
                designation: roles,
            });
        } else {

            // Non-academic/general staff
            newStaff = new Staff({
                firstName,
                midName,
                lastName,
                gender,
                dob,
                email,
                phone,
                alternatePhone: altphone,
                role: roles,
                staffType: branch,
                designation: roles

            });
        }

        const savedStaff = await newStaff.save();
        return res.status(201).json({
            message: "Staff added successfully",
            data: savedStaff,
        });
    } catch (error) {
        console.error("Error adding staff:", error);
        return res.status(500).json({
            message: "Failed to add staff",
            error: error.message,
        });
    }
}


export const showAllStaff = async (req, res) => {
    try {
        // Academic staff (uses phone field)
        const academicStaff = await AcademicStaff.find().select(
            "id firstName midName lastName phone email staffType designation"
        );

        // General staff (uses mobile instead of phone)
        const generalStaff = await Staff.find().select(
            "id firstName midName lastName phone email staffType designation"
        );

        // Normalize general staff to have `phone` instead of `mobile`
        const generalStaffFormatted = generalStaff.map((staff) => ({
            id: staff.id,
            firstName: staff.firstName,
            midName: staff.midName,
            lastName: staff.lastName,
            phone: staff.phone,
            email: staff.email,
            staffType: staff.staffType,
            designation: staff.designation,
        }));

        return res.status(200).json({
            message: "Staff fetched successfully",
            academic: academicStaff,   // academic staff
            general: generalStaffFormatted, // general staff
        });
    } catch (error) {
        console.error("Error fetching staff:", error);
        return res.status(500).json({
            message: "Failed to fetch staff",
            error: error.message,
        });
    }
}


export const getAcademicStaffFormData = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Academic Staff ID is required" });
        }

        // validate ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid Academic Staff ID format" });
        }

        const academicStaffData = await AcademicStaff.findById(id);

        if (!academicStaffData) {
            return res.status(404).json({ success: false, message: "Academic Staff not found" });
        }

        // Exclude sensitive fields (like password) before sending response
        const staffResponse = academicStaffData.toObject();
        delete staffResponse.password;

        return res.status(200).json({ success: true, data: staffResponse });
    } catch (error) {
        console.error("Error fetching academic staff details:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}


export const getGeneralStaffFormData = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {

            return res.status(400).json({ success: false, message: "Staff ID is required" });

        }

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {

            return res.status(400).json({ success: false, message: "Invalid Staff ID format" });

        }

        const staffData = await Staff.findById(id);

        if (!staffData) {
            return res.status(404).json({ success: false, message: "Staff not found" });
        }

        return res.status(200).json({ success: true, data: staffData });

    } catch (error) {

        console.error("Error fetching staff details:", error);
        return res.status(500).json({ success: false, message: "Server error" });

    }
}


export const updateGeneralStaffFormData = async (req, res) => {
    try {
        const { id, updateData } = req.body;
        console.log(updateData);



        if (!id) {
            return res.status(400).json({ success: false, message: "Staff ID is required" });
        }

        // validate MongoDB ObjectId format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid Staff ID format" });
        }

        // prevent password from being updated directly
        if (updateData.password) {
            delete updateData.password;
        }

        const updatedStaff = await Staff.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true } // return updated doc & apply schema validations
        );

        if (!updatedStaff) {
            return res.status(404).json({ success: false, message: "Staff not found" });
        }

        const staffResponse = updatedStaff.toObject();
        delete staffResponse.password; // hide password from response

        return res.status(200).json({
            success: true,
            message: "Staff updated successfully",
            data: staffResponse
        });
    } catch (error) {
        console.error("Error updating staff:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

// PUT /api/academic-staff/:id
export const updateAcademicStaffFormData = async (req, res) => {
    try {
        const { id, updateData } = req.body;
        console.log(updateData);

        {

            // firstName: { type: String, },
            // midName: { type: String, },
            // lastName: { type: String, },
            // gender: { type: String, },
            // dob: { type: Date },
            // nationality: { type: String },
            // maritalStatus: { type: String, }
            // bloodGroup: { type: String },
            // photo: { type: String }, // store file path or URL
            // signature: { type: String }, // store file path or URL



            // // 2. Contact Information
            // phone: { type: String },
            // altPhone: { type: String },
            // email: { type: String, },
            // presentAddress: { type: String },
            // permanentAddress: { type: String },



            // // 3. Academic & Professional Qualifications
            // highestQualification: { type: String },
            // specialization: { type: String },
            // otherCertifications: [String],
            // yearsOfExperience: { type: Number },
            // previousInstitutions: [{
            //     name: String,
            //     position: String,
            //     duration: String
            // }],
            // subjectExpertise: [String],



            // // 4. Employment Details
            // staffType: { type: String },
            // designation: { type: String },
            // department: { type: String },
            // dateOfJoining: { type: Date },
            // employeeId: { type: String },
            // employmentType: { type: String },
            // reportingAuthority: { type: String },
            // salaryDetails: {
            //     basic: { type: Number },
            //     hra: { type: Number },
            //     allowances: { type: Number }
            // },



            // // 5. Login & System Access
            // username: { type: String },
            // password: { type: String },
            // role: { type: String },
            // accessPermissions: [String],


            // // 6. Documents Upload
            // documents: {
            //     resume: { type: String },
            //     idProof: { type: String },
            //     qualificationCertificates: [String],
            //     experienceLetters: [String],
            //     policeVerification: { type: String },
            // },


            // classRange: [String],


            // classes: [
            //     { StudentClass: { type: String } },
            //     { subject: { type: String } }
            // ],



        }




        if (!id) {
            return res.status(400).json({ success: false, message: "Academic Staff ID is required" });
        }

        // Validate ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid Academic Staff ID format" });
        }

        // Prevent direct password overwrite unless explicitly allowed
        if (updateData.password) {
            delete updateData.password;
        }

        const updatedStaff = await AcademicStaff.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true } // return updated doc, apply schema validation
        );

        if (!updatedStaff) {
            return res.status(404).json({ success: false, message: "Academic Staff not found" });
        }

        const staffResponse = updatedStaff.toObject();
        delete staffResponse.password; // remove sensitive info

        return res.status(200).json({
            success: true,
            message: "Academic Staff updated successfully",
            data: staffResponse
        });
    } catch (error) {
        console.error("Error updating academic staff:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


// faculty attendance



export const updateStaffAttendance = async (req, res) => {
    try {
        const { id, staffModel, month, year, attendance } = req.body; // from frontend

        if (!id || !staffModel || !month || !year || !attendance) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Convert attendance object → array
        const attendanceArray = Object.entries(attendance).map(([date, status]) => ({
            date,
            status: status || "",
        }));

        // Step 1: Check if month-year record exists
        let record = await StaffAttendance.findOne({ month, year });

        if (record) {
            // Step 2: Check if staff exists inside this month-year
            const staffIndex = record.staffs.findIndex(
                (staff) =>
                    staff.staffId.toString() === id &&
                    staff.staffModel === staffModel
            );

            if (staffIndex > -1) {
                // Staff exists → update attendance
                record.staffs[staffIndex].attendance = attendanceArray;
            } else {
                // Staff does not exist → push new staff entry
                record.staffs.push({
                    staffId: id,
                    staffModel,
                    attendance: attendanceArray,
                });
            }

            await record.save();
        } else {
            // Step 3: Month-year does not exist → create new record
            record = new StaffAttendance({
                month,
                year,
                staffs: [
                    {
                        staffId: id,
                        staffModel,
                        attendance: attendanceArray,
                    },
                ],
            });

            await record.save();
        }

        res.status(200).json({
            message: "Attendance updated successfully",
            data: record,
        });
    } catch (error) {
        console.error("Error updating attendance:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getStaffAttendance = async (req, res) => {
    try {
        const { id, month, year } = req.body; // receiving staffId, month, year

        if (!id || !month || !year) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Step 1: Find month-year record
        const record = await StaffAttendance.findOne({ month, year })
            .populate("staffs.staffId"); // dynamic ref via refPath

        if (!record) {
            return res.status(200).json(false); // no month-year record
        }

        // Step 2: Check if staffId exists inside staffs[]
        const staffData = record.staffs.find(
            (staff) => staff.staffId && staff.staffId._id.toString() === id
        );

        if (!staffData) {
            return res.status(200).json(false); // staff not found in this month-year
        }

        // Step 3: Return staff attendance
        return res.status(200).json({
            month: record.month,
            year: record.year,
            staff: staffData,
        });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getGeneralStaffAttendance = async (req, res) => {
    try {
        const { id, month, year } = req.body;

        if (!id || !month || !year) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Step 1: Find month-year record
        const record = await StaffAttendance.findOne({ month, year })
            .populate("staffs.staffId");


        console.log(record);


        if (!record) {
            return res.status(200).json(false);
        }

        const staffData = record.staffs.find(
            (staff) => staff.staffId && staff.staffId._id.toString() === id
        );

        if (!staffData) {
            return res.status(200).json(false);
        }


        return res.status(200).json({
            month: record.month,
            year: record.year,
            staff: staffData,
        });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAcademicStaffAttendance = async (req, res) => {
    try {
        const { id, month, year } = req.body;

        if (!id || !month || !year) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Step 1: Find month-year record
        const record = await StaffAttendance.findOne({ month, year })
            .populate("staffs.staffId");




        if (!record) {
            return res.status(200).json(false);
        }

        const staffData = record.staffs.find(
            (staff) => staff.staffId && staff.staffId._id.toString() === id
        );

        if (!staffData) {
            return res.status(200).json(false);
        }


        return res.status(200).json({
            month: record.month,
            year: record.year,
            staff: staffData,
        });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const testing = async (req, res) => {

    try {
        const { StudentClass } = req.body; // get class from request params

        const result = await ClassSyllabus.aggregate([
            { $match: { StudentClass } },
            {
                $project: {
                    _id: 0,
                    syllabus: {
                        $map: {
                            input: "$syllabus",
                            as: "stream",
                            in: {
                                stream: "$$stream.stream",
                                subjects: {
                                    $map: {
                                        input: "$$stream.subjects",
                                        as: "subject",
                                        in: {
                                            subject: "$$subject.subject"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "Class not found" });
        }

        return res.status(200).json(result[0].syllabus);
    } catch (error) {
        console.error("Error fetching syllabus:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const testingElement = async (req, res) => {


    try {

        const Syllabus = [
            {

                StudentClass: "5",
                syllabus: [

                    {
                        stream: "general",
                        subjects: [
                            {
                                subject: "Mathematics",
                                chapters: [
                                    {
                                        name: "Large Numbers",
                                        brief: "Introduces reading, writing, and comparing numbers up to crores, including place value and number operations.",
                                        pdf: "/pdfs/class5/math/ch1.pdf"
                                    },
                                    {
                                        name: "Addition and Subtraction",
                                        brief: "Covers addition and subtraction of large numbers with regrouping and real-life applications.",
                                        pdf: "/pdfs/class5/math/ch2.pdf"
                                    },
                                    {
                                        name: "Multiplication",
                                        brief: "Explores multiplication of large numbers, properties, and word problems.",
                                        pdf: "/pdfs/class5/math/ch3.pdf"
                                    },
                                    {
                                        name: "Division",
                                        brief: "Teaches division of large numbers, including long division and problem-solving.",
                                        pdf: "/pdfs/class5/math/ch4.pdf"
                                    },
                                    {
                                        name: "Factors and Multiples",
                                        brief: "Introduces factors, multiples, HCF, LCM, and their applications in problem-solving.",
                                        pdf: "/pdfs/class5/math/ch5.pdf"
                                    },
                                    {
                                        name: "Fractions",
                                        brief: "Covers types of fractions, operations with fractions, and their use in daily life.",
                                        pdf: "/pdfs/class5/math/ch6.pdf"
                                    },
                                    {
                                        name: "Decimals",
                                        brief: "Explains decimal numbers, their operations, and conversion to fractions.",
                                        pdf: "/pdfs/class5/math/ch7.pdf"
                                    },
                                    {
                                        name: "Geometry: Shapes and Angles",
                                        brief: "Introduces basic shapes, angles, and their properties with practical examples.",
                                        pdf: "/pdfs/class5/math/ch8.pdf"
                                    },
                                    {
                                        name: "Measurement: Length, Weight, and Capacity",
                                        brief: "Teaches units of measurement and conversions for length, weight, and capacity.",
                                        pdf: "/pdfs/class5/math/ch9.pdf"
                                    },
                                    {
                                        name: "Time and Money",
                                        brief: "Covers reading time, time conversions, and calculations involving money.",
                                        pdf: "/pdfs/class5/math/ch10.pdf"
                                    },
                                    {
                                        name: "Perimeter and Area",
                                        brief: "Explains calculating perimeter and area of basic shapes like rectangles and squares.",
                                        pdf: "/pdfs/class5/math/ch11.pdf"
                                    },
                                    {
                                        name: "Data Handling",
                                        brief: "Introduces data collection, organization, and representation using tables and graphs.",
                                        pdf: "/pdfs/class5/math/ch12.pdf"
                                    }
                                ]
                            },
                            {
                                subject: "English",
                                chapters: [
                                    {
                                        name: "Nouns and Pronouns",
                                        brief: "Explains types of nouns and pronouns with their usage in sentences.",
                                        pdf: "/pdfs/class5/english/ch1.pdf"
                                    },
                                    {
                                        name: "Verbs and Tenses",
                                        brief: "Covers verbs, their forms, and tenses to describe actions accurately.",
                                        pdf: "/pdfs/class5/english/ch2.pdf"
                                    },
                                    {
                                        name: "Adjectives and Adverbs",
                                        brief: "Teaches adjectives for describing nouns and adverbs for modifying verbs.",
                                        pdf: "/pdfs/class5/english/ch3.pdf"
                                    },
                                    {
                                        name: "Prepositions and Conjunctions",
                                        brief: "Explores prepositions for relationships and conjunctions for connecting ideas.",
                                        pdf: "/pdfs/class5/english/ch4.pdf"
                                    },
                                    {
                                        name: "Sentences and Punctuation",
                                        brief: "Introduces sentence types and punctuation rules for clear communication.",
                                        pdf: "/pdfs/class5/english/ch5.pdf"
                                    },
                                    {
                                        name: "Reading Comprehension",
                                        brief: "Develops skills to understand and answer questions based on passages.",
                                        pdf: "/pdfs/class5/english/ch6.pdf"
                                    },
                                    {
                                        name: "Poetry: Understanding and Appreciation",
                                        brief: "Explores poems, their themes, and literary devices for appreciation.",
                                        pdf: "/pdfs/class5/english/ch7.pdf"
                                    },
                                    {
                                        name: "Story Writing",
                                        brief: "Teaches elements of storytelling and creative writing techniques.",
                                        pdf: "/pdfs/class5/english/ch8.pdf"
                                    },
                                    {
                                        name: "Letter Writing",
                                        brief: "Covers formats for formal and informal letter writing.",
                                        pdf: "/pdfs/class5/english/ch9.pdf"
                                    },
                                    {
                                        name: "Grammar in Context",
                                        brief: "Applies grammar rules in practical writing and speaking scenarios.",
                                        pdf: "/pdfs/class5/english/ch10.pdf"
                                    },
                                    {
                                        name: "Vocabulary Building",
                                        brief: "Introduces new words, synonyms, and antonyms to enhance language skills.",
                                        pdf: "/pdfs/class5/english/ch11.pdf"
                                    },
                                    {
                                        name: "Spelling and Dictation",
                                        brief: "Focuses on correct spelling and dictation to improve accuracy.",
                                        pdf: "/pdfs/class5/english/ch12.pdf"
                                    }
                                ]
                            },
                            {
                                subject: "Science",
                                chapters: [
                                    {
                                        name: "Living and Non-Living Things",
                                        brief: "Differentiates between living and non-living things based on characteristics.",
                                        pdf: "/pdfs/class5/science/ch1.pdf"
                                    },
                                    {
                                        name: "Plants: Structure and Functions",
                                        brief: "Explores plant parts, their functions, and processes like photosynthesis.",
                                        pdf: "/pdfs/class5/science/ch2.pdf"
                                    },
                                    {
                                        name: "Animals: Habitats and Adaptations",
                                        brief: "Studies animal habitats and adaptations for survival.",
                                        pdf: "/pdfs/class5/science/ch3.pdf"
                                    },
                                    {
                                        name: "Human Body: Organs and Systems",
                                        brief: "Introduces major organs and systems like digestive and respiratory.",
                                        pdf: "/pdfs/class5/science/ch4.pdf"
                                    },
                                    {
                                        name: "Food and Nutrition",
                                        brief: "Explains nutrients, balanced diets, and their importance for health.",
                                        pdf: "/pdfs/class5/science/ch5.pdf"
                                    },
                                    {
                                        name: "Matter and Its States",
                                        brief: "Covers states of matter and their properties with examples.",
                                        pdf: "/pdfs/class5/science/ch6.pdf"
                                    },
                                    {
                                        name: "Force, Work, and Energy",
                                        brief: "Introduces forces, work, and types of energy with practical applications.",
                                        pdf: "/pdfs/class5/science/ch7.pdf"
                                    },
                                    {
                                        name: "Light and Sound",
                                        brief: "Explores properties of light and sound, including reflection and vibration.",
                                        pdf: "/pdfs/class5/science/ch8.pdf"
                                    },
                                    {
                                        name: "Air and Water",
                                        brief: "Studies the composition and importance of air and water in life.",
                                        pdf: "/pdfs/class5/science/ch9.pdf"
                                    },
                                    {
                                        name: "Weather and Seasons",
                                        brief: "Explains weather patterns, seasons, and their impact on life.",
                                        pdf: "/pdfs/class5/science/ch10.pdf"
                                    },
                                    {
                                        name: "Earth and Universe",
                                        brief: "Introduces Earth’s structure, solar system, and celestial bodies.",
                                        pdf: "/pdfs/class5/science/ch11.pdf"
                                    },
                                    {
                                        name: "Environmental Conservation",
                                        brief: "Teaches the importance of conserving natural resources and ecosystems.",
                                        pdf: "/pdfs/class5/science/ch12.pdf"
                                    }
                                ]
                            },
                            {
                                subject: "Social Studies",
                                chapters: [
                                    {
                                        name: "Our Earth: Continents and Oceans",
                                        brief: "Explores continents, oceans, and their geographical significance.",
                                        pdf: "/pdfs/class5/socialstudies/ch1.pdf"
                                    },
                                    {
                                        name: "Maps and Globes",
                                        brief: "Teaches reading maps and globes, including symbols and directions.",
                                        pdf: "/pdfs/class5/socialstudies/ch2.pdf"
                                    },
                                    {
                                        name: "Weather and Climate",
                                        brief: "Differentiates between weather and climate with examples.",
                                        pdf: "/pdfs/class5/socialstudies/ch3.pdf"
                                    },
                                    {
                                        name: "Natural Resources",
                                        brief: "Covers types of natural resources and their sustainable use.",
                                        pdf: "/pdfs/class5/socialstudies/ch4.pdf"
                                    },
                                    {
                                        name: "Indian History: Early Civilizations",
                                        brief: "Introduces ancient Indian civilizations like Harappa and Mohenjo-Daro.",
                                        pdf: "/pdfs/class5/socialstudies/ch5.pdf"
                                    },
                                    {
                                        name: "Freedom Struggle",
                                        brief: "Explores key events and leaders of India’s freedom movement.",
                                        pdf: "/pdfs/class5/socialstudies/ch6.pdf"
                                    },
                                    {
                                        name: "Our Government",
                                        brief: "Explains the structure and functions of the Indian government.",
                                        pdf: "/pdfs/class5/socialstudies/ch7.pdf"
                                    },
                                    {
                                        name: "Rights and Duties",
                                        brief: "Teaches fundamental rights and duties of Indian citizens.",
                                        pdf: "/pdfs/class5/socialstudies/ch8.pdf"
                                    },
                                    {
                                        name: "Transport and Communication",
                                        brief: "Covers modes of transport and communication systems.",
                                        pdf: "/pdfs/class5/socialstudies/ch9.pdf"
                                    },
                                    {
                                        name: "People and Their Occupations",
                                        brief: "Explores various occupations and their roles in society.",
                                        pdf: "/pdfs/class5/socialstudies/ch10.pdf"
                                    },
                                    {
                                        name: "Festivals of India",
                                        brief: "Introduces major Indian festivals and their cultural significance.",
                                        pdf: "/pdfs/class5/socialstudies/ch11.pdf"
                                    },
                                    {
                                        name: "Our Environment",
                                        brief: "Teaches environmental protection and sustainable practices.",
                                        pdf: "/pdfs/class5/socialstudies/ch12.pdf"
                                    }
                                ]
                            },
                            {
                                subject: "Hindi",
                                chapters: [
                                    {
                                        name: "Alphabet and Vowels",
                                        brief: "Introduces Hindi varnmala, vowels, and their pronunciation.",
                                        pdf: "/pdfs/class5/hindi/ch1.pdf"
                                    },
                                    {
                                        name: "Words and Sentences",
                                        brief: "Teaches formation of words and sentences in Hindi.",
                                        pdf: "/pdfs/class5/hindi/ch2.pdf"
                                    },
                                    {
                                        name: "Nouns",
                                        brief: "Explains types of nouns (sangya) and their usage in Hindi.",
                                        pdf: "/pdfs/class5/hindi/ch3.pdf"
                                    },
                                    {
                                        name: "Pronouns",
                                        brief: "Covers pronouns (sarvnaam) and their role in sentences.",
                                        pdf: "/pdfs/class5/hindi/ch4.pdf"
                                    },
                                    {
                                        name: "Adjectives",
                                        brief: "Introduces adjectives (visheshan) to describe nouns.",
                                        pdf: "/pdfs/class5/hindi/ch5.pdf"
                                    },
                                    {
                                        name: "Verbs",
                                        brief: "Teaches verbs (kriya) and their conjugation in Hindi.",
                                        pdf: "/pdfs/class5/hindi/ch6.pdf"
                                    },
                                    {
                                        name: "Punctuation",
                                        brief: "Explains punctuation marks (viram chinh) in Hindi writing.",
                                        pdf: "/pdfs/class5/hindi/ch7.pdf"
                                    },
                                    {
                                        name: "Reading and Comprehension",
                                        brief: "Develops skills to read and understand Hindi passages.",
                                        pdf: "/pdfs/class5/hindi/ch8.pdf"
                                    },
                                    {
                                        name: "Poetry",
                                        brief: "Introduces Hindi poems and their themes for appreciation.",
                                        pdf: "/pdfs/class5/hindi/ch9.pdf"
                                    },
                                    {
                                        name: "Story Writing",
                                        brief: "Teaches creative story writing in Hindi with structure.",
                                        pdf: "/pdfs/class5/hindi/ch10.pdf"
                                    },
                                    {
                                        name: "Letter Writing",
                                        brief: "Covers formats for formal and informal letter writing in Hindi.",
                                        pdf: "/pdfs/class5/hindi/ch11.pdf"
                                    },
                                    {
                                        name: "Idioms and Proverbs",
                                        brief: "Introduces common Hindi idioms (muhavare) and proverbs (lokoktiyaan).",
                                        pdf: "/pdfs/class5/hindi/ch12.pdf"
                                    }
                                ]
                            },
                            {
                                subject: "Computer Science",
                                chapters: [
                                    {
                                        name: "Introduction to Computers",
                                        brief: "Covers basics of computers and their evolution.",
                                        pdf: "/pdfs/class6/computerscience/ch1.pdf"
                                    },
                                    {
                                        name: "Computer Components and Hardware",
                                        brief: "Explains hardware components like CPU, memory, and storage.",
                                        pdf: "/pdfs/class6/computerscience/ch2.pdf"
                                    },
                                    {
                                        name: "Operating Systems: Basics",
                                        brief: "Introduces operating systems and their functions.",
                                        pdf: "/pdfs/class6/computerscience/ch3.pdf"
                                    },
                                    {
                                        name: "Introduction to MS Office",
                                        brief: "Covers basics of MS Office tools like Word and Excel.",
                                        pdf: "/pdfs/class6/computerscience/ch4.pdf"
                                    },
                                    {
                                        name: "Word Processing: MS Word",
                                        brief: "Teaches document creation and formatting in MS Word.",
                                        pdf: "/pdfs/class6/computerscience/ch5.pdf"
                                    },
                                    {
                                        name: "Spreadsheets: MS Excel",
                                        brief: "Explains spreadsheet creation and basic functions in Excel.",
                                        pdf: "/pdfs/class6/computerscience/ch6.pdf"
                                    },
                                    {
                                        name: "Internet and Email Basics",
                                        brief: "Covers internet usage and email communication.",
                                        pdf: "/pdfs/class6/computerscience/ch7.pdf"
                                    },
                                    {
                                        name: "Introduction to Coding: Scratch",
                                        brief: "Introduces block-based coding using Scratch.",
                                        pdf: "/pdfs/class6/computerscience/ch8.pdf"
                                    },
                                    {
                                        name: "Cyber Safety and Ethics",
                                        brief: "Teaches safe internet practices and digital ethics.",
                                        pdf: "/pdfs/class6/computerscience/ch9.pdf"
                                    },
                                    {
                                        name: "File Management",
                                        brief: "Explains organizing and managing files on a computer.",
                                        pdf: "/pdfs/class6/computerscience/ch10.pdf"
                                    },
                                    {
                                        name: "Basic Troubleshooting",
                                        brief: "Covers basic computer problem-solving techniques.",
                                        pdf: "/pdfs/class6/computerscience/ch11.pdf"
                                    }
                                ]
                            },
                            {
                                subject: "General Knowledge",
                                chapters: [
                                    {
                                        name: "Current Affairs: National and International",
                                        brief: "Covers recent national and global events.",
                                        pdf: "/pdfs/class6/generalknowledge/ch1.pdf"
                                    },
                                    {
                                        name: "Famous Personalities",
                                        brief: "Introduces notable figures and their contributions.",
                                        pdf: "/pdfs/class6/generalknowledge/ch2.pdf"
                                    },
                                    {
                                        name: "Countries and Capitals",
                                        brief: "Teaches countries, their capitals, and basic geography.",
                                        pdf: "/pdfs/class6/generalknowledge/ch3.pdf"
                                    },
                                    {
                                        name: "Books and Authors",
                                        brief: "Explores famous books and their authors.",
                                        pdf: "/pdfs/class6/generalknowledge/ch4.pdf"
                                    },
                                    {
                                        name: "Sports and Awards",
                                        brief: "Covers major sports events and awards.",
                                        pdf: "/pdfs/class6/generalknowledge/ch5.pdf"
                                    },
                                    {
                                        name: "Indian Culture and Heritage",
                                        brief: "Introduces India’s cultural and historical heritage.",
                                        pdf: "/pdfs/class6/generalknowledge/ch6.pdf"
                                    },
                                    {
                                        name: "Science and Technology",
                                        brief: "Explores recent advancements in science and technology.",
                                        pdf: "/pdfs/class6/generalknowledge/ch7.pdf"
                                    },
                                    {
                                        name: "Wildlife and Conservation",
                                        brief: "Teaches about wildlife and conservation efforts.",
                                        pdf: "/pdfs/class6/generalknowledge/ch8.pdf"
                                    },
                                    {
                                        name: "Important Days and Events",
                                        brief: "Covers significant dates and events globally.",
                                        pdf: "/pdfs/class6/generalknowledge/ch9.pdf"
                                    },
                                    {
                                        name: "General Science Facts",
                                        brief: "Introduces interesting science facts for general knowledge.",
                                        pdf: "/pdfs/class6/generalknowledge/ch10.pdf"
                                    },
                                    {
                                        name: "Historical Monuments",
                                        brief: "Explores famous historical monuments and their significance.",
                                        pdf: "/pdfs/class6/generalknowledge/ch11.pdf"
                                    }
                                ]
                            }
                        ]


                    }
                ]

            },
            {

                StudentClass: "6",
                syllabus: [
                    {
                        stream: "general",
                        subjects: [
                            {
                                subject: "Mathematics",
                                chapters: [
                                    {
                                        name: "Knowing Our Numbers",
                                        brief: "Covers large numbers, estimation, and Roman numerals.",
                                        pdf: "/pdfs/class6/math/ch1.pdf"
                                    },
                                    {
                                        name: "Whole Numbers",
                                        brief: "Explores properties of whole numbers and basic operations.",
                                        pdf: "/pdfs/class6/math/ch2.pdf"
                                    },
                                    {
                                        name: "Playing with Numbers",
                                        brief: "Teaches divisibility rules, HCF, and LCM applications.",
                                        pdf: "/pdfs/class6/math/ch3.pdf"
                                    },
                                    {
                                        name: "Basic Geometrical Ideas",
                                        brief: "Introduces points, lines, angles, and basic shapes.",
                                        pdf: "/pdfs/class6/math/ch4.pdf"
                                    },
                                    {
                                        name: "Integers",
                                        brief: "Covers integers, their representation, and operations.",
                                        pdf: "/pdfs/class6/math/ch5.pdf"
                                    },
                                    {
                                        name: "Fractions",
                                        brief: "Explains types of fractions and their operations.",
                                        pdf: "/pdfs/class6/math/ch6.pdf"
                                    },
                                    {
                                        name: "Decimals",
                                        brief: "Teaches decimal operations and conversions with fractions.",
                                        pdf: "/pdfs/class6/math/ch7.pdf"
                                    },
                                    {
                                        name: "Data Handling",
                                        brief: "Covers data collection, pictographs, and bar graphs.",
                                        pdf: "/pdfs/class6/math/ch8.pdf"
                                    },
                                    {
                                        name: "Mensuration: Perimeter and Area",
                                        brief: "Explains calculating perimeter and area of shapes.",
                                        pdf: "/pdfs/class6/math/ch9.pdf"
                                    },
                                    {
                                        name: "Algebra: Introduction",
                                        brief: "Introduces variables, expressions, and basic equations.",
                                        pdf: "/pdfs/class6/math/ch10.pdf"
                                    },
                                    {
                                        name: "Ratio and Proportion",
                                        brief: "Teaches ratios, proportions, and their applications.",
                                        pdf: "/pdfs/class6/math/ch11.pdf"
                                    },
                                    {
                                        name: "Symmetry",
                                        brief: "Explores line and rotational symmetry in shapes.",
                                        pdf: "/pdfs/class6/math/ch12.pdf"
                                    },
                                    {
                                        name: "Practical Geometry",
                                        brief: "Teaches construction of shapes using compass and ruler.",
                                        pdf: "/pdfs/class6/math/ch13.pdf"
                                    }
                                ]
                            },
                            {
                                subject: "English",
                                chapters: [
                                    {
                                        name: "Parts of Speech: Revision",
                                        brief: "Revises nouns, verbs, adjectives, and other parts of speech.",
                                        pdf: "/pdfs/class6/english/ch1.pdf"
                                    },
                                    {
                                        name: "Tenses: Present, Past, and Future",
                                        brief: "Explains verb tenses and their usage in sentences.",
                                        pdf: "/pdfs/class6/english/ch2.pdf"
                                    },
                                    {
                                        name: "Active and Passive Voice",
                                        brief: "Teaches active and passive voice for sentence construction.",
                                        pdf: "/pdfs/class6/english/ch3.pdf"
                                    },
                                    {
                                        name: "Direct and Indirect Speech",
                                        brief: "Covers conversion between direct and indirect speech.",
                                        pdf: "/pdfs/class6/english/ch4.pdf"
                                    },
                                    {
                                        name: "Sentence Structure",
                                        brief: "Explores types of sentences and their structures.",
                                        pdf: "/pdfs/class6/english/ch5.pdf"
                                    },
                                    {
                                        name: "Reading Comprehension",
                                        brief: "Develops skills to understand and analyze passages.",
                                        pdf: "/pdfs/class6/english/ch6.pdf"
                                    },
                                    {
                                        name: "Poetry: Analysis and Appreciation",
                                        brief: "Teaches analysis of poems and literary devices.",
                                        pdf: "/pdfs/class6/english/ch7.pdf"
                                    },
                                    {
                                        name: "Essay Writing",
                                        brief: "Guides writing structured essays on various topics.",
                                        pdf: "/pdfs/class6/english/ch8.pdf"
                                    },
                                    {
                                        name: "Formal and Informal Letter Writing",
                                        brief: "Covers formats for formal and informal letters.",
                                        pdf: "/pdfs/class6/english/ch9.pdf"
                                    },
                                    {
                                        name: "Diary Entry",
                                        brief: "Teaches writing personal reflections in diary format.",
                                        pdf: "/pdfs/class6/english/ch10.pdf"
                                    },
                                    {
                                        name: "Vocabulary Enhancement",
                                        brief: "Introduces new words, synonyms, and antonyms.",
                                        pdf: "/pdfs/class6/english/ch11.pdf"
                                    },
                                    {
                                        name: "Spelling and Grammar Practice",
                                        brief: "Focuses on improving spelling and grammar accuracy.",
                                        pdf: "/pdfs/class6/english/ch12.pdf"
                                    }
                                ]
                            },
                            {
                                subject: "Science",
                                chapters: [
                                    {
                                        name: "Food: Where Does It Come From?",
                                        brief: "Explores sources of food and food chains.",
                                        pdf: "/pdfs/class6/science/ch1.pdf"
                                    },
                                    {
                                        name: "Components of Food",
                                        brief: "Teaches nutrients and their roles in a balanced diet.",
                                        pdf: "/pdfs/class6/science/ch2.pdf"
                                    },
                                    {
                                        name: "Fibre to Fabric",
                                        brief: "Covers natural and synthetic fibres and fabric production.",
                                        pdf: "/pdfs/class6/science/ch3.pdf"
                                    },
                                    {
                                        name: "Sorting Materials into Groups",
                                        brief: "Explains classification of materials based on properties.",
                                        pdf: "/pdfs/class6/science/ch4.pdf"
                                    },
                                    {
                                        name: "Separation of Substances",
                                        brief: "Teaches methods like filtration and distillation.",
                                        pdf: "/pdfs/class6/science/ch5.pdf"
                                    },
                                    {
                                        name: "Changes Around Us",
                                        brief: "Explores reversible and irreversible changes.",
                                        pdf: "/pdfs/class6/science/ch6.pdf"
                                    },
                                    {
                                        name: "Living Organisms and Their Surroundings",
                                        brief: "Studies habitats and adaptations of organisms.",
                                        pdf: "/pdfs/class6/science/ch7.pdf"
                                    },
                                    {
                                        name: "Motion and Measurement of Distances",
                                        brief: "Covers types of motion and measurement units.",
                                        pdf: "/pdfs/class6/science/ch8.pdf"
                                    },
                                    {
                                        name: "Light, Shadows, and Reflections",
                                        brief: "Explains properties of light, shadows, and reflections.",
                                        pdf: "/pdfs/class6/science/ch9.pdf"
                                    },
                                    {
                                        name: "Electricity and Circuits",
                                        brief: "Introduces electric circuits and their components.",
                                        pdf: "/pdfs/class6/science/ch10.pdf"
                                    },
                                    {
                                        name: "Fun with Magnets",
                                        brief: "Teaches properties of magnets and their applications.",
                                        pdf: "/pdfs/class6/science/ch11.pdf"
                                    },
                                    {
                                        name: "Water and Its Importance",
                                        brief: "Explores water sources, uses, and conservation.",
                                        pdf: "/pdfs/class6/science/ch12.pdf"
                                    },
                                    {
                                        name: "Air Around Us",
                                        brief: "Covers composition and importance of air.",
                                        pdf: "/pdfs/class6/science/ch13.pdf"
                                    }
                                ]
                            },
                            {
                                subject: "Social Studies",
                                chapters: [
                                    {
                                        name: "The Earth in the Solar System",
                                        brief: "Introduces the solar system and Earth’s place in it.",
                                        pdf: "/pdfs/class6/socialstudies/ch1.pdf"
                                    },
                                    {
                                        name: "Globe: Latitudes and Longitudes",
                                        brief: "Teaches reading globes using latitudes and longitudes.",
                                        pdf: "/pdfs/class6/socialstudies/ch2.pdf"
                                    },
                                    {
                                        name: "Motions of the Earth",
                                        brief: "Explains rotation and revolution of Earth.",
                                        pdf: "/pdfs/class6/socialstudies/ch3.pdf"
                                    },
                                    {
                                        name: "Maps",
                                        brief: "Covers types of maps and their uses.",
                                        pdf: "/pdfs/class6/socialstudies/ch4.pdf"
                                    },
                                    {
                                        name: "Major Domains of the Earth",
                                        brief: "Explores lithosphere, hydrosphere, and atmosphere.",
                                        pdf: "/pdfs/class6/socialstudies/ch5.pdf"
                                    },
                                    {
                                        name: "Ancient Civilizations: Indus Valley",
                                        brief: "Studies the Indus Valley civilization and its features.",
                                        pdf: "/pdfs/class6/socialstudies/ch6.pdf"
                                    },
                                    {
                                        name: "The Vedic Period",
                                        brief: "Introduces the Vedic age and its cultural significance.",
                                        pdf: "/pdfs/class6/socialstudies/ch7.pdf"
                                    },
                                    {
                                        name: "What is Government?",
                                        brief: "Explains types and functions of government.",
                                        pdf: "/pdfs/class6/socialstudies/ch8.pdf"
                                    },
                                    {
                                        name: "Panchayati Raj",
                                        brief: "Covers the structure of local self-government in India.",
                                        pdf: "/pdfs/class6/socialstudies/ch9.pdf"
                                    },
                                    {
                                        name: "Urban and Rural Life",
                                        brief: "Compares lifestyles in urban and rural areas.",
                                        pdf: "/pdfs/class6/socialstudies/ch10.pdf"
                                    },
                                    {
                                        name: "Diversity and Discrimination",
                                        brief: "Teaches about diversity and combating discrimination.",
                                        pdf: "/pdfs/class6/socialstudies/ch11.pdf"
                                    },
                                    {
                                        name: "Key Elements of a Democratic Government",
                                        brief: "Explains principles of democracy and citizen roles.",
                                        pdf: "/pdfs/class6/socialstudies/ch12.pdf"
                                    }
                                ]
                            },
                            {
                                subject: "Hindi",
                                chapters: [
                                    {
                                        name: "Varnmala aur Matra",
                                        brief: "Covers Hindi alphabet and vowel signs with pronunciation.",
                                        pdf: "/pdfs/class6/hindi/ch1.pdf"
                                    },
                                    {
                                        name: "Shabd aur Vakya",
                                        brief: "Teaches word formation and sentence construction in Hindi.",
                                        pdf: "/pdfs/class6/hindi/ch2.pdf"
                                    },
                                    {
                                        name: "Sangya",
                                        brief: "Explains types of nouns and their usage in Hindi.",
                                        pdf: "/pdfs/class6/hindi/ch3.pdf"
                                    },
                                    {
                                        name: "Sarvnaam",
                                        brief: "Covers pronouns and their application in sentences.",
                                        pdf: "/pdfs/class6/hindi/ch4.pdf"
                                    },
                                    {
                                        name: "Visheshan",
                                        brief: "Introduces adjectives to describe nouns in Hindi.",
                                        pdf: "/pdfs/class6/hindi/ch5.pdf"
                                    },
                                    {
                                        name: "Kriya",
                                        brief: "Teaches verbs and their conjugation in Hindi.",
                                        pdf: "/pdfs/class6/hindi/ch6.pdf"
                                    },
                                    {
                                        name: "Viram Chinh",
                                        brief: "Explains punctuation marks for Hindi writing.",
                                        pdf: "/pdfs/class6/hindi/ch7.pdf"
                                    },
                                    {
                                        name: "Pathan aur Samajh",
                                        brief: "Develops reading and comprehension skills for Hindi texts.",
                                        pdf: "/pdfs/class6/hindi/ch8.pdf"
                                    },
                                    {
                                        name: "Kavita: Arth aur Bhav",
                                        brief: "Explores Hindi poems, their meaning, and emotions.",
                                        pdf: "/pdfs/class6/hindi/ch9.pdf"
                                    },
                                    {
                                        name: "Kahani Lekhan",
                                        brief: "Guides writing creative stories in Hindi.",
                                        pdf: "/pdfs/class6/hindi/ch10.pdf"
                                    },
                                    {
                                        name: "Patr Lekhan: Formal aur Informal",
                                        brief: "Teaches formats for formal and informal letters in Hindi.",
                                        pdf: "/pdfs/class6/hindi/ch11.pdf"
                                    },
                                    {
                                        name: "Muhavare aur Lokoktiyaan",
                                        brief: "Introduces Hindi idioms and proverbs with meanings.",
                                        pdf: "/pdfs/class6/hindi/ch12.pdf"
                                    }
                                ]
                            },
                            {
                                subject: "Computer Science",
                                chapters: [
                                    {
                                        name: "Introduction to Computers",
                                        brief: "Covers basics of computers and their evolution.",
                                        pdf: "/pdfs/class6/computerscience/ch1.pdf"
                                    },
                                    {
                                        name: "Computer Components and Hardware",
                                        brief: "Explains hardware components like CPU, memory, and storage.",
                                        pdf: "/pdfs/class6/computerscience/ch2.pdf"
                                    },
                                    {
                                        name: "Operating Systems: Basics",
                                        brief: "Introduces operating systems and their functions.",
                                        pdf: "/pdfs/class6/computerscience/ch3.pdf"
                                    },
                                    {
                                        name: "Introduction to MS Office",
                                        brief: "Covers basics of MS Office tools like Word and Excel.",
                                        pdf: "/pdfs/class6/computerscience/ch4.pdf"
                                    },
                                    {
                                        name: "Word Processing: MS Word",
                                        brief: "Teaches document creation and formatting in MS Word.",
                                        pdf: "/pdfs/class6/computerscience/ch5.pdf"
                                    },
                                    {
                                        name: "Spreadsheets: MS Excel",
                                        brief: "Explains spreadsheet creation and basic functions in Excel.",
                                        pdf: "/pdfs/class6/computerscience/ch6.pdf"
                                    },
                                    {
                                        name: "Internet and Email Basics",
                                        brief: "Covers internet usage and email communication.",
                                        pdf: "/pdfs/class6/computerscience/ch7.pdf"
                                    },
                                    {
                                        name: "Introduction to Coding: Scratch",
                                        brief: "Introduces block-based coding using Scratch.",
                                        pdf: "/pdfs/class6/computerscience/ch8.pdf"
                                    },
                                    {
                                        name: "Cyber Safety and Ethics",
                                        brief: "Teaches safe internet practices and digital ethics.",
                                        pdf: "/pdfs/class6/computerscience/ch9.pdf"
                                    },
                                    {
                                        name: "File Management",
                                        brief: "Explains organizing and managing files on a computer.",
                                        pdf: "/pdfs/class6/computerscience/ch10.pdf"
                                    },
                                    {
                                        name: "Basic Troubleshooting",
                                        brief: "Covers basic computer problem-solving techniques.",
                                        pdf: "/pdfs/class6/computerscience/ch11.pdf"
                                    }
                                ]
                            },
                            {
                                subject: "General Knowledge",
                                chapters: [
                                    {
                                        name: "Current Affairs: National and International",
                                        brief: "Covers recent national and global events.",
                                        pdf: "/pdfs/class6/generalknowledge/ch1.pdf"
                                    },
                                    {
                                        name: "Famous Personalities",
                                        brief: "Introduces notable figures and their contributions.",
                                        pdf: "/pdfs/class6/generalknowledge/ch2.pdf"
                                    },
                                    {
                                        name: "Countries and Capitals",
                                        brief: "Teaches countries, their capitals, and basic geography.",
                                        pdf: "/pdfs/class6/generalknowledge/ch3.pdf"
                                    },
                                    {
                                        name: "Books and Authors",
                                        brief: "Explores famous books and their authors.",
                                        pdf: "/pdfs/class6/generalknowledge/ch4.pdf"
                                    },
                                    {
                                        name: "Sports and Awards",
                                        brief: "Covers major sports events and awards.",
                                        pdf: "/pdfs/class6/generalknowledge/ch5.pdf"
                                    },
                                    {
                                        name: "Indian Culture and Heritage",
                                        brief: "Introduces India’s cultural and historical heritage.",
                                        pdf: "/pdfs/class6/generalknowledge/ch6.pdf"
                                    },
                                    {
                                        name: "Science and Technology",
                                        brief: "Explores recent advancements in science and technology.",
                                        pdf: "/pdfs/class6/generalknowledge/ch7.pdf"
                                    },
                                    {
                                        name: "Wildlife and Conservation",
                                        brief: "Teaches about wildlife and conservation efforts.",
                                        pdf: "/pdfs/class6/generalknowledge/ch8.pdf"
                                    },
                                    {
                                        name: "Important Days and Events",
                                        brief: "Covers significant dates and events globally.",
                                        pdf: "/pdfs/class6/generalknowledge/ch9.pdf"
                                    },
                                    {
                                        name: "General Science Facts",
                                        brief: "Introduces interesting science facts for general knowledge.",
                                        pdf: "/pdfs/class6/generalknowledge/ch10.pdf"
                                    },
                                    {
                                        name: "Historical Monuments",
                                        brief: "Explores famous historical monuments and their significance.",
                                        pdf: "/pdfs/class6/generalknowledge/ch11.pdf"
                                    }
                                ]
                            }
                        ]
                    }
                ]


            }
        ];




        await ClassSyllabus.insertMany(Syllabus);

        console.log("Data inserted successfully");

        res.status(200).json({ message: 'Submitted succesfully' });

    } catch (error) {
        console.error('Error sending to testing:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }



}