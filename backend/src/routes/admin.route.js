
import express from "express"
import { checkAuth, login, logout } from "../controllers/auth.controller.js";
import { AddNewStaff, AddStudentAccount, getAllStudents, resetrollno, setTimetableForClass, testing, updateAdmin, addNewRegistration, showAllNewRegistration, updateStudentRegistrationDetails, updateParentRegistrationDetails, updateOthertRegistrationDetails, showRegistrationUser, UploadStudentpic, UploadMotherpic, UploadGuardianpic, UploadFatherpic, addNewStaff, ActivateStudent, InactivateStudent, setStudentsForClass, getStudentsForClass, getStudentsFromClass, getClassData, getClassAttendanceData } from "../controllers/admin.controller.js";
import { AddHomework, findTimetableforTeacher, homeworkUpdateToTeacher, showStudents, uploadResult, uploadTestMarks } from "../controllers/staff.controller.js";
import { findTimetableforStudent, showHomeworks, uploadHomework } from "../controllers/student.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import multer from 'multer';
import path from 'path';



export const router = express.Router()



const doc_storage = multer.diskStorage({


    destination: (req, file, cb) => {
        cb(null, './files/documents'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + 'document' + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});



const pic_storage = multer.diskStorage({


    destination: (req, file, cb) => {
        cb(null, './files/pics'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + 'picture' + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});



const faculty_pic_storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './files/faculty_pics'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + 'picture' + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});



const faculty_doc_storage = multer.diskStorage({


    destination: (req, file, cb) => {
        cb(null, './files/faculty_documents'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + 'document' + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});



const teacher_pic_storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './files/teacher_pics'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + 'picture' + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});



const teacher_doc_storage = multer.diskStorage({


    destination: (req, file, cb) => {
        cb(null, './files/teacher_documents'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + 'document' + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});



const pic_upload = multer({ storage: pic_storage });
const doc_upload = multer({ storage: doc_storage });



const faculty_pic_upload = multer({ storage: faculty_pic_storage });
const faculty_doc_upload = multer({ storage: faculty_doc_storage });



const teacher_pic_upload = multer({ storage: teacher_pic_storage });
const teacher_doc_upload = multer({ storage: teacher_doc_storage });



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
    router.post('/admin/admission/get-registration-user', showRegistrationUser)
    router.post('/admin/admission/updateregistration1', updateStudentRegistrationDetails)
    router.post('/admin/admission/updateregistration2', updateParentRegistrationDetails)
    router.post('/admin/admission/updateregistration3', updateOthertRegistrationDetails)



    router.put('/admin/admission/newregistration/student-pic', pic_upload.single('file'), UploadStudentpic)
    router.put('/admin/admission/newregistration/father-pic', pic_upload.single('file'), UploadFatherpic)
    router.put('/admin/admission/newregistration/mother-pic', pic_upload.single('file'), UploadMotherpic)
    router.put('/admin/admission/newregistration/guardian-pic', pic_upload.single('file'), UploadGuardianpic)



    router.put('/admin/testing', pic_upload.single('file'), testing)

    // admin faculty

    router.post('/admin/faculty/newregistration', addNewStaff)

    // teacher
    router.post('/update-marks', uploadTestMarks)//checked
    router.post('/update-result', uploadResult)
    router.get('/check-homework', homeworkUpdateToTeacher)
    router.post('/upload-homework', AddHomework)// checked
    router.get('/timetable', findTimetableforTeacher)
    router.get('/students', showStudents)// checked

    //student
    router.post('/uploadhomework', uploadHomework)
    router.get('/homeworks', showHomeworks)//checkd
    router.get('/timetable', findTimetableforStudent)
    router.post('/admin/students/active', ActivateStudent)
    router.post('/admin/students/inactive', InactivateStudent)
    router.post('/admin/students/classes/update-class', setStudentsForClass)
    router.post('/admin/students/classes/getstudentofclass', getStudentsForClass)
    router.post('/admin/students/classes/get-class', getStudentsFromClass)
    router.post('/admin/students/classes/get-class-data', getClassData)



    router.post('/admin/students/attendance/get-class-data', getClassAttendanceData)
    router.post()






} catch (error) {

    console.log('Error in admin routing', error.message);

}