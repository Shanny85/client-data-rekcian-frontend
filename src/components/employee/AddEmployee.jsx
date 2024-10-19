import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchDepartments } from "../../utils/EmployeeHelper.jsx";

const AddEmployee = () => {
    const [departments, setDepartment] = useState([]);
    const [dataForForm, setDataForForm] = useState({});
    const [warningVisible, setWarningVisible] = useState(false);
    const navigate = useNavigate();

    // Function to generate a unique employee ID
    const generateEmployeeId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartment(departments);
        };
        getDepartments().then(() => {
            // Set the initial employee ID
            setDataForForm(prevData => ({
                ...prevData,
                employee_id: generateEmployeeId()
            }));
        });
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Capitalize first letter for name, last_name, gender, mc (medical certificate), and purpose (reason for use)
        if (name === "name" || name === "last_name" || name === "gender" || name === "mc" || name === "purpose") {
            const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            setDataForForm((prevData) => ({ ...prevData, [name]: capitalizedValue }));
        } else if (name === "image") {
            setDataForForm((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setDataForForm((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the user is 18 years or older
        const dob = dataForForm.employee_dob;
        if (dob && calculateAge(dob) < 18) {
            setWarningVisible(true);
            return;
        } else {
            setWarningVisible(false);
        }

        // Dynamically update form data
        const dataForFormObj = new FormData();
        Object.keys(dataForForm).forEach((key) => {
            dataForFormObj.append(key, dataForForm[key]);
        });

        try {
            const response = await axios.post('https://rekciana.vercel.app/api/employee/add', dataForFormObj, {
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
        <div className="max-w-3xl mx-auto mt-10 bg-green-900 p-8 rounded-md shadow-md">
            <h2 className="text-lime-400 text-2xl font-bold mb-6 font-titillium text-center">Create Client</h2>
            {warningVisible && (
                <div className="bg-red-200 text-red-800 p-4 rounded-md mb-4">
                    <h3 className="text-lg font-bold">Warning: Client is under the age of 18!</h3>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Employee name */}
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-lime-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            required
                            onChange={handleChange}
                            className="mt-1 w-full p-2 bg-lime-100 rounded-md"
                        />
                    </div>
                    {/* Last Name */}
                    <div>
                        <label htmlFor="last_name" className="text-sm font-medium text-lime-300">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Enter Last Name"
                            required
                            onChange={handleChange}
                            className="mt-1 w-full p-2 bg-lime-100 rounded-md"
                        />
                    </div>
                    {/* Employee email */}
                    <div className="mt-1">
                        <label htmlFor="email" className="block text-sm font-medium text-lime-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            required
                            onChange={handleChange}
                            className="mt-1 w-full p-2 bg-lime-100 rounded-md"
                        />
                    </div>
                    {/* Phone number */}
                    <div className="mt-1">
                        <label htmlFor="phone" className="block text-sm font-medium text-lime-300">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter Phone Number"
                            required
                            onChange={handleChange}
                            className="mt-1 w-full p-2 bg-lime-100 rounded-md"
                        />
                    </div>
                    {/* Client ID (read-only) */}
                    <div>
                        <label htmlFor="employee_id" className="block text-sm font-medium text-lime-300">Unique ID</label>
                        <input
                            type="text"
                            name="employee_id"
                            value={dataForForm.employee_id || ''}
                            readOnly
                            className="mt-1 w-full p-2 rounded-md bg-gray-200"
                        />
                    </div>
                    {/* Employee date of birth */}
                    <div>
                        <label htmlFor="employee_dob" className="block text-sm font-medium text-lime-300">Date of Birth</label>
                        <input
                            type="date"
                            name="employee_dob"
                            required
                            onChange={handleChange}
                            className="mt-1 w-full p-2 bg-lime-100 rounded-md"
                        />
                    </div>
                    {/* Employee gender */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-lime-300">Gender</label>
                        <select
                            name="gender"
                            required
                            onChange={handleChange}
                            className="block mt-1 w-full p-2 bg-lime-100 rounded-md"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    {/* Medical certificate */}
                    <div>
                        <label htmlFor="mc" className="block text-sm font-medium text-lime-300">Medical Certificate</label>
                        <select
                            name="mc"
                            required
                            onChange={handleChange}
                            className="block mt-1 w-full p-2 bg-lime-100 rounded-md"
                        >
                            <option value="">Select Status</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    {/* Reason for use */}
                    <div>
                        <label htmlFor="purpose" className="block text-sm font-medium text-lime-300">Reason For Use</label>
                        <select
                            name="purpose"
                            required
                            onChange={handleChange}
                            className="block mt-1 w-full p-2 bg-lime-100 rounded-md"
                        >
                            <option value="">Select Option</option>
                            <option value="medicinal">Medicinal</option>
                            <option value="recreational">Recreational</option>
                            <option value="culinary">Culinary</option>
                        </select>
                    </div>
                    {/* Employee password */}
                    <div>
                        <label htmlFor="employee_pass" className="block text-sm font-medium text-lime-300"></label>
                        <input
                            type="password"
                            name="employee_pass"
                            value={dataForForm.employee_id || ''}
                            readOnly
                            onChange={handleChange}
                            className="hidden mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Client
                </button>
            </form>
        </div>
    );
};

export default AddEmployee;
