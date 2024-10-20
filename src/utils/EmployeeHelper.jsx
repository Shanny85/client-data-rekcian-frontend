import {FaEye, FaPencilAlt} from "react-icons/fa";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


export const columns = [
    {
        name: "Serial No",
        id: "sno",
        selector: (row) => row.sno,
        width: "110px",
    },
    {
        name: "Name",
        id: "name",
        selector: (row) => row.name,
        width: "110px",
        sortable: true
    },
    {
        name: "Last Name",
        id: "lastName",
        selector: (row) => row.lastName,
        width: "110px",
    },
    {
        name: "DOB",
        id: "dob",
        selector: (row) => row.dob,
        width: "150px"
    },
    {
        name: "Action",
        id: "action",
        selector: (row) => row.action,
        center: "true"
    }
];

export const EmployeeButtons = ({ _id}) => {
    const navigate = useNavigate();


    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded flex items-center"
                onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
            >
                <span className="hidden md:inline">View</span>
                <FaEye className="md:hidden"/>
            </button>
            <button
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center"
                onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
            >
                <span className="hidden md:inline">Edit</span>
                <FaPencilAlt className="md:hidden"/>
            </button>
        </div>
    );
};
