import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AcademicsAdminDashboard = () => {
    return (


        <div className='w-full flex flex-col p-10' >





            <div className='grid grid-cols-5 gap-5 m-5 w-full justify-between '>

                <NavLink className='bg-green-500 text-white p-5 text-2xl rounded-2xl' to='classes'>Classes </NavLink>
                <NavLink className='bg-orange-500 text-white p-5 text-2xl rounded-2xl' to='subjects'>Subjects </NavLink>
                <NavLink className='bg-red-500 text-white p-5 text-2xl rounded-2xl' to='timetable'>Timetable </NavLink>
                <NavLink className='bg-yellow-500 text-white p-5 text-2xl rounded-2xl' to='attendance'>Attendance </NavLink>
                <NavLink className='bg-emerald-500  text-white p-5 text-2xl rounded-2xl' to='examination'>Examination </NavLink>


            </div>
            <div className=''>
                <Outlet />
            </div>
        </div>

    )
}

export default AcademicsAdminDashboard