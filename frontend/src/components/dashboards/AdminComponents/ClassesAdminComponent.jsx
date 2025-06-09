import React, { useState } from 'react';

// Sample student data
const studentsData = [
    { name: 'anjali', rollno: 1, class: '1st', section: 'A' },
    { name: 'Bablu', rollno: 2, class: '1st', section: 'B' },
    { name: 'aakash', rollno: 3, class: '2nd', section: 'A' },
    { name: 'vipul', rollno: 3, class: '2nd', section: 'A' },
    { name: 'chaman', rollno: 3, class: '2nd', section: 'A' },
    { name: 'vinaash', rollno: 3, class: '2nd', section: 'A' },
    { name: 'vilesh', rollno: 3, class: '2nd', section: 'A' },
    { name: 'David', rollno: 4, class: '2nd', section: 'C' },
    { name: 'Sameer', rollno: 5, class: '12th', section: 'F' },
    // Add more as needed
];

const classes = [
    '1st', '2nd', '3rd', '4th', '5th', '6th',
    '7th', '8th', '9th', '10th', '11th', '12th'
];

const sections = ['A', 'B', 'C', 'D', 'E', 'F'];

const ClassesAdminComponent = () => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);

    const handleClassClick = (cls) => {
        setSelectedClass(cls);
        setSelectedSection(null);
    };

    const handleSectionClick = (sec) => {
        setSelectedSection(sec);
    };

    const filteredStudents = studentsData.filter((student) => {
        return (
            student.class === selectedClass &&
            student.section === selectedSection
        );
    });

    return (


        <div className='w-fit overflow-scroll no-scrollbar lg:scrollbar h-150'>

            <div className='p-5'>
                <h2 className='text-gray-500 text-2xl m-5'>Classes</h2>
                <div className='grid grid-cols-12 gap-5 mb-5 w-full'>
                    {classes.map((cls) => (
                        <button
                            key={cls}
                            onClick={() => handleClassClick(cls)}




                            className={cls === selectedClass ? 'p-2.5 rounded-full cursor-pointer inset-shadow-sm inset-shadow-gray-400' : 'p-2.5 rounded-full text-xl cursor-pointer shadow-md shadow-gray-400'}
                        >
                            {cls}
                        </button>
                    ))}
                </div>

                {selectedClass && (
                    <div className='pt-5'>
                        <h3 className='text-gray-500 text-2xl m-5'>Sections for {selectedClass}</h3>
                        <div className='flex flex-row gap-5 mb-5 w-full'>
                            {sections.map((sec) => (
                                <button
                                    key={sec}
                                    onClick={() => handleSectionClick(sec)}
                                    className={sec === selectedSection ? 'p-2.5 rounded-full cursor-pointer inset-shadow-sm inset-shadow-gray-400' : 'p-2.5 rounded-full text-xl cursor-pointer shadow-md shadow-gray-400'}

                                >
                                    {sec}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {selectedClass && selectedSection && (
                    <div className='w-full '>
                        <h3 className='my-5 text-2xl'>Students in {selectedClass} - Section {selectedSection}</h3>
                        {filteredStudents.length > 0 ? (
                            <ul>
                                {filteredStudents.map((student, index) => (


                                    <li key={index}>


                                        <div className=' flex flex-row gap-5 inset-shadow-sm inset-shadow-gray-400 p-5  m-5 rounded-2xl'>

                                            <div>
                                                <img className='rounded-2xl w-2/3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIVSd2UkGacggAAzbGljskwLIm4J0Nu1am_jTXY4aOHTuQjVHzEcGgoCtaXNpWytjDVHI&usqp=CAU" alt="" srcset="" />
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-xl my-3'>{student.name}</span>
                                                <span>Roll no: {student.rollno}</span>
                                                <span>Class: {selectedClass}</span>
                                                <span>Section: {selectedSection}</span>

                                            </div>


                                        </div>

                                    </li>


                                ))}
                            </ul>
                        ) : (
                            <p className='text-gray-700 text-5xl p-10'>No students found.</p>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
};

export default ClassesAdminComponent;
