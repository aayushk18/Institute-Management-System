import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminStudentRoute = () => {
    return (
        <div className='mb-5  w-full'>
            <Outlet />
        </div>
    )
}

export default AdminStudentRoute