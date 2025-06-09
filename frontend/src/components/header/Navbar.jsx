





import React, { useState } from 'react'
import { useAuthStore } from '../utils/useAuthStore'
import { NavLink } from 'react-router-dom'
import { Home, GraduationCap, Users, BookOpen, CreditCard, Megaphone, Library, BarChart3, Settings, MessageSquare, Menu, UserPlus, UserCog, FilePlus, } from "lucide-react";


const Navbar = () => {

    const { authUser, logout } = useAuthStore()


    const navItems = [
        { label: "Home", to: "/admin/home", icon: Home },
        { label: "Students", to: "/admin/student", icon: GraduationCap },
        { label: "Faculties", to: "/admin/staff", icon: Users },
        { label: "Academics", to: "/admin/academics", icon: BookOpen },
        { label: "Admissions", to: "/admin/admissions", icon: FilePlus },
        { label: "Fees & Payments", to: "/admin/payments", icon: CreditCard },
        { label: "Notice & Circular", to: "/admin/notice", icon: Megaphone },
        { label: "Library", to: "/admin/library", icon: Library },
        { label: "Reports & Analytics", to: "/admin/reports-analytics", icon: BarChart3 },
        { label: "Settings", to: "/admin/settings", icon: Settings },
        { label: "Feedback", to: "/admin/feedback", icon: MessageSquare },
    ];


    const [collapsed, setCollapsed] = useState(false);

    // if (authUser.userType !== "admin") return null;

    const toggleSidebar = () => setCollapsed(!collapsed);

    const sidebarWidth = collapsed ? "w-20" : "w-64";

    return (

        // <>{authUser.userType == 'admin' ? (

        //     <div className=' w-full h-screen  flex flex-col items-center bg-gray-500 justify-between pl-10 py-5 ' >


        //         <div className=' flex flex-col justify-between text-2xl gap-3'>
        //             <div className=' text-4xl my-5 font-bold text-white'>{authUser.userType.charAt(0).toUpperCase() + authUser.userType.slice(1) + " Dashboard"}</div>

        //             <div className='flex flex-row gap-2 text-white'><Home className='' /><NavLink to='/admin/home' className={({ isActive }) => isActive ? ' p-4 bg-gray-600 font-bold rounded-l-xl text-white' : 'px-4 font-bold text-white'}>Home</NavLink ></div>
        //             <div className='flex flex-row gap-2 text-white'><GraduationCap /><NavLink to='/admin/student' className={({ isActive }) => isActive ? ' p-4 bg-gray-600 font-bold rounded-l-xl text-white' : 'px-4 font-bold text-white'}>Students</NavLink >                    </div>
        //             <div className='flex flex-row gap-2 text-white'><Users /><NavLink to='/admin/staff' className={({ isActive }) => isActive ? ' p-4 bg-gray-600 font-bold rounded-l-xl text-white' : 'px-4 font-bold text-white'}>Faculties</NavLink >                    </div>
        //             <div className='flex flex-row gap-2 text-white'><BookOpen /><NavLink to='/admin/academics' className={({ isActive }) => isActive ? ' p-4 bg-gray-600 font-bold rounded-l-xl text-white' : 'px-4 font-bold text-white'}>Academics</NavLink>                    </div>
        //             <div className='flex flex-row gap-2 text-white'><CreditCard /><NavLink to='/admin/payments' className={({ isActive }) => isActive ? ' p-4 bg-gray-600 font-bold rounded-l-xl text-white' : 'px-4 font-bold text-white'}>Fees & Payments</NavLink>                    </div>
        //             <div className='flex flex-row gap-2 text-white'><Megaphone /><NavLink to='/admin/notice' className={({ isActive }) => isActive ? ' p-4 bg-gray-600 font-bold rounded-l-xl text-white' : 'px-4 font-bold text-white'}>Notice & Circular </NavLink >                    </div>
        //             <div className='flex flex-row gap-2 text-white'><Library /><NavLink to='/admin/library' className={({ isActive }) => isActive ? ' p-4 bg-gray-600 font-bold rounded-l-xl text-white' : 'px-4 font-bold text-white'}>Library  </NavLink >                    </div>
        //             <div className='flex flex-row gap-2 text-white'><BarChart3 />    <NavLink to='/admin/reports-analytics' className={({ isActive }) => isActive ? ' p-4 bg-gray-600 font-bold rounded-l-xl text-white' : 'px-4 font-bold text-white'}>Reports & Analytics</NavLink >                    </div>
        //             <div className='flex flex-row gap-2 text-white'><Settings />   <NavLink to='/admin/settings' className={({ isActive }) => isActive ? ' p-4 bg-gray-600 font-bold rounded-l-xl text-white' : 'px-4 font-bold text-white'}>Settings</NavLink >                    </div>
        //             <div className='flex flex-row gap-2 text-white'><MessageSquare />  <NavLink to='/admin/feedback' className={({ isActive }) => isActive ? ' p-4 bg-gray-600 font-bold rounded-l-xl text-white' : 'px-4 font-bold text-white'}>Feedback</NavLink>                    </div>


        //         </div>

        //         {/* <button className='h-10 w-30 font-semibold rounded-md bg-gray-600   hover:scale-120 justify-items-start shadow-black ease-in-out transition duration-300  cursor-pointer text-white' onClick={() => logout()} type="submit">Log Out</button> */}

        //     </div >

        // ) : authUser.userType == 'staff' ? (

        //     <div className=' w-1/5 h-screen  flex flex-col items-center bg-gray-400 justify-between p-10 ' >


        //         <div className=' flex flex-col gap-5'>
        //             <div className=' text-4xl my-6 font-bold text-white'>{authUser.userType.charAt(0).toUpperCase() + authUser.userType.slice(1) + " Dashboard"}</div>

        //             <div className=' text-4xl font-bold text-white'>Profile</div>
        //             <div className=' text-4xl font-bold text-white'>Students</div>
        //             <div className=' text-4xl font-bold text-white'>Attendance</div>
        //             <div className=' text-4xl font-bold text-white'>Students</div>
        //         </div>

        //         <button className='h-10 w-30 font-semibold rounded-md bg-blue-600   hover:scale-120 justify-items-start shadow-black ease-in-out transition duration-300 shadow-2xl cursor-pointer text-white' onClick={() => logout()} type="submit">Log Out</button>

        //     </div >

        // ) : authUser.userType == 'student' ? (

        //     <div className=' w-1/5 h-screen  flex flex-col items-center bg-gray-400 justify-between p-10 ' >


        //         <div className=' flex flex-col gap-5'>
        //             <div className=' text-4xl my-6 font-bold text-white'>{authUser.userType.charAt(0).toUpperCase() + authUser.userType.slice(1) + " Dashboard"}</div>

        //             <div className=' text-4xl font-bold text-white'>Profile</div>
        //             <div className=' text-4xl font-bold text-white'>Timetable</div>
        //             <div className=' text-4xl font-bold text-white'>Assigments</div>
        //             <div className=' text-4xl font-bold text-white'>Exam</div>
        //         </div>

        //         <button className='h-10 w-30 font-semibold rounded-md bg-blue-600   hover:scale-120 justify-items-start shadow-black ease-in-out transition duration-300 shadow-2xl cursor-pointer text-white' onClick={() => logout()} type="submit">Log Out</button>

        //     </div >

        // ) : authUser.userType == 'parent' ? (

        //     <div className=' w-1/5 h-screen  flex flex-col items-center bg-gray-400 justify-between p-10 ' >


        //         <div className=' flex flex-col gap-5'>
        //             <div className=' text-4xl my-6 font-bold text-white'>{authUser.userType.charAt(0).toUpperCase() + authUser.userType.slice(1) + " Dashboard"}</div>

        //             <div className=' text-4xl font-bold text-white'>Profile</div>
        //             <div className=' text-4xl font-bold text-white'>Result</div>
        //             <div className=' text-4xl font-bold text-white'>Attendance</div>
        //             <div className=' text-4xl font-bold text-white'>Students</div>
        //         </div>

        //         <button className='h-10 w-30 font-semibold rounded-md bg-blue-600   hover:scale-120 justify-items-start shadow-black ease-in-out transition duration-300 shadow-2xl cursor-pointer text-white' onClick={() => logout()} type="submit">Log Out</button>

        //     </div >

        // ) : ''}



        // </>

        <div className={`h-screen bg-gray-500 flex flex-col  py-4 transition-all duration-300 ${sidebarWidth}`}
        >

            <div className="flex items-center justify-between px-3 mb-5 text-white">
                {!collapsed && (
                    <h1 className=" mx-2 whitespace-nowrap  font-bold">
                        {/* {authUser.userType.charAt(0).toUpperCase() + authUser.userType.slice(1)} Dashboard */}
                        Admin Dashboard
                    </h1>
                )}
                <button onClick={toggleSidebar} className="p-1 mx-2 rounded hover:bg-gray-600 transition">
                    <Menu />
                </button>
            </div>


            <div className="flex flex-col gap-2  text-white px-2">
                {navItems.map(({ label, to, icon: Icon }) => (
                    <NavLink
                        key={label}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-5 py-2 flex-row text-center flex-nowrap rounded-xl font-medium transition ${isActive ? "bg-gray-600" : "hover:bg-gray-400"
                            }`
                        }
                    >
                        <Icon className="w-5 h-5" />
                        {!collapsed && <span className=' whitespace-nowrap '>{label}</span>}
                    </NavLink>
                ))}
            </div>
        </div>




    )
}

export default Navbar