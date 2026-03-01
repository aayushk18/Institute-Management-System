import { AcademicStaff } from "../models/academicStaff.model.js";
import { Admin } from "../models/admin.model.js";
import { Classes } from "../models/class.model.js"; // Kept if needed for other logic, though class logic moved
import { ClassSyllabus } from "../models/classSyllabus.model.js";
import { NewRegistration } from "../models/NewRegistration.model.js"; // Might be removable if no admission logic left
import PdfMaterial from "../models/pdfMaterial.model.js";
import { Staff } from "../models/staff.model.js";
import { StaffAttendance } from "../models/staffAttendance.model.js";
import { Student } from "../models/student.model.js";
import { StudentAttendance } from "../models/studentAttendance.model.js";
import bycrypt from "bcryptjs";
import mongoose from "mongoose";

// Dashboard Data
export const homeDashboardData = async (req, res) => {
    try {
        const studentCount = await Student.countDocuments();
        const staffCount = await Staff.countDocuments();
        const academicStaffCount = await AcademicStaff.countDocuments();
        const totalStaff = staffCount + academicStaffCount;

        return res.status(200).json({
            studentCount,
            staffCount: totalStaff,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Reset Roll Number
export const resetrollno = async (req, res) => {
    try {
        const students = await Student.find({}, {
            Roll_no: 1,
            StudentClass: 1,
            section: 1,
            firstName: 1
        }).sort({
            StudentClass: 1,
            section: 1,
            firstName: 1,
        });

        if (students.length === 0) {
            return res.status(200).json({
                message: "No Student Found"
            });
        }

        let currentClass = "";
        let currentSection = "";
        let currentRollNo = 1;

        const updateOps = students.map((student) => {
            if (student.StudentClass !== currentClass || student.section !== currentSection) {
                currentClass = student.StudentClass;
                currentSection = student.section;
                currentRollNo = 1;
            }

            const updateOp = {
                updateOne: {
                    filter: { _id: student._id },
                    update: { $set: { Roll_no: currentRollNo } },
                },
            };
            currentRollNo++;
            return updateOp;
        });

        await Student.bulkWrite(updateOps);

        return res.status(200).json({
            message: "Roll Number Reset Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// Add Student Account
export const AddStudentAccount = async (req, res) => {
    try {
        const {
            email,
            StudentClass,
            firstName,
            midName,
            lastName,
            dob,
        } = req.body;

        const checkStudent = await Student.findOne({
            email,
            StudentClass,
            firstName,
            dob
        });

        if (checkStudent) {
            return res.status(400).json({
                message: "Student Already Exist"
            });
        }

        const newStudent = new Student({
            email,
            StudentClass,
            firstName,
            midName,
            lastName,
            dob,
        });

        await newStudent.save();

        return res.status(201).json({
            message: "Student Account Created Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// Get All Students (Optimized)
export const getAllStudents = async (req, res) => {
    try {
        // Optimization: Select only necessary fields
        const students = await Student.find().select('firstName midName lastName email phone fatherName StudentClass section Roll_no active');


        return res.status(200).json(students);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Update Admin Profile
export const updateAdmin = async (req, res) => {
    try {
        const { id, firstName, email, password } = req.body;

        const admin = await Admin.findById(id);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (firstName) admin.firstName = firstName;
        if (email) admin.email = email;
        if (password) {
            const salt = await bycrypt.genSalt(10);
            admin.password = await bycrypt.hash(password, salt);
        }

        await admin.save();

        return res.status(200).json({ message: "Profile Updated Successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Activate Student
export const ActivateStudent = async (req, res) => {
    const { id } = req.body;

    try {
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: "Student not Found" });
        }

        student.active = true;
        await student.save();

        return res.status(200).json({ message: "Student Activated Successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Inactivate Student
export const InactivateStudent = async (req, res) => {
    const { id } = req.body;

    try {
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: "Student not Found" });
        }

        student.active = false;
        await student.save();

        return res.status(200).json({ message: "Student Inactivated Successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Update Student Attendance
export const UpdateStudentAttendance = async (req, res) => {
    const { date, attendanceData } = req.body;

    const [year, month, day] = date.split('-').map(Number);

    try {
        for (const record of attendanceData) {
            const { studentId, status } = record;

            if (!studentId || !status) {
                console.warn(`Skipping invalid record for studentId: ${studentId}`);
                continue;
            }

            const attendanceDate = {
                date: day.toString(),
                status: status
            };

            let attendanceRecord = await StudentAttendance.findOne({
                studentId,
                month: month,
                year: year
            });

            if (attendanceRecord) {
                const existingEntryIndex = attendanceRecord.attendance.findIndex(
                    entry => entry.date === day.toString()
                );

                if (existingEntryIndex >= 0) {
                    attendanceRecord.attendance[existingEntryIndex].status = status;
                } else {
                    attendanceRecord.attendance.push(attendanceDate);
                }

                await attendanceRecord.save();
            } else {
                const newAttendance = new StudentAttendance({
                    studentId,
                    month,
                    year,
                    attendance: [attendanceDate]
                });
                await newAttendance.save();
            }
        }

        return res.status(200).json({ message: "Attendance updated successfully." });

    } catch (error) {
        console.error("Error updating attendance:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get One Student Attendance
export const getOneStudentAttendance = async (req, res) => {
    try {
        const { studentId, month, year } = req.body;

        if (!studentId || !month || !year) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const attendanceRecord = await StudentAttendance.findOne({
            studentId: studentId,
            month: month,
            year: year,
        });

        if (!attendanceRecord) {
            return res.status(200).json({
                success: true,
                message: "No attendance record found for this month",
                attendance: [],
            });
        }

        return res.status(200).json({
            success: true,
            attendance: attendanceRecord.attendance,
        });
    } catch (err) {
        console.error("Error fetching student attendance:", err);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
};

// Add New Staff
export const addNewStaff = async (req, res) => {
    try {
        const {
            firstName,
            midName,
            lastName,
            gender,
            dob,
            email,
            phone,
            altphone,
            branch,
            roles,
        } = req.body;

        let newStaff;

        if (branch === "Academic Staff") {
            newStaff = new AcademicStaff({
                firstName,
                midName,
                lastName,
                gender,
                dob,
                email,
                phone,
                altPhone: altphone,
                role: roles,
                staffType: branch,
                designation: roles,
            });
        } else {
            newStaff = new Staff({
                firstName,
                midName,
                lastName,
                gender,
                dob,
                email,
                phone,
                alternatePhone: altphone,
                role: roles,
                staffType: branch,
                designation: roles

            });
        }

        const savedStaff = await newStaff.save();
        return res.status(201).json({
            message: "Staff added successfully",
            data: savedStaff,
        });
    } catch (error) {
        console.error("Error adding staff:", error);
        return res.status(500).json({
            message: "Failed to add staff",
            error: error.message,
        });
    }
}

// Show All Staff
export const showAllStaff = async (req, res) => {
    try {
        const academicStaff = await AcademicStaff.find().select(
            "id firstName midName lastName phone email staffType designation"
        );

        const generalStaff = await Staff.find().select(
            "id firstName midName lastName phone email staffType designation"
        );

        const generalStaffFormatted = generalStaff.map((staff) => ({
            id: staff.id,
            firstName: staff.firstName,
            midName: staff.midName,
            lastName: staff.lastName,
            phone: staff.phone,
            email: staff.email,
            staffType: staff.staffType,
            designation: staff.designation,
        }));

        return res.status(200).json({
            message: "Staff fetched successfully",
            academic: academicStaff,
            general: generalStaffFormatted,
        });
    } catch (error) {
        console.error("Error fetching staff:", error);
        return res.status(500).json({
            message: "Failed to fetch staff",
            error: error.message,
        });
    }
}

// Get Academic Staff Form Data
export const getAcademicStaffFormData = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Academic Staff ID is required" });
        }

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid Academic Staff ID format" });
        }

        const academicStaffData = await AcademicStaff.findById(id);

        if (!academicStaffData) {
            return res.status(404).json({ success: false, message: "Academic Staff not found" });
        }

        const staffResponse = academicStaffData.toObject();
        delete staffResponse.password;

        return res.status(200).json({ success: true, data: staffResponse });
    } catch (error) {
        console.error("Error fetching academic staff details:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

// Get General Staff Form Data
export const getGeneralStaffFormData = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Staff ID is required" });
        }

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid Staff ID format" });
        }

        const staffData = await Staff.findById(id);

        if (!staffData) {
            return res.status(404).json({ success: false, message: "Staff not found" });
        }

        return res.status(200).json({ success: true, data: staffData });

    } catch (error) {
        console.error("Error fetching staff details:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

// Update General Staff Form Data
export const updateGeneralStaffFormData = async (req, res) => {
    try {
        const { id, updateData } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Staff ID is required" });
        }

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid Staff ID format" });
        }

        let hashedPassword = ''
        if (updateData.password) {
            const salt = await bycrypt.genSalt(10)
            hashedPassword = await bycrypt.hash(updateData.password, salt)
            updateData.password = hashedPassword
        }

        const updatedStaff = await Staff.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedStaff) {
            return res.status(404).json({ success: false, message: "Staff not found" });
        }

        const staffResponse = updatedStaff.toObject();
        delete staffResponse.password;

        return res.status(200).json({
            success: true,
            message: "Staff updated successfully",
            data: staffResponse
        });
    } catch (error) {
        console.error("Error updating staff:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

// Update Academic Staff Form Data
export const updateAcademicStaffFormData = async (req, res) => {
    try {
        const { id, updateData } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Academic Staff ID is required" });
        }

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid Academic Staff ID format" });
        }

        let hashedPassword = ''
        if (updateData.password) {
            const salt = await bycrypt.genSalt(10)
            hashedPassword = await bycrypt.hash(updateData.password, salt)
            updateData.password = hashedPassword
        }

        const updatedStaff = await AcademicStaff.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedStaff) {
            return res.status(404).json({ success: false, message: "Academic Staff not found" });
        }

        const staffResponse = updatedStaff.toObject();
        delete staffResponse.password;

        return res.status(200).json({
            success: true,
            message: "Academic Staff updated successfully",
            data: staffResponse
        });
    } catch (error) {
        console.error("Error updating academic staff:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update Staff Attendance
export const updateStaffAttendance = async (req, res) => {
    try {
        const { id, staffModel, month, year, attendance } = req.body;

        if (!id || !staffModel || !month || !year || !attendance) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const attendanceArray = Object.entries(attendance).map(([date, status]) => ({
            date,
            status: status || "",
        }));

        let record = await StaffAttendance.findOne({ month, year });

        if (record) {
            const staffIndex = record.staffs.findIndex(
                (staff) =>
                    staff.staffId.toString() === id &&
                    staff.staffModel === staffModel
            );

            if (staffIndex > -1) {
                record.staffs[staffIndex].attendance = attendanceArray;
            } else {
                record.staffs.push({
                    staffId: id,
                    staffModel,
                    attendance: attendanceArray,
                });
            }

            await record.save();
        } else {
            record = new StaffAttendance({
                month,
                year,
                staffs: [
                    {
                        staffId: id,
                        staffModel,
                        attendance: attendanceArray,
                    },
                ],
            });

            await record.save();
        }

        res.status(200).json({
            message: "Attendance updated successfully",
            data: record,
        });
    } catch (error) {
        console.error("Error updating attendance:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get General Staff Attendance
export const getGeneralStaffAttendance = async (req, res) => {
    try {
        const { id, month, year } = req.body;

        if (!id || !month || !year) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const record = await StaffAttendance.findOne({ month, year })
            .populate("staffs.staffId");

        if (!record) {
            return res.status(200).json(false);
        }

        const staffData = record.staffs.find(
            (staff) => staff.staffId && staff.staffId._id.toString() === id
        );

        if (!staffData) {
            return res.status(200).json(false);
        }

        return res.status(200).json({
            month: record.month,
            year: record.year,
            staff: staffData,
        });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Academic Staff Attendance
export const getAcademicStaffAttendance = async (req, res) => {
    try {
        const { id, month, year } = req.body;

        if (!id || !month || !year) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const record = await StaffAttendance.findOne({ month, year })
            .populate("staffs.staffId");

        if (!record) {
            return res.status(200).json(false);
        }

        const staffData = record.staffs.find(
            (staff) => staff.staffId && staff.staffId._id.toString() === id
        );

        if (!staffData) {
            return res.status(200).json(false);
        }

        return res.status(200).json({
            month: record.month,
            year: record.year,
            staff: staffData,
        });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};







export const addPdfToStudyMaterial = async (req, res) => {
    try {
        const { category_name, sub_category, pdf } = req.body;

        if (!category_name || !sub_category || !pdf) {
            return res.status(400).json({
                message: "Category, sub-category and pdf data are required",
            });
        }

        let category = await PdfMaterial.findOne({ category_name });

        if (!category) {
            category = await PdfMaterial.create({
                category_name,
                web_view: true,
                sub_categories: [
                    {
                        sub_category,
                        web_view: true,
                        pdfs: [pdf],
                    },
                ],
            });

            return res.status(201).json({
                message: "Category, Sub-category & PDF created successfully",
                data: category,
            });
        }

        const subCatIndex = category.sub_categories.findIndex(
            (sub) => sub.sub_category === sub_category
        );

        if (subCatIndex === -1) {
            category.sub_categories.push({
                sub_category,
                web_view: true,
                pdfs: [pdf],
            });

            await category.save();

            return res.status(201).json({
                message: "Sub-category created and PDF added successfully",
                data: category,
            });
        }


        category.sub_categories[subCatIndex].pdfs.push(pdf);
        await category.save();

        return res.status(200).json({
            message: "PDF added successfully",
            data: category,
        });

    } catch (error) {
        console.error("Add PDF Error:", error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};


export const getAllStudyMaterials = async (req, res) => {
    try {
        const data = await PdfMaterial.find().sort({ createdAt: -1 });

        console.log("data", data);


        res.status(200).json({
            success: true,
            count: data.length,
            data,
        });
    } catch (error) {
        console.error("Fetch Study Material Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch study materials",
        });
    }
};


export const updatePdfByDetails = async (req, res) => {
    try {
        const {
            category,
            subCategory,
            name,
            description,
            date,
            size,
            link,
            web_view,
        } = req.body;

        if (!category || !subCategory || !name || !size || !link) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const sourceDoc = await PdfMaterial.findOne({
            "sub_categories.pdfs": {
                $elemMatch: { name, size, link },
            },
        });

        if (!sourceDoc) {
            return res.status(404).json({ message: "PDF not found" });
        }

        let removedPdf = null;

        for (const sub of sourceDoc.sub_categories) {
            const index = sub.pdfs.findIndex(
                (p) => p.name === name && p.size === size && p.link === link
            );

            if (index !== -1) {
                removedPdf = sub.pdfs[index];
                sub.pdfs.splice(index, 1);
                break;
            }
        }

        if (!removedPdf) {
            return res.status(404).json({ message: "PDF not found" });
        }

        await sourceDoc.save();

        let targetCategory = await PdfMaterial.findOne({
            category_name: category,
        });

        if (!targetCategory) {
            targetCategory = await PdfMaterial.create({
                category_name: category,
                web_view: true, // default
                sub_categories: [],
            });
        }

        let targetSub = targetCategory.sub_categories.find(
            (s) => s.sub_category === subCategory
        );

        if (!targetSub) {
            targetCategory.sub_categories.push({
                sub_category: subCategory,
                web_view: true, // default
                pdfs: [],
            });
            targetSub =
                targetCategory.sub_categories[targetCategory.sub_categories.length - 1];
        }

        targetSub.pdfs.push({
            name,
            description,
            date,
            size,
            link,
            web_view,
        });

        await targetCategory.save();

        res.status(200).json({
            success: true,
            message: "PDF updated successfully",
        });
    } catch (error) {
        console.error("Update PDF Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};





export const testing = async (req, res) => {
    try {

        const medicalPdfs = [
            {
                category_name: "Anatomy",
                web_view: false,
                sub_categories: [
                    {
                        sub_category: "Gross Anatomy",
                        web_view: true,
                        pdfs: [
                            {
                                name: "Osteology Basics",
                                description: "Detailed study of bones",
                                date: "2025-01-10",
                                size: "2.3 MB",
                                link: "/pdfs/anatomy/osteology-basics.pdf",
                                web_view: true,
                            },
                            {
                                name: "Joints Overview",
                                description: "Classification and structure of joints",
                                date: "2025-01-11",
                                size: "2.1 MB",
                                link: "/pdfs/anatomy/joints.pdf",
                                web_view: true,
                            },
                            {
                                name: "Muscle Anatomy",
                                description: "Origin, insertion, and actions of muscles",
                                date: "2025-01-12",
                                size: "3.1 MB",
                                link: "/pdfs/anatomy/muscles.pdf",
                                web_view: true,
                            },
                            {
                                name: "Blood Vessels",
                                description: "Arteries, veins, and capillaries",
                                date: "2025-01-13",
                                size: "2.5 MB",
                                link: "/pdfs/anatomy/blood-vessels.pdf",
                                web_view: false,
                            },
                            {
                                name: "Peripheral Nerves",
                                description: "Anatomy of cranial and spinal nerves",
                                date: "2025-01-14",
                                size: "2.8 MB",
                                link: "/pdfs/anatomy/nerves.pdf",
                                web_view: false,
                            },
                            {
                                name: "Thorax Anatomy",
                                description: "Heart, lungs, and mediastinum",
                                date: "2025-01-15",
                                size: "3.4 MB",
                                link: "/pdfs/anatomy/thorax.pdf",
                                web_view: true,
                            },
                            {
                                name: "Abdomen Anatomy",
                                description: "Abdominal organs and relations",
                                date: "2025-01-16",
                                size: "3.6 MB",
                                link: "/pdfs/anatomy/abdomen.pdf",
                                web_view: true,
                            },
                            {
                                name: "Pelvis & Perineum",
                                description: "Pelvic organs and perineal structures",
                                date: "2025-01-17",
                                size: "2.9 MB",
                                link: "/pdfs/anatomy/pelvis-perineum.pdf",
                                web_view: true,
                            },
                            {
                                name: "Head & Neck",
                                description: "Detailed head and neck anatomy",
                                date: "2025-01-18",
                                size: "4.2 MB",
                                link: "/pdfs/anatomy/head-neck.pdf",
                                web_view: true,
                            },
                            {
                                name: "Neuroanatomy",
                                description: "Brain and spinal cord overview",
                                date: "2025-01-19",
                                size: "4.5 MB",
                                link: "/pdfs/anatomy/neuroanatomy.pdf",
                                web_view: true,
                            },
                        ],
                    },

                    {
                        sub_category: "Histology",
                        web_view: true,
                        pdfs: [
                            {
                                name: "Cell Structure",
                                description: "Ultrastructure of the cell",
                                date: "2025-01-10",
                                size: "1.9 MB",
                                link: "/pdfs/histology/cell-structure.pdf",
                                web_view: false,
                            },
                            {
                                name: "Epithelium Tissue",
                                description: "Types and functions of epithelium",
                                date: "2025-01-11",
                                size: "1.8 MB",
                                link: "/pdfs/histology/epithelium.pdf",
                                web_view: false,
                            },
                            {
                                name: "Connective Tissue",
                                description: "Loose and dense connective tissue",
                                date: "2025-01-12",
                                size: "2.0 MB",
                                link: "/pdfs/histology/connective-tissue.pdf",
                                web_view: true,
                            },
                            {
                                name: "Muscle Tissue",
                                description: "Skeletal, cardiac, and smooth muscle",
                                date: "2025-01-13",
                                size: "2.2 MB",
                                link: "/pdfs/histology/muscle-tissue.pdf",
                                web_view: true,
                            },
                            {
                                name: "Nervous Tissue",
                                description: "Neurons and neuroglia",
                                date: "2025-01-14",
                                size: "2.1 MB",
                                link: "/pdfs/histology/nervous-tissue.pdf",
                                web_view: false,
                            },
                            {
                                name: "Organ Histology",
                                description: "Liver, kidney, lung histology",
                                date: "2025-01-15",
                                size: "2.7 MB",
                                link: "/pdfs/histology/organs.pdf",
                                web_view: false,
                            },
                        ],
                    },

                    {
                        sub_category: "Embryology",
                        web_view: true,
                        pdfs: [
                            {
                                name: "Gametogenesis",
                                description: "Formation of gametes",
                                date: "2025-01-10",
                                size: "1.6 MB",
                                link: "/pdfs/embryology/gametogenesis.pdf",
                                web_view: true,
                            },
                            {
                                name: "Fertilization",
                                description: "Process of fertilization",
                                date: "2025-01-11",
                                size: "1.5 MB",
                                link: "/pdfs/embryology/fertilization.pdf",
                                web_view: true,
                            },
                            {
                                name: "Gastrulation & Neurulation",
                                description: "Early embryonic development",
                                date: "2025-01-12",
                                size: "1.9 MB",
                                link: "/pdfs/embryology/gastrulation-neurulation.pdf",
                                web_view: true,
                            },
                            {
                                name: "Heart Development",
                                description: "Embryological development of heart",
                                date: "2025-01-13",
                                size: "2.0 MB",
                                link: "/pdfs/embryology/heart.pdf",
                                web_view: false,
                            },
                            {
                                name: "Congenital Anomalies",
                                description: "Common developmental anomalies",
                                date: "2025-01-14",
                                size: "2.3 MB",
                                link: "/pdfs/embryology/congenital-anomalies.pdf",
                                web_view: true,
                            },
                        ],
                    },
                ],
            },

            {
                category_name: "Physiology",
                web_view: false,
                sub_categories: [
                    {
                        sub_category: "General Physiology",
                        web_view: false,
                        pdfs: [
                            {
                                name: "Cell Membrane & Transport",
                                description: "Structure and transport mechanisms of cell membrane",
                                date: "2025-01-12",
                                size: "2.1 MB",
                                link: "/pdfs/physiology/cell-membrane.pdf",
                                web_view: false,
                            },
                            {
                                name: "Body Fluid Compartments",
                                description: "Distribution and regulation of body fluids",
                                date: "2025-01-12",
                                size: "1.9 MB",
                                link: "/pdfs/physiology/body-fluids.pdf",
                                web_view: false,
                            },
                            {
                                name: "Homeostasis",
                                description: "Physiological mechanisms maintaining internal balance",
                                date: "2025-01-13",
                                size: "1.7 MB",
                                link: "/pdfs/physiology/homeostasis.pdf",
                                web_view: true,
                            },
                            {
                                name: "Nerve & Muscle Physiology",
                                description: "Basics of nerve conduction and muscle contraction",
                                date: "2025-01-14",
                                size: "2.8 MB",
                                link: "/pdfs/physiology/nerve-muscle.pdf",
                                web_view: false,
                            },
                            {
                                name: "Action Potential",
                                description: "Generation and propagation of action potential",
                                date: "2025-01-14",
                                size: "2.2 MB",
                                link: "/pdfs/physiology/action-potential.pdf",
                                web_view: true,
                            },
                            {
                                name: "Receptors",
                                description: "Types and mechanisms of physiological receptors",
                                date: "2025-01-15",
                                size: "1.6 MB",
                                link: "/pdfs/physiology/receptors.pdf",
                                web_view: true,
                            },
                        ],
                    },

                    {
                        sub_category: "Blood",
                        web_view: false,
                        pdfs: [
                            {
                                name: "RBC, WBC & Platelets",
                                description: "Structure and functions of blood cells",
                                date: "2025-01-16",
                                size: "2.4 MB",
                                link: "/pdfs/physiology/blood-cells.pdf",
                                web_view: false,
                            },
                            {
                                name: "Hemoglobin",
                                description: "Structure, function, and regulation of hemoglobin",
                                date: "2025-01-16",
                                size: "1.8 MB",
                                link: "/pdfs/physiology/hemoglobin.pdf",
                                web_view: false,
                            },
                            {
                                name: "Anemia",
                                description: "Types, causes, and physiological basis of anemia",
                                date: "2025-01-17",
                                size: "2.3 MB",
                                link: "/pdfs/physiology/anemia.pdf",
                                web_view: false,
                            },
                            {
                                name: "Blood Groups",
                                description: "ABO and Rh blood group systems",
                                date: "2025-01-17",
                                size: "1.5 MB",
                                link: "/pdfs/physiology/blood-groups.pdf",
                                web_view: true,
                            },
                            {
                                name: "Hemostasis",
                                description: "Physiology of bleeding control",
                                date: "2025-01-18",
                                size: "2.0 MB",
                                link: "/pdfs/physiology/hemostasis.pdf",
                                web_view: true,
                            },
                            {
                                name: "Coagulation",
                                description: "Clotting factors and coagulation pathways",
                                date: "2025-01-18",
                                size: "2.6 MB",
                                link: "/pdfs/physiology/coagulation.pdf",
                                web_view: false,
                            },
                        ],
                    },

                    {
                        sub_category: "Cardiovascular System",
                        web_view: false,
                        pdfs: [
                            {
                                name: "Cardiac Cycle",
                                description: "Phases of cardiac cycle and pressure changes",
                                date: "2025-01-19",
                                size: "2.7 MB",
                                link: "/pdfs/physiology/cardiac-cycle.pdf",
                                web_view: true,
                            },
                            {
                                name: "Heart Sounds",
                                description: "Origin and clinical significance of heart sounds",
                                date: "2025-01-19",
                                size: "1.6 MB",
                                link: "/pdfs/physiology/heart-sounds.pdf",
                                web_view: true,
                            },
                            {
                                name: "ECG",
                                description: "Basics of electrocardiography interpretation",
                                date: "2025-01-20",
                                size: "2.9 MB",
                                link: "/pdfs/physiology/ecg.pdf",
                                web_view: false,
                            },
                            {
                                name: "Blood Pressure",
                                description: "Regulation and measurement of blood pressure",
                                date: "2025-01-20",
                                size: "2.2 MB",
                                link: "/pdfs/physiology/blood-pressure.pdf",
                                web_view: true,
                            },
                            {
                                name: "Regulation of Circulation",
                                description: "Neural and hormonal control of circulation",
                                date: "2025-01-21",
                                size: "2.5 MB",
                                link: "/pdfs/physiology/circulation-regulation.pdf",
                                web_view: false,
                            },
                        ],
                    },

                    {
                        sub_category: "Respiratory System",
                        web_view: true,
                        pdfs: [
                            {
                                name: "Lung Volumes",
                                description: "Spirometry and lung volume measurements",
                                date: "2025-01-22",
                                size: "2.1 MB",
                                link: "/pdfs/physiology/lung-volumes.pdf",
                                web_view: true,
                            },
                            {
                                name: "Gas Exchange",
                                description: "Diffusion of gases across respiratory membrane",
                                date: "2025-01-22",
                                size: "2.3 MB",
                                link: "/pdfs/physiology/gas-exchange.pdf",
                                web_view: false,
                            },
                            {
                                name: "Transport of O₂ & CO₂",
                                description: "Mechanisms of oxygen and carbon dioxide transport",
                                date: "2025-01-23",
                                size: "2.6 MB",
                                link: "/pdfs/physiology/gas-transport.pdf",
                                web_view: true,
                            },
                            {
                                name: "Regulation of Respiration",
                                description: "Neural and chemical control of breathing",
                                date: "2025-01-23",
                                size: "2.0 MB",
                                link: "/pdfs/physiology/respiration-regulation.pdf",
                                web_view: true,
                            },
                            {
                                name: "Hering–Breuer Reflex",
                                description: "Protective reflex in respiratory physiology",
                                date: "2025-01-24",
                                size: "1.4 MB",
                                link: "/pdfs/physiology/hering-breuer.pdf",
                                web_view: true,
                            },
                        ],
                    },

                    {
                        sub_category: "CNS",
                        web_view: false,
                        pdfs: [
                            {
                                name: "Reflexes",
                                description: "Types and physiology of reflex actions",
                                date: "2025-01-25",
                                size: "1.9 MB",
                                link: "/pdfs/physiology/reflexes.pdf",
                                web_view: true,
                            },
                            {
                                name: "Sensory System",
                                description: "Physiology of sensory pathways",
                                date: "2025-01-25",
                                size: "2.4 MB",
                                link: "/pdfs/physiology/sensory-system.pdf",
                                web_view: false,
                            },
                            {
                                name: "Motor System",
                                description: "Motor pathways and voluntary movement control",
                                date: "2025-01-26",
                                size: "2.7 MB",
                                link: "/pdfs/physiology/motor-system.pdf",
                                web_view: false,
                            },
                            {
                                name: "Basal Ganglia & Cerebellum",
                                description: "Role in movement coordination",
                                date: "2025-01-26",
                                size: "2.8 MB",
                                link: "/pdfs/physiology/basal-ganglia.pdf",
                                web_view: false,
                            },
                            {
                                name: "Sleep & EEG",
                                description: "Stages of sleep and EEG patterns",
                                date: "2025-01-27",
                                size: "2.2 MB",
                                link: "/pdfs/physiology/sleep-eeg.pdf",
                                web_view: true,
                            },
                        ],
                    },

                    {
                        sub_category: "Renal Physiology",
                        web_view: true,
                        pdfs: [
                            {
                                name: "Nephron",
                                description: "Structure and function of nephron",
                                date: "2025-01-28",
                                size: "2.1 MB",
                                link: "/pdfs/physiology/nephron.pdf",
                                web_view: false,
                            },
                            {
                                name: "GFR",
                                description: "Glomerular filtration rate and regulation",
                                date: "2025-01-28",
                                size: "1.8 MB",
                                link: "/pdfs/physiology/gfr.pdf",
                                web_view: true,
                            },
                            {
                                name: "Tubular Reabsorption",
                                description: "Mechanisms of tubular transport",
                                date: "2025-01-29",
                                size: "2.3 MB",
                                link: "/pdfs/physiology/tubular-reabsorption.pdf",
                                web_view: false,
                            },
                            {
                                name: "Acid–Base Balance",
                                description: "Renal regulation of acid-base status",
                                date: "2025-01-29",
                                size: "2.0 MB",
                                link: "/pdfs/physiology/acid-base.pdf",
                                web_view: false,
                            },
                            {
                                name: "Micturition",
                                description: "Physiology of urine storage and voiding",
                                date: "2025-01-30",
                                size: "1.5 MB",
                                link: "/pdfs/physiology/micturition.pdf",
                                web_view: false,
                            },
                        ],
                    },

                    {
                        sub_category: "Gastrointestinal Physiology",
                        web_view: false,
                        pdfs: [
                            {
                                name: "Saliva",
                                description: "Composition and functions of saliva",
                                date: "2025-01-31",
                                size: "1.4 MB",
                                link: "/pdfs/physiology/saliva.pdf",
                                web_view: false,
                            },
                            {
                                name: "Gastric Secretion",
                                description: "Mechanism and regulation of gastric juice",
                                date: "2025-01-31",
                                size: "2.2 MB",
                                link: "/pdfs/physiology/gastric-secretion.pdf",
                                web_view: true,
                            },
                            {
                                name: "Pancreatic Juice & Bile",
                                description: "Digestive secretions of pancreas and liver",
                                date: "2025-02-01",
                                size: "2.5 MB",
                                link: "/pdfs/physiology/pancreatic-bile.pdf",
                                web_view: false,
                            },
                            {
                                name: "Digestion & Absorption",
                                description: "Process of nutrient digestion and absorption",
                                date: "2025-02-01",
                                size: "2.7 MB",
                                link: "/pdfs/physiology/digestion-absorption.pdf",
                                web_view: true,
                            },
                        ],
                    },

                    {
                        sub_category: "Endocrine",
                        web_view: true,
                        pdfs: [
                            {
                                name: "Hypothalamus–Pituitary Axis",
                                description: "Central control of endocrine system",
                                date: "2025-02-02",
                                size: "2.6 MB",
                                link: "/pdfs/physiology/hypothalamus-pituitary.pdf",
                                web_view: true,
                            },
                            {
                                name: "Thyroid & Parathyroid",
                                description: "Hormones and physiological functions",
                                date: "2025-02-02",
                                size: "2.1 MB",
                                link: "/pdfs/physiology/thyroid-parathyroid.pdf",
                                web_view: false,
                            },
                            {
                                name: "Adrenal Gland",
                                description: "Cortex and medulla hormone physiology",
                                date: "2025-02-03",
                                size: "2.3 MB",
                                link: "/pdfs/physiology/adrenal.pdf",
                                web_view: false,
                            },
                            {
                                name: "Pancreas & Growth Hormone",
                                description: "Endocrine pancreas and growth hormone",
                                date: "2025-02-03",
                                size: "2.0 MB",
                                link: "/pdfs/physiology/pancreas-gh.pdf",
                                web_view: true,
                            },
                        ],
                    },

                    {
                        sub_category: "Reproductive Physiology",
                        web_view: true,
                        pdfs: [
                            {
                                name: "Male Reproduction",
                                description: "Physiology of male reproductive system",
                                date: "2025-02-04",
                                size: "2.2 MB",
                                link: "/pdfs/physiology/male-reproduction.pdf",
                                web_view: true,
                            },
                            {
                                name: "Female Menstrual Cycle",
                                description: "Hormonal regulation of menstrual cycle",
                                date: "2025-02-04",
                                size: "2.5 MB",
                                link: "/pdfs/physiology/menstrual-cycle.pdf",
                                web_view: false,
                            },
                            {
                                name: "Pregnancy & Lactation",
                                description: "Physiology of pregnancy and milk production",
                                date: "2025-02-05",
                                size: "2.8 MB",
                                link: "/pdfs/physiology/pregnancy-lactation.pdf",
                                web_view: true,
                            },
                            {
                                name: "Contraception",
                                description: "Physiological basis of contraceptive methods",
                                date: "2025-02-05",
                                size: "1.6 MB",
                                link: "/pdfs/physiology/contraception.pdf",
                                web_view: true,
                            },
                        ],
                    },
                ],
            },
            {
                category_name: "Biochemistry",
                web_view: true,
                sub_categories: [
                    {
                        sub_category: "General Biochemistry",
                        web_view: true,
                        pdfs: [
                            {
                                name: "Cell Structure",
                                description: "Biochemical organization of the cell",
                                date: "2025-01-10",
                                size: "2.0 MB",
                                link: "/pdfs/biochemistry/cell-structure.pdf",
                                web_view: false,
                            },
                            {
                                name: "Biomolecules",
                                description: "Carbohydrates, lipids, proteins and nucleic acids",
                                date: "2025-01-11",
                                size: "2.4 MB",
                                link: "/pdfs/biochemistry/biomolecules.pdf",
                                web_view: true,
                            },
                            {
                                name: "Enzymes",
                                description: "Enzyme kinetics, inhibition and regulation",
                                date: "2025-01-12",
                                size: "2.6 MB",
                                link: "/pdfs/biochemistry/enzymes.pdf",
                                web_view: true,
                            },
                            {
                                name: "Acid–Base Balance",
                                description: "Regulation of pH in the human body",
                                date: "2025-01-13",
                                size: "2.1 MB",
                                link: "/pdfs/biochemistry/acid-base-balance.pdf",
                                web_view: true,
                            },
                            {
                                name: "Buffers",
                                description: "Physiological buffer systems",
                                date: "2025-01-14",
                                size: "1.9 MB",
                                link: "/pdfs/biochemistry/buffers.pdf",
                                web_view: true,
                            },
                        ],
                    },

                    {
                        sub_category: "Carbohydrate Metabolism",
                        web_view: true,
                        pdfs: [
                            {
                                name: "Glycolysis",
                                description: "Steps, regulation and clinical importance",
                                date: "2025-01-15",
                                size: "2.8 MB",
                                link: "/pdfs/biochemistry/glycolysis.pdf",
                                web_view: true,
                            },
                            {
                                name: "TCA Cycle",
                                description: "Krebs cycle reactions and energy yield",
                                date: "2025-01-16",
                                size: "2.5 MB",
                                link: "/pdfs/biochemistry/tca-cycle.pdf",
                                web_view: false,
                            },
                            {
                                name: "Gluconeogenesis",
                                description: "Formation of glucose from non-carbohydrates",
                                date: "2025-01-17",
                                size: "2.3 MB",
                                link: "/pdfs/biochemistry/gluconeogenesis.pdf",
                                web_view: true,
                            },
                            {
                                name: "Glycogen Metabolism",
                                description: "Glycogenesis and glycogenolysis",
                                date: "2025-01-18",
                                size: "2.6 MB",
                                link: "/pdfs/biochemistry/glycogen-metabolism.pdf",
                                web_view: false,
                            },
                            {
                                name: "HMP Shunt",
                                description: "Hexose monophosphate pathway",
                                date: "2025-01-19",
                                size: "2.2 MB",
                                link: "/pdfs/biochemistry/hmp-shunt.pdf",
                                web_view: false,
                            },
                        ],
                    },

                    {
                        sub_category: "Lipid Metabolism",
                        web_view: true,
                        pdfs: [
                            {
                                name: "Fatty Acid Oxidation",
                                description: "Beta oxidation of fatty acids",
                                date: "2025-01-20",
                                size: "2.7 MB",
                                link: "/pdfs/biochemistry/fatty-acid-oxidation.pdf",
                                web_view: false,
                            },
                            {
                                name: "Lipogenesis",
                                description: "Synthesis of fatty acids",
                                date: "2025-01-21",
                                size: "2.4 MB",
                                link: "/pdfs/biochemistry/lipogenesis.pdf",
                                web_view: false,
                            },
                            {
                                name: "Cholesterol Metabolism",
                                description: "Cholesterol synthesis and regulation",
                                date: "2025-01-22",
                                size: "2.6 MB",
                                link: "/pdfs/biochemistry/cholesterol-metabolism.pdf",
                                web_view: true,
                            },
                            {
                                name: "Lipoproteins",
                                description: "Types and functions of lipoproteins",
                                date: "2025-01-23",
                                size: "2.5 MB",
                                link: "/pdfs/biochemistry/lipoproteins.pdf",
                                web_view: true,
                            },
                            {
                                name: "Ketone Bodies",
                                description: "Ketogenesis and utilization",
                                date: "2025-01-24",
                                size: "2.1 MB",
                                link: "/pdfs/biochemistry/ketone-bodies.pdf",
                                web_view: true,
                            },
                        ],
                    },

                    {
                        sub_category: "Protein & Amino Acid Metabolism",
                        web_view: false,
                        pdfs: [
                            {
                                name: "Transamination",
                                description: "Transfer of amino groups",
                                date: "2025-01-25",
                                size: "2.2 MB",
                                link: "/pdfs/biochemistry/transamination.pdf",
                                web_view: true,
                            },
                            {
                                name: "Deamination",
                                description: "Removal of amino groups",
                                date: "2025-01-26",
                                size: "2.0 MB",
                                link: "/pdfs/biochemistry/deamination.pdf",
                                web_view: false,
                            },
                            {
                                name: "Urea Cycle",
                                description: "Detoxification of ammonia",
                                date: "2025-01-27",
                                size: "2.6 MB",
                                link: "/pdfs/biochemistry/urea-cycle.pdf",
                                web_view: true,
                            },
                            {
                                name: "Inborn Errors of Metabolism",
                                description: "Genetic metabolic disorders",
                                date: "2025-01-28",
                                size: "2.9 MB",
                                link: "/pdfs/biochemistry/inborn-errors.pdf",
                                web_view: true,
                            },
                        ],
                    },

                    {
                        sub_category: "Molecular Biology",
                        web_view: true,
                        pdfs: [
                            {
                                name: "DNA Replication",
                                description: "Mechanism of DNA replication",
                                date: "2025-01-29",
                                size: "2.3 MB",
                                link: "/pdfs/biochemistry/dna-replication.pdf",
                                web_view: false,
                            },
                            {
                                name: "Transcription",
                                description: "RNA synthesis from DNA",
                                date: "2025-01-30",
                                size: "2.1 MB",
                                link: "/pdfs/biochemistry/transcription.pdf",
                                web_view: true,
                            },
                            {
                                name: "Translation",
                                description: "Protein synthesis process",
                                date: "2025-01-31",
                                size: "2.4 MB",
                                link: "/pdfs/biochemistry/translation.pdf",
                                web_view: false,
                            },
                            {
                                name: "Gene Regulation",
                                description: "Control of gene expression",
                                date: "2025-02-01",
                                size: "2.2 MB",
                                link: "/pdfs/biochemistry/gene-regulation.pdf",
                                web_view: false,
                            },
                        ],
                    },

                    {
                        sub_category: "Vitamins & Minerals",
                        web_view: false,
                        pdfs: [
                            {
                                name: "Fat-Soluble Vitamins",
                                description: "Vitamins A, D, E and K",
                                date: "2025-02-02",
                                size: "2.5 MB",
                                link: "/pdfs/biochemistry/fat-soluble-vitamins.pdf",
                                web_view: true,
                            },
                            {
                                name: "Water-Soluble Vitamins",
                                description: "B-complex vitamins and Vitamin C",
                                date: "2025-02-03",
                                size: "2.4 MB",
                                link: "/pdfs/biochemistry/water-soluble-vitamins.pdf",
                                web_view: false,
                            },
                            {
                                name: "Minerals",
                                description: "Calcium, iron, iodine and trace elements",
                                date: "2025-02-04",
                                size: "2.3 MB",
                                link: "/pdfs/biochemistry/minerals.pdf",
                                web_view: true,
                            },
                        ],
                    },

                    {
                        sub_category: "Clinical Biochemistry",
                        web_view: true,
                        pdfs: [
                            {
                                name: "Liver Function Tests (LFT)",
                                description: "Interpretation of liver enzymes",
                                date: "2025-02-05",
                                size: "2.6 MB",
                                link: "/pdfs/biochemistry/lft.pdf",
                                web_view: false,
                            },
                            {
                                name: "Renal Function Tests (RFT)",
                                description: "Assessment of kidney function",
                                date: "2025-02-06",
                                size: "2.5 MB",
                                link: "/pdfs/biochemistry/rft.pdf",
                                web_view: false,
                            },
                            {
                                name: "Blood Glucose",
                                description: "Regulation and disorders of glucose",
                                date: "2025-02-07",
                                size: "2.3 MB",
                                link: "/pdfs/biochemistry/blood-glucose.pdf",
                                web_view: false,
                            },
                            {
                                name: "Lipid Profile",
                                description: "Cholesterol and triglyceride analysis",
                                date: "2025-02-08",
                                size: "2.4 MB",
                                link: "/pdfs/biochemistry/lipid-profile.pdf",
                                web_view: true,
                            },
                            {
                                name: "Acid–Base Disorders",
                                description: "Metabolic and respiratory imbalances",
                                date: "2025-02-09",
                                size: "2.6 MB",
                                link: "/pdfs/biochemistry/acid-base-disorders.pdf",
                                web_view: true,
                            },

                        ],
                    },
                ],
            }

        ];


        await PdfMaterial.insertMany(medicalPdfs, { ordered: true });

        console.log("Data inserted successfully");

        res.status(200).json({ message: 'Submitted succesfully' });

    } catch (error) {
        console.error('Error sending to testing:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const testingElement = async (req, res) => {


}
