import express from "express"
import { AddHomework, findTimetableforTeacher, homeworkUpdateToTeacher, showStudents, uploadResult, uploadTestMarks } from "../controllers/staff.controller.js"



const router = express.Router()


try {

    
    router.post('/update-marks', uploadTestMarks)//checked
    router.post('/update-result', uploadResult)
    router.get('/check-homework', homeworkUpdateToTeacher)
    router.post('/upload-homework', AddHomework)// checked
    router.get('/timetable', findTimetableforTeacher)
    router.get('/students', showStudents)// checked


    
} catch (error) {
    
    console.log('Error in teacher routing', error.message);

}


   


export default router;