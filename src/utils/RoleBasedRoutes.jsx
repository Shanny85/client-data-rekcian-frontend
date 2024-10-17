import React from 'react';
import {useAuth} from "../context/authContext.jsx";
import {Navigate} from "react-router-dom";


const RoleBasedRoutes = ({children, requiredRoles}) => {
    const {user, loading} = useAuth()

    if (loading) {
        return <div>Loading. . .</div>
    }

    if (!requiredRoles.includes(user.role)) {
        return <Navigate to="/login" />
    }

    return user ? children : <Navigate to="/login" />
};

export default RoleBasedRoutes;
