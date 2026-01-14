import express from "express"
import { checkAuth, login, logout } from "../controllers/auth.controller.js";
import { AddNewStaff, AddStudentAccount, getAllStudents, resetrollno, setTimetableForClass, testing, updateAdmin, addNewRegistration, showAllNewRegistration, updateStudentRegistrationDetails, updateParentRegistrationDetails, updateOthertRegistrationDetails, showRegistrationUser, UploadStudentpic, UploadMotherpic, UploadGuardianpic, UploadFatherpic, addNewStaff, ActivateStudent, InactivateStudent, setStudentsForClass, getStudentsForClass, getStudentsFromClass, getClassData, showAllStaff, homeDashboardData, updateStaffAttendance, getGeneralStaffAttendance, getAcademicStaffFormData, getGeneralStaffFormData, updateAcademicStaffFormData, updateGeneralStaffFormData, UpdateStudentAttendance, getOneStudentAttendance } from "../controllers/admin.controller.js";
import { AddHomework, findTimetableforTeacher, homeworkUpdateToTeacher, showStudents, uploadResult, uploadTestMarks } from "../controllers/staff.controller.js";
import { findTimetableforStudent, showHomeworks, uploadHomework } from "../controllers/student.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import multer from 'multer';
import path from 'path';



 const router = express.Router()



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

    
  

    //extra data

    router.get('/home', homeDashboardData)


    // admin

    router.post('/resetrollno', resetrollno)
    router.post('/newstudent', AddStudentAccount)// checked
    router.get('/getstudents', getAllStudents)// checked
    router.post('/set-timetable-students', setTimetableForClass)
    router.post('/newstaff', AddNewStaff)//checked
    router.patch('/updateprofile', updateAdmin)//checked


    //admin admission

    router.post('/admission/newregistration', addNewRegistration)
    router.get('/admission/getallregistration', showAllNewRegistration)
    router.post('/admission/get-registration-user', showRegistrationUser)
    router.post('/admission/updateregistration1', updateStudentRegistrationDetails)
    router.post('/admission/updateregistration2', updateParentRegistrationDetails)
    router.post('/admission/updateregistration3', updateOthertRegistrationDetails)


    router.put('/admission/newregistration/student-pic', pic_upload.single('file'), UploadStudentpic)
    router.put('/admission/newregistration/father-pic', pic_upload.single('file'), UploadFatherpic)
    router.put('/admission/newregistration/mother-pic', pic_upload.single('file'), UploadMotherpic)
    router.put('/admission/newregistration/guardian-pic', pic_upload.single('file'), UploadGuardianpic)


    // admin faculty

    router.post('/faculty/newregistration', addNewStaff)
    router.post('/faculty/all-staff', showAllStaff)
    router.post('/faculty/update-attendance', updateStaffAttendance)
    router.post('/faculty/get-general-staff-attendance', getGeneralStaffAttendance)
    router.post('/faculty/academic-staff-form', getAcademicStaffFormData)
    router.post('/faculty/general-staff-form', getGeneralStaffFormData)


    router.post('/faculty/update-general-staff-form', updateGeneralStaffFormData)
    router.post('/faculty/update-academic-staff-form', updateAcademicStaffFormData)



    router.post('/students/active', ActivateStudent)
    router.post('/students/inactive', InactivateStudent)
    router.post('/students/classes/update-class', setStudentsForClass)
    router.post('/students/classes/getstudentofclass', getStudentsForClass)
    router.post('/students/classes/get-class', getStudentsFromClass)
    router.post('/students/classes/get-class-data', getClassData)
    router.post('/students/attendance/get-student-attendance', getOneStudentAttendance)
    router.post('/students/attendance/update-student-attendance', UpdateStudentAttendance)

    router.post('/testing', testing)


} catch (error) {

    console.log('Error in admin routing', error.message);

}




export default router;