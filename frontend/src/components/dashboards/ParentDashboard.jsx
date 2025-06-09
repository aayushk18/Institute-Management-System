import React from 'react'
import Navbar from '../header/Navbar'
import { Outlet } from 'react-router-dom'

const ParentDashboard = () => {
    return (
        <div className='w-full h-full'>

            <div className='w-1/5'>
                <Navbar />
            </div>
            <div className='w-4/5'>
                <Outlet />
            </div>



        </div>
    )
}

export default ParentDashboard