import React from 'react'
import Navbar from '../header/Navbar'

const StudentDashboard = () => {

    const attendance = 64
    const isAttendanceLow = attendance < 75;

    const timetable = [
        // Period 1
        { day: 'monday', period: 1, subject: '' },
        { day: 'tuesday', period: 1, subject: '' },
        { day: 'wednesday', period: 1, subject: '' },
        { day: 'thursday', period: 1, subject: 'SST' },
        { day: 'friday', period: 1, subject: '' },
        { day: 'saturday', period: 1, subject: '' },

        // Period 2
        { day: 'monday', period: 2, subject: '' },
        { day: 'tuesday', period: 2, subject: '' },
        { day: 'wednesday', period: 2, subject: 'English' },
        { day: 'thursday', period: 2, subject: '' },
        { day: 'friday', period: 2, subject: '' },
        { day: 'saturday', period: 2, subject: '' },

        // Period 3
        { day: 'monday', period: 3, subject: '' },
        { day: 'tuesday', period: 3, subject: '' },
        { day: 'wednesday', period: 3, subject: '' },
        { day: 'thursday', period: 3, subject: 'Maths' },
        { day: 'friday', period: 3, subject: '' },
        { day: 'saturday', period: 3, subject: '' },

        // Period 4
        { day: 'monday', period: 4, subject: '' },
        { day: 'tuesday', period: 4, subject: '' },
        { day: 'wednesday', period: 4, subject: 'PT' },
        { day: 'thursday', period: 4, subject: '' },
        { day: 'friday', period: 4, subject: '' },
        { day: 'saturday', period: 4, subject: '' },

        // Period 5
        { day: 'monday', period: 5, subject: '' },
        { day: 'tuesday', period: 5, subject: 'English' },
        { day: 'wednesday', period: 5, subject: '' },
        { day: 'thursday', period: 5, subject: '' },
        { day: 'friday', period: 5, subject: '' },
        { day: 'saturday', period: 5, subject: '' },

        // Period 6
        { day: 'monday', period: 6, subject: '' },
        { day: 'tuesday', period: 6, subject: '' },
        { day: 'wednesday', period: 6, subject: '' },
        { day: 'thursday', period: 6, subject: '' },
        { day: 'friday', period: 6, subject: '' },
        { day: 'saturday', period: 6, subject: '' },

        // Period 7
        { day: 'monday', period: 7, subject: '' },
        { day: 'tuesday', period: 7, subject: '' },
        { day: 'wednesday', period: 7, subject: '' },
        { day: 'thursday', period: 7, subject: '' },
        { day: 'friday', period: 7, subject: '' },
        { day: 'saturday', period: 7, subject: '' },

        // Period 8
        { day: 'monday', period: 8, subject: '' },
        { day: 'tuesday', period: 8, subject: '' },
        { day: 'wednesday', period: 8, subject: '' },
        { day: 'thursday', period: 8, subject: '' },
        { day: 'friday', period: 8, subject: '' },
        { day: 'saturday', period: 8, subject: '' },
    ];




    return (

        <div className='w-full h-full'>

            <div className='w-1/5'>
                <Navbar />
            </div>
            <div className='w-4/5'>
                <Outlet />
            </div>

            <div className='h-[calc(100vh-80px)] bg-blue-100'>

                <div className=' flex  flex-row  justify-around '>


                    <div className='w-1/2   '>


                        <div className='grid grid-cols-2 lg:flex lg:flex-wrap  justify-center gap-6 m-10 text-white'>

                            <div className='group  sm:w-[45%] lg:w-[22%] p-6 rounded-xl bg-blue-500'>
                                <div className='text-4xl rounded-full shadow-2xl shadow-black  w-20 h-20 flex items-center justify-center mb-6 font-semibold'>
                                    8
                                </div>
                                <div className='text-2xl font-semibold text-center'>Present</div>
                            </div>

                            <div className='group sm:w-[45%] lg:w-[22%] p-6 rounded-xl bg-orange-500 justify-center'>
                                <div className='text-4xl rounded-full shadow-2xl shadow-black  w-20 h-20 flex items-center justify-center mb-6 font-semibold'>
                                    6
                                </div>
                                <div className='text-2xl font-semibold text-center'>Absent</div>
                            </div>

                            <div className='group  sm:w-[45%] lg:w-[22%] p-6 rounded-xl bg-green-500'>
                                <div className='text-4xl rounded-full shadow-2xl shadow-black w-20 h-20 flex items-center justify-center mb-6 font-semibold'>
                                    4
                                </div>
                                <div className='text-2xl font-semibold text-center'>Late</div>
                            </div>

                            <div className='group sm:w-[45%] lg:w-[22%] p-6 rounded-xl bg-red-500'>
                                <div className='text-4xl rounded-full shadow-2xl shadow-black  w-20 h-20 flex items-center justify-center mb-6 font-semibold'>
                                    3
                                </div>
                                <div className='text-2xl font-semibold text-center'>Leave</div>
                            </div>

                        </div>


                        <div className='grid grid-cols-6 gap-1 p-5 bg-blue-50 rounded-lg   m-10 '>

                            <div className='  bg-blue-300 h-10 text-white font-semibold text-center content-center rounded-sm'>Monday </div>
                            <div className='  bg-blue-300 h-10 text-white font-semibold text-center content-center rounded-sm'>Tuesday </div>
                            <div className='  bg-blue-300 h-10 text-white font-semibold text-center content-center rounded-sm'>Wednesday </div>
                            <div className='  bg-blue-300 h-10 text-white font-semibold text-center content-center rounded-sm'>Thursday </div>
                            <div className='  bg-blue-300 h-10 text-white font-semibold text-center content-center rounded-sm'>Friday </div>
                            <div className='  bg-blue-300 h-10 text-white font-semibold text-center content-center rounded-sm'>Saturday </div>
                            {/* Timetable Entries */}
                            {timetable.map((el, index) => (
                                <React.Fragment key={index}>
                                    <div className='bg-blue-400 text-white font-semibold text-center rounded-sm h-9 content-center'>{el.subject}</div>

                                    {/* Insert a full-width div after the 4th period (i.e., after 6*4 = 24 items) */}
                                    {index === 23 && (
                                        <div className='col-span-6  text-center h-8 rounded-sm'>

                                        </div>
                                    )}
                                </React.Fragment>
                            ))}



                        </div>


                    </div>
                    <div className='w-1/2 text-white'>

                        <div className='m-10  bg-white h-60 rounded-xl'>

                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>

                        <div className=' m-10 bg-white rounded-xl '>

                            <div className='flex flex-row justify-between font-semibold text-black px-5 pt-5'>

                                <span className='text-3xl ' >Homework</span>
                                <div className='flex text-sm flex-col text-end'>
                                    <span className='text-red-400'>Pending :<span>2</span> </span>
                                    <span className='text-green-400'>Complete  :<span >1</span></span>
                                </div>



                            </div>
                            <div className='flex flex-row flex-nowrap gap-2 overflow-scroll py-5 m-4'>

                                <div className=' justify-center'>
                                    <div className=' '>
                                        <div className='group snap-start flex-shrink-0 ease-in-out transition duration-300 hover:scale-105 hover:shadow-gray-500 hover:shadow-md  overflow-hidden h-50 w-80 bg-red-500 p-5 rounded-2xl cursor-pointer'>
                                            <div className=' shadow-2xl group-hover:shadow-black group-hover:shadow-2xl p-2 rounded-xl flex flex-row justify-between'>
                                                <h2 className=' bg-red-700 font-semibold p-2 px-6 h-fit justify-center align-middle rounded-lg self-center'>SST</h2>
                                                <div className=' justify-items-end'>
                                                    <h3 className=' group-hover:[text-shadow:_0_1px_1px_rgb(100_100_100_/_0.7)]'>Date</h3>
                                                    <h4 className=' group-hover:[text-shadow:_0_1px_1px_rgb(100_100_100_/_0.7)]'>00:17</h4>
                                                </div>
                                            </div>
                                            <h1 className='  pt-5 text-3xl font-bold pb-3'>Title</h1>
                                            <p>Description</p>

                                        </div>
                                    </div>
                                </div>

                                <div className=' justify-center'>
                                    <div className=''>
                                        <div className='group snap-start flex-shrink-0 ease-in-out transition duration-300 hover:scale-105 hover:shadow-gray-500 hover:shadow-md  overflow-hidden h-50 w-80 bg-red-500 p-5 rounded-2xl cursor-pointer'>
                                            <div className=' shadow-2xl group-hover:shadow-black group-hover:shadow-2xl p-2 rounded-xl flex flex-row justify-between'>
                                                <h2 className=' bg-red-700 font-semibold p-2 px-6 h-fit justify-center align-middle rounded-lg self-center'>Science</h2>
                                                <div className=' justify-items-end'>
                                                    <h3 className=' group-hover:[text-shadow:_0_1px_1px_rgb(100_100_100_/_0.7)]'>Date</h3>
                                                    <h4 className=' group-hover:[text-shadow:_0_1px_1px_rgb(100_100_100_/_0.7)]'>00:17</h4>
                                                </div>
                                            </div>
                                            <h1 className='  pt-5 text-3xl font-bold pb-3'>Title</h1>
                                            <p>Description</p>

                                        </div>
                                    </div>
                                </div>

                                <div className=' justify-center'>
                                    <div className=''>
                                        <div className='group snap-start flex-shrink-0 ease-in-out transition duration-300 hover:scale-105 hover:shadow-gray-500 hover:shadow-md  overflow-hidden h-50 w-80 bg-green-500 p-5 rounded-2xl cursor-pointer'>
                                            <div className=' shadow-2xl group-hover:shadow-black group-hover:shadow-2xl p-2 rounded-xl flex flex-row justify-between'>
                                                <h2 className=' bg-green-700 font-semibold p-2 px-6 h-fit justify-center align-middle rounded-lg self-center'>English</h2>
                                                <div className=' justify-items-end'>
                                                    <h3 className=' group-hover:[text-shadow:_0_1px_1px_rgb(100_100_100_/_0.7)]'>Date</h3>
                                                    <h4 className=' group-hover:[text-shadow:_0_1px_1px_rgb(100_100_100_/_0.7)]'>00:17</h4>
                                                </div>
                                            </div>
                                            <h1 className='  pt-5 text-3xl font-bold pb-3'>Title</h1>
                                            <p>Description</p>

                                        </div>
                                    </div>
                                </div>
                            </div>





                        </div>





                    </div>

                </div>







            </div>



        </div>

    )
}

export default StudentDashboard