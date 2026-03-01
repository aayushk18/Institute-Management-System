import { NewRegistration } from "../models/NewRegistration.model.js";

// Add new registration
export const addNewRegistration = async (req, res) => {
    const {
        StudentClass,
        firstName,
        midName,
        lastName,
        gender,
        dob,
        nationality,
        category,
        subCategory,
        quota,
        motherTongue,
        religion,
        email,
        phone,
        altphone,
    } = req.body;

    try {
        const checkNewStudent = await NewRegistration.findOne({
            firstName, midName, lastName, dob,
            StudentClass, email, phone
        });

        if (checkNewStudent) {
            return res.status(400).json({
                message: "Record Already exist!!"
            });
        }

        const addNewRegistration = new NewRegistration({
            StudentClass,
            firstName,
            midName,
            lastName,
            gender,
            dob,
            nationality,
            category,
            subCategory,
            quota,
            motherTongue,
            religion,
            email,
            phone,
            altphone,
        });

        await addNewRegistration.save();

        res.status(201).json({
            message: 'Successfully Created'
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update student registration details
export const updateStudentRegistrationDetails = async (req, res) => {
    const {
        checkStudentClass,
        checkfirstName,
        checkdob,
        checkphone,
        StudentClass,
        firstName,
        midName,
        lastName,
        gender,
        dob,
        nationality,
        category,
        subCategory,
        quota,
        motherTongue,
        religion,
        email,
        phone,
        altphone,
        bloodGroup,
    } = req.body;

    try {
        const checkNewStudent = await NewRegistration.findOne({
            firstName: checkfirstName, dob: checkdob,
            StudentClass: checkStudentClass, phone: checkphone
        });

        if (!checkNewStudent) {
            return res.status(404).json({ message: "User not Exist" });
        }

        await NewRegistration.findOneAndUpdate(
            {
                firstName: checkfirstName, dob: checkdob,
                StudentClass: checkStudentClass, phone: checkphone
            },
            {
                $set: {
                    StudentClass,
                    firstName,
                    midName,
                    lastName,
                    gender,
                    dob,
                    nationality,
                    category,
                    subCategory,
                    quota,
                    motherTongue,
                    religion,
                    email,
                    phone,
                    altphone,
                    bloodGroup,
                }
            }
        );

        return res.status(200).json({ message: "Student Details Updated" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update parent registration details
export const updateParentRegistrationDetails = async (req, res) => {
    const {
        checkStudentClass,
        checkfirstName,
        checkdob,
        checkphone,
        fatherFirstName,
        fatherMidName,
        fatherLastName,
        fatherPhone,
        fatherEmail,
        fatherOccupation,
        fatherOfficeAddress,
        fatherQualification,
        fatherCollegeName,
        fatherCollegeAddress,
        fatherGraduationYear,
        motherFirstName,
        motherMidName,
        motherLastName,
        motherPhone,
        motherEmail,
        motherOccupation,
        motherOfficeAddress,
        motherQualification,
        motherCollegeName,
        motherCollegeAddress,
        motherGraduationYear,
        guardianFirstName,
        guardianMidName,
        guardianLastName,
        guardianPhone,
        guardianEmail,
        guardianRelation,
        guardianOccupation,
        guardianOfficeAddress,
        guardianQualification,
        guardianCollegeName,
        guardianCollegeAddress,
        guardianGraduationYear
    } = req.body;

    try {
        const checkNewStudent = await NewRegistration.findOne({
            firstName: checkfirstName, dob: checkdob,
            StudentClass: checkStudentClass, phone: checkphone
        })

        if (!checkNewStudent) {
            return res.status(404).json({ message: "User not Exist" })
        }

        await NewRegistration.findOneAndUpdate(
            {
                firstName: checkfirstName, dob: checkdob,
                StudentClass: checkStudentClass, phone: checkphone
            },
            {
                $set: {
                    fatherFirstName,
                    fatherMidName,
                    fatherLastName,
                    fatherPhone,
                    fatherEmail,
                    fatherOccupation,
                    fatherOfficeAddress,
                    fatherQualification,
                    fatherCollegeName,
                    fatherCollegeAddress,
                    fatherGraduationYear,
                    motherFirstName,
                    motherMidName,
                    motherLastName,
                    motherPhone,
                    motherEmail,
                    motherOccupation,
                    motherOfficeAddress,
                    motherQualification,
                    motherCollegeName,
                    motherCollegeAddress,
                    motherGraduationYear,
                    guardianFirstName,
                    guardianMidName,
                    guardianLastName,
                    guardianPhone,
                    guardianEmail,
                    guardianRelation,
                    guardianOccupation,
                    guardianOfficeAddress,
                    guardianQualification,
                    guardianCollegeName,
                    guardianCollegeAddress,
                    guardianGraduationYear
                }
            }
        );

        return res.status(200).json({ message: "Parent Details Updated" })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateOthertRegistrationDetails = async (req, res) => {
    const {
        checkStudentClass,
        checkfirstName,
        checkdob,
        checkphone,
        permanentHouseNo,
        permanentLocality,
        permanentCity,
        permanentDistrict,
        permanentState,
        permanentPinCode,
        permanentCountry,
        currentHouseNo,
        currentLocality,
        currentCity,
        currentDistrict,
        currentState,
        currentPinCode,
        currentCountry,
        previousSchoolLastClass,
        previousSchoolName,
        previousSchoolLocation,
        previousSchoolLeavingYear,
    } = req.body;

    try {
        const checkNewStudent = await NewRegistration.findOne({
            firstName: checkfirstName, dob: checkdob,
            StudentClass: checkStudentClass, phone: checkphone
        })

        if (!checkNewStudent) {
            return res.status(404).json({ message: "User not Exist" })
        }

        await NewRegistration.findOneAndUpdate(
            {
                firstName: checkfirstName, dob: checkdob,
                StudentClass: checkStudentClass, phone: checkphone
            },
            {
                $set: {
                    permanentHouseNo,
                    permanentLocality,
                    permanentCity,
                    permanentDistrict,
                    permanentState,
                    permanentPinCode,
                    permanentCountry,
                    currentHouseNo,
                    currentLocality,
                    currentCity,
                    currentDistrict,
                    currentState,
                    currentPinCode,
                    currentCountry,
                    previousSchoolLastClass,
                    previousSchoolName,
                    previousSchoolLocation,
                    previousSchoolLeavingYear
                }
            }
        );

        return res.status(200).json({ message: "Residential and Previous School Details Updated" })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const showAllNewRegistration = async (req, res) => {
    try {
        const allStudents = await NewRegistration.find();
        return res.status(200).json(allStudents);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Unable to find students" })
    }
}

export const showRegistrationUser = async (req, res) => {
    const { StudentClass, firstName, dob, email, phone } = req.body;

    try {
        const Students = await NewRegistration.findOne({ StudentClass, firstName, dob, email, phone });

        if (!Students) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json(Students)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Unable to find student" })
    }
}

export const UploadStudentpic = async (req, res) => {
    try {
        const { firstName, email, StudentClass } = req.body;
        const file = req.file?.filename;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        await NewRegistration.findOneAndUpdate(
            { firstName, email, StudentClass },
            { $set: { studentpic: file } }
        );

        return res.status(200).json({
            message: "Student photo Updated Successfully"
        });

    } catch (error) {
        console.error('Error uploading student pic:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const UploadFatherpic = async (req, res) => {
    try {
        const { firstName, email, StudentClass } = req.body;
        const file = req.file?.filename;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        await NewRegistration.findOneAndUpdate(
            { firstName, email, StudentClass },
            { $set: { fatherPic: file } }
        );

        return res.status(200).json({
            message: "Father photo Updated Successfully"
        });

    } catch (error) {
        console.error('Error uploading father pic:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const UploadMotherpic = async (req, res) => {
    try {
        const { firstName, email, StudentClass } = req.body;
        const file = req.file?.filename;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        await NewRegistration.findOneAndUpdate(
            { firstName, email, StudentClass },
            { $set: { motherPic: file } }
        );

        return res.status(200).json({
            message: "Mother photo Updated Successfully"
        });

    } catch (error) {
        console.error('Error uploading mother pic:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const UploadGuardianpic = async (req, res) => {
    try {
        const { firstName, email, StudentClass } = req.body;
        const file = req.file?.filename;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        await NewRegistration.findOneAndUpdate(
            { firstName, email, StudentClass },
            { $set: { guardianPic: file } }
        );

        return res.status(200).json({
            message: "Guardian photo Updated Successfully"
        });

    } catch (error) {
        console.error('Error uploading guardian pic:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
}
