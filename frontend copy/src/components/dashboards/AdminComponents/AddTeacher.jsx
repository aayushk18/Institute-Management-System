import React, { useState } from 'react'

const AddTeacher = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [loginID, setLoginID] = useState('')
    const [password, set] = useState('')
    const [gender, setGender] = useState('male')
    const [dob, setDob] = useState('')
    const [rollno, seRollno] = useState('')
    const [email, setEmail] = useState('')
    const [fatherphoneno, setFatherphoneno] = useState('')
    const [motherphoneno, setMotherphoneno] = useState('')
    const [StudentClass, setStudentClass] = useState('')
    const [section, setSection] = useState('')

    const schoolJobs = [{
        branch: "Academic Staff",
        roles: [
            { name: "Primary School Teacher" },
            { name: "Secondary School Teacher", sub_roles: ["Math", "Science", "English", "History"] },
            { name: "Special Education Teacher" },
            { name: "Physical Education (PE) Teacher" },
            { name: "Art/Music/Dance Teacher", sub_roles: ["Art", "Music", "Dance"] },
            { name: "Language Teacher", sub_roles: ["French", "Spanish", "German"] },
            { name: "Computer Science/ICT Teacher" },
            { name: "Substitute Teacher" },
            { name: "Teaching Assistant / Paraprofessional" }
        ]
    }]
    const [IsGenderOption, setIsGenderOption] = useState(false)

    return (
        <div>

            <form

                className='grid md:grid-cols-4 gap-6 sm:gap-8 relative p-6 md:p-10 shadow-md bg-green-500 rounded-3xl shadow-gray-500'
            >

                <div>
                    <label className='block text-white mb-2'>First Name</label>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        type="text"
                        placeholder='Title of your Task'
                        className='p-4 rounded-md w-full  text-white placeholder-gray-400   border-white border-2'
                    />
                </div>
                <div>
                    <label className='block text-white mb-2'>Last Name</label>
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        type="text"
                        placeholder='Title of your Task'
                        className='p-4 rounded-md w-full  text-white placeholder-gray-400   border-white border-2 '
                    />
                </div>
                <div>
                    <label className='block text-white mb-2'>Father Name</label>
                    <input
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        required
                        type="text"
                        placeholder='Title of your Task'
                        className='p-4 rounded-md w-full  text-white placeholder-gray-400  border-white border-2 '
                    />
                </div>
                <div>
                    <label className='block text-white mb-2'>Mother Name</label>
                    <input
                        value={motherName}
                        onChange={(e) => setMotherName(e.target.value)}
                        required
                        type="text"
                        placeholder='Title of your Task'
                        className='p-4 rounded-md w-full  text-white placeholder-gray-400    border-white border-2'
                    />
                </div>


                <div>
                    <label className='block text-white mb-2'>Date of Birth</label>
                    <input
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                        type="date"
                        className='p-4 rounded-md w-full  text-white placeholder-gray-400   border-white border-2'
                    />
                </div>


                <div className='w-full relative'>
                    <label className='block text-white mb-2'>Gender</label>

                    {IsGenderOption == true ?
                        <div className=' bg-blue-500 text-white border-white border-2 absolute w-[100%] rounded-md shadow-2xl z-10'>
                            <div className='  h-fit '
                            >
                                <div

                                    className='p-3 hover:bg-blue-400 cursor-pointer'
                                    onClick={() => {
                                        setGender('male')
                                        setIsGenderOption(false)
                                    }}
                                >
                                    Male
                                </div>
                                <div

                                    className='p-3 hover:bg-blue-400 cursor-pointer'
                                    onClick={() => {
                                        setGender('female')
                                        setIsGenderOption(false)
                                    }}
                                >
                                    Female
                                </div>
                            </div>

                        </div>



                        :

                        <div
                            onClick={() => setIsGenderOption(!IsGenderOption)}
                            className='relative p-4 rounded-md w-full text-white border-white border-2 cursor-pointer'

                        >{gender}



                        </div>}

                </div>


                <div className=''>
                    <label className='block text-white mb-2'>Roll Number</label>
                    <input
                        value={rollno}
                        onChange={(e) => seRollno(e.target.value)}
                        required
                        placeholder='Enter roll number...'

                        className='p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2'
                    />
                </div>

                <div className=''>
                    <label className='block text-white mb-2'>Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Enter email...'

                        className='p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2'
                    />
                </div>

                <div className=''>
                    <label className='block text-white mb-2'>Father's Phone Number</label>
                    <textarea
                        value={fatherphoneno}
                        onChange={(e) => setFatherphoneno(e.target.value)}
                        required
                        placeholder="Enter father's phone number..."

                        className='p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2'
                    />
                </div>

                <div className=''>
                    <label className='block text-white mb-2'>Mother's Phone Number</label>
                    <input
                        value={motherphoneno}
                        onChange={(e) => setMotherphoneno(e.target.value)}
                        required
                        placeholder="Enter mother's phone number..."

                        className='p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2'
                    />
                </div>

                <div className=''>
                    <label className='block text-white mb-2'>Class</label>
                    <input
                        value={StudentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        required
                        placeholder='Enter class...'

                        className='p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2'
                    />
                </div>

                <div className=''>
                    <label className='block text-white mb-2'>Section</label>
                    <input
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        required
                        placeholder='Enter section...'

                        className='p-4 rounded-md w-full text-white placeholder-gray-400 border-white border-2'
                    />
                </div>



                <div className=''>
                    <button
                        type="submit"
                        className='p-4 bg-red-600 text-white font-semibold  hover:shadow-none hover:scale-110 w-full rounded-md transition-all duration-150'
                    >
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTeacher