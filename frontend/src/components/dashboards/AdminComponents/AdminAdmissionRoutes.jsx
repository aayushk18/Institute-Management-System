import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminAdmissionRoutes = () => {
    return (
        <div className='w-full '>

            <div className='flex flex-row gap-5 p-1 w-full bg-white border-b-2 border-gray-200 px-6 '>

                {/* <NavLink className='bg-gr text-gray-800 p-1 px-2 font-semibold text-md rounded-sm hover:bg-gray-100' to='classes'>Classes </NavLink> */}
                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='new-registrations'>Registration </NavLink>
                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='set-registration-form'>Registration Form </NavLink>
                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='new-admissions' > Admissions </NavLink >
                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='leaving-students' > Exiting Students </NavLink >


            </div >
            <Outlet />
        </div >
    )
}

export default AdminAdmissionRoutes