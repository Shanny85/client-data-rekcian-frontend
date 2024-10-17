import React, { memo } from 'react';
import { useAuth } from "../context/authContext.jsx";
import AdminSidebar from "../components/dashboard/AdminSidebar.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";
import { Outlet } from "react-router-dom";

{/*Memoizing the sidebar and navbar to avoid unnecessary re-renders*/}
const MemoizedAdminSidebar = memo(AdminSidebar);
const MemoizedNavbar = memo(Navbar);

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="flex">
            <MemoizedAdminSidebar />
            <div className="flex-1 ml-64 bg-gray-100 min-h-dvh">
                <MemoizedNavbar />
                <Outlet />
            </div>
        </div>
    );
}

export default AdminDashboard;
