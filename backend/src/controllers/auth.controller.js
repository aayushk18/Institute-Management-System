import bycrypt from "bcryptjs"
import { generateToken } from "../utils/generatetoken.js";
import { Admin } from "../models/admin.model.js";
import { Student } from "../models/student.model.js";
import { Staff } from "../models/staff.model.js";
import { AcademicStaff } from "../models/academicStaff.model.js";
import mongoose from "mongoose";






export const login = async (req, res) => {


    if (!req.body) {

        return res.status(200).json({ message: "Sorry: Not found" });
    }

    const { loginID, password } = req.body;

    console.log(loginID, password);

    try {

        const admin = await Admin.findOne({ loginID: loginID })
        const student = await Student.findOne({ loginID: loginID })
        const staff = await Staff.findOne({ username: loginID })
        const academicStaff = await AcademicStaff.findOne({ username: loginID })

        if (admin) {

            const IsPassCorrectAdmin = await bycrypt.compare(password, admin.password)

            if (admin && IsPassCorrectAdmin) {
                const tok = generateToken(admin._id, res);
                console.log('id : ', admin._id);

                res.status(201).json({
                    _id: admin._id,
                    FirstName: admin.firstName,
                    LastName: admin.lastName,
                    userType: admin.userType
                })
            } else return res.status(400).json({ message: "Invalid a loginID or Password !!" })

        }

        else if (student) {

            const IsPassCorrectStudent = await bycrypt.compare(password, student.password)
            if (student && IsPassCorrectStudent) {


                generateToken(student._id, res)
                res.status(201).json({
                    _id: student._id,
                    FirstName: student.firstName,
                    LastName: student.lastName,
                    userType: student.userType
                })
            } else return res.status(400).json({ message: "Invalid stu loginID or Password !!" })


        } else if (academicStaff) {



            const IsPassCorrectStaff = await bycrypt.compare(password, academicStaff.password)

            console.log('id : ', academicStaff.userType);
            if (academicStaff && IsPassCorrectStaff) {

                generateToken(academicStaff._id, res)


                res.status(201).json({
                    _id: academicStaff._id,
                    FirstName: academicStaff.firstName,
                    LastName: academicStaff.lastName,
                    userType: academicStaff.userType
                })
            } else return res.status(400).json({ message: "Invalid staff loginID or Password !!" })

        } else if (Staff) {

            console.log('staff');


            const IsPassCorrectStaff = await bycrypt.compare(password, staff.password)

            if (staff && IsPassCorrectStaff) {

                generateToken(staff._id, res)

                res.status(201).json({
                    _id: staff._id,
                    FirstName: staff.firstName,
                    LastName: staff.lastName,
                    userType: staff.userType
                })
            } else return res.status(400).json({ message: "Invalid staff loginID or Password !!" })

        } else return res.status(400).json({ message: "Invalid LoginID or Password !!" })
        console.log("Login Successfully");
    } catch (error) {
        console.log("error in Login controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }


}


export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)

        console.log("data : ", req.user);


    } catch (error) {
        console.log("error in check Auth controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged Out Successfully!!" })
        console.log("Logged Out Successfully!!")
    } catch (error) {
        console.log("Error in Logout Controller", error.message)
        res.status(500).json({ message: "Internal server error" })

    }
}


