import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './src/utils/db.js'
import { router } from './src/routes/admin.route.js'
import cookieParser from 'cookie-parser'
import { checkAuth } from './src/controllers/auth.controller.js'
import cors from 'cors';
import bodyParser from 'body-parser'




dotenv.config()


const app = express()
const PORT = process.env.port || 3000


app.use(express.json({ limit: '10mb' }))
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



app.use('/api/user', router)


// app.use('/api/auth', login, router)


app.listen(PORT, (req, res) => {

    console.log("app is ready to run!!! at http://localhost:3000")
    connectDB()
    // testingElement()



})


