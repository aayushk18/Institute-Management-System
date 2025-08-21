import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const ExaminationAdmin = () => {
    return (
        <div>


            <div className='flex flex-row gap-5 p-1 w-full bg-white border-b-2 border-gray-200 px-6 '>

                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='Datesheet'>Datesheet </NavLink>
                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='examination'>Examination </NavLink>
                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='question-papers'>Question Papers </NavLink>
                <NavLink className={({ isActive }) => ` p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='result'>Result </NavLink>


            </div>



            <Outlet />
        </div>
    )
}

export default ExaminationAdmin