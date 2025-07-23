import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AcademicsAdminDashboard = () => {
    return (


        <div className='w-full flex flex-col  ' >





            <div className='flex flex-row gap-5 p-1 w-full bg-white border-b-2 border-gray-200 px-6 '>

                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='classes'>Classes </NavLink>
                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='subjects'>Subjects </NavLink>
                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='timetable'>Timetable </NavLink>
                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='attendance'>Attendance </NavLink>
                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='examination'>Examination </NavLink>


            </div>
            <div className=''>
                <Outlet />
            </div>
        </div>

    )
}

export default AcademicsAdminDashboard