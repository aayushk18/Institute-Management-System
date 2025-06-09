
import express from "express"
import { checkAuth, login, logout } from "../controllers/auth.controller.js";
import { AddNewStaff, AddStudentAccount, getAllStudents, resetrollno, setTimetableForClass, testing, updateAdmin, addNewRegistration, showAllNewRegistration } from "../controllers/admin.controller.js";
import { AddHomework, findTimetableforTeacher, homeworkUpdateToTeacher, showStudents, uploadResult, uploadTestMarks } from "../controllers/staff.controller.js";
import { findTimetableforStudent, showHomeworks, uploadHomework } from "../controllers/student.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import multer from 'multer';
import path from 'path';



export const router = express.Router()
const doc_storage = multer.diskStorage({


    destination: (req, file, cb) => {
        cb(null, './src/utils/files/documents'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + 'document' + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const pic_storage = multer.diskStorage({


    destination: (req, file, cb) => {
        cb(null, './src/utils/files/profilePics'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + 'picture' + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const pic_upload = multer({ storage: pic_storage });
const doc_upload = multer({ storage: doc_storage });


try {



    router.post('/login', login)
    router.get("/check", protectRoute, checkAuth)
    router.post('/logout', logout)




    // admin

    router.post('/admin/resetrollno', resetrollno)
    router.post('/admin/newstudent', AddStudentAccount)// checked
    router.get('/admin/getstudents', getAllStudents)// checked
    router.post('/admin/set-timetable-students', setTimetableForClass)
    router.post('/admin/newstaff', AddNewStaff)//checked
    router.patch('/admin/updateprofile', updateAdmin)//checked

    //admin admission

    router.post('/admin/admission/newregistration', addNewRegistration)
    router.get('/admin/admission/getallregistration', showAllNewRegistration)

    router.put('/admin/admission/newregistration/student-pic', pic_upload.single('file'), Studentpic)
    router.put('/admin/admission/newregistration/father-pic', pic_upload.single('file'), FatherPic)
    router.put('/admin/admission/newregistration/mother-pic', pic_upload.single('file'), MotherPic)
    router.put('/admin/admission/newregistration/guardian-pic', pic_upload.single('file'), GuardianPic)

    router.put('/admin/admission/newregistration/student-aadhar', doc_upload.single('file'), StudentAadhar)
    router.put('/admin/admission/newregistration/student-birth-cert', doc_upload.single('file'), StudentBirthCert)
    router.put('/admin/admission/newregistration/student-tc', doc_upload.single('file'), StudentTC)
    router.put('/admin/admission/newregistration/student-last-class-marksheet', doc_upload.single('file'), StudentLastClassMarksheet)

    router.put('/admin/admission/newregistration/father-aadhar', doc_upload.single('file'), FatherAadhar)
    router.put('/admin/admission/newregistration/mother-aadhar', doc_upload.single('file'), MotherAadhar)
    router.put('/admin/admission/newregistration/guardian-aadhar', doc_upload.single('file'), GuardianAadhar)

    router.put('/admin/admission/newregistration/father-edu-qual', doc_upload.single('file'), FatherEduQual)
    router.put('/admin/admission/newregistration/mother-edu-qual', doc_upload.single('file'), MotherEduQual)
    router.put('/admin/admission/newregistration/guardian-edu-qual', doc_upload.single('file'), GuardianEduQual)

    router.put('/admin/testing', pic_upload.single('file'), testing)






    // teacher
    router.post('/update-marks', uploadTestMarks)//checked
    router.post('/update-result', uploadResult)
    router.get('/check-homework', homeworkUpdateToTeacher)
    router.post('/upload-homework', AddHomework)// checked
    router.get('/timetable', findTimetableforTeacher)
    router.get('/students', showStudents)// checked



    //stdent
    router.post('/uploadhomework', uploadHomework)
    router.get('/homeworks', showHomeworks)//checkd
    router.get('/timetable', findTimetableforStudent)




} catch (error) {
    console.log('Error in middleware routing', error.message);

}