import express from "express"
import { findTimetableforStudent, showHomeworks, uploadHomework } from "../controllers/student.controller.js";



 const router = express.Router()



try {

 

    router.post('/uploadhomework', uploadHomework)
    router.get('/homeworks', showHomeworks) 
    router.get('/timetable', findTimetableforStudent)


    
} catch (error) {
    
    console.log('Error in student routing', error.message);

}

export default router;