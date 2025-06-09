import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const StaffAdminComponent = () => {




    return (
        <div className='w-full ' >





            <div className='p-10 flex flex-row w-full justify-between '>

                <NavLink className='bg-green-500 text-white p-5 text-2xl rounded-2xl' to='new-teacher'>Add New Teaching Faculty </NavLink>
                <NavLink className='bg-orange-500 text-white p-5 text-2xl rounded-2xl' to='new-staff'>Add other Staff </NavLink>


            </div>
            <div className='m-10'>
                <Outlet />
            </div>
        </div>
    )
}

export default StaffAdminComponent