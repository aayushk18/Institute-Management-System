import React from 'react'

export const StaffDashboard = () => {
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
