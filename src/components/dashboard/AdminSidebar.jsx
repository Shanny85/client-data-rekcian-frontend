import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/rekcian_logo.png'
import {
    FaTachometerAlt,
    FaUsers
} from 'react-icons/fa';

const AdminSidebar = () => {
    return (
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className="bg-emerald-700 h-12 flex justify-center items-center">
                <img
                    src={logo}
                    alt="logo"
                    className="w-10 h-10 rounded-full"
                />
            </div>
            <nav className="px-4">
                <NavLink
                    to="/admin-dashboard"
                    className={({ isActive }) =>
                        `${isActive ? `bg-emerald-700 text-gray-800 font-bold` : ""} 
                        flex items-center space-x-4 py-2.5 px-4 rounded font-titillium`}
                    end
                >
                    {({ isActive }) => (
                        <>
                            <FaTachometerAlt
                                aria-hidden="true"
                                className={isActive ? "text-lime-400" : "text-gray-500"}
                            />
                            <span>Dashboard</span>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/admin-dashboard/employee"
                    className={({ isActive }) =>
                        `${isActive ? "bg-emerald-700 text-gray-800 font-bold" : ""} 
                        flex items-center space-x-4 py-2.5 px-4 rounded font-titillium`}
                >
                    {({ isActive }) => (
                        <>
                            <FaUsers
                                aria-hidden="true"
                                className={isActive ? "text-teal-400" : "text-gray-500"}
                            />
                            <span>Clients</span>
                        </>
                    )}
                </NavLink>

            </nav>
        </div>
    );
};

export default AdminSidebar;
