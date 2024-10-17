import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import logo from "../../assets/rekcian_logo.png";
import axios from "axios";

const ViewEmployee = () => {
    const {id} = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success) {
                    setEmployee(response.data.employee)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
        fetchEmployee().then(r => {})
    }, [])
    return (
        <>
            {employee ? (

        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-center">
                {employee.userId.name} {employee.lastName}'s Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img
                        src={logo}
                        alt="profile image"
                        className="rounded-full border w-72 sm:mx-auto"
                    />
                </div>
                <div>
                    <div className="flex justify-between mb-5 bg-lime-100 rounded px-2">
                        <p className="text-lg font-bold">Name: </p>
                        <p className="font-medium p-1">{employee.userId.name}</p>
                    </div>
                    <div className="flex justify-between mb-5 bg-lime-100 rounded px-2">
                        <p className="text-lg font-bold">Last Name: </p>
                        <p className="font-medium p-1">{employee.lastName}</p>
                    </div>
                    <div className="flex justify-between mb-5 bg-lime-100 rounded px-2">
                        <p className="text-lg font-bold">Unique ID: </p>
                        <p className="font-medium p-1">{employee.employeeId}</p>
                    </div>
                    <div className="flex justify-between mb-5 bg-lime-100 rounded px-2">
                        <p className="text-lg font-bold">Phone Number: </p>
                        <p className="font-medium p-1">{employee.phone}</p>
                    </div>
                    <div className="flex justify-between mb-5 bg-lime-100 rounded px-2">
                        <p className="text-lg font-bold">Email: </p>
                        <p className="font-medium p-1">{employee.userId.email}</p>
                    </div>
                    <div className="flex justify-between mb-5 bg-lime-100 rounded px-2">
                        <p className="text-lg font-bold">Date of Birth: </p>
                        <p className="font-medium p-1">
                            {new Date(employee.dob).toLocaleDateString()}</p>
                    </div>
                    <div className="flex justify-between mb-5 bg-lime-100 rounded px-2">
                        <p className="text-lg font-bold">Gender: </p>
                        <p className="font-medium p-1">{employee.gender}</p>
                    </div>
                    <div className="flex justify-between mb-5 bg-lime-100 rounded px-2">
                        <p className="text-lg font-bold">Medical Certificate: </p>
                        <p className="font-medium p-1">{employee.mc}</p>
                    </div>
                    <div className="flex justify-between mb-5 bg-lime-100 rounded px-2">
                        <p className="text-lg font-bold">Reason For Use: </p>
                        <p className="font-medium p-1 ">{employee.purpose}</p>
                    </div>
                </div>
            </div>
        </div>
                )
                : <div className="text-center text-5xl text-green-700 font-extrabold">Loading . . .</div>}
        </>
    );
};

export default ViewEmployee;
