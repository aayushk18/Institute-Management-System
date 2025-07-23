import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const ExaminationAdmin = () => {
    return (
        <div>ExaminationAdmin

            <NavLink className={({ isActive }) => `m-5 p-1 px-2 font-semibold text-md rounded-sm ${isActive ? 'bg-gray-500 text-white' : 'text-gray-500 hover:bg-gray-100'} `} to='Datesheet'>Datesheet </NavLink>


            <Outlet />
        </div>
    )
}

export default ExaminationAdmin