import React, { useState, useEffect } from "react";
import {useAuth} from "../context/authContext.jsx";

const EmployeeDashboard = () => {
    const {user} = useAuth()
    return (
        <>
            <div>
                <h2>Welcome {user.name}</h2>
            </div>
        </>
    );
}

export default EmployeeDashboard;