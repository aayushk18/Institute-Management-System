import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const StudentAdminComponent = () => {
    return (
        <div className='  w-full '>



            <div className=''>
                <Outlet />
            </div>


        </div>
    )
}

export default StudentAdminComponent