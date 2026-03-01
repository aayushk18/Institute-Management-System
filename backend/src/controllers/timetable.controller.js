import { Timetable } from "../models/timetable.model.js";
import { Classes } from "../models/class.model.js";

// Set timetable for class
export const setTimetableForClass = async (req, res) => {
    const { StudentClass, section, subject, day, time, firstName, lastName } = req.body;
    try {
        const newTimetable = new Timetable({
            subject,
            timing: {
                day,
                time
            },
            teacher: {
                firstName,
                lastName
            }
        });

        await newTimetable.save();

        const findClass = await Classes.findOne({ StudentClass, section });

        if (!findClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        findClass.timetable.push(newTimetable._id);
        await findClass.save();

        console.log('Timetable added to class successfully!');
        res.status(200).json({ message: "Timetable added successfully" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};
