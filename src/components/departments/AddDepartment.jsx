import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dept_name: '',
        description: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://rekciana.vercel.app/api/department/add', department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.data.success) {
                navigate("/admin-dashboard/departments");
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
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 font-titillium">Add Department</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dept_name" className="text-sm font-medium text-gray-700">
                        Department Name
                    </label>
                    <input
                        type="text"
                        name="dept_name"
                        placeholder="Enter Dept Name"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        placeholder="Enter Description"
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Department
                </button>
            </form>
        </div>
    );
};

export default AddDepartment;
