import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './src/utils/db.js'
import cookieParser from 'cookie-parser'
import { checkAuth } from './src/controllers/auth.controller.js'
import cors from 'cors';
import bodyParser from 'body-parser'
import path from 'path';
import adminRouter from "./src/routes/admin.route.js";
import authRouter from "./src/routes/auth.route.js";
import studentRouter from "./src/routes/student.route.js";
import teacherRouter from "./src/routes/teacher.route.js";






dotenv.config()


const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.resolve();


app.use(express.json({ limit: '10mb' }))
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



router.use("api/user/auth/", authRouter);
router.use("api/user/admin/", adminRouter);
router.use("api/user/student/", studentRouter);
router.use("api/user/teacher/", teacherRouter);




app.use('/documents', express.static(path.join(path.resolve(), 'files', 'documents')));
app.use('/pics', express.static(path.join(path.resolve(), 'files', 'pics')));



if (process.env.NODE_ENV == "production") {
    
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // CHANGE THIS LINE:
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


app.listen(PORT, (req, res) => {

    console.log( `app is ready to run!!! at http://localhost:${PORT}`)
    connectDB()
    // testingElement()



})


