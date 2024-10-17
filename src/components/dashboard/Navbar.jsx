import React from 'react';
import { useAuth } from "../../context/authContext.jsx";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
    const { user, logout } = useAuth(); // Assuming logout function is provided by the context
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        logout(); // Call logout function to clear user session
        navigate('/login'); // Navigate back to login screen
    };

    return (
        <div id="navBar" className="flex items-center text-white justify-between h-12 bg-emerald-700 px-5 sticky top-0 z-50">
            <p className="font-titillium">Welcome {user.name}</p>
            <button
                onClick={handleLogout} // Add click handler for logout
                className="px-4 py-1 bg-gray-800 rounded hover:bg-gray-900 hover:font-bold"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;
