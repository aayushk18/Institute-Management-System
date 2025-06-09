import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../header/Navbar'
import { CircleUserRound, User } from 'lucide-react'
import { useAdminStore, useAuthStore } from '../utils/useAuthStore'

const AdminDashboard = () => {

    const { logout } = useAuthStore()




    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <div className='w-full h-full flex bg-gray-100 flex-row'>

            <div className=''>
                <Navbar />
            </div>
            <div className='w-full h-screen '>

                <div className='bg-white justify-between content-center  flex flex-row mb-1 gap-5 shadow-md shadow-gray-200  p-5 w-full'>

                    <div className='content-center pl-10'>
                        <input type="search" name="" placeholder='Search....' id="" />
                    </div>

                    <div className='flex flex-row gap-5  content-center'>
                        <div className='content-center '>
                            <span className='text-2xl font-semibold self-center text-gray-500'>Aman Singh</span>

                        </div>

                        <div className="relative" ref={dropdownRef}>
                            <div
                                className="bg-gray-500 p-1 rounded-full cursor-pointer hover:bg-gray-600 transition"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <User className="text-white size-8" />
                            </div>

                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-50 bg-white shadow-md border brder-t-2 border-gray-200 rounded-md z-50">
                                    <div className="px-4 py-2  hover:bg-gray-100 cursor-pointer text-gray-500 font-semibold">
                                        Manage Account
                                    </div>
                                    <div className="px-4 py-2 text-gray-500 font-semibold hover:bg-gray-100 cursor-pointer"
                                        onClick={() => logout()}>
                                        Log Out
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className='  '>
                    <Outlet />
                </div>

            </div>



        </div >
    )
}

export default AdminDashboard