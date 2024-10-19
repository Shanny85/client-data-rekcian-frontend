import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
    const {id} = useParams();
    const [department, setDepartment] = useState([]);
    const [dept_loading, setDeptLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            setDeptLoading(true)
            try {
                const response = await axios.get(`https://rekciana.vercel.app/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setDeptLoading(false)
            }
        }
        fetchDepartments().then(r => {})
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setDeptLoading(true);

        try {
            const response = await axios.put(
                `https://rekciana.vercel.app/api/department/${id}`, // Correct URL for PUT request
                department, // The updated department data
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (response.data.success) {
                alert('Department updated successfully');
                navigate("/admin-dashboard/departments"); // Redirect after successful edit
            } else {
                alert('Failed to update department');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the department.');
        } finally {
            setDeptLoading(false);
        }
    };


    return (
        <>{dept_loading ? <div className="text-center text-5xl text-green-700 font-extrabold">Loading . . .</div> :
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 font-titillium">Edit Department</h2>
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
                        value={department.dept_name}
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
                        value={department.description}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                >
                    Save Edit
                </button>
            </form>
        </div>
        }</>
    );
};

export default EditDepartment;
