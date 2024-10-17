import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDepartments } from "../../utils/EmployeeHelper.jsx";

const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        last_name: '',
        email: '',
        phone: '',
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (response.data.success) {
                    const employee = response.data.employee;
                    setEmployee({
                        name: employee.userId.name,
                        last_name: employee.lastName,
                        email: employee.userId.email,
                        phone: employee.phone,
                    });
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.put(`http://localhost:5000/api/employee/${id}`, employee, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.data.success) {
                navigate("/admin-dashboard/employee");
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error || 'An error occurred. Please try again.');
            } else {
                alert('Network error. Please try again later.');
            }
        }
    };

    return (
        <>
            {employee ? (
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-6 font-titillium">Edit {employee.name} {employee.last_name}'s Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Employee name */}
                            <div>
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Insert Employee Name"
                                    required
                                    value={employee.name}
                                    onChange={handleChange}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            {/*Last Name*/}
                            <div>
                                <label htmlFor="last_name" className="text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Insert Employee Last Name"
                                    required
                                    value={employee.last_name}
                                    onChange={handleChange}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            {/* Employee email */}
                            <div className="mt-1">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={employee.email}
                                    required
                                    onChange={handleChange}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            {/* phone number */}
                            <div className="mt-1">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter Phone Number"
                                    required
                                    value={employee.phone}
                                    onChange={handleChange}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                        </div>
                        <button
                            type="submit"
                            className="w-full mt-6 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save Edit
                        </button>
                    </form>
                </div>
            ) : (
                <div>Loading . . .</div>
            )}
        </>
    );
};

export default EditEmployee;
