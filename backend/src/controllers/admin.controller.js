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

    const { staffId, month, year, newStatus } = req.body;
    try {
        const { date, status, remark } = newStatus; // newStatus should include date, status, and remark

        // Find the attendance document
        const attendanceDoc = await StaffAttendance.findOne({ staffId, month, year });

        if (!attendanceDoc) {
            console.log('No attendance document found');
            return;
        }


        const index = attendanceDoc.attendance.findIndex(entry =>
            entry.date.toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]
        );

        if (index !== -1) {
            // Replace existing entry
            attendanceDoc.attendance[index] = newStatus;
        } else {
            // If not found, optionally push the new status
            attendanceDoc.attendance.push(newStatus);
        }

        // Save the document
        await attendanceDoc.save();
        console.log('Attendance updated successfully');
    } catch (error) {
        console.error('Error updating attendance:', error);
    }

}

export const GetAllStudentAttendance = async (req, res) => {

    const { StudentClass, section, month } = req.body;

    const attendance = [];

    const record = await StudentAttendance.findOne({
        StudentClass,
        section,
        "months.month": month,
    }, {
        "months.$": 1 // projection: return only the matched month
    });





    const checkEvent = Event.findOne({ year, month });

    if (checkEvent) {



        checkEvent.dates.map((el) => {
            // if el.date exist in attendance then replace attendance with event value it


        })

    }
}

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

export const getClassAttendanceData = async (req, res) => {

    const { StudentClass, section, date, month, year } = req.body;

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


        const attendanceClass = StudentAttendance.findOne({ StudentClass, section })


        if (!attendanceClass) {
            const attendanceClass = new StudentAttendance({
                StudentClass,
                section,
                months: [year, month]
            })

            const AttMonth = attendanceClass.months.push({
                year,
                month
            })




            // await attendanceClass.save()

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

        const targetedMonth = classDoc.months.find(sec => sec.section === section);


        const attendanceData = matchedData
            .map(s => {
                const matched = attendance.find(a => a.id === s.id);
                if (matched) {
                    return { ...s, status: matched.status };
                }
                return null;
            })
            .filter(Boolean); // remove nulls

        attendanceData.map((el) => {

            data.push({

                id: el.id,
                firstName: el.firstName,
                midName: el.midName,
                lastName: el.lastName,
                Roll_no: el.Roll_no,
                StudentClass: el.StudentClass,
                section: el.section,
                active: el.active,
                status: el.status

            })

        })







    }
    catch (error) {

        return res.status(500).json({ message: "Internal server Error" })

    }
}

export const setClassAttendanceData = async (req, res) => {

    const { StudentClass, section, date, month, year, updatingData } = req.body;

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


        const attendanceClass = StudentAttendance.findOne({ StudentClass, section })

        if (!attendanceClass) {
            const attendanceClass = StudentAttendance({
                StudentClass,
                section
            })

            attendanceClass.months.push({
                year,
                month
            })


            await attendanceClass.save()

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

        const targetedMonth = classDoc.months.find(sec => sec.section === section);


        const attendanceData = matchedData
            .map(s => {
                const matched = attendance.find(a => a.id === s.id);
                if (matched) {
                    return { ...s, status: matched.status };
                }
                return null;
            })
            .filter(Boolean); // remove nulls

        attendanceData.map((el) => {

            data.push({

                id: el.id,
                firstName: el.firstName,
                midName: el.midName,
                lastName: el.lastName,
                Roll_no: el.Roll_no,
                StudentClass: el.StudentClass,
                section: el.section,
                active: el.active,
                status: el.status

            })

        })







    }
    catch (error) {

        return res.status(500).json({ message: "Internal server Error" })

    }
}


// faculty

export const addNewStaff = async (req, res) => {
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

}
export const EditGeneralStaff = async (req, res) => {
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

    } = req.body;

}
export const EditAcademicStaff = async (req, res) => {
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

    } = req.body;

}

// faculty attendance

export const UpdateStaffAttendance = async (req, res) => {

    const { staffId, month, year, newStatus } = req.body;
    try {
        const { date, status, remark } = newStatus; // newStatus should include date, status, and remark

        // Find the attendance document
        const attendanceDoc = await StaffAttendance.findOne({ staffId, month, year });

        if (!attendanceDoc) {
            console.log('No attendance document found');
            return;
        }

        // Find the index of the date to update
        const index = attendanceDoc.attendance.findIndex(entry =>
            entry.date.toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]
        );

        if (index !== -1) {
            // Replace existing entry
            attendanceDoc.attendance[index] = newStatus;
        } else {
            // If not found, optionally push the new status
            attendanceDoc.attendance.push(newStatus);
        }

        // Save the document
        await attendanceDoc.save();
        console.log('Attendance updated successfully');
    } catch (error) {
        console.error('Error updating attendance:', error);
    }

}

export const GetAllStaffAttendance = async (req, res) => {

}

export const GetStaffAttendance = async (req, res) => {





}

export const testingElement = async () => {

}

export const testing = async (req, res) => {


    try {

        const { studentid } = req.body;
        const file = req.file;

        console.log(req.file.filename, "yess file exist", req.body);


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