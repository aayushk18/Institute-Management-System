import { Classes } from "../models/class.model.js";
import { Student } from "../models/student.model.js";
import mongoose from "mongoose";

// Add new class
export const addNewClass = async (req, res) => {
    const addsec = [
        { section: "A" },
        { section: "B" },
        { section: "C" },
        { section: "D" },
        { section: "E" },
        { section: "F" },
    ];

    try {
        const { StudentClass } = req.body;
        const addClass = new Classes({
            StudentClass: StudentClass,
        });

        addsec.map((el) => {
            addClass.sections.push(el);
        });

        await addClass.save();

        return res.status(200).json('Classes Updated successfully');
    } catch (error) {
        console.log("error in class adding controller", error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// only display class students
export const getStudentsFromClass = async (req, res) => {
    const { StudentClass, section } = req.body;

    try {
        const classDoc = await Classes.findOne({ StudentClass });

        if (!classDoc) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Find the section in the class
        const targetSection = classDoc.sections.find(sec => sec.section === section);

        if (!targetSection) {
            return res.status(404).json({ message: "Section not found" });
        }

        const Data = targetSection.students.map(id => id.toString());

        return res.status(200).json(Data);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


// set class students
export const setStudentsForClass = async (req, res) => {

    const { StudentClass, section, data } = req.body;

    if (!StudentClass || !section || !Array.isArray(data)) {
        return res.status(400).json({ message: 'Invalid input format' });
    }

    try {
        const classDoc = await Classes.findOne({ StudentClass });

        if (!classDoc) {
            const newClass = new Classes({
                StudentClass,
                sections: [{ section }],
            })

            await newClass.save();
        }

        // Reload classDoc to ensure we have the latest or just created one
        const classDocReloaded = await Classes.findOne({ StudentClass });

        // Find the specific section inside the class
        const targetSection = classDocReloaded.sections.find(sec => sec.section === section);

        if (!targetSection) {
            await Classes.findOneAndUpdate(
                { StudentClass, "sections.section": { $ne: section } }, // avoid duplicates
                { $push: { sections: { section } } },
                { new: true }
            );

            return res.status(200).json({ message: "New Class added Succesfully" })
        }

        const validStudentIds = data
            .filter(id => mongoose.Types.ObjectId.isValid(id))
            .map(id => new mongoose.Types.ObjectId(id));

        // Replace the students array with new data
        targetSection.students = validStudentIds;

        // Save the updated class document
        await classDocReloaded.save();

        return res.status(200).json({ message: 'Section students updated successfully', students: targetSection.students });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export const getStudentsForClass = async (req, res) => {
    const { StudentClass, section } = req.body;

    const data = [];

    try {

        const students = await Student.find({ StudentClass, section })

        if (!students || students.length == 0) {
            return res.status(400).json({ message: "No Data Found" })
        }

        students.map((el) => {

            data.push({

                id: el.id,
                firstName: el.firstName,
                midName: el.midName,
                lastName: el.lastName,
                Roll_no: el.Roll_no,
                StudentClass: el.StudentClass,
                section: el.section,
                active: el.active

            })
        })

        return res.status(200).json(data)

    } catch (error) {

        return res.status(500).json({ message: "Internal server Error" })
    }
}

export const getClassData = async (req, res) => {
    const { StudentClass, section } = req.body;
    const data = []

    try {
        const classDoc = await Classes.findOne({ StudentClass });

        if (!classDoc) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Find the section in the class
        const targetSection = classDoc.sections.find(sec => sec.section === section);

        if (!targetSection) {
            return res.status(404).json({ message: "Section not found" });
        }

        const stu = await Student.find({ StudentClass, section })

        const matchedData = stu.filter(student => targetSection.students.includes(student.id))

        matchedData.map((el) => {

            data.push({

                id: el.id,
                firstName: el.firstName,
                midName: el.midName,
                lastName: el.lastName,
                Roll_no: el.Roll_no,
                StudentClass: el.StudentClass,
                section: el.section,
                active: el.active
            })

        })

        return res.status(200).json(data)


    }

    catch (error) {

        return res.status(500).json({ message: "Internal server Error" })

    }
}
