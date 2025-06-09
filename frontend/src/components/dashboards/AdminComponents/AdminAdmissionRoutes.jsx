import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminAdmissionRoutes = () => {
    return (
        <div className='w-full '>
            <Outlet />
        </div>
    )
}

export default AdminAdmissionRoutes