import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './src/utils/db.js'
import cookieParser from 'cookie-parser'
import { checkAuth } from './src/controllers/auth.controller.js'
import cors from 'cors';
import bodyParser from 'body-parser'
import path from 'path';
import router from './src/routes/main.router.js'






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


app.use('/api/user/', router)




app.use('/documents', express.static(path.join(path.resolve(), 'files', 'documents')));
app.use('/pics', express.static(path.join(path.resolve(), 'files', 'pics')));



if (process.env.NODE_ENV == "production") {
    
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/*",(req,res)=>{

        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}


app.listen(PORT, (req, res) => {

    console.log( `app is ready to run!!! at http://localhost:${PORT}`)
    connectDB()
    // testingElement()



})


