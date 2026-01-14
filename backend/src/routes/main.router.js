import express from "express";
import adminRouter from "./admin.route.js";
import authRouter from "./auth.route.js";
import studentRouter from "./student.route.js";
import teacherRouter from "./teacher.route.js";

const router = express.Router();

try {




router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/student", studentRouter);
router.use("/teacher", teacherRouter);

} catch (error) {
       console.log('Error in main routing', error.message);
 
}
export default router;