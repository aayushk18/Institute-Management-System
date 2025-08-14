
import React, { useState } from 'react'
import { useAuthStore } from '../utils/useAuthStore'
import { NavLink } from 'react-router-dom'
import { Home, GraduationCap, Users, BookOpen, CreditCard, Megaphone, Library, BarChart3, Settings, MessageSquare, Menu, UserPlus, UserCog, FilePlus, ClipboardList, } from "lucide-react";


const Navbar = () => {

    const { authUser, logout } = useAuthStore()


    const navItems = [
        { label: "Home", to: "/admin/home", icon: Home },
        { label: "Students", to: "/admin/student", icon: GraduationCap },
        { label: "Faculties", to: "/admin/faculties", icon: Users },
        { label: "Academics", to: "/admin/academics", icon: BookOpen },
        { label: "Admissions", to: "/admin/admissions", icon: FilePlus },
        { label: "Examination", to: "/admin/examination", icon: ClipboardList },

        { label: "Fees & Payments", to: "/admin/payments", icon: CreditCard },
        { label: "Notice & Circular", to: "/admin/notice", icon: Megaphone },
        { label: "Library", to: "/admin/library", icon: Library },
        { label: "Reports & Analytics", to: "/admin/reports-analytics", icon: BarChart3 },
        { label: "Settings", to: "/admin/settings", icon: Settings },
        { label: "Feedback", to: "/admin/feedback", icon: MessageSquare },

    ];


    const [collapsed, setCollapsed] = useState(false);


    const toggleSidebar = () => setCollapsed(!collapsed);

    const sidebarWidth = collapsed ? "w-20" : "w-64";

    return (


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