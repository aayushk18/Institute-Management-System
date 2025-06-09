import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminAdmissionsPanel = () => {
    return (
        <div className=''>
            <div className='flex flex-row p-5 gap-5'>

                <NavLink to='new-registrations' className='p-5 bg-white hover:bg-gray-200'>New Registration</NavLink>
                <NavLink className='p-5 bg-white hover:bg-gray-200'>New Admissions</NavLink>
                <NavLink className='p-5 bg-white hover:bg-gray-200' >Leaving Students</NavLink>
            </div>
            <div className='p-5'>
                <Outlet />
            </div>
        </div >
    )
}

export default AdminAdmissionsPanel